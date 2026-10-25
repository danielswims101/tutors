'use strict';
// Ascend Prep server: zero-dependency Node HTTP server with cookie sessions, JSON API, static files.
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const url = require('url');
const D = require('./db');
const C = require('./content');
const E = require('./engine');
const K = require('./coach');
const T = require('./tutor');

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC = path.join(__dirname, 'public');
const SESSION_DAYS = 30;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };

// ---------- helpers ----------
class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
const json = (res, status, body) => { const s = JSON.stringify(body); res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(s), 'Cache-Control': 'no-store' }); res.end(s); };
function parseCookies(req) { const out = {}; (req.headers.cookie || '').split(';').forEach(p => { const i = p.indexOf('='); if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim()); }); return out; }
function readBody(req) { return new Promise((resolve, reject) => { let data = ''; req.on('data', c => { data += c; if (data.length > 2e6) { reject(new HttpError(413, 'Body too large')); req.destroy(); } }); req.on('end', () => { if (!data) return resolve({}); try { resolve(JSON.parse(data)); } catch { reject(new HttpError(400, 'Invalid JSON')); } }); req.on('error', reject); }); }
const hashPassword = (pw, salt) => crypto.scryptSync(pw, salt, 64).toString('hex');
const now = () => new Date().toISOString().replace('T', ' ').slice(0, 19);
const plusDays = (d) => new Date(Date.now() + d * 864e5).toISOString().replace('T', ' ').slice(0, 19);
const stripAnswer = (q) => { const { answer, explanation, ...rest } = q; return rest; };
const USERNAME_RE = /^[a-zA-Z0-9_.-]{3,24}$/;

// Simple per-IP rate limit for auth endpoints
const authHits = new Map();
function rateLimit(ip) { const t = Date.now(); const arr = (authHits.get(ip) || []).filter(x => t - x < 15 * 60e3); arr.push(t); authHits.set(ip, arr); if (arr.length > 40) throw new HttpError(429, 'Too many attempts. Try again in a few minutes.'); }

function publicUser(u) { const xp = K.xpFor(u.id); const level = K.levelFor(xp); return { id: u.id, username: u.username, displayName: u.display_name, role: u.role, targetTest: u.target_test, variant: u.variant || Object.keys(C.TESTS[u.target_test].variants)[0], grade: u.grade, testDate: u.test_date, dailyGoal: u.daily_goal, shareCode: u.share_code, createdAt: u.created_at, diagnosticDone: Boolean(u.diagnostic_done), tutorName: T.tutorName(u), xp, level, levelXp: K.xpForLevel(level), nextLevelXp: K.xpForLevel(level + 1) }; }
function currentUser(req) {
  const token = parseCookies(req).ascend_session; if (!token) return null;
  const s = D.get('SELECT user_id, expires_at FROM sessions WHERE token = ?', token);
  if (!s || s.expires_at < now()) return null;
  const u = D.get('SELECT * FROM users WHERE id = ?', s.user_id); if (!u) return null;
  u.variant = u.variant || Object.keys(C.TESTS[u.target_test].variants)[0];
  return u;
}
function requireUser(req) { const u = currentUser(req); if (!u) throw new HttpError(401, 'Please sign in.'); return u; }
function setSession(res, userId) {
  const token = crypto.randomBytes(32).toString('hex');
  D.run('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)', token, userId, plusDays(SESSION_DAYS));
  res.setHeader('Set-Cookie', `ascend_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}`);
}
function viewTarget(req, user, query) {
  // Parents / admins may view a linked student's data via ?student=ID
  if (!query.student) return user;
  const sid = Number(query.student);
  const ok = user.role === 'admin' || D.get('SELECT 1 FROM family_links WHERE parent_id = ? AND student_id = ?', user.id, sid);
  if (!ok) throw new HttpError(403, 'Not linked to that student.');
  const s = D.get('SELECT * FROM users WHERE id = ?', sid); if (!s) throw new HttpError(404, 'Student not found');
  s.variant = s.variant || Object.keys(C.TESTS[s.target_test].variants)[0];
  return s;
}

// ---------- routes ----------
const routes = [];
const route = (method, pattern, handler) => routes.push({ method, re: new RegExp('^' + pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '/?$'), handler });

// Auth
route('POST', '/api/register', async ({ req, res, body }) => {
  rateLimit(req.socket.remoteAddress);
  const username = String(body.username || '').trim().toLowerCase();
  const displayName = String(body.displayName || '').trim().slice(0, 40);
  const password = String(body.password || '');
  const role = ['student', 'parent'].includes(body.role) ? body.role : 'student';
  const targetTest = C.TESTS[body.targetTest] ? body.targetTest : 'hspt';
  const variant = C.TESTS[targetTest].variants[body.variant] ? body.variant : Object.keys(C.TESTS[targetTest].variants)[0];
  if (!USERNAME_RE.test(username)) throw new HttpError(400, 'Username must be 3–24 letters, numbers, dots, dashes or underscores.');
  if (!displayName) throw new HttpError(400, 'Please enter a display name.');
  if (password.length < 8) throw new HttpError(400, 'Password must be at least 8 characters.');
  if (D.get('SELECT 1 FROM users WHERE username = ?', username)) throw new HttpError(409, 'That username is taken.');
  const salt = crypto.randomBytes(16).toString('hex');
  const count = D.get('SELECT COUNT(*) AS n FROM users').n;
  const r = D.run('INSERT INTO users (username, display_name, password_hash, salt, role, target_test, variant, grade, share_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', username, displayName, hashPassword(password, salt), salt, count === 0 ? 'admin' : role, targetTest, variant, body.grade ? Number(body.grade) : null, crypto.randomBytes(3).toString('hex').toUpperCase());
  setSession(res, Number(r.lastInsertRowid));
  return publicUser(D.get('SELECT * FROM users WHERE id = ?', Number(r.lastInsertRowid)));
});
route('POST', '/api/login', async ({ req, res, body }) => {
  rateLimit(req.socket.remoteAddress);
  const u = D.get('SELECT * FROM users WHERE username = ?', String(body.username || '').trim().toLowerCase());
  if (!u) throw new HttpError(401, 'Incorrect username or password.');
  const h = Buffer.from(hashPassword(String(body.password || ''), u.salt)); const stored = Buffer.from(u.password_hash);
  if (h.length !== stored.length || !crypto.timingSafeEqual(h, stored)) throw new HttpError(401, 'Incorrect username or password.');
  setSession(res, u.id);
  return publicUser(u);
});
route('POST', '/api/logout', async ({ req, res }) => { const t = parseCookies(req).ascend_session; if (t) D.run('DELETE FROM sessions WHERE token = ?', t); res.setHeader('Set-Cookie', 'ascend_session=; Path=/; HttpOnly; Max-Age=0'); return { ok: true }; });
route('GET', '/api/me', async ({ req }) => { const u = currentUser(req); return u ? { user: publicUser(u) } : { user: null }; });
route('PATCH', '/api/me', async ({ req, body }) => {
  const u = requireUser(req);
  const targetTest = C.TESTS[body.targetTest] ? body.targetTest : u.target_test;
  const variant = C.TESTS[targetTest].variants[body.variant] ? body.variant : (targetTest === u.target_test ? u.variant : Object.keys(C.TESTS[targetTest].variants)[0]);
  D.run('UPDATE users SET display_name = ?, target_test = ?, variant = ?, grade = ?, test_date = ?, daily_goal = ? WHERE id = ?', String(body.displayName || u.display_name).trim().slice(0, 40) || u.display_name, targetTest, variant, body.grade ? Number(body.grade) : u.grade, body.testDate || null, Math.max(5, Math.min(200, Number(body.dailyGoal) || u.daily_goal)), u.id);
  if (body.tutorName !== undefined) D.run('UPDATE users SET tutor_name = ? WHERE id = ?', String(body.tutorName || '').trim().slice(0, 30) || null, u.id);
  if (body.newPassword) { if (String(body.newPassword).length < 8) throw new HttpError(400, 'New password must be at least 8 characters.'); const salt = crypto.randomBytes(16).toString('hex'); D.run('UPDATE users SET password_hash = ?, salt = ? WHERE id = ?', hashPassword(String(body.newPassword), salt), salt, u.id); }
  return publicUser(D.get('SELECT * FROM users WHERE id = ?', u.id));
});
// Family links: a parent enters a student's share code
route('POST', '/api/family/link', async ({ req, body }) => {
  const u = requireUser(req);
  const s = D.get('SELECT * FROM users WHERE share_code = ?', String(body.code || '').trim().toUpperCase());
  if (!s) throw new HttpError(404, 'No student has that code.');
  if (s.id === u.id) throw new HttpError(400, 'That is your own code.');
  D.run('INSERT OR IGNORE INTO family_links (parent_id, student_id) VALUES (?, ?)', u.id, s.id);
  return { ok: true, student: { id: s.id, displayName: s.display_name, username: s.username } };
});
route('GET', '/api/family/students', async ({ req }) => { const u = requireUser(req); return { students: D.all('SELECT u.id, u.display_name AS displayName, u.username, u.target_test AS targetTest FROM family_links f JOIN users u ON u.id = f.student_id WHERE f.parent_id = ?', u.id) }; });
route('DELETE', '/api/family/link/:id', async ({ req, params }) => { const u = requireUser(req); D.run('DELETE FROM family_links WHERE parent_id = ? AND student_id = ?', u.id, Number(params.id)); return { ok: true }; });

// Content overview
route('GET', '/api/content/overview', async () => ({
  tests: C.TESTS, skillNames: C.SKILL_NAMES, sectionSkills: C.SECTION_SKILLS, tiers: C.TIERS,
  counts: { questions: C.questions.length, passages: C.passages.length, vocab: C.vocab.length, lessons: C.lessons.length, prompts: C.writingPrompts.length },
  blueprints: Object.fromEntries(Object.entries(C.BLUEPRINTS).map(([t, v]) => [t, Object.fromEntries(Object.entries(v).map(([k, secs]) => [k, secs.map(s => ({ section: s.section, label: s.label || C.TESTS[t].sections[s.section], count: s.count, minutes: s.minutes, writing: !!s.writing }))]))]))
}));

// Lessons
route('GET', '/api/lessons', async ({ req, query }) => {
  const u = requireUser(req); const target = viewTarget(req, u, query);
  const test = C.TESTS[query.test] ? query.test : target.target_test;
  const prog = new Map(D.all('SELECT lesson_id, status, score FROM lesson_progress WHERE user_id = ?', target.id).map(r => [r.lesson_id, r]));
  const lessons = C.lessons.filter(l => l.test === test || l.test === 'all').map(l => ({ id: l.id, test: l.test, section: l.section, skill: l.skill, skillName: C.SKILL_NAMES[l.skill], title: l.title, minutes: l.minutes, level: l.level, objectives: l.objectives, progress: prog.get(l.id) || null }));
  return { lessons };
});
route('GET', '/api/lessons/:id', async ({ req, params }) => {
  requireUser(req); const l = C.lessonById.get(params.id); if (!l) throw new HttpError(404, 'Lesson not found');
  const blocks = l.blocks.map(b => b.type === 'check' ? { ...b, questions: b.questions.map(stripAnswer) } : b.type === 'faded' ? { ...b, question: stripAnswer(b.question) } : b);
  return { ...l, blocks };
});
route('POST', '/api/lessons/:id/check', async ({ req, params, body }) => {
  const u = requireUser(req); const l = C.lessonById.get(params.id); if (!l) throw new HttpError(404, 'Lesson not found');
  const checks = []; for (const b of l.blocks) { if (b.type === 'faded') checks.push(b.question); if (b.type === 'check') checks.push(...b.questions); }
  const answers = Array.isArray(body.answers) ? body.answers : [];
  const results = checks.map((q, i) => {
    const choice = Number.isInteger(answers[i]) ? answers[i] : null;
    const qq = { id: `${l.id}#${i}`, test: l.test, section: l.section, skill: l.skill === 'strategy' || l.skill === 'writing' ? (C.SECTION_SKILLS[u.target_test][l.section] || ['strategy'])[0] : l.skill, level: l.level, ...q };
    const r = E.recordAttempt(u, qq, choice, { mode: 'lesson', test: l.test === 'all' ? u.target_test : l.test });
    return { correct: r.correct, answer: q.answer, explanation: q.explanation, choice };
  });
  const score = results.length ? results.filter(r => r.correct).length / results.length : 1;
  D.run(`INSERT INTO lesson_progress (user_id, lesson_id, status, score, completed_at) VALUES (?, ?, 'completed', ?, datetime('now')) ON CONFLICT(user_id, lesson_id) DO UPDATE SET status='completed', score=excluded.score, completed_at=datetime('now')`, u.id, l.id, score);
  const plan = K.getPlan(u); if (plan) { const day = plan.days.find(d => d.date === K.todayKey()); if (day) { const it = day.items.find(i => i.type === 'lesson' && i.ref === l.id && !i.done); if (it) { it.done = true; K.savePlan(u, plan); } } }
  return { results, score, newBadges: K.checkBadges(u) };
});
route('POST', '/api/lessons/:id/start', async ({ req, params }) => { const u = requireUser(req); D.run(`INSERT OR IGNORE INTO lesson_progress (user_id, lesson_id, status) VALUES (?, ?, 'started')`, u.id, params.id); return { ok: true }; });

// Practice (adaptive)
route('GET', '/api/practice/next', async ({ req, query }) => {
  const u = requireUser(req);
  const count = Math.max(1, Math.min(30, Number(query.count) || 10));
  const diagnostic = query.mode === 'diagnostic';
  const batch = diagnostic ? K.diagnosticBatch(u) : E.practiceBatch(u, { test: query.test || u.target_test, section: query.section || undefined, skill: query.skill || undefined, count, level: query.level ? Number(query.level) : undefined });
  const served = batch.map(q => { const sid = crypto.randomBytes(8).toString('hex'); D.run('INSERT INTO served (id, user_id, payload, mode) VALUES (?, ?, ?, ?)', sid, u.id, JSON.stringify({ ...q, passage: undefined, hints: 0 }), diagnostic ? 'diagnostic' : 'practice'); return { ...stripAnswer(q), servedId: sid }; });
  D.run(`DELETE FROM served WHERE created_at < datetime('now','-2 days')`);
  return { questions: served };
});
route('POST', '/api/practice/answer', async ({ req, body }) => {
  const u = requireUser(req);
  const row = D.get('SELECT payload, mode FROM served WHERE id = ? AND user_id = ?', String(body.servedId || ''), u.id);
  if (!row) throw new HttpError(404, 'Question expired. Load a new set.');
  const q = JSON.parse(row.payload);
  if (q.answered) throw new HttpError(400, 'Already answered.');
  const choice = Number.isInteger(body.choice) ? body.choice : null;
  const hints = Number(q.hints) || 0;
  const r = E.recordAttempt(u, q, choice, { seconds: Number(body.seconds) || null, confidence: Number(body.confidence) || null, mode: row.mode, test: body.test && C.TESTS[body.test] ? body.test : undefined, hints });
  D.run('UPDATE served SET payload = ? WHERE id = ?', JSON.stringify({ ...q, answered: true, choice }), body.servedId);
  const xpGain = r.correct ? 10 + (q.level || 3) * 4 - Math.min(hints, 2) * 3 : 2;
  const newBadges = K.checkBadges(u);
  return { correct: r.correct, answer: q.answer, explanation: q.explanation, rating: { delta: Math.round(r.rating.delta), after: Math.round(r.rating.after), mastery: E.mastery(r.rating.after) }, skill: q.skill, skillName: C.SKILL_NAMES[q.skill], xpGain, newBadges };
});

// Mock tests
route('GET', '/api/mock/options', async ({ req, query }) => {
  const u = requireUser(req); const test = C.TESTS[query.test] ? query.test : u.target_test;
  const inProgress = D.get(`SELECT id, test, variant, tier, length, section_index, started_at FROM mock_tests WHERE user_id = ? AND status = 'in_progress' ORDER BY started_at DESC LIMIT 1`, u.id);
  return { test, variants: C.TESTS[test].variants, tiers: C.TIERS, recommended: E.recommendTier(u.id, test), blueprint: C.BLUEPRINTS[test], inProgress: inProgress || null };
});
route('POST', '/api/mock/start', async ({ req, body }) => {
  const u = requireUser(req);
  const test = C.TESTS[body.test] ? body.test : u.target_test;
  const variant = C.BLUEPRINTS[test][body.variant] ? body.variant : u.variant;
  const tier = C.TIERS[body.tier] ? body.tier : E.recommendTier(u.id, test).tier;
  const length = ['full', 'half', 'section'].includes(body.length) ? body.length : 'full';
  const mock = E.buildMock(u, { test, variant, tier, length: length === 'section' ? 'full' : length, section: length === 'section' ? body.section : undefined });
  if (!mock.sections.length) throw new HttpError(400, 'No sections to build.');
  D.run(`UPDATE mock_tests SET status = 'abandoned' WHERE user_id = ? AND status = 'in_progress'`, u.id);
  const r = D.run('INSERT INTO mock_tests (user_id, test, variant, tier, length, blueprint, section_started_at) VALUES (?, ?, ?, ?, ?, ?, ?)', u.id, test, variant, tier, length, JSON.stringify(mock), now());
  return { id: Number(r.lastInsertRowid) };
});
function loadMock(u, id) { const m = D.get('SELECT * FROM mock_tests WHERE id = ? AND user_id = ?', Number(id), u.id); if (!m) throw new HttpError(404, 'Mock test not found'); m.bp = JSON.parse(m.blueprint); m.resp = JSON.parse(m.responses || '{}'); return m; }
function mockState(m) {
  const sec = m.bp.sections[m.section_index];
  const startedMs = m.section_started_at ? new Date(m.section_started_at + 'Z').getTime() : Date.now();
  const remaining = Math.max(0, sec.minutes * 60 - Math.floor((Date.now() - startedMs) / 1000));
  return { id: m.id, test: m.test, variant: m.variant, tier: m.tier, length: m.length, status: m.status, sectionIndex: m.section_index, sectionCount: m.bp.sections.length,
    sections: m.bp.sections.map(s => ({ section: s.section, label: s.label, minutes: s.minutes, count: s.writing ? 1 : s.questions.length, writing: !!s.writing })),
    current: m.status === 'in_progress' ? { section: sec.section, label: sec.label, minutes: sec.minutes, writing: !!sec.writing, prompt: sec.prompt || null, remaining, questions: sec.writing ? [] : sec.questions.map(stripAnswer), passages: sec.passages || {}, responses: Object.fromEntries(Object.entries(m.resp).filter(([k]) => sec.writing ? k === `w:${sec.section}` : sec.questions.some(q => q.id === k))) } : null };
}
route('GET', '/api/mock/:id', async ({ req, params }) => { const u = requireUser(req); const m = loadMock(u, params.id); if (m.status !== 'in_progress') return { id: m.id, status: m.status }; return mockState(m); });
route('POST', '/api/mock/:id/answer', async ({ req, params, body }) => {
  const u = requireUser(req); const m = loadMock(u, params.id); if (m.status !== 'in_progress') throw new HttpError(400, 'Test is not in progress');
  const sec = m.bp.sections[m.section_index];
  const upd = body.responses && typeof body.responses === 'object' ? body.responses : {};
  for (const [k, v] of Object.entries(upd)) {
    if (sec.writing) { if (k === `w:${sec.section}`) m.resp[k] = String(v).slice(0, 20000); continue; }
    if (sec.questions.some(q => q.id === k)) { if (v === null) delete m.resp[k]; else if (Number.isInteger(v)) m.resp[k] = v; }
  }
  D.run('UPDATE mock_tests SET responses = ? WHERE id = ?', JSON.stringify(m.resp), m.id);
  return { ok: true };
});
route('POST', '/api/mock/:id/next', async ({ req, params }) => {
  const u = requireUser(req); const m = loadMock(u, params.id); if (m.status !== 'in_progress') throw new HttpError(400, 'Test is not in progress');
  if (m.section_index + 1 >= m.bp.sections.length) return finishMock(u, m);
  D.run('UPDATE mock_tests SET section_index = ?, section_started_at = ? WHERE id = ?', m.section_index + 1, now(), m.id);
  return mockState(loadMock(u, m.id));
});
function finishMock(u, m) {
  const results = E.scoreMock(m.bp, m.resp);
  D.transaction(() => {
    for (const sec of m.bp.sections) { if (sec.writing) continue; for (const q of sec.questions) { const choice = Number.isInteger(m.resp[q.id]) ? m.resp[q.id] : null; E.recordAttempt(u, q, choice, { mode: 'mock', mockId: m.id, test: m.test }); } }
    const w = m.bp.sections.find(s => s.writing); if (w && m.resp[`w:${w.section}`]) { const text = m.resp[`w:${w.section}`]; D.run('INSERT INTO writing_submissions (user_id, prompt_id, text, word_count, minutes) VALUES (?, ?, ?, ?, ?)', u.id, (w.prompt && w.prompt.id) || 'mock', text, text.trim().split(/\s+/).filter(Boolean).length, w.minutes); }
    D.run(`UPDATE mock_tests SET status = 'completed', results = ?, completed_at = datetime('now') WHERE id = ?`, JSON.stringify(results), m.id);
  });
  K.markDone(u, K.todayKey(), null, 'mock');
  return { id: m.id, status: 'completed', results, newBadges: K.checkBadges(u) };
}
route('POST', '/api/mock/:id/submit', async ({ req, params }) => { const u = requireUser(req); const m = loadMock(u, params.id); if (m.status !== 'in_progress') throw new HttpError(400, 'Already submitted'); return finishMock(u, m); });
route('POST', '/api/mock/:id/abandon', async ({ req, params }) => { const u = requireUser(req); const m = loadMock(u, params.id); D.run(`UPDATE mock_tests SET status = 'abandoned' WHERE id = ? AND status = 'in_progress'`, m.id); return { ok: true }; });
route('GET', '/api/mock/:id/results', async ({ req, params, query }) => {
  const u = requireUser(req); const target = viewTarget(req, u, query);
  const m = D.get('SELECT * FROM mock_tests WHERE id = ? AND user_id = ?', Number(params.id), target.id); if (!m || !m.results) throw new HttpError(404, 'Results not found');
  return { id: m.id, test: m.test, variant: m.variant, tier: m.tier, length: m.length, startedAt: m.started_at, completedAt: m.completed_at, results: JSON.parse(m.results) };
});
route('GET', '/api/mocks', async ({ req, query }) => { const u = requireUser(req); const target = viewTarget(req, u, query); return { mocks: E.progressSummary(target).mocks }; });

// Review (spaced repetition)
route('GET', '/api/review/due', async ({ req, query }) => {
  const u = requireUser(req);
  const limit = Math.min(50, Number(query.limit) || 20);
  const rows = D.all(`SELECT * FROM review_items WHERE user_id = ? AND due_at <= datetime('now') ORDER BY due_at LIMIT ?`, u.id, limit);
  const items = rows.map(r => { const p = JSON.parse(r.payload); if (r.kind === 'vocab') return { key: r.item_key, kind: 'vocab', vocab: p, reps: r.reps }; const q = p.full || C.byId.get(p.id); if (!q) return null; return { key: r.item_key, kind: 'question', question: stripAnswer(q), passage: q.passageId ? C.passageById.get(q.passageId) : null, reps: r.reps }; }).filter(Boolean);
  const counts = { due: D.get(`SELECT COUNT(*) AS n FROM review_items WHERE user_id = ? AND due_at <= datetime('now')`, u.id).n, total: D.get('SELECT COUNT(*) AS n FROM review_items WHERE user_id = ?', u.id).n, vocab: D.get(`SELECT COUNT(*) AS n FROM review_items WHERE user_id = ? AND kind = 'vocab'`, u.id).n };
  return { items, counts };
});
route('POST', '/api/review/grade', async ({ req, body }) => {
  const u = requireUser(req); const r = D.get('SELECT * FROM review_items WHERE user_id = ? AND item_key = ?', u.id, String(body.key || '')); if (!r) throw new HttpError(404, 'Item not found');
  const p = JSON.parse(r.payload); let quality = Math.max(0, Math.min(5, Number(body.quality)));
  let feedback = null;
  if (r.kind === 'question') { const q = p.full || C.byId.get(p.id); const choice = Number.isInteger(body.choice) ? body.choice : null; const correct = q && choice === q.answer; quality = correct ? (Number.isInteger(body.quality) ? Math.max(3, quality) : 4) : 1; if (q) { E.recordAttempt(u, q, choice, { mode: 'review', seconds: Number(body.seconds) || null }); feedback = { correct, answer: q.answer, explanation: q.explanation }; } }
  const s = E.sm2(r, quality);
  D.run('UPDATE review_items SET ease = ?, interval_days = ?, reps = ?, lapses = ?, due_at = ? WHERE user_id = ? AND item_key = ?', s.ease, s.interval_days, s.reps, s.lapses, s.due_at, u.id, r.item_key);
  return { ok: true, next: s, feedback };
});
route('GET', '/api/vocab', async ({ req, query }) => {
  const u = requireUser(req);
  const level = query.level ? Number(query.level) : null;
  const inDeck = new Set(D.all(`SELECT item_key FROM review_items WHERE user_id = ? AND kind = 'vocab'`, u.id).map(r => r.item_key.slice(2)));
  const words = C.vocab.filter(v => !level || v.level === level).map(v => ({ ...v, inDeck: inDeck.has(v.word) }));
  return { words, levels: [1, 2, 3, 4, 5].map(l => ({ level: l, count: C.vocab.filter(v => v.level === l).length, added: C.vocab.filter(v => v.level === l && inDeck.has(v.word)).length })) };
});
route('POST', '/api/vocab/add', async ({ req, body }) => {
  const u = requireUser(req); let words = [];
  if (Array.isArray(body.words)) words = C.vocab.filter(v => body.words.includes(v.word));
  else if (body.level) words = C.vocab.filter(v => v.level === Number(body.level));
  if (body.limit) words = words.slice(0, Number(body.limit));
  D.transaction(() => { for (const v of words) { if (!D.get('SELECT 1 FROM review_items WHERE user_id = ? AND item_key = ?', u.id, `v:${v.word}`)) D.run('INSERT INTO review_items (user_id, item_key, kind, payload, due_at) VALUES (?, ?, ?, ?, ?)', u.id, `v:${v.word}`, 'vocab', JSON.stringify(v), now()); } });
  return { added: words.length };
});

// Writing
route('GET', '/api/writing/prompts', async ({ req, query }) => { const u = requireUser(req); const test = C.TESTS[query.test] ? query.test : u.target_test; return { prompts: C.writingPrompts.filter(p => p.test === test || query.all === '1') }; });
route('POST', '/api/writing/submit', async ({ req, body }) => {
  const u = requireUser(req); const text = String(body.text || '').slice(0, 20000); if (text.trim().length < 20) throw new HttpError(400, 'Write at least a few sentences first.');
  const wc = text.trim().split(/\s+/).filter(Boolean).length;
  const r = D.run('INSERT INTO writing_submissions (user_id, prompt_id, text, word_count, minutes, self_scores) VALUES (?, ?, ?, ?, ?, ?)', u.id, String(body.promptId || 'custom'), text, wc, Number(body.minutes) || null, JSON.stringify(body.selfScores || null));
  // Heuristic feedback: structure, variety, specificity
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const avgLen = sentences.length ? wc / sentences.length : 0;
  const paras = text.split(/\n\s*\n/).filter(p => p.trim()).length;
  const longWords = text.split(/\s+/).filter(w => w.replace(/[^a-z]/gi, '').length >= 8).length;
  const weak = (text.match(/\b(very|really|thing|things|stuff|a lot|good|bad|nice|got|get)\b/gi) || []).length;
  const tips = [];
  if (wc < 150) tips.push('Aim for 250–400 words. Graders reward developed ideas; add a specific example or a second reason.');
  if (paras < 3) tips.push('Use at least 3–4 paragraphs: an opening that answers the prompt, one or two body paragraphs each with a concrete example, and a short close.');
  if (avgLen > 25) tips.push(`Your sentences average ${Math.round(avgLen)} words. Break a few long ones up for clarity.`);
  if (avgLen && avgLen < 10) tips.push(`Your sentences average ${Math.round(avgLen)} words. Combine some short ones with because / although / which to show control.`);
  if (weak > 3) tips.push(`You used vague words (very, really, thing, good, got) ${weak} times. Replace each with a precise word or a specific detail.`);
  if (longWords / Math.max(1, wc) < 0.06) tips.push('Work in a few precise, mature vocabulary words you fully control. Precision beats length.');
  if (!tips.length) tips.push('Strong structure and control. Now sharpen the opening: start with a specific image, moment, or claim rather than restating the prompt.');
  const promptObj = C.writingPrompts.find(p => p.id === body.promptId);
  const ai = await T.essayFeedback(u, promptObj ? promptObj.prompt : String(body.promptText || 'Open prompt'), text);
  K.markDone(u, K.todayKey(), null, 'writing');
  return { id: Number(r.lastInsertRowid), wordCount: wc, sentences: sentences.length, paragraphs: paras, avgSentenceLength: Math.round(avgLen * 10) / 10, tips, ai, newBadges: K.checkBadges(u) };
});
route('GET', '/api/writing/mine', async ({ req, query }) => { const u = requireUser(req); const target = viewTarget(req, u, query); return { submissions: D.all('SELECT id, prompt_id AS promptId, text, word_count AS wordCount, minutes, self_scores AS selfScores, created_at AS createdAt FROM writing_submissions WHERE user_id = ? ORDER BY created_at DESC LIMIT 30', target.id) }; });

// Progress
route('GET', '/api/progress', async ({ req, query }) => { const u = requireUser(req); const target = viewTarget(req, u, query); return { user: publicUser(target), ...E.progressSummary(target) }; });
route('GET', '/api/progress/attempts', async ({ req, query }) => { const u = requireUser(req); const target = viewTarget(req, u, query); return { attempts: D.all('SELECT question_id AS id, test, section, skill, level, correct, seconds, confidence, mode, created_at AS at FROM attempts WHERE user_id = ? ORDER BY created_at DESC LIMIT 200', target.id) }; });

// Admin: list users (first registered account is admin)
route('GET', '/api/admin/users', async ({ req }) => { const u = requireUser(req); if (u.role !== 'admin') throw new HttpError(403, 'Admins only'); return { users: D.all(`SELECT u.id, u.username, u.display_name AS displayName, u.role, u.target_test AS targetTest, u.created_at AS createdAt, (SELECT COUNT(*) FROM attempts a WHERE a.user_id = u.id) AS attempts, (SELECT MAX(created_at) FROM attempts a WHERE a.user_id = u.id) AS lastActive FROM users u ORDER BY u.created_at`) }; });

// ---------- Tutor, hints, diagnostic, plan, session, gamification, friends ----------
route('GET', '/api/tutor/status', async ({ req }) => { requireUser(req); const s = T.status(); return { live: s.live, model: s.model, note: s.note, sdkInstalled: s.sdkInstalled, hasKey: s.hasKey }; });
route('GET', '/api/tutor/history', async ({ req }) => { const u = requireUser(req); return { messages: D.all('SELECT role, content, created_at AS at FROM tutor_messages WHERE user_id = ? ORDER BY id DESC LIMIT 40', u.id).reverse() }; });
route('DELETE', '/api/tutor/history', async ({ req }) => { const u = requireUser(req); D.run('DELETE FROM tutor_messages WHERE user_id = ?', u.id); return { ok: true }; });
route('POST', '/api/tutor/chat', async ({ req, body }) => {
  const u = requireUser(req);
  const ctx = body.context && typeof body.context === 'object' ? body.context : {};
  try { const out = await T.chat(u, body.message, ctx); if (out.hint && ctx.servedId) { const row = D.get('SELECT payload FROM served WHERE id = ? AND user_id = ?', String(ctx.servedId), u.id); if (row) { const q = JSON.parse(row.payload); q.hints = Math.max(q.hints || 0, out.hint.level); D.run('UPDATE served SET payload = ? WHERE id = ?', JSON.stringify(q), ctx.servedId); } } return out; }
  catch (e) { throw new HttpError(400, e.message); }
});
route('POST', '/api/admin/tutor-config', async ({ req, body }) => {
  const u = requireUser(req); if (u.role !== 'admin') throw new HttpError(403, 'Admins only');
  const cfg = T.readConfig();
  if (body.apiKey !== undefined) { const k = String(body.apiKey || '').trim(); if (k && !/^sk-ant-/.test(k)) throw new HttpError(400, 'That does not look like an Anthropic API key (it should start with sk-ant-).'); if (k) cfg.apiKey = k; else delete cfg.apiKey; }
  if (body.model !== undefined) { const m = String(body.model || '').trim(); if (m) cfg.model = m; else delete cfg.model; }
  T.writeConfig(cfg);
  return T.status();
});
route('GET', '/api/practice/hint', async ({ req, query }) => {
  const u = requireUser(req);
  const row = D.get('SELECT payload, mode FROM served WHERE id = ? AND user_id = ?', String(query.servedId || ''), u.id);
  if (!row) throw new HttpError(404, 'Question expired.');
  const q = JSON.parse(row.payload); const level = Math.max(1, Math.min(3, (Number(q.hints) || 0) + 1));
  q.hints = level; D.run('UPDATE served SET payload = ? WHERE id = ?', JSON.stringify(q), query.servedId);
  return { ...K.hintFor(q, level), hintsUsed: level };
});
route('POST', '/api/diagnostic/complete', async ({ req }) => {
  const u = requireUser(req);
  D.run('UPDATE users SET diagnostic_done = 1 WHERE id = ?', u.id); u.diagnostic_done = 1;
  const plan = K.savePlan(u, K.buildPlan(u));
  const p = E.progressSummary(u);
  return { plan, progress: p, newBadges: K.checkBadges(u) };
});
route('GET', '/api/plan', async ({ req, query }) => { const u = requireUser(req); const target = viewTarget(req, u, query); return { plan: K.getPlan(target), today: K.todayKey() }; });
route('POST', '/api/plan/generate', async ({ req }) => { const u = requireUser(req); return { plan: K.savePlan(u, K.buildPlan(u)), today: K.todayKey() }; });
route('POST', '/api/plan/done', async ({ req, body }) => { const u = requireUser(req); return { plan: K.markDone(u, String(body.date || K.todayKey()), Number.isInteger(body.index) ? body.index : null, body.type || null) }; });
route('GET', '/api/session/today', async ({ req }) => {
  const u = requireUser(req);
  let plan = K.getPlan(u); if (!plan) plan = K.savePlan(u, K.buildPlan(u));
  const today = K.todayKey(); let day = plan.days.find(d => d.date === today);
  if (!day) { plan = K.savePlan(u, K.buildPlan(u)); day = plan.days.find(d => d.date === today) || plan.days[0]; }
  const p = E.progressSummary(u);
  const done = day.items.filter(i => i.done).length;
  const minutes = day.items.reduce((a, i) => a + (i.minutes || 0), 0);
  const weak = p.skills.filter(s => s.n >= 2).sort((a, b) => a.mastery - b.mastery)[0];
  const daysLeft = plan.testDate ? Math.ceil((new Date(plan.testDate) - Date.now()) / 864e5) : null;
  const narration = !u.diagnostic_done ? `Welcome, ${u.display_name}. Before anything else, I want to see how you think. The diagnostic is twenty questions across every section; there is no score to worry about. It tells me where to start.` : done === day.items.length ? `That is everything for today, ${u.display_name}. ${p.streak} day streak. Rest is part of the plan; I will see you tomorrow.` : `${p.streak >= 3 ? `Day ${p.streak} in a row. ` : ''}Today is about ${minutes} minutes${daysLeft ? `, with ${daysLeft} days to the test` : ''}. ${weak ? `We are chasing ${weak.name}; it is sitting at ${weak.mastery}% and it is where your next points are.` : 'Your plan starts broad and narrows as I learn what you need.'} ${p.due ? `Start with the ${p.due} review items; they are timed to land before you forget.` : 'Begin with the first step below.'}`;
  return { date: day.date, items: day.items, done, total: day.items.length, minutes, narration, tutorName: T.tutorName(u), streak: p.streak, due: p.due, daysLeft, diagnosticDone: Boolean(u.diagnostic_done) };
});
route('GET', '/api/gamification', async ({ req, query }) => { const u = requireUser(req); const target = viewTarget(req, u, query); const xp = K.xpFor(target.id); const level = K.levelFor(xp); return { xp, level, levelXp: K.xpForLevel(level), nextLevelXp: K.xpForLevel(level + 1), weekXp: K.xpSince(target.id, 7), badges: K.badgeList(target), newBadges: target.id === u.id ? K.checkBadges(u) : [] }; });
route('GET', '/api/friends', async ({ req }) => { const u = requireUser(req); return { friends: D.all('SELECT u.id, u.display_name AS displayName, u.username, u.target_test AS targetTest FROM friends f JOIN users u ON u.id = f.friend_id WHERE f.user_id = ?', u.id), leaderboard: K.leaderboard(u) }; });
route('POST', '/api/friends/add', async ({ req, body }) => {
  const u = requireUser(req);
  const f = D.get('SELECT * FROM users WHERE share_code = ?', String(body.code || '').trim().toUpperCase());
  if (!f) throw new HttpError(404, 'No one has that code. Ask your friend for the code shown in their Settings.');
  if (f.id === u.id) throw new HttpError(400, 'That is your own code.');
  D.run('INSERT OR IGNORE INTO friends (user_id, friend_id) VALUES (?, ?)', u.id, f.id); D.run('INSERT OR IGNORE INTO friends (user_id, friend_id) VALUES (?, ?)', f.id, u.id);
  return { ok: true, friend: { id: f.id, displayName: f.display_name, username: f.username }, newBadges: K.checkBadges(u) };
});
route('DELETE', '/api/friends/:id', async ({ req, params }) => { const u = requireUser(req); D.run('DELETE FROM friends WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)', u.id, Number(params.id), Number(params.id), u.id); return { ok: true }; });

// ---------- server ----------
function serveStatic(req, res, pathname) {
  let p = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\/\\])+/, '');
  if (p === '/' || p === '\\') p = '/index.html';
  let file = path.join(PUBLIC, p);
  if (!file.startsWith(PUBLIC)) { res.writeHead(403); return res.end(); }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { file = path.join(PUBLIC, 'index.html'); } // SPA fallback
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    fs.createReadStream(file).pipe(res);
  });
}
const server = http.createServer(async (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  if (!pathname.startsWith('/api/')) return serveStatic(req, res, pathname);
  try {
    for (const r of routes) {
      if (r.method !== req.method) continue;
      const m = r.re.exec(pathname); if (!m) continue;
      const body = ['POST', 'PATCH', 'PUT'].includes(req.method) ? await readBody(req) : {};
      const out = await r.handler({ req, res, body, params: m.groups || {}, query });
      return json(res, 200, out);
    }
    json(res, 404, { error: 'Not found' });
  } catch (e) {
    if (e instanceof HttpError) return json(res, e.status, { error: e.message });
    console.error(e); json(res, 500, { error: 'Server error' });
  }
});
server.listen(PORT, HOST, () => { console.log(`Ascend Prep running at http://localhost:${PORT}  (content: ${C.questions.length} questions, ${C.passages.length} passages, ${C.lessons.length} lessons, ${C.vocab.length} vocab words)`); });

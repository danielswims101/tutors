'use strict';
/* The "server in the browser": implements the same API the UI calls, on top of the engine and the store. */
window.AscendAPI = (function () {
  const A = window.Ascend; const C = A.C; const store = window.AscendStore;
  let U = null; // current user: { uid, profile, S, mocksIndex, writings, friends, students, viewers }
  const viewCache = new Map(); // parent viewing a student
  const served = new Map();
  class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
  const stripAnswer = (q) => { const { answer, explanation, ...rest } = q; return rest; };
  const nowIso = () => new Date().toISOString();

  // ---- persistence (debounced) and cross-device sync ----
  // One account can be open on several devices (or tabs) at once. Every save is conditional on the row version this device
  // last read (store.saveData); a conflict means another device saved first, so we pull its copy, merge, and save again.
  // Devices also re-read the account on resume (tab visible, window focus, back online), once a minute while visible, and
  // the moment another device pings over Realtime that it saved.
  const DATA_COLS = ['ratings', 'daily', 'totals', 'seen', 'reviews', 'plan', 'lessons', 'badges', 'tutor', 'cards', 'training', 'courses'];
  const dirty = new Set(); let flushTimer = null; let retryTimer = null; let publicDirty = false; let profileDirty = false; let saving = null; let pulling = null; let lastPull = 0; let unsubscribe = null; let pokeTimer = null;
  const toast = (m) => { if (window.AscendApp && window.AscendApp.toast) window.AscendApp.toast(m); };
  function mark(...cols) { for (const c of cols) dirty.add(c); if (['ratings', 'daily', 'badges', 'totals'].some(c => cols.includes(c))) publicDirty = true; clearTimeout(flushTimer); flushTimer = setTimeout(flush, 900); }
  async function flush() { clearTimeout(flushTimer); if (!U) return; while (saving) { try { await saving; } catch {} } if (!U || (!dirty.size && !profileDirty && !publicDirty)) return; saving = doFlush().finally(() => { saving = null; }); return saving; }
  async function doFlush() {
    const u = U; const cols = [...dirty]; dirty.clear();
    try {
      if (cols.length) {
        let res = await store.saveData(u.uid, u.S, cols, u.version);
        if (res && res.conflict) { await pullFrom(u, cols); res = await store.saveData(u.uid, u.S, DATA_COLS, u.version); }
        if (res && res.conflict) throw new Error('Another device saved at the same moment.');
        if (res && res.version !== undefined) u.version = res.version;
        if (store.signal) store.signal({ v: u.version });
      }
      if (profileDirty) { profileDirty = false; await store.saveProfile(u.uid, u.profile); if (store.signal) store.signal({ profile: true }); }
      if (publicDirty) { publicDirty = false; await store.savePublic(u.uid, A.publicStats(u.S)); }
    } catch (e) { console.error('save failed', e); cols.forEach(c => dirty.add(c)); clearTimeout(retryTimer); retryTimer = setTimeout(flush, 15000); if (!/same moment/.test(e.message)) toast('Could not save progress: ' + e.message + ' Retrying shortly.'); }
  }
  // Merge rules for a column both devices changed: counters take the max, maps take the union, and per-item records keep
  // whichever copy has more practice behind it. A column only one side changed simply takes that side (see applyRemote).
  const later = (a, b) => String(a || '') >= String(b || '');
  function mergeDeep(s, l) { if (s === undefined || s === null) return l; if (l === undefined || l === null) return s; if (Array.isArray(s) || Array.isArray(l)) { const ls = Array.isArray(l) ? l.length : -1, ss = Array.isArray(s) ? s.length : -1; return ls >= ss ? l : s; } if (typeof s === 'object' && typeof l === 'object') { const out = { ...s }; for (const k of Object.keys(l)) out[k] = mergeDeep(s[k], l[k]); return out; } if (typeof s === 'number' && typeof l === 'number') return Math.max(s, l); if (typeof s === 'boolean' && typeof l === 'boolean') return s || l; return l; }
  function pickBy(s, l, score, tie) { const out = { ...(s || {}) }; for (const [k, lv] of Object.entries(l || {})) { const sv = out[k]; if (!sv || !lv) { out[k] = lv || sv; continue; } const a = score(lv), b = score(sv); out[k] = a > b || (a === b && later(tie(lv), tie(sv))) ? lv : sv; } return out; }
  function unionBy(a, b, cap) { const seen = new Set(); const all = [...(b || []), ...(a || [])].filter(x => { const k = JSON.stringify(x); if (seen.has(k)) return false; seen.add(k); return true; }); all.sort((x, y) => String(y.at || '').localeCompare(String(x.at || ''))); return cap ? all.slice(0, cap) : all; }
  function mergePlan(s, l) { if (!s || !l) return l || s; if (s.generatedAt !== l.generatedAt) return later(l.generatedAt, s.generatedAt) ? l : s; const days = (s.days || []).map(sd => { const ld = (l.days || []).find(d => d.date === sd.date); if (!ld) return sd; const items = sd.items.map((it, j) => ({ ...it, done: !!(it.done || (ld.items[j] && ld.items[j].label === it.label && ld.items[j].done)) })); for (const it of ld.items.slice(sd.items.length)) items.push(it); return { ...sd, items }; }); return { ...s, days }; }
  function mergeCol(col, s, l) {
    if (s === undefined || s === null) return l; if (l === undefined || l === null) return s;
    switch (col) {
      case 'ratings': { const out = {}; for (const test of new Set([...Object.keys(s), ...Object.keys(l)])) out[test] = pickBy(s[test], l[test], r => r.n || 0, r => r.updatedAt); return out; }
      case 'reviews': return pickBy(s, l, r => (r.reps || 0) + (r.lapses || 0), r => r.due);
      case 'lessons': return pickBy(s, l, v => v.status === 'completed' ? 1 : 0, v => v.completedAt);
      case 'badges': { const out = { ...l }; for (const [k, v] of Object.entries(s)) if (!out[k] || String(v) < String(out[k])) out[k] = v; return out; }
      case 'tutor': { const seen = new Set(); const all = [...s, ...l].filter(m => { const k = `${m.role}|${m.at || ''}|${m.content}`; if (seen.has(k)) return false; seen.add(k); return true; }); all.sort((x, y) => String(x.at || '').localeCompare(String(y.at || ''))); return all.slice(-60); }
      case 'training': { const out = mergeDeep(s, l); if ((s.math && s.math.sprints) || (l.math && l.math.sprints)) out.math = { ...(out.math || {}), sprints: unionBy(s.math && s.math.sprints, l.math && l.math.sprints, 100) }; if (s.errors || l.errors) out.errors = unionBy(s.errors, l.errors, 600); return out; }
      case 'courses': { const out = { ...s }; for (const [test, lc] of Object.entries(l)) { const sc = out[test]; out[test] = !sc ? lc : { ...sc, ...lc, diagnosticDone: !!(sc.diagnosticDone || lc.diagnosticDone), plan: mergePlan(sc.plan, lc.plan), focus: lc.focus && (!sc.focus || later(lc.focus.setAt, sc.focus.setAt)) ? lc.focus : sc.focus, enrolledAt: sc.enrolledAt || lc.enrolledAt }; } return out; }
      case 'plan': return mergePlan(s, l);
      default: return mergeDeep(s, l);
    }
  }
  function applyRemote(u, r, localCols = []) {
    const snapshot = () => JSON.stringify([u.S, u.profile, u.mocksIndex, u.writings.length, u.friends, u.students]);
    const before = snapshot(); const local = new Set([...localCols, ...dirty]);
    for (const c of DATA_COLS) { const rv = r.data[c]; if (local.has(c)) u.S[c] = mergeCol(c, rv, u.S[c]); else if (rv !== undefined) u.S[c] = rv; }
    if (!profileDirty) u.profile = r.profile;
    u.S.profile = u.profile; u.S.courses = u.S.courses || {}; u.S.training = u.S.training || {}; A.course(u.S, u.profile.targetTest); A.activateCourse(u.S, u.profile.targetTest);
    u.mocksIndex = r.mocksIndex; u.writings = r.writings; u.friends = r.friends; u.students = r.students; u.viewers = r.viewers; if (r.version !== undefined) u.version = r.version;
    return snapshot() !== before;
  }
  async function pullFrom(u, localCols) { const r = await store.loadUser(u.uid); if (U !== u) return false; lastPull = Date.now(); return applyRemote(u, r, localCols); }
  // pull(): re-read this account from the server. 'check' first compares the row version (one tiny query) and stops if
  // nothing changed; 'full' always re-reads, since mocks, writings and the profile carry no version.
  async function pull(mode = 'full') {
    if (!U || store.mode !== 'supabase') return false;
    if (pulling) return pulling;
    pulling = (async () => {
      const u = U;
      try {
        while (saving) { try { await saving; } catch {} }
        if (U !== u) return false;
        if (mode === 'check') { const v = await store.dataVersion(u.uid); lastPull = Date.now(); if (v === u.version) return false; }
        const changed = await pullFrom(u, []);
        if (changed) { viewCache.clear(); window.dispatchEvent(new CustomEvent('ascend:sync')); }
        return changed;
      } catch (e) { console.warn('sync: could not refresh', e.message); return false; }
    })();
    try { return await pulling; } finally { pulling = null; }
  }
  function startSync(u) { stopSync(); lastPull = Date.now(); if (store.mode === 'supabase' && store.subscribe) unsubscribe = store.subscribe(u.uid, () => { clearTimeout(pokeTimer); pokeTimer = setTimeout(() => pull('full'), 1200); }); }
  function stopSync() { if (unsubscribe) { try { unsubscribe(); } catch {} unsubscribe = null; } clearTimeout(pokeTimer); }
  const resume = () => { if (U && document.visibilityState === 'visible' && Date.now() - lastPull > 15000) { viewCache.clear(); pull('full'); } };
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); else resume(); });
  window.addEventListener('focus', resume);
  window.addEventListener('online', () => { Promise.resolve(flush()).then(() => pull('full')); });
  window.addEventListener('pagehide', flush);
  setInterval(() => { if (U && document.visibilityState === 'visible') pull('check'); }, 60000);

  async function loadUser(uid) { const r = await store.loadUser(uid); const S = r.data; S.profile = r.profile; S.courses = S.courses || {}; S.training = S.training || {}; A.course(S, r.profile.targetTest); A.activateCourse(S, r.profile.targetTest); return { uid, profile: r.profile, S, version: r.version === undefined ? null : r.version, mocksIndex: r.mocksIndex, writings: r.writings, friends: r.friends, students: r.students, viewers: r.viewers }; }
  function setPlan(u, plan) { u.S.plan = plan; A.course(u.S).plan = plan; mark('courses'); }
  async function requireUser() { if (U) return U; const uid = await store.currentUserId(); if (!uid) throw new HttpError(401, 'Please sign in.'); U = await loadUser(uid); startSync(U); return U; }
  async function viewTarget(query) { const u = await requireUser(); const sid = query.student; if (!sid) return u; if (!u.students.includes(sid) && u.profile.role !== 'admin') throw new HttpError(403, 'Not linked to that student.'); if (!viewCache.has(sid)) viewCache.set(sid, await loadUser(sid)); return viewCache.get(sid); }
  function publicUser(u) { const xp = A.xpFor(u.S); const level = A.levelFor(xp); const c = A.course(u.S); return { ...u.profile, variant: u.profile.variant || Object.keys(C.TESTS[u.profile.targetTest].variants)[0], diagnosticDone: !!c.diagnosticDone, goalPercentile: c.goalPercentile || 99, vocabLevel: c.vocabLevel || null, courses: Object.entries(u.S.courses || {}).map(([test, cc]) => ({ test, name: C.TESTS[test].name, variant: cc.variant, diagnosticDone: !!cc.diagnosticDone, testDate: cc.testDate || null, active: test === u.profile.targetTest })), tutorName: A.tutorName(u.S), xp, level, levelXp: A.xpForLevel(level), nextLevelXp: A.xpForLevel(level + 1) }; }
  function badgeCheck(u) { return A.checkBadges(u.S, { mocks: u.mocksIndex, writings: u.writings.length, friends: u.friends.length }); }
  function afterChange(u, cols) { mark(...cols); const fresh = badgeCheck(u); if (fresh.length) mark('badges'); return fresh; }
  function servedQ(id) { const q = served.get(id); if (!q) throw new HttpError(404, 'Question expired. Load a new set.'); return q; }
  function questionContext(ctx) { if (!ctx) return null; let q = null; if (ctx.servedId && served.has(ctx.servedId)) q = served.get(ctx.servedId); else if (ctx.questionId && C.byId.get(ctx.questionId)) q = C.byId.get(ctx.questionId); else if (ctx.reviewKey && U.S.reviews[ctx.reviewKey]) { const p = U.S.reviews[ctx.reviewKey].payload; q = p.full || C.byId.get(p.id) || null; } if (!q) return null; return { q, passage: q.passageId ? C.passageById.get(q.passageId) : null, answered: Boolean(ctx.answered || q.answered), choice: Number.isInteger(ctx.choice) ? ctx.choice : Number.isInteger(q.choice) ? q.choice : null }; }

  const routes = [];
  const route = (method, pattern, handler) => routes.push({ method, re: new RegExp('^' + pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '/?$'), handler });

  route('POST', '/api/register', async ({ body }) => { await store.signUp(body); U = null; return publicUser(await requireUser()); });
  route('POST', '/api/login', async ({ body }) => { await store.signIn(body); U = null; return publicUser(await requireUser()); });
  route('POST', '/api/logout', async () => { await flush(); stopSync(); await store.signOut(); U = null; viewCache.clear(); return { ok: true }; });
  route('POST', '/api/logout-all', async () => { await flush(); stopSync(); await store.signOutAll(); U = null; return { ok: true }; });
  route('GET', '/api/sessions', async () => ({ count: await store.sessionsCount() }));
  route('GET', '/api/me', async () => { try { return { user: publicUser(await requireUser()) }; } catch { return { user: null }; } });
  route('PATCH', '/api/me', async ({ body }) => {
    const u = await requireUser(); const p = u.profile; const targetTest = C.TESTS[body.targetTest] ? body.targetTest : p.targetTest;
    if (targetTest !== p.targetTest) A.activateCourse(u.S, targetTest);
    const c = A.course(u.S, targetTest);
    if (body.variant !== undefined && C.TESTS[targetTest].variants[body.variant]) { c.variant = body.variant; p.variant = body.variant; }
    if (body.testDate !== undefined) { c.testDate = body.testDate || null; p.testDate = c.testDate; }
    if (body.goalPercentile !== undefined) c.goalPercentile = Math.max(50, Math.min(99, Number(body.goalPercentile) || 99));
    if (body.displayName) p.displayName = String(body.displayName).trim().slice(0, 40) || p.displayName; if (body.grade !== undefined) p.grade = body.grade ? Number(body.grade) : null; if (body.dailyGoal) p.dailyGoal = Math.max(5, Math.min(200, Number(body.dailyGoal) || p.dailyGoal)); if (body.tutorName !== undefined) p.tutorName = String(body.tutorName || '').trim().slice(0, 30) || null;
    if (body.newPassword) await store.changePassword(String(body.newPassword));
    profileDirty = true; publicDirty = true; mark('courses'); return publicUser(u);
  });
  route('POST', '/api/family/link', async ({ body }) => { const u = await requireUser(); const s = await store.linkStudent(body.code); if (!u.students.includes(s.id)) u.students.push(s.id); return { ok: true, student: { id: s.id, displayName: s.display_name, username: s.username } }; });
  route('GET', '/api/family/students', async () => { const u = await requireUser(); const list = await store.profilesOf(u.students); return { students: list }; });
  route('DELETE', '/api/family/link/:id', async ({ params }) => { const u = await requireUser(); await store.unlinkStudent(u.uid, params.id); u.students = u.students.filter(x => x !== params.id); viewCache.delete(params.id); return { ok: true }; });
  route('GET', '/api/content/overview', async () => ({ tests: C.TESTS, skillNames: C.SKILL_NAMES, sectionSkills: C.SECTION_SKILLS, tiers: C.TIERS, counts: { questions: C.questions.length, passages: C.passages.length, vocab: C.vocab.length, lessons: C.lessons.length, prompts: C.writingPrompts.length }, mode: store.mode }));
  route('GET', '/api/lessons', async ({ query }) => { const u = await viewTarget(query); const test = C.TESTS[query.test] ? query.test : u.profile.targetTest; const lessons = C.lessons.filter(l => l.test === test || l.test === 'all').map(l => ({ id: l.id, test: l.test, section: l.section, skill: l.skill, skillName: C.SKILL_NAMES[l.skill], title: l.title, minutes: l.minutes, level: l.level, objectives: l.objectives, progress: u.S.lessons[l.id] || null })); const R = u.S.ratings[test] || {}; const focus = A.focusStatus(u.S); const recommended = []; const seen = new Set(); const push = (l, why) => { if (l && !seen.has(l.id) && !(l.progress && l.progress.status === 'completed')) { seen.add(l.id); recommended.push({ ...l, why }); } }; if (focus) for (const f of focus.skills) push(lessons.find(l => l.skill === f.skill), `Focus skill: ${f.name} is at ${f.now}%, target ${f.target}%.`); for (const [skill, r] of Object.entries(R).filter(([, r]) => r.n >= 2).sort((a, b) => a[1].rating - b[1].rating)) { if (recommended.length >= 5) break; push(lessons.find(l => l.skill === skill), `${C.SKILL_NAMES[skill]} is one of your weaker skills (${A.mastery(r.rating)}%).`); } if (u.S.plan) { const day = u.S.plan.days.find(d => d.date === A.todayKey()); if (day) for (const it of day.items.filter(i => i.type === 'lesson' && !i.done)) push(lessons.find(l => l.id === it.ref), "On today's plan."); } return { lessons, recommended: recommended.slice(0, 5) }; });
  route('GET', '/api/lessons/:id', async ({ params }) => { await requireUser(); const l = C.lessonById.get(params.id); if (!l) throw new HttpError(404, 'Lesson not found'); return { ...l, blocks: l.blocks.map(b => b.type === 'check' ? { ...b, questions: b.questions.map(stripAnswer) } : b.type === 'faded' ? { ...b, question: stripAnswer(b.question) } : b) }; });
  route('POST', '/api/lessons/:id/start', async ({ params }) => { const u = await requireUser(); if (!u.S.lessons[params.id]) { u.S.lessons[params.id] = { status: 'started' }; mark('lessons'); } return { ok: true }; });
  route('POST', '/api/lessons/:id/check', async ({ params, body }) => {
    const u = await requireUser(); const l = C.lessonById.get(params.id); if (!l) throw new HttpError(404, 'Lesson not found');
    const checks = []; for (const b of l.blocks) { if (b.type === 'faded') checks.push(b.question); if (b.type === 'check') checks.push(...b.questions); }
    const answers = Array.isArray(body.answers) ? body.answers : [];
    const results = checks.map((q, i) => { const choice = Number.isInteger(answers[i]) ? answers[i] : null; const skill = l.skill === 'strategy' || l.skill === 'writing' ? (C.SECTION_SKILLS[u.profile.targetTest][l.section] || ['strategy'])[0] : l.skill; const r = A.recordAttempt(u.S, { id: `${l.id}#${i}`, test: l.test, section: l.section, skill, level: l.level, ...q }, choice, { mode: 'lesson', test: l.test === 'all' ? u.profile.targetTest : l.test }); return { correct: r.correct, answer: q.answer, explanation: q.explanation, choice }; });
    const score = results.length ? results.filter(r => r.correct).length / results.length : 1; u.S.lessons[l.id] = { status: 'completed', score, completedAt: nowIso() };
    if (u.S.plan) { const day = u.S.plan.days.find(d => d.date === A.todayKey()); if (day) { const it = day.items.find(i => i.type === 'lesson' && i.ref === l.id && !i.done); if (it) { it.done = true; mark('courses'); } } }
    return { results, score, newBadges: afterChange(u, ['lessons', 'ratings', 'daily', 'totals', 'seen', 'reviews']) };
  });
  route('GET', '/api/practice/next', async ({ query }) => {
    const u = await requireUser(); const count = Math.max(1, Math.min(30, Number(query.count) || 10)); const diagnostic = query.mode === 'diagnostic';
    const batch = diagnostic ? A.diagnosticBatch(u.S) : A.practiceBatch(u.S, { test: query.test || u.profile.targetTest, section: query.section || undefined, skill: query.skill || undefined, count, level: query.level ? Number(query.level) : undefined });
    const tt = query.test || u.profile.targetTest; return { questions: batch.map(q => { const sid = Math.random().toString(36).slice(2, 12); served.set(sid, { ...q, hints: 0, mode: diagnostic ? 'diagnostic' : 'practice' }); return { ...stripAnswer(q), servedId: sid, targetSeconds: A.targetSeconds(tt, q.section) }; }) };
  });
  route('GET', '/api/practice/hint', async ({ query }) => { await requireUser(); const q = servedQ(query.servedId); const level = Math.max(1, Math.min(3, (q.hints || 0) + 1)); q.hints = level; return { ...A.hintFor(q, level), hintsUsed: level }; });
  route('POST', '/api/practice/answer', async ({ body }) => {
    const u = await requireUser(); const q = servedQ(body.servedId); if (q.answered) throw new HttpError(400, 'Already answered.');
    const choice = Number.isInteger(body.choice) ? body.choice : null; const r = A.recordAttempt(u.S, q, choice, { seconds: Number(body.seconds) || 0, confidence: Number(body.confidence) || null, mode: q.mode, test: body.test && C.TESTS[body.test] ? body.test : undefined, hints: q.hints || 0 });
    q.answered = true; q.choice = choice;
    return { correct: r.correct, answer: q.answer, explanation: q.explanation, rating: { delta: Math.round(r.rating.delta), after: Math.round(r.rating.after), mastery: A.mastery(r.rating.after) }, skill: q.skill, skillName: C.SKILL_NAMES[q.skill], xpGain: r.xpGain, newBadges: afterChange(u, ['ratings', 'daily', 'totals', 'seen', 'reviews']) };
  });
  route('POST', '/api/diagnostic/complete', async () => {
    const u = await requireUser(); const c = A.course(u.S); c.diagnosticDone = true; u.profile.diagnosticDone = true;
    const days = u.profile.testDate ? Math.ceil((new Date(u.profile.testDate) - Date.now()) / 864e5) : null; u.profile.dailyGoal = days !== null && days <= 14 ? 40 : days !== null && days <= 42 ? 30 : 20;
    const R = u.S.ratings[u.profile.targetTest] || {}; const verbal = ['synonyms', 'sentence-completion', 'analogies', 'antonyms'].map(k => R[k]).filter(Boolean); c.vocabLevel = verbal.length ? Math.max(1, Math.min(5, Math.round(verbal.reduce((a, r) => a + A.targetLevel(r.rating), 0) / verbal.length))) : Math.round(C.VARIANT_LEVEL[`${u.profile.targetTest}:${u.profile.variant}`] || 3);
    c.focus = A.buildFocus(u.S); setPlan(u, A.buildPlan(u.S)); profileDirty = true;
    return { plan: u.S.plan, progress: A.progressSummary(u.S, u.mocksIndex), focus: A.focusStatus(u.S), profile: A.learnerProfile(u.S, u.mocksIndex), projection: A.scoreProjection(u.S, u.mocksIndex), newBadges: afterChange(u, ['badges', 'courses']) };
  });
  route('GET', '/api/plan', async ({ query }) => { const u = await viewTarget(query); return { plan: u.S.plan, today: A.todayKey() }; });
  route('POST', '/api/plan/generate', async () => { const u = await requireUser(); setPlan(u, A.buildPlan(u.S)); return { plan: u.S.plan, today: A.todayKey() }; });
  route('POST', '/api/plan/done', async ({ body }) => { const u = await requireUser(); A.markDone(u.S, String(body.date || A.todayKey()), Number.isInteger(body.index) ? body.index : null, body.type || null); mark('courses'); return { plan: u.S.plan }; });
  route('GET', '/api/session/today', async () => {
    const u = await requireUser(); if (!u.S.plan) setPlan(u, A.buildPlan(u.S)); const today = A.todayKey(); let day = u.S.plan.days.find(d => d.date === today); if (!day) { setPlan(u, A.buildPlan(u.S)); day = u.S.plan.days.find(d => d.date === today) || u.S.plan.days[0]; }
    const p = A.progressSummary(u.S, u.mocksIndex); if (day.items.every(i => i.done || i.type === 'rest') && p.minutesLeft > 0 && !day.items.some(i => i.type === 'rest')) { if (A.extendDay(u.S, day, p.minutesLeft)) mark('courses'); } const done = day.items.filter(i => i.done).length; const minutes = day.items.reduce((a, i) => a + (i.minutes || 0), 0); const weak = p.skills.filter(s => s.n >= 2).sort((a, b) => a.mastery - b.mastery)[0]; const daysLeft = u.S.plan.testDate ? Math.ceil((new Date(u.S.plan.testDate) - Date.now()) / 864e5) : null;
    const dayIndex = u.S.plan.days.findIndex(x => x.date === day.date); const sprint = u.S.plan.sprint ? { day: dayIndex + 1, of: u.S.plan.horizonDays } : null; const proj = A.scoreProjection(u.S, u.mocksIndex); const goalLine = sprint ? `Day ${sprint.day} of ${sprint.of} in your sprint to the ${proj.goal}th percentile${proj.overall !== null ? `; you are projecting about the ${proj.overall}th` : ''}. ` : '';
    const allDone = day.items.every(i => i.done || i.type === 'rest'); const narration = !u.profile.diagnosticDone ? `Welcome, ${u.profile.displayName}. Before anything else, I want to see how you think. The diagnostic is twenty questions across every section; there is no score to worry about. It tells me where to start.` : allDone && p.minutesLeft > 0 ? `Steps done, but the day is not: ${p.todayMinutes} of 60 minutes so far. Sixty is the minimum; I have added work below to cover the last ${p.minutesLeft}.` : allDone ? `That is everything for today, ${u.profile.displayName}: ${p.todayMinutes} minutes, minimum met. ${p.streak} day${p.streak === 1 ? '' : 's'} in a row at 60 or more. Rest is part of the plan; I will see you tomorrow.` : `${goalLine}${p.streak >= 3 ? `Day ${p.streak} in a row. ` : ''}Today is about ${minutes} minutes${daysLeft ? `, with ${daysLeft} days to the test` : ''}. ${weak ? `We are chasing ${weak.name}; it is sitting at ${weak.mastery}% and it is where your next points are.` : 'Your plan starts broad and narrows as I learn what you need.'} ${p.due ? `Start with the ${p.due} review items; they are timed to land before you forget.` : 'Begin with the first step below.'}`;
    return { date: day.date, sprint, projected: proj.overall, goal: proj.goal, phase: day.phase || null, phaseDesc: day.phase && u.S.plan.phases ? u.S.plan.phases[day.phase] : null, items: day.items, done, total: day.items.length, minutes, todayMinutes: p.todayMinutes, minutesLeft: p.minutesLeft, dailyMinimum: p.dailyMinimum, complete: allDone && p.minutesLeft === 0, narration, tutorName: A.tutorName(u.S), streak: p.streak, due: p.due, daysLeft, diagnosticDone: Boolean(u.profile.diagnosticDone), focus: A.focusStatus(u.S), course: C.TESTS[u.profile.targetTest].name };
  });
  // ---- mocks ----
  function mockState(m) { const bp = m.blueprint; const sec = bp.sections[m.section_index]; const startedMs = m.section_started_at ? new Date(m.section_started_at).getTime() : Date.now(); const secTotal = sec.seconds || Math.round(sec.minutes * 60); const remaining = Math.max(0, secTotal - Math.floor((Date.now() - startedMs) / 1000)); const resp = m.responses || {}; return { id: m.id, test: m.test, variant: m.variant, tier: m.tier, length: m.length, status: m.status, realism: !!bp.realism, sectionIndex: m.section_index, sectionCount: bp.sections.length, sections: bp.sections.map(s => ({ section: s.section, label: s.label, minutes: s.minutes, count: s.writing ? 1 : s.questions.length, writing: !!s.writing, break: !!s.break, experimental: !!s.experimental })), current: m.status === 'in_progress' ? { section: sec.section, label: sec.label, minutes: sec.minutes, seconds: secTotal, spq: sec.spq || null, writing: !!sec.writing, break: !!sec.break, breakNote: sec.note || null, experimental: !!sec.experimental, prompt: sec.prompt || null, promptAlt: sec.promptAlt || null, promptPick: (m.responses || {})[`p:${sec.section}`] || null, remaining, questions: sec.writing ? [] : sec.questions.map(stripAnswer), passages: sec.passages || {}, responses: Object.fromEntries(Object.entries(resp).filter(([k]) => sec.writing ? k === `w:${sec.section}` : sec.questions.some(q => q.id === k))) } : null }; }
  const mockIndexEntry = (m) => ({ id: m.id, test: m.test, variant: m.variant, tier: m.tier, length: m.length, status: m.status, section_index: m.section_index, started_at: m.started_at, completed_at: m.completed_at, results: m.results ? { pct: m.results.pct, percentile: m.results.percentile, totalRight: m.results.totalRight, totalCount: m.results.totalCount, sections: m.results.sections.map(s => ({ label: s.label, pct: s.pct, percentile: s.percentile, right: s.right, count: s.count, writing: s.writing })) } : null });
  route('GET', '/api/mock/options', async ({ query }) => { const u = await requireUser(); const test = C.TESTS[query.test] ? query.test : u.profile.targetTest; const inProgress = u.mocksIndex.find(m => m.status === 'in_progress') || null; return { test, variants: C.TESTS[test].variants, tiers: C.TIERS, recommended: A.recommendTier(u.S, test), blueprint: C.BLUEPRINTS[test], miniPreview: Object.fromEntries(Object.keys(C.TESTS[test].variants).map(v => [v, A.miniPlan(test, v)])), inProgress }; });
  route('POST', '/api/mock/start', async ({ body }) => {
    const u = await requireUser(); const test = C.TESTS[body.test] ? body.test : u.profile.targetTest; const variant = C.BLUEPRINTS[test][body.variant] ? body.variant : u.profile.variant; const tier = C.TIERS[body.tier] ? body.tier : A.recommendTier(u.S, test).tier; const length = ['full', 'half', 'section', 'mini'].includes(body.length) ? body.length : 'full';
    const mock = A.buildMock(u.S, { test, variant, tier, length: length === 'section' ? 'full' : length, section: length === 'section' ? body.section : undefined }); mock.length = length; mock.realism = !!body.realism; if (!mock.sections.length) throw new HttpError(400, 'No sections to build.');
    for (const m of u.mocksIndex.filter(m => m.status === 'in_progress')) { await store.mockUpdate(u.uid, m.id, { status: 'abandoned' }); m.status = 'abandoned'; }
    const row = { test, variant, tier, length, status: 'in_progress', blueprint: mock, responses: {}, section_index: 0, section_started_at: nowIso() }; const id = await store.mockInsert(u.uid, row);
    u.mocksIndex.unshift(mockIndexEntry({ id, ...row, started_at: nowIso() })); return { id };
  });
  async function loadMock(u, id) { const m = await store.mockGet(u.uid, id); return m; }
  route('GET', '/api/mock/:id', async ({ params }) => { const u = await requireUser(); const m = await loadMock(u, params.id); if (m.status !== 'in_progress') return { id: m.id, status: m.status }; return mockState(m); });
  route('POST', '/api/mock/:id/answer', async ({ params, body }) => { const u = await requireUser(); const m = await loadMock(u, params.id); if (m.status !== 'in_progress') throw new HttpError(400, 'Test is not in progress'); const sec = m.blueprint.sections[m.section_index]; const resp = m.responses || {}; for (const [k, v] of Object.entries(body.responses || {})) { if (sec.writing) { if (k === `w:${sec.section}`) resp[k] = String(v).slice(0, 20000); if (k === `p:${sec.section}` && ['main', 'alt'].includes(v)) resp[k] = v; continue; } if (sec.questions.some(q => q.id === k)) { if (v === null) delete resp[k]; else if (Number.isInteger(v)) resp[k] = v; } } await store.mockUpdate(u.uid, m.id, { responses: resp }); return { ok: true }; });
  async function finishMock(u, m) {
    const results = A.scoreMock(m.blueprint, m.responses || {});
    for (const sec of m.blueprint.sections) { if (sec.writing || sec.break || sec.experimental) continue; for (const q of sec.questions) { const choice = Number.isInteger((m.responses || {})[q.id]) ? m.responses[q.id] : null; A.recordAttempt(u.S, q, choice, { mode: 'mock', test: m.test }); } }
    const w = m.blueprint.sections.find(s => s.writing); if (w && (m.responses || {})[`w:${w.section}`]) { const text = m.responses[`w:${w.section}`]; const chosen = (m.responses[`p:${w.section}`] === 'alt' && w.promptAlt) ? w.promptAlt : w.prompt; const id = await store.writingInsert(u.uid, { prompt_id: (chosen && chosen.id) || 'mock', text, word_count: text.trim().split(/\s+/).filter(Boolean).length, minutes: w.minutes, self_scores: null }); u.writings.unshift({ id, promptId: (w.prompt && w.prompt.id) || 'mock', text, wordCount: text.trim().split(/\s+/).filter(Boolean).length, minutes: w.minutes, createdAt: nowIso() }); }
    const patch = { status: 'completed', results, completed_at: nowIso() }; await store.mockUpdate(u.uid, m.id, patch); Object.assign(m, patch);
    const idx = u.mocksIndex.find(x => x.id === m.id); if (idx) Object.assign(idx, mockIndexEntry(m)); else u.mocksIndex.unshift(mockIndexEntry(m));
    A.markDone(u.S, A.todayKey(), null, m.length === 'mini' ? 'mini' : 'mock'); mark('courses');
    return { id: m.id, status: 'completed', results, newBadges: afterChange(u, ['ratings', 'daily', 'totals', 'seen', 'reviews']) };
  }
  route('POST', '/api/mock/:id/next', async ({ params }) => { const u = await requireUser(); const m = await loadMock(u, params.id); if (m.status !== 'in_progress') throw new HttpError(400, 'Test is not in progress'); if (m.section_index + 1 >= m.blueprint.sections.length) return finishMock(u, m); const patch = { section_index: m.section_index + 1, section_started_at: nowIso() }; await store.mockUpdate(u.uid, m.id, patch); Object.assign(m, patch); return mockState(m); });
  route('POST', '/api/mock/:id/submit', async ({ params }) => { const u = await requireUser(); const m = await loadMock(u, params.id); if (m.status !== 'in_progress') throw new HttpError(400, 'Already submitted'); return finishMock(u, m); });
  route('POST', '/api/mock/:id/abandon', async ({ params }) => { const u = await requireUser(); await store.mockUpdate(u.uid, params.id, { status: 'abandoned' }); const idx = u.mocksIndex.find(x => String(x.id) === String(params.id)); if (idx) idx.status = 'abandoned'; return { ok: true }; });
  route('GET', '/api/mock/:id/results', async ({ params, query }) => { const u = await viewTarget(query); const m = await store.mockGet(u.uid, params.id); if (!m.results) throw new HttpError(404, 'Results not found'); return { id: m.id, test: m.test, variant: m.variant, tier: m.tier, length: m.length, startedAt: m.started_at, completedAt: m.completed_at, results: m.results }; });
  route('GET', '/api/mocks', async ({ query }) => { const u = await viewTarget(query); return { mocks: u.mocksIndex }; });
  // ---- review ----
  route('GET', '/api/review/due', async ({ query }) => { const u = await requireUser(); const limit = Math.min(50, Number(query.limit) || 20); const now = Date.now(); const due = Object.entries(u.S.reviews).filter(([, r]) => new Date(r.due).getTime() <= now).sort((a, b) => new Date(a[1].due) - new Date(b[1].due)).slice(0, limit); const items = due.map(([key, r]) => { if (r.kind === 'vocab') return { key, kind: 'vocab', vocab: r.payload, reps: r.reps }; const q = r.payload.full || C.byId.get(r.payload.id); if (!q) return null; return { key, kind: 'question', question: stripAnswer(q), passage: q.passageId ? C.passageById.get(q.passageId) : null, reps: r.reps }; }).filter(Boolean); const all = Object.values(u.S.reviews); return { items, counts: { due: all.filter(r => new Date(r.due).getTime() <= now).length, total: all.length, vocab: all.filter(r => r.kind === 'vocab').length } }; });
  route('POST', '/api/review/grade', async ({ body }) => { const u = await requireUser(); const r = u.S.reviews[body.key]; if (!r) throw new HttpError(404, 'Item not found'); let quality = Math.max(0, Math.min(5, Number(body.quality))); let feedback = null; if (r.kind === 'question') { const q = r.payload.full || C.byId.get(r.payload.id); const choice = Number.isInteger(body.choice) ? body.choice : null; const correct = q && choice === q.answer; quality = correct ? (Number.isInteger(body.quality) ? Math.max(3, quality) : 4) : 1; if (q) { A.recordAttempt(u.S, q, choice, { mode: 'review', seconds: Number(body.seconds) || 0 }); feedback = { correct, answer: q.answer, explanation: q.explanation }; } } Object.assign(r, A.sm2(r, quality)); return { ok: true, next: { interval_days: r.interval }, feedback, newBadges: afterChange(u, ['reviews', 'ratings', 'daily', 'totals', 'seen']) }; });
  route('GET', '/api/vocab', async ({ query }) => { const u = await requireUser(); const level = query.level ? Number(query.level) : null; const inDeck = new Set(Object.keys(u.S.reviews).filter(k => k.startsWith('v:')).map(k => k.slice(2))); return { words: C.vocab.filter(v => !level || v.level === level).map(v => ({ ...v, inDeck: inDeck.has(v.word) })), levels: [1, 2, 3, 4, 5].map(l => ({ level: l, count: C.vocab.filter(v => v.level === l).length, added: C.vocab.filter(v => v.level === l && inDeck.has(v.word)).length })) }; });
  route('POST', '/api/vocab/add', async ({ body }) => { const u = await requireUser(); let words = []; if (Array.isArray(body.words)) words = C.vocab.filter(v => body.words.includes(v.word)); else if (body.level) words = C.vocab.filter(v => v.level === Number(body.level)); if (body.limit) words = words.filter(v => !u.S.reviews[`v:${v.word}`]).slice(0, Number(body.limit)); let added = 0; for (const v of words) if (!u.S.reviews[`v:${v.word}`]) { u.S.reviews[`v:${v.word}`] = { kind: 'vocab', payload: v, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: nowIso(), created: nowIso() }; added++; } if (added) mark('reviews'); return { added }; });
  // ---- writing ----
  route('GET', '/api/writing/prompts', async ({ query }) => { const u = await requireUser(); const test = C.TESTS[query.test] ? query.test : u.profile.targetTest; return { prompts: C.writingPrompts.filter(p => p.test === test || query.all === '1') }; });
  route('POST', '/api/writing/submit', async ({ body }) => {
    const u = await requireUser(); const text = String(body.text || '').slice(0, 20000); if (text.trim().length < 20) throw new HttpError(400, 'Write at least a few sentences first.');
    const wc = text.trim().split(/\s+/).filter(Boolean).length; const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean); const avgLen = sentences.length ? wc / sentences.length : 0; const paras = text.split(/\n\s*\n/).filter(p => p.trim()).length; const longWords = text.split(/\s+/).filter(w => w.replace(/[^a-z]/gi, '').length >= 8).length; const weak = (text.match(/\b(very|really|thing|things|stuff|a lot|good|bad|nice|got|get)\b/gi) || []).length;
    const tips = []; if (wc < 150) tips.push('Aim for 250–400 words. Graders reward developed ideas; add a specific example or a second reason.'); if (paras < 3) tips.push('Use at least 3–4 paragraphs: an opening that answers the prompt, one or two body paragraphs each with a concrete example, and a short close.'); if (avgLen > 25) tips.push(`Your sentences average ${Math.round(avgLen)} words. Break a few long ones up for clarity.`); if (avgLen && avgLen < 10) tips.push(`Your sentences average ${Math.round(avgLen)} words. Combine some short ones with because / although / which to show control.`); if (weak > 3) tips.push(`You used vague words (very, really, thing, good, got) ${weak} times. Replace each with a precise word or a specific detail.`); if (longWords / Math.max(1, wc) < 0.06) tips.push('Work in a few precise, mature vocabulary words you fully control. Precision beats length.'); if (!tips.length) tips.push('Strong structure and control. Now sharpen the opening: start with a specific image, moment, or claim rather than restating the prompt.');
    const id = await store.writingInsert(u.uid, { prompt_id: String(body.promptId || 'custom'), text, word_count: wc, minutes: Number(body.minutes) || null, self_scores: body.selfScores || null }); u.writings.unshift({ id, promptId: String(body.promptId || 'custom'), text, wordCount: wc, minutes: Number(body.minutes) || null, selfScores: body.selfScores || null, createdAt: nowIso() });
    let ai = null; try { const st = await store.tutorStatus(); if (st && st.live) { const promptObj = C.writingPrompts.find(p => p.id === body.promptId); ai = (await store.tutorChat({ mode: 'essay', prompt: promptObj ? promptObj.prompt : 'Open prompt', text, grade: u.profile.grade, test: u.profile.targetTest, tutorName: A.tutorName(u.S) })).feedback || null; } } catch (e) { console.warn('essay ai', e.message); }
    A.markDone(u.S, A.todayKey(), null, 'writing'); mark('courses');
    return { id, wordCount: wc, sentences: sentences.length, paragraphs: paras, avgSentenceLength: Math.round(avgLen * 10) / 10, tips, ai, newBadges: afterChange(u, []) };
  });
  route('GET', '/api/writing/mine', async ({ query }) => { const u = await viewTarget(query); return { submissions: u.writings }; });
  // ---- progress & gamification ----
  route('GET', '/api/progress', async ({ query }) => { const u = await viewTarget(query); return { user: publicUser(u), ...A.progressSummary(u.S, u.mocksIndex) }; });
  route('GET', '/api/gamification', async ({ query }) => { const u = await viewTarget(query); const xp = A.xpFor(u.S); const level = A.levelFor(xp); return { xp, level, levelXp: A.xpForLevel(level), nextLevelXp: A.xpForLevel(level + 1), weekXp: A.xpSince(u.S, 7), badges: A.badgeList(u.S), newBadges: u === U ? afterChange(u, []) : [] }; });
  route('GET', '/api/friends', async () => { const u = await requireUser(); const profiles = await store.profilesOf(u.friends); const mine = A.publicStats(u.S); const rows = [{ id: u.uid, displayName: u.profile.displayName, username: u.profile.username, test: u.profile.targetTest, me: true, weekQuestions: mine.week_questions, weekAccuracy: mine.week_accuracy, weekXp: mine.week_xp, xp: mine.xp, level: mine.level, streak: mine.streak, badges: mine.badges }, ...profiles.map(p => { const s = p.stats || {}; return { id: p.id, displayName: p.displayName, username: p.username, test: p.targetTest || s.test, me: false, weekQuestions: s.week_questions || 0, weekAccuracy: s.week_accuracy === undefined ? null : s.week_accuracy, weekXp: s.week_xp || 0, xp: s.xp || 0, level: s.level || 1, streak: s.streak || 0, badges: s.badges || 0 }; })].sort((a, b) => b.weekXp - a.weekXp); return { friends: profiles.map(p => ({ id: p.id, displayName: p.displayName, username: p.username, targetTest: p.targetTest })), leaderboard: rows }; });
  route('POST', '/api/friends/add', async ({ body }) => { const u = await requireUser(); const f = await store.addFriend(body.code); if (!u.friends.includes(f.id)) u.friends.push(f.id); return { ok: true, friend: { id: f.id, displayName: f.display_name, username: f.username }, newBadges: afterChange(u, []) }; });
  route('DELETE', '/api/friends/:id', async ({ params }) => { const u = await requireUser(); await store.removeFriend(u.uid, params.id); u.friends = u.friends.filter(x => x !== params.id); return { ok: true }; });
  // ---- tutor ----
  route('GET', '/api/tutor/status', async () => { await requireUser(); const s = await store.tutorStatus(); return { live: !!s.live, model: s.model || 'claude-opus-5-5', note: s.note || (s.live ? 'Live AI tutor active.' : 'Built-in tutor active.'), hasKey: !!s.hasKey }; });
  route('GET', '/api/tutor/history', async () => { const u = await requireUser(); return { messages: u.S.tutor.slice(-40) }; });
  route('DELETE', '/api/tutor/history', async () => { const u = await requireUser(); u.S.tutor = []; mark('tutor'); return { ok: true }; });
  route('POST', '/api/tutor/chat', async ({ body }) => {
    const u = await requireUser(); const message = String(body.message || '').trim().slice(0, 4000); if (!message) throw new HttpError(400, 'Say something first.'); const ctx = body.context || {}; const qc = questionContext(ctx); const p = A.progressSummary(u.S, u.mocksIndex);
    let out = null; let note = null;
    try { const st = await store.tutorStatus(); if (st && st.live) { const r = await store.tutorChat({ mode: 'chat', system: A.tutorSystemPrompt(u.S, p, qc), messages: [...u.S.tutor.slice(-12).map(m => ({ role: m.role, content: m.content })), { role: 'user', content: message }] }); out = { reply: r.reply, source: 'ai' }; } } catch (e) { note = e.message; }
    if (!out) { out = { ...A.builtinReply(u.S, message, ctx, qc, p), source: 'builtin' }; if (note) out.note = note; }
    if (out.hint && ctx.servedId && served.has(ctx.servedId)) { const q = served.get(ctx.servedId); q.hints = Math.max(q.hints || 0, out.hint.level); }
    u.S.tutor.push({ role: 'user', content: message, at: nowIso() }, { role: 'assistant', content: out.reply, at: nowIso() }); if (u.S.tutor.length > 60) u.S.tutor = u.S.tutor.slice(-60); mark('tutor'); return out;
  });
  route('POST', '/api/admin/tutor-config', async ({ body }) => { const u = await requireUser(); if (u.profile.role !== 'admin') throw new HttpError(403, 'Admins only'); if (body.apiKey && !/^sk-ant-/.test(String(body.apiKey).trim())) throw new HttpError(400, 'That does not look like an Anthropic API key (it should start with sk-ant-).'); return store.setTutorConfig(body.apiKey === undefined ? undefined : String(body.apiKey).trim(), body.model); });
  route('GET', '/api/admin/users', async () => { const u = await requireUser(); if (u.profile.role !== 'admin') throw new HttpError(403, 'Admins only'); return { users: await store.adminUsers() }; });

  // ---- flashcards, vocabulary trainer, math trainer ----
  const TR = window.AscendTrainer;
  route('GET', '/api/flash/decks', async () => { const u = await requireUser(); return TR.deckList(u.S); });
  route('GET', '/api/flash/study', async ({ query }) => { const u = await requireUser(); return { cards: TR.studySet(u.S, String(query.deck || 'vocab:2'), { count: Math.min(60, Number(query.count) || 20), mode: query.mode || 'smart' }) }; });
  route('POST', '/api/flash/grade', async ({ body }) => { const u = await requireUser(); const card = body.card; if (!card || !card.key) throw new HttpError(400, 'Missing card'); const r = TR.gradeCard(u.S, card, Math.max(0, Math.min(5, Number(body.quality)))); return { ok: true, next: { interval_days: r.interval }, newBadges: afterChange(u, ['reviews', 'training', 'daily', 'totals']) }; });
  route('POST', '/api/cards/deck', async ({ body }) => { const u = await requireUser(); const d = TR.createDeck(u.S, body.name); mark('cards'); return d; });
  route('DELETE', '/api/cards/deck/:id', async ({ params }) => { const u = await requireUser(); TR.deleteDeck(u.S, params.id); mark('cards', 'reviews'); return { ok: true }; });
  route('POST', '/api/cards', async ({ body }) => { const u = await requireUser(); const list = Array.isArray(body.cards) ? body.cards : body.text ? TR.parseCardText(body.text) : [{ front: body.front, back: body.back }]; const n = TR.addCards(u.S, String(body.deck || ''), list); mark('cards'); return { added: n }; });
  route('DELETE', '/api/cards/:id', async ({ params }) => { const u = await requireUser(); TR.deleteCard(u.S, params.id); mark('cards', 'reviews'); return { ok: true }; });
  route('GET', '/api/cards/deck/:id', async ({ params }) => { const u = await requireUser(); const cards = u.S.cards && u.S.cards.items ? Object.entries(u.S.cards.items).filter(([, c]) => c.deck === params.id).map(([id, c]) => ({ id, ...c })) : []; const deck = u.S.cards && u.S.cards.decks ? u.S.cards.decks[params.id] : null; if (!deck) throw new HttpError(404, 'Deck not found'); return { deck: { id: params.id, ...deck }, cards }; });
  route('GET', '/api/vocab/stats', async () => { const u = await requireUser(); return TR.vocabStats(u.S); });
  route('GET', '/api/vocab/quiz', async ({ query }) => { const u = await requireUser(); const count = Math.min(30, Number(query.count) || 10); const items = query.source === 'roots' ? TR.rootQuiz(u.S, count) : TR.vocabQuiz(u.S, { level: query.level ? Number(query.level) : null, source: query.source || null, count, types: query.types ? String(query.types).split(',') : null }); return { items: items.map(it => { const sid = Math.random().toString(36).slice(2, 12); served.set(sid, { ...it, quiz: true }); const { answer, explanation, ...rest } = it; return { ...rest, servedId: sid }; }) }; });
  route('POST', '/api/vocab/answer', async ({ body }) => { const u = await requireUser(); const q = servedQ(body.servedId); if (q.answered) throw new HttpError(400, 'Already answered.'); let correct; if (q.input) correct = String(body.text || '').trim().toLowerCase() === String(q.answer).toLowerCase(); else correct = Number.isInteger(body.choice) && body.choice === q.answer; q.answered = true; const xp = correct ? 5 + (q.level || 3) : 1; if (!q.type.startsWith('root')) TR.recordVocab(u.S, q.word, correct); TR.recordLight(u.S, correct, xp, Number(body.seconds) || 0); if (!correct && !q.type.startsWith('root')) { const v = C.vocab.find(x => x.word === q.word); if (v && !u.S.reviews[`v:${v.word}`]) u.S.reviews[`v:${v.word}`] = { kind: 'vocab', payload: v, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: nowIso(), created: nowIso() }; } return { correct, answer: q.answer, explanation: q.explanation, xpGain: xp, newBadges: afterChange(u, ['training', 'daily', 'totals', 'reviews']) }; });
  route('GET', '/api/math/overview', async () => { const u = await requireUser(); return TR.mathOverview(u.S); });
  route('GET', '/api/math/sprint', async ({ query }) => { await requireUser(); return { items: TR.sprintSet(Number(query.level) || 2, 80) }; });
  route('POST', '/api/math/sprint', async ({ body }) => { const u = await requireUser(); const r = TR.recordSprint(u.S, body); return { ...r, newBadges: afterChange(u, ['training', 'daily', 'totals']) }; });

  // ---- courses, tailoring, mistakes, report ----
  route('GET', '/api/courses', async () => { const u = await requireUser(); return { active: u.profile.targetTest, courses: publicUser(u).courses, available: Object.entries(C.TESTS).map(([k, t]) => ({ test: k, name: t.name, fullName: t.fullName, variants: t.variants, enrolled: !!(u.S.courses || {})[k] })) }; });
  route('POST', '/api/courses/add', async ({ body }) => { const u = await requireUser(); const test = C.TESTS[body.test] ? body.test : null; if (!test) throw new HttpError(400, 'Unknown test'); if ((u.S.courses || {})[test]) throw new HttpError(400, 'Already enrolled'); A.activateCourse(u.S, test); const c = A.course(u.S, test); c.variant = C.TESTS[test].variants[body.variant] ? body.variant : Object.keys(C.TESTS[test].variants)[0]; c.testDate = body.testDate || null; c.diagnosticDone = false; c.plan = null; c.focus = null; A.activateCourse(u.S, test); setPlan(u, A.buildPlan(u.S)); profileDirty = true; publicDirty = true; mark('courses'); return publicUser(u); });
  route('POST', '/api/courses/switch', async ({ body }) => { const u = await requireUser(); const test = C.TESTS[body.test] ? body.test : null; if (!test || !(u.S.courses || {})[test]) throw new HttpError(400, 'Not enrolled in that course'); A.activateCourse(u.S, test); if (!u.S.plan) setPlan(u, A.buildPlan(u.S)); profileDirty = true; publicDirty = true; mark('courses'); state_reset(); return publicUser(u); });
  route('DELETE', '/api/courses/:test', async ({ params }) => { const u = await requireUser(); const test = params.test; const keys = Object.keys(u.S.courses || {}); if (!u.S.courses[test]) throw new HttpError(404, 'Not enrolled'); if (keys.length <= 1) throw new HttpError(400, 'You need at least one course.'); delete u.S.courses[test]; if (u.profile.targetTest === test) A.activateCourse(u.S, Object.keys(u.S.courses)[0]); profileDirty = true; mark('courses'); return publicUser(u); });
  route('GET', '/api/focus', async ({ query }) => { const u = await viewTarget(query); return { focus: A.focusStatus(u.S) }; });
  route('POST', '/api/focus/reset', async () => { const u = await requireUser(); A.course(u.S).focus = A.buildFocus(u.S); mark('courses'); return { focus: A.focusStatus(u.S) }; });
  route('GET', '/api/learner', async ({ query }) => { const u = await viewTarget(query); return { profile: A.learnerProfile(u.S, u.mocksIndex), projection: A.scoreProjection(u.S, u.mocksIndex), focus: A.focusStatus(u.S) }; });
  route('GET', '/api/report', async ({ query }) => { const u = await viewTarget(query); return A.weeklyReport(u.S, u.mocksIndex); });
  route('GET', '/api/mistakes', async ({ query }) => { const u = await viewTarget(query); return A.mistakeSummary(u.S); });
  route('POST', '/api/mistakes/tag', async ({ body }) => { const u = await requireUser(); let q = null; if (body.servedId && served.has(body.servedId)) q = served.get(body.servedId); else if (body.questionId && C.byId.get(body.questionId)) q = C.byId.get(body.questionId); if (!q) throw new HttpError(404, 'Question not found'); const e = A.tagMistake(u.S, { id: q.id, skill: q.skill, section: q.section, test: q.test === 'all' ? u.profile.targetTest : q.test, type: body.type, stem: q.stem }); if (!e) throw new HttpError(400, 'Unknown mistake type'); mark('training'); return { ok: true }; });
  function state_reset() { viewCache.clear(); }

  route('POST', '/api/activity', async ({ body }) => { const u = await requireUser(); const minutes = A.addStudyTime(u.S, Number(body.seconds) || 0); mark('daily'); return { todayMinutes: minutes, minutesLeft: Math.max(0, A.DAILY_MIN - minutes), dailyMinimum: A.DAILY_MIN, newBadges: afterChange(u, []) }; });

  async function api(method, path, body) {
    const [pathname, qs] = path.split('?'); const query = Object.fromEntries(new URLSearchParams(qs || ''));
    for (const r of routes) { if (r.method !== method) continue; const m = r.re.exec(pathname); if (!m) continue; return r.handler({ body: body || {}, params: m.groups || {}, query }); }
    throw new HttpError(404, 'Not found: ' + path);
  }
  return { api, flush, pull, mergeCol, mode: store.mode, get user() { return U; } }; // mergeCol is exposed for the sync tests
})();

'use strict';
// Adaptive learning engine: Elo-style skill ratings, interleaved practice selection,
// mock-test assembly across difficulty tiers, scoring, and SM-2 spaced repetition.
const C = require('./content');
const D = require('./db');
const { ri, pick, shuffle } = C.generators.util;

const LEVEL_RATING = { 1: 1000, 2: 1150, 3: 1300, 4: 1450, 5: 1600 };
const expected = (r, qd) => 1 / (1 + Math.pow(10, (qd - r) / 400));
const clampLevel = (l) => Math.min(5, Math.max(1, Math.round(l)));
const mastery = (rating) => Math.round(expected(rating, LEVEL_RATING[3]) * 100); // est. accuracy on test-level items

function getRatings(userId, test) {
  const rows = D.all('SELECT skill, rating, n, streak FROM skill_ratings WHERE user_id = ? AND test = ?', userId, test);
  const m = {}; for (const r of rows) m[r.skill] = r; return m;
}
function ratingFor(userId, test, skill, fallbackLevel) {
  const r = D.get('SELECT rating, n FROM skill_ratings WHERE user_id = ? AND test = ? AND skill = ?', userId, test, skill);
  if (r) return r;
  const lvl = fallbackLevel || 3;
  return { rating: LEVEL_RATING[clampLevel(lvl)] + 100, n: 0 }; // slightly above the level so the first items feel approachable
}
function updateRating(userId, test, skill, level, correct, fallbackLevel) {
  const cur = ratingFor(userId, test, skill, fallbackLevel);
  const K = cur.n < 10 ? 48 : cur.n < 30 ? 32 : 24;
  const exp = expected(cur.rating, LEVEL_RATING[clampLevel(level)]);
  const next = cur.rating + K * ((correct ? 1 : 0) - exp);
  const streakRow = D.get('SELECT streak FROM skill_ratings WHERE user_id = ? AND test = ? AND skill = ?', userId, test, skill);
  const streak = correct ? ((streakRow && streakRow.streak > 0 ? streakRow.streak : 0) + 1) : ((streakRow && streakRow.streak < 0 ? streakRow.streak : 0) - 1);
  D.run(`INSERT INTO skill_ratings (user_id, test, skill, rating, n, streak, updated_at) VALUES (?, ?, ?, ?, 1, ?, datetime('now'))
         ON CONFLICT(user_id, test, skill) DO UPDATE SET rating = excluded.rating, n = n + 1, streak = excluded.streak, updated_at = datetime('now')`, userId, test, skill, next, streak);
  return { before: cur.rating, after: next, delta: next - cur.rating, expected: exp };
}
// Desirable difficulty: aim where the student succeeds ~70% of the time.
function targetLevel(rating) {
  const qd = rating - 400 * Math.log10(0.7 / 0.3); // ≈ rating - 147
  let best = 3, bestDiff = Infinity;
  for (const [l, r] of Object.entries(LEVEL_RATING)) { const d = Math.abs(r - qd); if (d < bestDiff) { bestDiff = d; best = Number(l); } }
  const roll = Math.random();
  return clampLevel(roll < 0.15 ? best - 1 : roll < 0.3 ? best + 1 : best);
}
function recentIds(userId, days = 30) {
  return new Set(D.all(`SELECT DISTINCT question_id FROM attempts WHERE user_id = ? AND created_at > datetime('now', ?)`, userId, `-${days} days`).map(r => r.question_id));
}
function lastSeenMap(userId) {
  const m = new Map();
  for (const r of D.all('SELECT question_id, MAX(created_at) AS t FROM attempts WHERE user_id = ? GROUP BY question_id', userId)) m.set(r.question_id, r.t);
  return m;
}
const isGenSkill = (skill) => Boolean(C.generators.GENERATORS[skill]);

// Pick a bank item for (test, skill, level) avoiding recently seen ids. Falls back gracefully.
function pickBankItem(test, skill, level, exclude, seenMap, section) {
  let pool = C.questions.filter(q => q.skill === skill && (q.test === test || q.test === 'all') && (!section || q.section === section || q.test === 'all'));
  if (!pool.length) return null;
  const score = (q) => {
    let s = Math.abs(q.level - level) * 10;
    if (q.test !== test) s += 3;
    if (exclude.has(q.id)) s += 1000;
    if (seenMap && seenMap.has(q.id)) s += 50 + (Date.now() - new Date(seenMap.get(q.id) + 'Z').getTime() < 7 * 864e5 ? 200 : 0);
    return s + Math.random() * 8;
  };
  pool.sort((a, b) => score(a) - score(b));
  return pool[0];
}
function makeQuestion(test, section, skill, level, exclude, seenMap) {
  const nChoices = C.TESTS[test] ? C.TESTS[test].choices : 4;
  if (isGenSkill(skill)) return C.generators.generate(skill, level, nChoices, test);
  const item = pickBankItem(test, skill, level, exclude, seenMap, section);
  return item ? { ...item } : null;
}

// Weighted, interleaved skill choice for practice.
function chooseSkills(userId, test, skills, count, fallbackLevel) {
  const ratings = getRatings(userId, test);
  const weights = skills.map(s => {
    const r = ratings[s] || { rating: LEVEL_RATING[clampLevel(fallbackLevel)] + 100, n: 0 };
    let w = 1 + Math.max(-0.5, Math.min(2, (1400 - r.rating) / 250));
    if (r.n < 5) w += 1; // explore undersampled skills
    if (r.streak <= -2) w += 0.75; // prioritize what is currently slipping
    return Math.max(0.3, w);
  });
  const out = []; let last = null;
  for (let i = 0; i < count; i++) {
    let tries = 0, s;
    do { const tot = weights.reduce((a, b) => a + b, 0); let x = Math.random() * tot; s = skills[0]; for (let k = 0; k < skills.length; k++) { x -= weights[k]; if (x <= 0) { s = skills[k]; break; } } tries++; } while (s === last && skills.length > 1 && tries < 5);
    out.push(s); last = s;
  }
  return out;
}

function practiceBatch(user, { test, section, skill, count = 10, level }) {
  test = C.TESTS[test] ? test : user.target_test;
  let skills;
  if (skill) skills = [skill];
  else if (section && C.SECTION_SKILLS[test][section]) skills = C.SECTION_SKILLS[test][section].filter(s => s !== 'writing');
  else skills = [...new Set(Object.values(C.SECTION_SKILLS[test]).flat())].filter(s => s !== 'writing');
  const fallback = C.VARIANT_LEVEL[`${test}:${user.variant || Object.keys(C.TESTS[test].variants)[0]}`] || 3;
  const order = chooseSkills(user.id, user.id === 0 ? test : test, skills, count, fallback);
  const exclude = new Set(); const seen = lastSeenMap(user.id);
  const ratings = getRatings(user.id, test);
  const out = [];
  const dead = new Set();
  for (let s of order) {
    if (dead.has(s)) { const alt = skills.filter(x => !dead.has(x)); if (!alt.length) break; s = pick(alt); }
    const r = ratings[s] ? ratings[s].rating : LEVEL_RATING[clampLevel(fallback)] + 100;
    const lvl = level ? clampLevel(level) : targetLevel(r);
    let q = makeQuestion(test, section, s, lvl, exclude, seen);
    if (!q) { dead.add(s); const alt = skills.filter(x => !dead.has(x)); if (!alt.length) break; s = pick(alt); q = makeQuestion(test, section, s, lvl, exclude, seen); if (!q) continue; }
    exclude.add(q.id);
    if (q.passageId) q.passage = C.passageById.get(q.passageId);
    out.push(q);
  }
  return out;
}

// ---- Mock tests ----
function tierLevels(tier) { return C.TIERS[tier] ? C.TIERS[tier].levels : C.TIERS.standard.levels; }
function sampleLevel(levels) { let x = Math.random(); for (const [l, w] of Object.entries(levels)) { x -= w; if (x <= 0) return Number(l); } return Number(Object.keys(levels)[0]); }
function recommendTier(userId, test) {
  const ratings = Object.values(getRatings(userId, test));
  const rated = ratings.filter(r => r.n >= 5);
  if (rated.length < 3) return { tier: 'standard', reason: 'Not enough practice data yet; Standard matches the real test. Do a few practice sets and we will tune this.' };
  const avg = rated.reduce((a, r) => a + r.rating, 0) / rated.length;
  if (avg < 1180) return { tier: 'foundation', reason: `Your average skill rating (${Math.round(avg)}) suggests building fundamentals first.` };
  if (avg < 1380) return { tier: 'standard', reason: `Your average skill rating (${Math.round(avg)}) is right at test level.` };
  if (avg < 1520) return { tier: 'advanced', reason: `Your average skill rating (${Math.round(avg)}) is above test level; stretch with Advanced.` };
  return { tier: 'elite', reason: `Your average skill rating (${Math.round(avg)}) is well above test level. Elite will keep you sharp.` };
}
function buildMock(user, { test, variant, tier, length = 'full', section: onlySection }) {
  const bp = (C.BLUEPRINTS[test] || {})[variant];
  if (!bp) throw new Error('Unknown test/variant');
  const levels = tierLevels(tier);
  const factor = length === 'half' ? 0.5 : 1;
  const exclude = new Set(); const seen = lastSeenMap(user.id); const usedPassages = new Set();
  const sections = [];
  const recentPassages = new Set(); for (const id of seen.keys()) { const q = C.byId.get(id); if (q && q.passageId) recentPassages.add(q.passageId); }
  for (const sec of bp) {
    if (onlySection && sec.section !== onlySection) continue;
    const label = sec.label || C.TESTS[test].sections[sec.section];
    const minutes = Math.max(5, Math.round(sec.minutes * factor));
    if (sec.writing) {
      const prompts = C.writingPrompts.filter(p => p.test === test && Math.abs(p.level - (C.VARIANT_LEVEL[`${test}:${variant}`] || 3)) <= 1.5);
      const prompt = prompts.length ? pick(prompts) : (C.writingPrompts.filter(p => p.test === test)[0] || C.writingPrompts[0]);
      sections.push({ section: sec.section, label, minutes, writing: true, prompt: prompt || { id: 'generic', prompt: 'Write about a time you learned something important. Explain what happened and why it mattered.', minutes }, questions: [] });
      continue;
    }
    const questions = []; const passages = {};
    const total = Math.max(1, Math.round(sec.count * factor));
    // Reading passages
    if (sec.passages) {
      const need = Math.round(sec.passages * factor);
      let pool = C.passages.filter(p => (p.test === test || p.test === 'all') && !usedPassages.has(p.id));
      const score = (p) => Math.min(...Object.keys(levels).map(l => Math.abs(p.level - Number(l)) * (1 - levels[l]))) * 10 + (recentPassages.has(p.id) ? 40 : 0) + (p.test === test ? -3 : 0) + Math.random() * 10;
      pool.sort((a, b) => score(a) - score(b));
      let got = 0;
      for (const p of pool) {
        if (got >= need) break;
        const qs = C.questions.filter(q => q.passageId === p.id);
        if (!qs.length) continue;
        usedPassages.add(p.id); passages[p.id] = p;
        for (const q of qs) { if (got >= need) break; questions.push({ ...q }); exclude.add(q.id); got++; }
      }
    }
    // Skill mix
    if (sec.mix) {
      const mixTotal = Object.values(sec.mix).reduce((a, b) => a + b, 0);
      const target = total - questions.length;
      const alloc = {}; let allocated = 0;
      for (const [s, c] of Object.entries(sec.mix)) { alloc[s] = Math.floor(c / mixTotal * target); allocated += alloc[s]; }
      const keys = Object.keys(sec.mix); let i = 0; while (allocated < target) { alloc[keys[i % keys.length]]++; allocated++; i++; }
      const order = [];
      for (const [s, c] of Object.entries(alloc)) for (let k = 0; k < c; k++) order.push(s);
      // HSPT groups by type within a section; SSAT/ISEE verbal halves are grouped; math is mixed. Keep grouping for verbal/quant/language, shuffle for math.
      const grouped = ['verbal', 'quant', 'language'].includes(sec.section);
      const seq = grouped ? order : shuffle(order);
      for (const s of seq) {
        const lvl = sampleLevel(levels);
        const q = makeQuestion(test, sec.section, s, lvl, exclude, seen);
        if (!q) continue;
        exclude.add(q.id);
        questions.push(q);
      }
    }
    // Renumber ids inside the mock so client references are stable
    questions.forEach((q, idx) => { q.n = idx + 1; });
    sections.push({ section: sec.section, label, minutes, questions, passages });
  }
  return { test, variant, tier, length, sections };
}
function estimatePercentile(pct, tier) {
  const offset = { foundation: -12, standard: 0, advanced: 7, elite: 14 }[tier] || 0;
  const adj = pct + offset;
  const p = 100 / (1 + Math.exp(-(adj - 62) / 9));
  return Math.max(1, Math.min(99, Math.round(p)));
}
function scoreMock(mock, responses) {
  const penalty = C.TESTS[mock.test].penalty;
  const out = { sections: [], skills: {}, totalRight: 0, totalWrong: 0, totalBlank: 0, totalCount: 0 };
  for (const sec of mock.sections) {
    if (sec.writing) { out.sections.push({ section: sec.section, label: sec.label, writing: true, text: (responses[`w:${sec.section}`] || ''), wordCount: String(responses[`w:${sec.section}`] || '').trim().split(/\s+/).filter(Boolean).length }); continue; }
    let right = 0, wrong = 0, blank = 0; const items = [];
    for (const q of sec.questions) {
      const choice = responses[q.id]; const answered = Number.isInteger(choice);
      const correct = answered && choice === q.answer;
      if (!answered) blank++; else if (correct) right++; else wrong++;
      const sk = out.skills[q.skill] || (out.skills[q.skill] = { right: 0, total: 0, name: C.SKILL_NAMES[q.skill] || q.skill });
      sk.total++; if (correct) sk.right++;
      items.push({ n: q.n, id: q.id, skill: q.skill, level: q.level, choice: answered ? choice : null, answer: q.answer, correct, stem: q.stem, choices: q.choices, explanation: q.explanation, passageId: q.passageId || null });
    }
    const count = sec.questions.length;
    const raw = penalty ? right - 0.25 * wrong : right;
    const pct = count ? Math.round(right / count * 100) : 0;
    out.sections.push({ section: sec.section, label: sec.label, count, right, wrong, blank, raw: Math.round(raw * 100) / 100, pct, percentile: estimatePercentile(pct, mock.tier), items, passages: sec.passages });
    out.totalRight += right; out.totalWrong += wrong; out.totalBlank += blank; out.totalCount += count;
  }
  out.pct = out.totalCount ? Math.round(out.totalRight / out.totalCount * 100) : 0;
  out.percentile = estimatePercentile(out.pct, mock.tier);
  out.raw = penalty ? Math.round((out.totalRight - 0.25 * out.totalWrong) * 100) / 100 : out.totalRight;
  out.penalty = penalty;
  const skillArr = Object.entries(out.skills).map(([k, v]) => ({ skill: k, ...v, pct: Math.round(v.right / v.total * 100) })).sort((a, b) => a.pct - b.pct);
  out.weakest = skillArr.filter(s => s.total >= 3).slice(0, 3);
  out.strongest = skillArr.filter(s => s.total >= 3).slice(-3).reverse();
  return out;
}

// ---- Spaced repetition (SM-2) ----
function sm2(item, quality) {
  let { ease, interval_days: interval, reps, lapses } = item;
  if (quality < 3) { reps = 0; interval = 0.5; lapses++; }
  else { reps++; interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(interval * ease * 10) / 10; }
  ease = Math.max(1.3, ease + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  const due = new Date(Date.now() + interval * 864e5).toISOString().replace('T', ' ').slice(0, 19);
  return { ease, interval_days: interval, reps, lapses, due_at: due };
}
function scheduleReview(userId, key, kind, payload, wrong = true) {
  const existing = D.get('SELECT * FROM review_items WHERE user_id = ? AND item_key = ?', userId, key);
  if (existing) { if (wrong) { const s = sm2(existing, 1); D.run('UPDATE review_items SET ease = ?, interval_days = ?, reps = ?, lapses = ?, due_at = ? WHERE user_id = ? AND item_key = ?', s.ease, s.interval_days, s.reps, s.lapses, s.due_at, userId, key); } return; }
  const due = new Date(Date.now() + (wrong ? 0.15 : 1) * 864e5).toISOString().replace('T', ' ').slice(0, 19);
  D.run('INSERT INTO review_items (user_id, item_key, kind, payload, due_at) VALUES (?, ?, ?, ?, ?)', userId, key, kind, JSON.stringify(payload), due);
}

// Record an attempt and update everything that depends on it.
function recordAttempt(user, q, choice, { seconds, confidence, mode, mockId, test, hints } = {}) {
  const correct = Number.isInteger(choice) && choice === q.answer;
  const t = test || (q.test === 'all' ? user.target_test : q.test);
  D.run('INSERT INTO attempts (user_id, question_id, test, section, skill, level, correct, choice, seconds, confidence, mode, mock_id, hints) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', user.id, q.id, t, q.section || 'misc', q.skill, q.level || 3, correct ? 1 : 0, Number.isInteger(choice) ? choice : null, seconds || null, confidence || null, mode || 'practice', mockId || null, Number(hints) || 0);
  const rating = updateRating(user.id, t, q.skill, q.level || 3, correct);
  if (!correct && !q.generated && mode !== 'review') scheduleReview(user.id, `q:${q.id}`, 'question', { id: q.id }, true);
  if (!correct && q.generated && mode !== 'review') scheduleReview(user.id, `g:${q.id}`, 'question', { full: q }, true);
  return { correct, rating };
}

function progressSummary(user) {
  const test = user.target_test;
  const ratings = getRatings(user.id, test);
  const skills = Object.entries(ratings).map(([skill, r]) => ({ skill, name: C.SKILL_NAMES[skill] || skill, rating: Math.round(r.rating), n: r.n, streak: r.streak, mastery: mastery(r.rating), level: targetLevel(r.rating) }));
  const bySection = {};
  for (const [sec, list] of Object.entries(C.SECTION_SKILLS[test])) {
    const rows = skills.filter(s => list.includes(s.skill));
    bySection[sec] = { name: C.TESTS[test].sections[sec], skills: list.filter(s => s !== 'writing').map(s => skills.find(x => x.skill === s) || { skill: s, name: C.SKILL_NAMES[s], rating: null, n: 0, mastery: null }), mastery: rows.length ? Math.round(rows.reduce((a, b) => a + b.mastery, 0) / rows.length) : null };
  }
  const daily = D.all(`SELECT date(created_at,'localtime') AS day, COUNT(*) AS n, SUM(correct) AS right, SUM(COALESCE(seconds,0)) AS secs FROM attempts WHERE user_id = ? AND created_at > datetime('now','-60 days') GROUP BY day ORDER BY day`, user.id);
  const totals = D.get('SELECT COUNT(*) AS n, SUM(correct) AS right, SUM(COALESCE(seconds,0)) AS secs FROM attempts WHERE user_id = ?', user.id);
  const recent = D.get(`SELECT COUNT(*) AS n, SUM(correct) AS right FROM attempts WHERE user_id = ? AND created_at > datetime('now','-7 days')`, user.id);
  const today = D.get(`SELECT COUNT(*) AS n FROM attempts WHERE user_id = ? AND date(created_at,'localtime') = date('now','localtime')`, user.id);
  // streak of consecutive days with activity
  const days = new Set(daily.map(d => d.day)); let streak = 0; const d = new Date();
  const localKey = (x) => new Date(x.getTime() - x.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  for (let i = 0; i < 400; i++) { const key = localKey(d); if (days.has(key)) streak++; else if (i > 0) break; d.setDate(d.getDate() - 1); }
  const due = D.get(`SELECT COUNT(*) AS n FROM review_items WHERE user_id = ? AND due_at <= datetime('now')`, user.id).n;
  const mocks = D.all('SELECT id, test, variant, tier, length, status, results, started_at, completed_at FROM mock_tests WHERE user_id = ? ORDER BY started_at DESC LIMIT 20', user.id).map(m => ({ ...m, results: m.results ? (({ pct, percentile, raw, totalRight, totalCount, sections }) => ({ pct, percentile, raw, totalRight, totalCount, sections: sections.map(s => ({ label: s.label, pct: s.pct, percentile: s.percentile, right: s.right, count: s.count, writing: s.writing })) }))(JSON.parse(m.results)) : null }));
  const lessonsDone = D.all('SELECT lesson_id, status, score FROM lesson_progress WHERE user_id = ?', user.id);
  // Recommendations
  const recs = [];
  if (due > 0) recs.push({ type: 'review', title: `Review ${due} due item${due > 1 ? 's' : ''}`, why: 'Spaced retrieval of recent misses is the highest-return 10 minutes you can spend.', action: { page: 'review' } });
  const weak = skills.filter(s => s.n >= 2).sort((a, b) => a.mastery - b.mastery).slice(0, 2);
  for (const w of weak) {
    const lesson = C.lessons.find(l => l.skill === w.skill && (l.test === test || l.test === 'all') && !lessonsDone.find(x => x.lesson_id === l.id && x.status === 'completed'));
    if (lesson) recs.push({ type: 'lesson', title: `Lesson: ${lesson.title}`, why: `${w.name} is your weakest area (est. ${w.mastery}% on test-level items).`, action: { page: 'lesson', id: lesson.id } });
    else recs.push({ type: 'practice', title: `Drill ${w.name}`, why: `Estimated ${w.mastery}% accuracy on test-level items. Targeted practice will move this fastest.`, action: { page: 'practice', skill: w.skill } });
  }
  if (!skills.length) recs.push({ type: 'practice', title: 'Take a 10-question diagnostic', why: 'We calibrate every skill from your first answers; nothing is wasted.', action: { page: 'practice' } });
  const lastMock = mocks.find(m => m.status === 'completed');
  if (!lastMock || (Date.now() - new Date(lastMock.completed_at + 'Z').getTime()) > 7 * 864e5) recs.push({ type: 'mock', title: lastMock ? 'Time for a mock test' : 'Take your first mock test', why: lastMock ? 'It has been over a week. Weekly timed practice keeps pacing sharp.' : 'A baseline mock tells us exactly where you stand.', action: { page: 'mock' } });
  return { test, skills, bySection, daily, totals, recent, today: today.n, streak, due, mocks, lessonsDone, recommendations: recs.slice(0, 4), tierRecommendation: recommendTier(user.id, test) };
}

module.exports = { _makeQuestion: makeQuestion, practiceBatch, buildMock, scoreMock, recordAttempt, progressSummary, sm2, scheduleReview, getRatings, mastery, recommendTier, targetLevel, LEVEL_RATING };

'use strict';
// Tutor-side features that sit on top of the engine: progressive hints, the diagnostic,
// the personal study plan, XP, badges, and friends leaderboards.
const C = require('./content');
const D = require('./db');
const E = require('./engine');
const { pick, shuffle } = C.generators.util;

// ---- Progressive hints ----
// Level 1: the method for this skill. Level 2: eliminate one wrong choice. Level 3: eliminate another.
const STRATEGY = {
  synonyms: 'Decide the word\'s charge first (positive, negative, neutral), then test each choice in a sentence you would actually say. Roots and prefixes often give the meaning away.',
  antonyms: 'Define the word in your own words, then look for the choice that reverses that definition, not one that is merely different.',
  analogies: 'Write a bridge sentence that links the first pair ("A is a type of B", "A is used to B"). The right answer fits the same sentence with no stretching.',
  logic: 'Turn the statements into a chain with symbols (>, <, =). If the third statement needs information the chain does not give, it is uncertain.',
  'verbal-classification': 'Say what three of the words have in common in one phrase. The odd one is the word that does not fit that phrase.',
  'sentence-completion': 'Cover the choices and predict a word from the context clue (contrast, cause, definition, example). Then pick the choice closest to your prediction.',
  'main-idea': 'The main idea must cover the whole passage. A choice that is true but describes only one paragraph is too narrow.',
  detail: 'Go back to the passage and find the exact lines. The answer is stated, not implied; beware of choices that are true in general but not in the text.',
  inference: 'The right inference is the smallest step from what is written. Eliminate anything extreme (always, never, only) and anything the passage does not support.',
  'vocab-in-context': 'Cover the word, read the sentence, and predict a replacement that keeps the meaning. The familiar meaning of the word is often the trap.',
  'tone-purpose': 'Ask why the author wrote this and how they feel about it. Look at the adjectives and verbs the author chose.',
  structure: 'Label each paragraph with a two-word summary. Structure questions ask how those labels relate: compare, sequence, problem-solution, cause-effect.',
  'reading-vocab': 'Use the phrase around the word as a clue. Then check charge: is the word used in a positive or negative way?',
  punctuation: 'Check each sentence for one rule at a time: commas (series, introductory, compound, appositive), apostrophes (possession vs. plural), quotation marks with end punctuation inside.',
  capitalization: 'Proper nouns and titles used as names get capitals; general words (seasons, directions, school subjects, family words after "my") do not.',
  usage: 'Find the subject and verb of each sentence first. Then check pronoun case, tense consistency, and modifiers that sit next to the wrong word.',
  spelling: 'Say each word slowly syllable by syllable and apply the rule: i before e except after c, double the consonant before -ing/-ed after a short vowel, -ible/-able.',
  composition: 'Find the relationship between the ideas: contrast (however), result (therefore), example (for instance), addition (also). Clarity choices prefer the shortest version that keeps the meaning.',
  arithmetic: 'Follow order of operations and estimate first so you can spot an answer that is the wrong size. For factors and multiples, list systematically.',
  'fractions-decimals': 'Common denominators to add or subtract; multiply straight across; keep-change-flip to divide. Convert to decimals to compare.',
  'percent-ratio': 'Write part = percent × whole. For percent change, divide by the ORIGINAL amount. For ratios, find the value of one part first.',
  algebra: 'Undo operations in reverse order, doing the same thing to both sides. If stuck, plug the answer choices back in.',
  geometry: 'Draw it. Write the formula before substituting numbers. Angles in a triangle sum to 180°; in a straight line, 180°; around a point, 360°.',
  'data-stats': 'Mean = sum ÷ count (so average problems become sum problems). Median needs the list SORTED. Probability = favorable ÷ total.',
  'number-series': 'Write the differences between consecutive terms. If they are not constant, check ratios, second differences, or two interleaved patterns.',
  'quant-comparison': 'Compute both sides when there are no variables. With variables, plug in 0, 1, a negative, and a fraction before deciding.',
  'number-sense': 'Translate the sentence from the inside out: compute the "of" part first, then apply "more than" or "less than" at the end.',
  'word-problems': 'Underline what is asked. Name the unknown, write one equation from the sentence, solve, then check the answer against the question.'
};
function hintFor(q, level) {
  level = Math.max(1, Math.min(3, Number(level) || 1));
  if (level === 1) return { level, text: STRATEGY[q.skill] || 'Read the question again slowly and decide exactly what is being asked before looking at the choices.' };
  const wrong = q.choices.map((_, i) => i).filter(i => i !== q.answer);
  // deterministic per question so repeated calls eliminate the same choices
  const seed = [...String(q.id)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const order = wrong.slice().sort((a, b) => ((a * 7 + seed) % 11) - ((b * 7 + seed) % 11));
  const eliminate = order.slice(0, level - 1);
  return { level, text: level === 2 ? `Cross out choice ${'ABCDE'[eliminate[0]]}: it does not fit. Now compare the remaining choices against the method.` : `Also cross out choice ${'ABCDE'[eliminate[1]]}. Two choices remain. Which one survives the method?`, eliminate };
}

// ---- Diagnostic ----
function diagnosticBatch(user) {
  const test = user.target_test; const level = Math.round(C.VARIANT_LEVEL[`${test}:${user.variant}`] || 3);
  const out = []; const exclude = new Set(); const seen = new Map();
  for (const [section, skills] of Object.entries(C.SECTION_SKILLS[test])) {
    if (['writing', 'essay'].includes(section)) continue;
    const list = skills.filter(s => s !== 'writing');
    const per = section === 'reading' ? 1 : 2;
    const chosen = shuffle(list).slice(0, section === 'reading' ? 4 : Math.min(list.length, 3));
    for (const s of chosen) for (let k = 0; k < per; k++) {
      const q = E._makeQuestion(test, section, s, level, exclude, seen); if (!q) continue; exclude.add(q.id); if (q.passageId) q.passage = C.passageById.get(q.passageId); out.push(q);
    }
  }
  return shuffle(out).slice(0, 20);
}

// ---- Study plan ----
function daysUntil(dateStr) { if (!dateStr) return null; return Math.ceil((new Date(dateStr) - Date.now()) / 864e5); }
function buildPlan(user) {
  const test = user.target_test; const p = E.progressSummary(user);
  let horizon = daysUntil(user.test_date); if (horizon === null || horizon < 7) horizon = horizon === null ? 42 : 7; horizon = Math.min(horizon, 120);
  const done = new Set(p.lessonsDone.filter(l => l.status === 'completed').map(l => l.lesson_id));
  const skillOrder = p.skills.slice().sort((a, b) => a.mastery - b.mastery).map(s => s.skill);
  const allSkills = [...new Set(Object.values(C.SECTION_SKILLS[test]).flat())].filter(s => s !== 'writing');
  for (const s of allSkills) if (!skillOrder.includes(s)) skillOrder.push(s);
  const lessonsFor = (skill) => C.lessons.filter(l => l.skill === skill && (l.test === test || l.test === 'all') && !done.has(l.id));
  const lessonQueue = []; for (const s of skillOrder) lessonQueue.push(...lessonsFor(s));
  for (const l of C.lessons) if ((l.test === test || l.test === 'all') && !done.has(l.id) && !lessonQueue.includes(l)) lessonQueue.push(l);
  const hasWriting = test !== 'hspt';
  const days = []; let li = 0; let di = 0;
  const start = new Date(); start.setHours(0, 0, 0, 0);
  for (let d = 0; d < horizon; d++) {
    const date = new Date(start.getTime() + d * 864e5).toISOString().slice(0, 10);
    const items = [];
    const daysLeft = horizon - d;
    if (d === 0 && !user.diagnostic_done) items.push({ type: 'diagnostic', label: 'Diagnostic: 20 questions to calibrate your plan', minutes: 15 });
    items.push({ type: 'review', label: 'Spaced review (what is due)', minutes: 8 });
    const mockDay = d > 0 && d % 7 === 6 && daysLeft > 0;
    if (mockDay) { items.push({ type: 'mock', label: d < 14 ? 'Half-length mock test' : 'Full-length mock test', minutes: d < 14 ? 75 : 150, length: d < 14 ? 'half' : 'full' }); }
    else {
      const lesson = lessonQueue[li]; if (lesson) { items.push({ type: 'lesson', ref: lesson.id, label: `Lesson: ${lesson.title}`, minutes: lesson.minutes, skill: lesson.skill }); li = (li + 1) % Math.max(1, lessonQueue.length); }
      const skill = skillOrder[di % skillOrder.length]; di++;
      items.push({ type: 'drill', ref: skill, label: `Drill: ${C.SKILL_NAMES[skill]} (10 questions)`, minutes: 10 });
      if (d % 2 === 1) items.push({ type: 'drill', label: 'Adaptive mix (10 questions)', minutes: 10 });
      if (hasWriting && d % 7 === 3) items.push({ type: 'writing', label: 'Timed writing practice', minutes: 25 });
      items.push({ type: 'vocab', label: 'Vocabulary: 10 new words', minutes: 5 });
    }
    if (daysLeft === 1) items.splice(0, items.length, { type: 'review', label: 'Light review only: due items and your error log', minutes: 15 }, { type: 'rest', label: 'Rest. Pack two pencils, a snack and your admission ticket. Sleep early.', minutes: 0 });
    days.push({ date, items: items.map(it => ({ ...it, done: false })) });
  }
  return { test, generatedAt: new Date().toISOString(), horizonDays: horizon, testDate: user.test_date || null, days };
}
function getPlan(user) { const r = D.get('SELECT plan FROM study_plans WHERE user_id = ?', user.id); return r ? JSON.parse(r.plan) : null; }
function savePlan(user, plan) { D.run('INSERT INTO study_plans (user_id, plan, generated_at) VALUES (?, ?, datetime(\'now\')) ON CONFLICT(user_id) DO UPDATE SET plan = excluded.plan, generated_at = datetime(\'now\')', user.id, JSON.stringify(plan)); return plan; }
function todayKey() { const d = new Date(); d.setHours(0, 0, 0, 0); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }
function markDone(user, date, index, type) {
  const plan = getPlan(user); if (!plan) return null;
  const day = plan.days.find(x => x.date === date) || plan.days.find(x => x.date === todayKey()); if (!day) return plan;
  if (Number.isInteger(index) && day.items[index]) day.items[index].done = true;
  else if (type) { const it = day.items.find(i => i.type === type && !i.done); if (it) it.done = true; }
  return savePlan(user, plan);
}

// ---- XP and badges ----
const XP_SQL = `SELECT COALESCE(SUM(CASE WHEN correct = 1 THEN 10 + level * 4 - MIN(hints, 2) * 3 ELSE 2 END), 0) AS xp FROM attempts WHERE user_id = ?`;
function xpFor(userId) { return D.get(XP_SQL, userId).xp; }
function xpSince(userId, days) { return D.get(XP_SQL.replace('WHERE user_id = ?', `WHERE user_id = ? AND created_at > datetime('now', '-${Number(days)} days')`), userId).xp; }
const levelFor = (xp) => Math.floor(Math.sqrt(xp / 120)) + 1;
const xpForLevel = (lvl) => (lvl - 1) * (lvl - 1) * 120;
const BADGES = [
  { id: 'first-steps', name: 'First Steps', desc: 'Answer your first 10 questions', icon: '🌱', test: (s) => s.attempts >= 10 },
  { id: 'century', name: 'Century', desc: '100 questions answered', icon: '💯', test: (s) => s.attempts >= 100 },
  { id: 'marathon', name: 'Marathon', desc: '500 questions answered', icon: '🏃', test: (s) => s.attempts >= 500 },
  { id: 'thousand', name: 'Thousand', desc: '1,000 questions answered', icon: '🏔', test: (s) => s.attempts >= 1000 },
  { id: 'streak-3', name: 'Warming Up', desc: '3-day streak', icon: '🔥', test: (s) => s.streak >= 3 },
  { id: 'streak-7', name: 'On Fire', desc: '7-day streak', icon: '🔥', test: (s) => s.streak >= 7 },
  { id: 'streak-30', name: 'Unstoppable', desc: '30-day streak', icon: '☄️', test: (s) => s.streak >= 30 },
  { id: 'diagnostic', name: 'Calibrated', desc: 'Complete the diagnostic', icon: '🎯', test: (s) => s.diagnostic },
  { id: 'first-mock', name: 'Test Day Rehearsal', desc: 'Finish a mock test', icon: '⏱', test: (s) => s.mocks >= 1 },
  { id: 'mock-80', name: 'Top Form', desc: 'Score 80% or higher on a mock test', icon: '🏆', test: (s) => s.bestMock >= 80 },
  { id: 'mock-90', name: 'Elite', desc: 'Score 90% or higher on a mock test', icon: '👑', test: (s) => s.bestMock >= 90 },
  { id: 'scholar', name: 'Scholar', desc: 'Complete 5 lessons', icon: '📘', test: (s) => s.lessons >= 5 },
  { id: 'professor', name: 'Professor', desc: 'Complete 20 lessons', icon: '🎓', test: (s) => s.lessons >= 20 },
  { id: 'mastery', name: 'Mastery', desc: 'Reach 85% mastery in any skill (15+ questions)', icon: '⭐', test: (s) => s.topMastery >= 85 },
  { id: 'wordsmith', name: 'Wordsmith', desc: 'Review 50 vocabulary cards', icon: '📖', test: (s) => s.vocabReviews >= 50 },
  { id: 'writer', name: 'Writer', desc: 'Submit 3 writing responses', icon: '✍️', test: (s) => s.writings >= 3 },
  { id: 'social', name: 'Study Buddy', desc: 'Add a friend', icon: '🤝', test: (s) => s.friends >= 1 },
  { id: 'calibrated-mind', name: 'Know Thyself', desc: '20 answers where confidence matched the result', icon: '🧠', test: (s) => s.calibrated >= 20 }
];
function badgeStats(user) {
  const p = E.progressSummary(user);
  const best = p.mocks.filter(m => m.status === 'completed').reduce((a, m) => Math.max(a, m.results.pct), 0);
  return { attempts: p.totals.n, streak: p.streak, diagnostic: !!user.diagnostic_done, mocks: p.mocks.filter(m => m.status === 'completed').length, bestMock: best, lessons: p.lessonsDone.filter(l => l.status === 'completed').length, topMastery: Math.max(0, ...p.skills.filter(s => s.n >= 15).map(s => s.mastery)), vocabReviews: D.get(`SELECT COALESCE(SUM(reps),0) AS n FROM review_items WHERE user_id = ? AND kind = 'vocab'`, user.id).n, writings: D.get('SELECT COUNT(*) AS n FROM writing_submissions WHERE user_id = ?', user.id).n, friends: D.get('SELECT COUNT(*) AS n FROM friends WHERE user_id = ?', user.id).n, calibrated: D.get(`SELECT COUNT(*) AS n FROM attempts WHERE user_id = ? AND confidence IS NOT NULL AND ((correct = 1 AND confidence >= 3) OR (correct = 0 AND confidence <= 2))`, user.id).n };
}
function checkBadges(user) {
  const have = new Set(D.all('SELECT badge FROM badges WHERE user_id = ?', user.id).map(r => r.badge));
  const s = badgeStats(user); const fresh = [];
  for (const b of BADGES) if (!have.has(b.id) && b.test(s)) { D.run('INSERT OR IGNORE INTO badges (user_id, badge) VALUES (?, ?)', user.id, b.id); fresh.push({ id: b.id, name: b.name, desc: b.desc, icon: b.icon }); }
  return fresh;
}
function badgeList(user) { const have = new Map(D.all('SELECT badge, earned_at FROM badges WHERE user_id = ?', user.id).map(r => [r.badge, r.earned_at])); return BADGES.map(b => ({ id: b.id, name: b.name, desc: b.desc, icon: b.icon, earnedAt: have.get(b.id) || null })); }

// ---- Friends ----
function leaderboard(user) {
  const ids = [user.id, ...D.all('SELECT friend_id FROM friends WHERE user_id = ?', user.id).map(r => r.friend_id)];
  return ids.map(id => {
    const u = D.get('SELECT id, display_name, username, target_test FROM users WHERE id = ?', id); if (!u) return null;
    const week = D.get(`SELECT COUNT(*) AS n, COALESCE(SUM(correct),0) AS right FROM attempts WHERE user_id = ? AND created_at > datetime('now','-7 days')`, id);
    const daily = D.all(`SELECT DISTINCT date(created_at,'localtime') AS day FROM attempts WHERE user_id = ? AND created_at > datetime('now','-400 days')`, id).map(r => r.day);
    const set = new Set(daily); let streak = 0; const d = new Date(); const localKey = (x) => new Date(x.getTime() - x.getTimezoneOffset() * 60000).toISOString().slice(0, 10); for (let i = 0; i < 400; i++) { const k = localKey(d); if (set.has(k)) streak++; else if (i > 0) break; d.setDate(d.getDate() - 1); }
    const xp = xpFor(id);
    return { id: u.id, displayName: u.display_name, username: u.username, test: u.target_test, me: id === user.id, weekQuestions: week.n, weekAccuracy: week.n ? Math.round(week.right / week.n * 100) : null, weekXp: xpSince(id, 7), xp, level: levelFor(xp), streak, badges: D.get('SELECT COUNT(*) AS n FROM badges WHERE user_id = ?', id).n };
  }).filter(Boolean).sort((a, b) => b.weekXp - a.weekXp);
}

module.exports = { hintFor, STRATEGY, diagnosticBatch, buildPlan, getPlan, savePlan, markDone, todayKey, xpFor, xpSince, levelFor, xpForLevel, BADGES, checkBadges, badgeList, leaderboard };

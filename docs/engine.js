'use strict';
/* Ascend Prep — the tutoring engine, running in the browser. Operates on a user state object S:
   S = { profile, ratings:{test:{skill:{rating,n,streak}}}, daily:{day:{n,right,secs}}, totals:{n,right,secs},
         seen:{qid:ts}, reviews:{key:item}, plan, lessons:{id:{status,score,completedAt}}, badges:{id:ts}, tutor:[...] } */
window.Ascend = (function () {
  const C = window.AscendContent; const { ri, pick, shuffle } = C.generators.util;
  const LEVEL_RATING = { 1: 1000, 2: 1150, 3: 1300, 4: 1450, 5: 1600 };
  const expected = (r, qd) => 1 / (1 + Math.pow(10, (qd - r) / 400));
  const clampLevel = (l) => Math.min(5, Math.max(1, Math.round(l)));
  const mastery = (rating) => Math.round(expected(rating, LEVEL_RATING[3]) * 100);
  const nowIso = () => new Date().toISOString();
  const todayKey = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
  const dayOf = (ts) => { const d = new Date(ts); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
  const isGenSkill = (skill) => Boolean(C.generators.GENERATORS[skill]);
  const variantLevel = (S) => C.VARIANT_LEVEL[`${S.profile.targetTest}:${S.profile.variant}`] || 3;

  // ---- ratings ----
  function ratingFor(S, test, skill) { const r = S.ratings[test] && S.ratings[test][skill]; return r || { rating: LEVEL_RATING[clampLevel(variantLevel(S))] + 100, n: 0, streak: 0 }; }
  function updateRating(S, test, skill, level, correct) {
    const cur = ratingFor(S, test, skill); const K = cur.n < 10 ? 48 : cur.n < 30 ? 32 : 24;
    const exp = expected(cur.rating, LEVEL_RATING[clampLevel(level)]); const next = cur.rating + K * ((correct ? 1 : 0) - exp);
    const streak = correct ? (cur.streak > 0 ? cur.streak + 1 : 1) : (cur.streak < 0 ? cur.streak - 1 : -1);
    (S.ratings[test] = S.ratings[test] || {})[skill] = { rating: next, n: cur.n + 1, streak, updatedAt: nowIso() };
    return { before: cur.rating, after: next, delta: next - cur.rating, expected: exp };
  }
  function targetLevel(rating) { const qd = rating - 400 * Math.log10(0.7 / 0.3); let best = 3, bd = Infinity; for (const [l, r] of Object.entries(LEVEL_RATING)) { const d = Math.abs(r - qd); if (d < bd) { bd = d; best = Number(l); } } const roll = Math.random(); return clampLevel(roll < 0.15 ? best - 1 : roll < 0.3 ? best + 1 : best); }

  // ---- question selection ----
  function pickBankItem(S, test, skill, level, exclude, section) {
    const pool = C.questions.filter(q => q.skill === skill && (q.test === test || q.test === 'all') && (!section || q.section === section || q.test === 'all'));
    if (!pool.length) return null;
    const score = (q) => { let s = Math.abs(q.level - level) * 10; if (q.test !== test) s += 3; if (exclude.has(q.id)) s += 1000; const seen = S.seen[q.id]; if (seen) s += 50 + (Date.now() - seen < 7 * 864e5 ? 200 : 0); return s + Math.random() * 8; };
    pool.sort((a, b) => score(a) - score(b)); return pool[0];
  }
  function makeQuestion(S, test, section, skill, level, exclude) {
    const n = C.TESTS[test] ? C.TESTS[test].choices : 4;
    if (isGenSkill(skill)) return C.generators.generate(skill, level, n, test);
    const item = pickBankItem(S, test, skill, level, exclude, section); return item ? { ...item } : null;
  }
  function chooseSkills(S, test, skills, count) {
    const weights = skills.map(s => { const r = ratingFor(S, test, s); let w = 1 + Math.max(-0.5, Math.min(2, (1400 - r.rating) / 250)); if (r.n < 5) w += 1; if (r.streak <= -2) w += 0.75; return Math.max(0.3, w); });
    const out = []; let last = null;
    for (let i = 0; i < count; i++) { let tries = 0, s; do { const tot = weights.reduce((a, b) => a + b, 0); let x = Math.random() * tot; s = skills[0]; for (let k = 0; k < skills.length; k++) { x -= weights[k]; if (x <= 0) { s = skills[k]; break; } } tries++; } while (s === last && skills.length > 1 && tries < 5); out.push(s); last = s; }
    return out;
  }
  function practiceBatch(S, { test, section, skill, count = 10, level }) {
    test = C.TESTS[test] ? test : S.profile.targetTest;
    let skills; if (skill) skills = [skill]; else if (section && C.SECTION_SKILLS[test][section]) skills = C.SECTION_SKILLS[test][section].filter(s => s !== 'writing'); else skills = [...new Set(Object.values(C.SECTION_SKILLS[test]).flat())].filter(s => s !== 'writing');
    const order = chooseSkills(S, test, skills, count); const exclude = new Set(); const out = []; const dead = new Set();
    for (let s of order) {
      if (dead.has(s)) { const alt = skills.filter(x => !dead.has(x)); if (!alt.length) break; s = pick(alt); }
      const lvl = level ? clampLevel(level) : targetLevel(ratingFor(S, test, s).rating);
      let q = makeQuestion(S, test, section, s, lvl, exclude);
      if (!q) { dead.add(s); const alt = skills.filter(x => !dead.has(x)); if (!alt.length) break; s = pick(alt); q = makeQuestion(S, test, section, s, lvl, exclude); if (!q) continue; }
      exclude.add(q.id); if (q.passageId) q.passage = C.passageById.get(q.passageId); out.push(q);
    }
    return out;
  }
  function diagnosticBatch(S) {
    const test = S.profile.targetTest; const level = Math.round(variantLevel(S)); const out = []; const exclude = new Set();
    for (const [section, skills] of Object.entries(C.SECTION_SKILLS[test])) {
      if (['writing', 'essay'].includes(section)) continue; const list = skills.filter(s => s !== 'writing'); const per = section === 'reading' ? 1 : 2;
      for (const s of shuffle(list).slice(0, section === 'reading' ? 4 : Math.min(list.length, 3))) for (let k = 0; k < per; k++) { const q = makeQuestion(S, test, section, s, level, exclude); if (!q) continue; exclude.add(q.id); if (q.passageId) q.passage = C.passageById.get(q.passageId); out.push(q); }
    }
    return shuffle(out).slice(0, 20);
  }

  // ---- hints ----
  const STRATEGY = { synonyms: "Decide the word's charge first (positive, negative, neutral), then test each choice in a sentence you would actually say. Roots and prefixes often give the meaning away.", antonyms: 'Define the word in your own words, then look for the choice that reverses that definition, not one that is merely different.', analogies: 'Write a bridge sentence that links the first pair ("A is a type of B", "A is used to B"). The right answer fits the same sentence with no stretching.', logic: 'Turn the statements into a chain with symbols (>, <, =). If the third statement needs information the chain does not give, it is uncertain.', 'verbal-classification': 'Say what three of the words have in common in one phrase. The odd one is the word that does not fit that phrase.', 'sentence-completion': 'Cover the choices and predict a word from the context clue (contrast, cause, definition, example). Then pick the choice closest to your prediction.', 'main-idea': 'The main idea must cover the whole passage. A choice that is true but describes only one paragraph is too narrow.', detail: 'Go back to the passage and find the exact lines. The answer is stated, not implied; beware of choices that are true in general but not in the text.', inference: 'The right inference is the smallest step from what is written. Eliminate anything extreme (always, never, only) and anything the passage does not support.', 'vocab-in-context': 'Cover the word, read the sentence, and predict a replacement that keeps the meaning. The familiar meaning of the word is often the trap.', 'tone-purpose': 'Ask why the author wrote this and how they feel about it. Look at the adjectives and verbs the author chose.', structure: 'Label each paragraph with a two-word summary. Structure questions ask how those labels relate: compare, sequence, problem-solution, cause-effect.', 'reading-vocab': 'Use the phrase around the word as a clue. Then check charge: is the word used in a positive or negative way?', punctuation: 'Check each sentence for one rule at a time: commas (series, introductory, compound, appositive), apostrophes (possession vs. plural), quotation marks with end punctuation inside.', capitalization: 'Proper nouns and titles used as names get capitals; general words (seasons, directions, school subjects, family words after "my") do not.', usage: 'Find the subject and verb of each sentence first. Then check pronoun case, tense consistency, and modifiers that sit next to the wrong word.', spelling: 'Say each word slowly syllable by syllable and apply the rule: i before e except after c, double the consonant before -ing/-ed after a short vowel, -ible/-able.', composition: 'Find the relationship between the ideas: contrast (however), result (therefore), example (for instance), addition (also). Clarity choices prefer the shortest version that keeps the meaning.', arithmetic: 'Follow order of operations and estimate first so you can spot an answer that is the wrong size. For factors and multiples, list systematically.', 'fractions-decimals': 'Common denominators to add or subtract; multiply straight across; keep-change-flip to divide. Convert to decimals to compare.', 'percent-ratio': 'Write part = percent × whole. For percent change, divide by the ORIGINAL amount. For ratios, find the value of one part first.', algebra: 'Undo operations in reverse order, doing the same thing to both sides. If stuck, plug the answer choices back in.', geometry: 'Draw it. Write the formula before substituting numbers. Angles in a triangle sum to 180°; in a straight line, 180°; around a point, 360°.', 'data-stats': 'Mean = sum ÷ count (so average problems become sum problems). Median needs the list SORTED. Probability = favorable ÷ total.', 'number-series': 'Write the differences between consecutive terms. If they are not constant, check ratios, second differences, or two interleaved patterns.', 'quant-comparison': 'Compute both sides when there are no variables. With variables, plug in 0, 1, a negative, and a fraction before deciding.', 'number-sense': 'Translate the sentence from the inside out: compute the "of" part first, then apply "more than" or "less than" at the end.', 'word-problems': 'Underline what is asked. Name the unknown, write one equation from the sentence, solve, then check the answer against the question.' };
  function hintFor(q, level) {
    level = Math.max(1, Math.min(3, Number(level) || 1));
    if (level === 1) return { level, text: STRATEGY[q.skill] || 'Read the question again slowly and decide exactly what is being asked before looking at the choices.' };
    const wrong = q.choices.map((_, i) => i).filter(i => i !== q.answer); const seed = [...String(q.id)].reduce((a, c) => a + c.charCodeAt(0), 0);
    const order = wrong.slice().sort((a, b) => ((a * 7 + seed) % 11) - ((b * 7 + seed) % 11)); const eliminate = order.slice(0, level - 1);
    return { level, text: level === 2 ? `Cross out choice ${'ABCDE'[eliminate[0]]}: it does not fit. Now compare the remaining choices against the method.` : `Also cross out choice ${'ABCDE'[eliminate[1]]}. Two choices remain. Which one survives the method?`, eliminate };
  }

  // ---- spaced repetition ----
  function sm2(item, quality) {
    let { ease, interval, reps, lapses } = item; ease = ease || 2.5; interval = interval || 0; reps = reps || 0; lapses = lapses || 0;
    if (quality < 3) { reps = 0; interval = 0.5; lapses++; } else { reps++; interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(interval * ease * 10) / 10; }
    ease = Math.max(1.3, ease + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    return { ease, interval, reps, lapses, due: new Date(Date.now() + interval * 864e5).toISOString() };
  }
  function scheduleReview(S, key, kind, payload, wrong = true) {
    const ex = S.reviews[key];
    if (ex) { if (wrong) Object.assign(ex, sm2(ex, 1)); return; }
    S.reviews[key] = { kind, payload, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: new Date(Date.now() + (wrong ? 0.15 : 1) * 864e5).toISOString(), created: nowIso() };
  }
  function pruneSeen(S) { const keys = Object.keys(S.seen); if (keys.length > 1500) { keys.sort((a, b) => S.seen[a] - S.seen[b]); for (const k of keys.slice(0, keys.length - 1200)) delete S.seen[k]; } }

  // ---- attempts ----
  function recordAttempt(S, q, choice, { seconds, confidence, mode, test, hints } = {}) {
    const correct = Number.isInteger(choice) && choice === q.answer; const t = test || (q.test === 'all' ? S.profile.targetTest : q.test);
    const day = todayKey(); const d = S.daily[day] || (S.daily[day] = { n: 0, right: 0, secs: 0 }); d.n++; if (correct) d.right++; d.secs += seconds || 0;
    S.totals.n++; if (correct) S.totals.right++; S.totals.secs += seconds || 0;
    if (confidence) { S.totals.conf = (S.totals.conf || 0) + 1; if ((correct && confidence >= 3) || (!correct && confidence <= 2)) S.totals.calibrated = (S.totals.calibrated || 0) + 1; }
    S.seen[q.id] = Date.now(); pruneSeen(S);
    const rating = updateRating(S, t, q.skill, q.level || 3, correct);
    if (!correct && mode !== 'review') { if (q.generated) scheduleReview(S, `g:${q.id}`, 'question', { full: { ...q, passage: undefined } }, true); else scheduleReview(S, `q:${q.id}`, 'question', { id: q.id }, true); }
    const xpGain = correct ? 10 + (q.level || 3) * 4 - Math.min(hints || 0, 2) * 3 : 2; S.totals.xp = (S.totals.xp || 0) + xpGain;
    const w = S.daily[day]; w.xp = (w.xp || 0) + xpGain; if (hints) w.hints = (w.hints || 0) + 1;
    return { correct, rating, xpGain };
  }

  // ---- mock tests ----
  function tierLevels(tier) { return C.TIERS[tier] ? C.TIERS[tier].levels : C.TIERS.standard.levels; }
  function sampleLevel(levels) { let x = Math.random(); for (const [l, w] of Object.entries(levels)) { x -= w; if (x <= 0) return Number(l); } return Number(Object.keys(levels)[0]); }
  function recommendTier(S, test) {
    const rated = Object.values(S.ratings[test] || {}).filter(r => r.n >= 5);
    if (rated.length < 3) return { tier: 'standard', reason: 'Not enough practice data yet; Standard matches the real test. Do a few practice sets and we will tune this.' };
    const avg = rated.reduce((a, r) => a + r.rating, 0) / rated.length;
    if (avg < 1180) return { tier: 'foundation', reason: `Your average skill rating (${Math.round(avg)}) suggests building fundamentals first.` };
    if (avg < 1380) return { tier: 'standard', reason: `Your average skill rating (${Math.round(avg)}) is right at test level.` };
    if (avg < 1520) return { tier: 'advanced', reason: `Your average skill rating (${Math.round(avg)}) is above test level; stretch with Advanced.` };
    return { tier: 'elite', reason: `Your average skill rating (${Math.round(avg)}) is well above test level. Elite will keep you sharp.` };
  }
  function buildMock(S, { test, variant, tier, length = 'full', section: onlySection }) {
    const bp = (C.BLUEPRINTS[test] || {})[variant]; if (!bp) throw new Error('Unknown test/variant');
    const levels = tierLevels(tier); const factor = length === 'half' ? 0.5 : 1; const exclude = new Set(); const usedPassages = new Set(); const sections = [];
    const recentPassages = new Set(); for (const id of Object.keys(S.seen)) { const q = C.byId.get(id); if (q && q.passageId) recentPassages.add(q.passageId); }
    for (const sec of bp) {
      if (onlySection && sec.section !== onlySection) continue;
      const label = sec.label || C.TESTS[test].sections[sec.section]; const minutes = Math.max(5, Math.round(sec.minutes * factor));
      if (sec.writing) { const prompts = C.writingPrompts.filter(p => p.test === test && Math.abs(p.level - (C.VARIANT_LEVEL[`${test}:${variant}`] || 3)) <= 1.5); const prompt = prompts.length ? pick(prompts) : (C.writingPrompts.filter(p => p.test === test)[0] || C.writingPrompts[0]); sections.push({ section: sec.section, label, minutes, writing: true, prompt: prompt || { id: 'generic', prompt: 'Write about a time you learned something important. Explain what happened and why it mattered.', minutes }, questions: [] }); continue; }
      const questions = []; const passages = {}; const total = Math.max(1, Math.round(sec.count * factor));
      if (sec.passages) { const need = Math.round(sec.passages * factor); const pool = C.passages.filter(p => (p.test === test || p.test === 'all') && !usedPassages.has(p.id)); const score = (p) => Math.min(...Object.keys(levels).map(l => Math.abs(p.level - Number(l)) * (1 - levels[l]))) * 10 + (recentPassages.has(p.id) ? 40 : 0) + (p.test === test ? -3 : 0) + Math.random() * 10; pool.sort((a, b) => score(a) - score(b)); let got = 0; for (const p of pool) { if (got >= need) break; const qs = C.questions.filter(q => q.passageId === p.id); if (!qs.length) continue; usedPassages.add(p.id); passages[p.id] = p; for (const q of qs) { if (got >= need) break; questions.push({ ...q }); exclude.add(q.id); got++; } } }
      if (sec.mix) { const mixTotal = Object.values(sec.mix).reduce((a, b) => a + b, 0); const target = total - questions.length; const alloc = {}; let allocated = 0; for (const [s, c] of Object.entries(sec.mix)) { alloc[s] = Math.floor(c / mixTotal * target); allocated += alloc[s]; } const keys = Object.keys(sec.mix); let i = 0; while (allocated < target) { alloc[keys[i % keys.length]]++; allocated++; i++; } const order = []; for (const [s, c] of Object.entries(alloc)) for (let k = 0; k < c; k++) order.push(s); const seq = ['verbal', 'quant', 'language'].includes(sec.section) ? order : shuffle(order); for (const s of seq) { const q = makeQuestion(S, test, sec.section, s, sampleLevel(levels), exclude); if (!q) continue; exclude.add(q.id); questions.push(q); } }
      questions.forEach((q, idx) => { q.n = idx + 1; }); sections.push({ section: sec.section, label, minutes, questions, passages });
    }
    return { test, variant, tier, length, sections };
  }
  function estimatePercentile(pct, tier) { const adj = pct + ({ foundation: -12, standard: 0, advanced: 7, elite: 14 }[tier] || 0); return Math.max(1, Math.min(99, Math.round(100 / (1 + Math.exp(-(adj - 62) / 9))))); }
  function scoreMock(mock, responses) {
    const penalty = C.TESTS[mock.test].penalty; const out = { sections: [], skills: {}, totalRight: 0, totalWrong: 0, totalBlank: 0, totalCount: 0 };
    for (const sec of mock.sections) {
      if (sec.writing) { const text = responses[`w:${sec.section}`] || ''; out.sections.push({ section: sec.section, label: sec.label, writing: true, text, wordCount: String(text).trim().split(/\s+/).filter(Boolean).length }); continue; }
      let right = 0, wrong = 0, blank = 0; const items = [];
      for (const q of sec.questions) { const choice = responses[q.id]; const answered = Number.isInteger(choice); const correct = answered && choice === q.answer; if (!answered) blank++; else if (correct) right++; else wrong++; const sk = out.skills[q.skill] || (out.skills[q.skill] = { right: 0, total: 0, name: C.SKILL_NAMES[q.skill] || q.skill }); sk.total++; if (correct) sk.right++; items.push({ n: q.n, id: q.id, skill: q.skill, level: q.level, choice: answered ? choice : null, answer: q.answer, correct, stem: q.stem, choices: q.choices, explanation: q.explanation, passageId: q.passageId || null }); }
      const count = sec.questions.length; const raw = penalty ? right - 0.25 * wrong : right; const pct = count ? Math.round(right / count * 100) : 0;
      out.sections.push({ section: sec.section, label: sec.label, count, right, wrong, blank, raw: Math.round(raw * 100) / 100, pct, percentile: estimatePercentile(pct, mock.tier), items, passages: sec.passages });
      out.totalRight += right; out.totalWrong += wrong; out.totalBlank += blank; out.totalCount += count;
    }
    out.pct = out.totalCount ? Math.round(out.totalRight / out.totalCount * 100) : 0; out.percentile = estimatePercentile(out.pct, mock.tier); out.raw = penalty ? Math.round((out.totalRight - 0.25 * out.totalWrong) * 100) / 100 : out.totalRight; out.penalty = penalty;
    const arr = Object.entries(out.skills).map(([k, v]) => ({ skill: k, ...v, pct: Math.round(v.right / v.total * 100) })).sort((a, b) => a.pct - b.pct);
    out.weakest = arr.filter(s => s.total >= 3).slice(0, 3); out.strongest = arr.filter(s => s.total >= 3).slice(-3).reverse(); return out;
  }

  // ---- progress / plan / gamification ----
  function streakOf(daily) { let streak = 0; const d = new Date(); for (let i = 0; i < 400; i++) { const k = dayOf(d); if (daily[k] && daily[k].n > 0) streak++; else if (i > 0) break; d.setDate(d.getDate() - 1); } return streak; }
  function dueCount(S) { const now = Date.now(); return Object.values(S.reviews).filter(r => new Date(r.due).getTime() <= now).length; }
  function xpFor(S) { return S.totals.xp || 0; }
  function xpSince(S, days) { const cutoff = new Date(Date.now() - days * 864e5); let xp = 0; for (const [k, v] of Object.entries(S.daily)) if (new Date(k + 'T12:00:00') >= cutoff) xp += v.xp || 0; return xp; }
  const levelFor = (xp) => Math.floor(Math.sqrt(xp / 120)) + 1; const xpForLevel = (lvl) => (lvl - 1) * (lvl - 1) * 120;
  function progressSummary(S, mocksIndex = []) {
    const test = S.profile.targetTest; const R = S.ratings[test] || {};
    const skills = Object.entries(R).map(([skill, r]) => ({ skill, name: C.SKILL_NAMES[skill] || skill, rating: Math.round(r.rating), n: r.n, streak: r.streak, mastery: mastery(r.rating), level: targetLevel(r.rating) }));
    const bySection = {}; for (const [sec, list] of Object.entries(C.SECTION_SKILLS[test])) { const rows = skills.filter(s => list.includes(s.skill)); bySection[sec] = { name: C.TESTS[test].sections[sec], skills: list.filter(s => s !== 'writing').map(s => skills.find(x => x.skill === s) || { skill: s, name: C.SKILL_NAMES[s], rating: null, n: 0, mastery: null }), mastery: rows.length ? Math.round(rows.reduce((a, b) => a + b.mastery, 0) / rows.length) : null }; }
    const cutoff = new Date(Date.now() - 60 * 864e5); const daily = Object.entries(S.daily).filter(([k]) => new Date(k + 'T12:00:00') >= cutoff).sort().map(([day, v]) => ({ day, ...v }));
    const week = new Date(Date.now() - 7 * 864e5); const recent = daily.filter(d => new Date(d.day + 'T12:00:00') >= week).reduce((a, d) => ({ n: a.n + d.n, right: a.right + d.right }), { n: 0, right: 0 });
    const today = (S.daily[todayKey()] || { n: 0 }).n; const streak = streakOf(S.daily); const due = dueCount(S);
    const lessonsDone = Object.entries(S.lessons).map(([lesson_id, v]) => ({ lesson_id, ...v }));
    const recs = [];
    if (due > 0) recs.push({ type: 'review', title: `Review ${due} due item${due > 1 ? 's' : ''}`, why: 'Spaced retrieval of recent misses is the highest-return 10 minutes you can spend.', action: { page: 'review' } });
    const weak = skills.filter(s => s.n >= 2).sort((a, b) => a.mastery - b.mastery).slice(0, 2);
    for (const w of weak) { const lesson = C.lessons.find(l => l.skill === w.skill && (l.test === test || l.test === 'all') && !(S.lessons[l.id] && S.lessons[l.id].status === 'completed')); if (lesson) recs.push({ type: 'lesson', title: `Lesson: ${lesson.title}`, why: `${w.name} is your weakest area (est. ${w.mastery}% on test-level items).`, action: { page: 'lesson', id: lesson.id } }); else recs.push({ type: 'practice', title: `Drill ${w.name}`, why: `Estimated ${w.mastery}% accuracy on test-level items. Targeted practice will move this fastest.`, action: { page: 'practice', skill: w.skill } }); }
    if (!skills.length) recs.push({ type: 'practice', title: 'Take a 10-question diagnostic', why: 'We calibrate every skill from your first answers; nothing is wasted.', action: { page: 'practice' } });
    const completed = mocksIndex.filter(m => m.status === 'completed'); const lastMock = completed[0];
    if (!lastMock || (Date.now() - new Date(lastMock.completed_at).getTime()) > 7 * 864e5) recs.push({ type: 'mock', title: lastMock ? 'Time for a mock test' : 'Take your first mock test', why: lastMock ? 'It has been over a week. Weekly timed practice keeps pacing sharp.' : 'A baseline mock tells us exactly where you stand.', action: { page: 'mock' } });
    return { test, skills, bySection, daily, totals: S.totals, recent, today, streak, due, mocks: mocksIndex, lessonsDone, recommendations: recs.slice(0, 4), tierRecommendation: recommendTier(S, test) };
  }
  function buildPlan(S) {
    const test = S.profile.targetTest; const p = progressSummary(S);
    let horizon = S.profile.testDate ? Math.ceil((new Date(S.profile.testDate) - Date.now()) / 864e5) : null; if (horizon === null || horizon < 7) horizon = horizon === null ? 42 : 7; horizon = Math.min(horizon, 120);
    const done = new Set(p.lessonsDone.filter(l => l.status === 'completed').map(l => l.lesson_id));
    const skillOrder = p.skills.slice().sort((a, b) => a.mastery - b.mastery).map(s => s.skill); const allSkills = [...new Set(Object.values(C.SECTION_SKILLS[test]).flat())].filter(s => s !== 'writing'); for (const s of allSkills) if (!skillOrder.includes(s)) skillOrder.push(s);
    const lessonQueue = []; for (const s of skillOrder) lessonQueue.push(...C.lessons.filter(l => l.skill === s && (l.test === test || l.test === 'all') && !done.has(l.id))); for (const l of C.lessons) if ((l.test === test || l.test === 'all') && !done.has(l.id) && !lessonQueue.includes(l)) lessonQueue.push(l);
    const hasWriting = test !== 'hspt'; const days = []; let li = 0; let di = 0; const start = new Date(); start.setHours(0, 0, 0, 0);
    for (let d = 0; d < horizon; d++) {
      const date = dayOf(new Date(start.getTime() + d * 864e5 + 12 * 3600e3)); const items = []; const daysLeft = horizon - d;
      if (d === 0 && !S.profile.diagnosticDone) items.push({ type: 'diagnostic', label: 'Diagnostic: 20 questions to calibrate your plan', minutes: 15 });
      items.push({ type: 'review', label: 'Spaced review (what is due)', minutes: 8 });
      if (d > 0 && d % 7 === 6 && daysLeft > 0) items.push({ type: 'mock', label: d < 14 ? 'Half-length mock test' : 'Full-length mock test', minutes: d < 14 ? 75 : 150, length: d < 14 ? 'half' : 'full' });
      else { const lesson = lessonQueue[li]; if (lesson) { items.push({ type: 'lesson', ref: lesson.id, label: `Lesson: ${lesson.title}`, minutes: lesson.minutes, skill: lesson.skill }); li = (li + 1) % Math.max(1, lessonQueue.length); } const skill = skillOrder[di % skillOrder.length]; di++; items.push({ type: 'drill', ref: skill, label: `Drill: ${C.SKILL_NAMES[skill]} (10 questions)`, minutes: 10 }); if (d % 2 === 1) items.push({ type: 'drill', label: 'Adaptive mix (10 questions)', minutes: 10 }); if (hasWriting && d % 7 === 3) items.push({ type: 'writing', label: 'Timed writing practice', minutes: 25 }); items.push({ type: 'vocab', label: 'Vocabulary: 10 new words', minutes: 5 }); }
      if (daysLeft === 1) items.splice(0, items.length, { type: 'review', label: 'Light review only: due items and your error log', minutes: 15 }, { type: 'rest', label: 'Rest. Pack two pencils, a snack and your admission ticket. Sleep early.', minutes: 0 });
      days.push({ date, items: items.map(it => ({ ...it, done: false })) });
    }
    return { test, generatedAt: nowIso(), horizonDays: horizon, testDate: S.profile.testDate || null, days };
  }
  function markDone(S, date, index, type) { const plan = S.plan; if (!plan) return null; const day = plan.days.find(x => x.date === date) || plan.days.find(x => x.date === todayKey()); if (!day) return plan; if (Number.isInteger(index) && day.items[index]) day.items[index].done = true; else if (type) { const it = day.items.find(i => i.type === type && !i.done); if (it) it.done = true; } return plan; }
  const BADGES = [
    { id: 'first-steps', name: 'First Steps', desc: 'Answer your first 10 questions', icon: '🌱', test: (s) => s.attempts >= 10 }, { id: 'century', name: 'Century', desc: '100 questions answered', icon: '💯', test: (s) => s.attempts >= 100 }, { id: 'marathon', name: 'Marathon', desc: '500 questions answered', icon: '🏃', test: (s) => s.attempts >= 500 }, { id: 'thousand', name: 'Thousand', desc: '1,000 questions answered', icon: '🏔', test: (s) => s.attempts >= 1000 },
    { id: 'streak-3', name: 'Warming Up', desc: '3-day streak', icon: '🔥', test: (s) => s.streak >= 3 }, { id: 'streak-7', name: 'On Fire', desc: '7-day streak', icon: '🔥', test: (s) => s.streak >= 7 }, { id: 'streak-30', name: 'Unstoppable', desc: '30-day streak', icon: '☄️', test: (s) => s.streak >= 30 },
    { id: 'diagnostic', name: 'Calibrated', desc: 'Complete the diagnostic', icon: '🎯', test: (s) => s.diagnostic }, { id: 'first-mock', name: 'Test Day Rehearsal', desc: 'Finish a mock test', icon: '⏱', test: (s) => s.mocks >= 1 }, { id: 'mock-80', name: 'Top Form', desc: 'Score 80% or higher on a mock test', icon: '🏆', test: (s) => s.bestMock >= 80 }, { id: 'mock-90', name: 'Elite', desc: 'Score 90% or higher on a mock test', icon: '👑', test: (s) => s.bestMock >= 90 },
    { id: 'scholar', name: 'Scholar', desc: 'Complete 5 lessons', icon: '📘', test: (s) => s.lessons >= 5 }, { id: 'professor', name: 'Professor', desc: 'Complete 20 lessons', icon: '🎓', test: (s) => s.lessons >= 20 }, { id: 'mastery', name: 'Mastery', desc: 'Reach 85% mastery in any skill (15+ questions)', icon: '⭐', test: (s) => s.topMastery >= 85 },
    { id: 'wordsmith', name: 'Wordsmith', desc: 'Review 50 vocabulary cards', icon: '📖', test: (s) => s.vocabReviews >= 50 }, { id: 'writer', name: 'Writer', desc: 'Submit 3 writing responses', icon: '✍️', test: (s) => s.writings >= 3 }, { id: 'social', name: 'Study Buddy', desc: 'Add a friend', icon: '🤝', test: (s) => s.friends >= 1 }, { id: 'calibrated-mind', name: 'Know Thyself', desc: '20 answers where confidence matched the result', icon: '🧠', test: (s) => s.calibrated >= 20 }
  ];
  function checkBadges(S, ctx) {
    const best = (ctx.mocks || []).filter(m => m.status === 'completed').reduce((a, m) => Math.max(a, (m.results && m.results.pct) || 0), 0);
    const R = S.ratings[S.profile.targetTest] || {};
    const s = { attempts: S.totals.n, streak: streakOf(S.daily), diagnostic: !!S.profile.diagnosticDone, mocks: (ctx.mocks || []).filter(m => m.status === 'completed').length, bestMock: best, lessons: Object.values(S.lessons).filter(l => l.status === 'completed').length, topMastery: Math.max(0, ...Object.values(R).filter(r => r.n >= 15).map(r => mastery(r.rating))), vocabReviews: Object.values(S.reviews).filter(r => r.kind === 'vocab').reduce((a, r) => a + (r.reps || 0), 0), writings: ctx.writings || 0, friends: ctx.friends || 0, calibrated: S.totals.calibrated || 0 };
    const fresh = []; for (const b of BADGES) if (!S.badges[b.id] && b.test(s)) { S.badges[b.id] = nowIso(); fresh.push({ id: b.id, name: b.name, desc: b.desc, icon: b.icon }); } return fresh;
  }
  const badgeList = (S) => BADGES.map(b => ({ id: b.id, name: b.name, desc: b.desc, icon: b.icon, earnedAt: S.badges[b.id] || null }));
  function publicStats(S) { const xp = xpFor(S); const week = new Date(Date.now() - 7 * 864e5); let n = 0, right = 0; for (const [k, v] of Object.entries(S.daily)) if (new Date(k + 'T12:00:00') >= week) { n += v.n; right += v.right; } return { display_name: S.profile.displayName, username: S.profile.username, test: S.profile.targetTest, xp, week_xp: xpSince(S, 7), level: levelFor(xp), streak: streakOf(S.daily), badges: Object.keys(S.badges).length, week_questions: n, week_accuracy: n ? Math.round(right / n * 100) : null }; }

  // ---- built-in tutor ----
  const tutorName = (S) => S.profile.tutorName || 'Coach Ada';
  function findVocab(word) { const w = word.toLowerCase(); return C.vocab.find(v => v.word.toLowerCase() === w) || null; }
  function findLesson(S, text) { const t = text.toLowerCase(); const scored = C.lessons.filter(l => l.test === S.profile.targetTest || l.test === 'all').map(l => { let s = 0; const hay = (l.title + ' ' + (C.SKILL_NAMES[l.skill] || '') + ' ' + l.skill).toLowerCase(); for (const w of t.split(/\W+/).filter(x => x.length > 3)) if (hay.includes(w)) s += w.length; return [s, l]; }).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]); return scored.length ? scored[0][1] : null; }
  function studentContextText(S, p) { const weak = p.skills.filter(s => s.n >= 2).sort((a, b) => a.mastery - b.mastery).slice(0, 3); const strong = p.skills.filter(s => s.n >= 2).sort((a, b) => b.mastery - a.mastery).slice(0, 3); const t = C.TESTS[S.profile.targetTest]; return { weak, strong, text: `Student: ${S.profile.displayName}${S.profile.grade ? ', grade ' + S.profile.grade : ''}. Preparing for the ${t.name} (${t.variants[S.profile.variant] || S.profile.variant})${S.profile.testDate ? ', test date ' + S.profile.testDate : ''}. ${p.totals.n} questions answered all-time, ${p.recent.n ? Math.round(p.recent.right / p.recent.n * 100) + '% accuracy' : 'no activity'} in the last 7 days, streak ${p.streak} days, ${p.due} reviews due. Weakest skills: ${weak.map(s => `${s.name} (${s.mastery}% mastery)`).join(', ') || 'not yet measured'}. Strongest: ${strong.map(s => `${s.name} (${s.mastery}%)`).join(', ') || 'not yet measured'}.` }; }
  function builtinReply(S, message, ctx, qc, p) {
    const name = tutorName(S); const m = message.toLowerCase(); const t = C.TESTS[S.profile.targetTest];
    const vocabMatch = /(?:what does|define|meaning of|what is)\s+["“']?([a-z-]+)["”']?\s*(?:mean)?\??$/i.exec(message.trim());
    if (vocabMatch) { const v = findVocab(vocabMatch[1]); if (v) return { reply: `**${v.word}** (${v.pos}): ${v.definition}\n\nExample: *${v.example}*\n\nSynonyms: ${v.synonyms.join(', ')}${v.antonyms && v.antonyms.length ? `. Antonyms: ${v.antonyms.join(', ')}` : ''}.${v.roots ? `\n\nRoot clue: ${v.roots}` : ''}`, actions: [{ label: 'Open vocabulary', href: '#/vocab' }] }; }
    if (qc && /hint|stuck|clue|help me|where do i start|how do i start|don't know|dont know|no idea/.test(m)) { const lvl = Math.min(3, (Number(ctx.hintsUsed) || 0) + 1); const h = hintFor(qc.q, lvl); return { reply: `${lvl === 1 ? 'Here is the method, not the answer:' : lvl === 2 ? 'Let me narrow it down:' : 'Last hint:'} ${h.text}${lvl < 3 ? '\n\nTry it. If you are still stuck, ask for another hint.' : '\n\nCommit to one of the two and check it. Being wrong after reasoning is more useful than being right by guessing.'}`, hint: h }; }
    if (qc && /why|explain|wrong|understand|don't get|dont get|confus|walk me|show me|answer/.test(m)) { if (qc.answered) return { reply: `${qc.choice === qc.q.answer ? 'You got it. Here is the reasoning so it sticks:' : 'Here is where it went wrong and why:'}\n\n${qc.q.explanation}\n\nThe skill here is **${C.SKILL_NAMES[qc.q.skill]}**. ${STRATEGY[qc.q.skill] ? 'Method to remember: ' + STRATEGY[qc.q.skill] : ''}`, actions: [{ label: `Drill ${C.SKILL_NAMES[qc.q.skill]}`, href: `#/practice?skill=${qc.q.skill}&auto=1` }] }; const h = hintFor(qc.q, 1); return { reply: `I will not give it away before you try; that is how it sticks. Here is the method: ${h.text}\n\nMake your best choice and check it. Then ask me "why" and I will walk through the full reasoning.`, hint: h }; }
    if (/what should i (study|do|practice|work on)|what('s| is) next|plan|where am i|how am i doing|progress/.test(m)) { const { weak } = studentContextText(S, p); const lines = [`Here is the picture, ${S.profile.displayName}:`]; if (!p.totals.n) lines.push('You have not answered anything yet, so start with the diagnostic. Twenty questions and I will know exactly where to focus.'); else { lines.push(`${p.totals.n} questions so far, ${p.streak}-day streak, ${p.due} reviews due.`); if (weak.length) lines.push(`Your weakest areas are ${weak.map(s => `${s.name} (${s.mastery}%)`).join(', ')}. That is where the fastest gains are.`); } for (const r of p.recommendations) lines.push(`• ${r.title}: ${r.why}`); return { reply: lines.join('\n'), actions: [{ label: "Today's session", href: '#/session' }, { label: 'Progress', href: '#/progress' }] }; }
    if (/nervous|anxious|anxiety|scared|stress|worried|panic/.test(m)) return { reply: `Nerves are normal and they are not the enemy; they mean you care. Three things that work, backed by research:\n\n1. **Rehearse the day.** Full-length mocks under real timing make the real thing feel familiar. Familiar things are not scary.\n2. **Have a first move.** On every section, your first move is fixed: read the question, decide what is asked, then look at choices. A routine crowds out panic.\n3. **Reframe the feeling.** Say "I'm excited" instead of "I'm nervous." It sounds silly, but studies show it improves performance because the body feels the same either way.\n\nAnd the night before: sleep, not cramming. You know more than you think.`, actions: [{ label: 'Take a mock test', href: '#/mock' }] };
    if (/guess|penalty|skip|leave (it )?blank/.test(m)) return { reply: t.penalty ? `On the SSAT a wrong answer costs ¼ point and a blank costs nothing. The math: if you can eliminate even one choice, guessing is worth it on average. If you truly cannot eliminate anything, leave it blank. In practice, you can almost always eliminate one.` : `On the ${t.name} there is no penalty for wrong answers, so never leave a question blank. If time is running out, fill in the rest with your "letter of the day" and move on.`, actions: [{ label: 'Lessons', href: '#/learn' }] };
    if (/time|pacing|fast|slow|run out/.test(m)) { const bp = C.BLUEPRINTS[S.profile.targetTest][S.profile.variant] || []; return { reply: `Pacing for the ${t.name}:\n${bp.filter(s => !s.writing).map(s => `• ${s.label || t.sections[s.section]}: ${s.count} questions in ${s.minutes} min, about ${Math.round(s.minutes * 60 / s.count)} seconds each`).join('\n')}\n\nThe rule: two passes. First pass, answer what you can in under the average time and flag the rest. Second pass, return to flags. Never let one question eat three questions' worth of time.`, actions: [{ label: 'Practice under time', href: '#/mock' }] }; }
    if (/how (do|to|can) i|teach me|lesson|learn/.test(m)) { const l = findLesson(S, message); if (l) return { reply: `Good question. I have a lesson built exactly for that: **${l.title}** (${l.minutes} minutes). It covers: ${l.objectives.slice(0, 2).join('; ')}.\n\nWork through the worked example slowly and do the check at the end; I will log it to your progress.`, actions: [{ label: 'Open the lesson', href: `#/lesson/${l.id}` }] }; }
    if (/^(hi|hello|hey|yo|sup)\b/.test(m)) return { reply: `Hi ${S.profile.displayName}. I am ${name}, your ${t.name} tutor. Ask me for a hint on any question, ask "why" after you answer, ask what a word means, or ask what you should study next. What are we working on?`, actions: [{ label: "Today's session", href: '#/session' }] };
    if (qc) return { reply: `I am looking at this ${C.SKILL_NAMES[qc.q.skill]} question with you. You can ask me for a **hint** (I will not spoil it), or answer first and then ask **why** for the full reasoning.`, actions: [] };
    return { reply: `I can help with:\n• **Hints** on the question in front of you ("give me a hint")\n• **Explanations** after you answer ("why is that right?")\n• **Vocabulary** ("what does *candid* mean?")\n• **Your plan** ("what should I study?")\n• **Strategy** (guessing, pacing, nerves)`, actions: [{ label: "Today's session", href: '#/session' }] };
  }
  function tutorSystemPrompt(S, p, qc) {
    const sc = studentContextText(S, p); const t = C.TESTS[S.profile.targetTest];
    let s = `You are ${tutorName(S)}, a world-class private tutor for the ${t.name} (${t.fullName}) on Ascend Prep. You teach the way the best tutors do: Socratic, warm, precise, never condescending. Your student is a middle-school or early high-school student.\n\n${sc.text}\n\nTest facts: ${t.penalty ? 'SSAT: wrong answers cost 1/4 point, blanks cost nothing.' : `${t.name}: no guessing penalty.`} Sections: ${Object.values(t.sections).join(', ')}.\n\nHow you teach:\n- Keep replies short (under 120 words) unless the student asks for a full walkthrough. One idea at a time. Ask a guiding question when it helps the student think.\n- If a current question is provided and the student has NOT answered it yet, never reveal the correct answer or the letter. Give the method, then a narrowing hint, then eliminate one choice. Only after they answer, explain fully.\n- When explaining, name the skill, the method, and the trap. End with one sentence they can reuse on similar questions.\n- Use plain language. Light markdown only (bold, short lists). No headings.\n- Encourage effort over talent. Never shame a wrong answer. Stay on the topic of test preparation and study skills.`;
    if (qc) s += `\n\nCURRENT QUESTION (skill: ${C.SKILL_NAMES[qc.q.skill]}, level ${qc.q.level}/5):\n${qc.passage ? 'PASSAGE: ' + qc.passage.title + '\n' + qc.passage.text + '\n\n' : ''}${qc.q.stem}\nChoices: ${qc.q.choices.map((c, i) => `${'ABCDE'[i]}) ${c}`).join('  ')}\nCorrect answer: ${'ABCDE'[qc.q.answer]}\nOfficial explanation: ${qc.q.explanation}\nStudent status: ${qc.answered ? `answered ${qc.choice !== null ? 'ABCDE'[qc.choice] : 'nothing'} (${qc.choice === qc.q.answer ? 'correct' : 'incorrect'}); you may explain fully now.` : 'has NOT answered yet; do not reveal the answer.'}`;
    return s;
  }

  return { C, LEVEL_RATING, mastery, todayKey, dayOf, ratingFor, targetLevel, practiceBatch, diagnosticBatch, hintFor, STRATEGY, sm2, scheduleReview, recordAttempt, recommendTier, buildMock, scoreMock, progressSummary, buildPlan, markDone, BADGES, checkBadges, badgeList, publicStats, xpFor, xpSince, levelFor, xpForLevel, streakOf, dueCount, tutorName, builtinReply, tutorSystemPrompt };
})();

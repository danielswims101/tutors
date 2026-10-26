'use strict';
/* Trainers: vocabulary quizzes, flashcard decks (vocab, word parts, math facts, custom), math speed sprints. */
window.AscendTrainer = (function () {
  const A = window.Ascend; const C = A.C; const { ri, pick, shuffle } = C.generators.util;
  const nowIso = () => new Date().toISOString();
  const T = (S) => { S.training = S.training || {}; S.training.vocab = S.training.vocab || {}; S.training.math = S.training.math || { sprints: [] }; return S.training; };
  const cardsOf = (S) => { S.cards = S.cards || {}; S.cards.decks = S.cards.decks || {}; S.cards.items = S.cards.items || {}; return S.cards; };
  const gid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  // ---------- vocabulary pools ----------
  function vocabPool(S, { level, source, deckWords }) {
    let pool = C.vocab.slice();
    if (level) pool = pool.filter(v => v.level === Number(level));
    if (source === 'deck') { const set = new Set(Object.keys(S.reviews).filter(k => k.startsWith('v:')).map(k => k.slice(2))); pool = pool.filter(v => set.has(v.word)); }
    if (source === 'weak') { const st = T(S).vocab; pool = pool.filter(v => st[v.word] && st[v.word].seen >= 2 && st[v.word].right / st[v.word].seen < 0.75); }
    if (Array.isArray(deckWords)) { const set = new Set(deckWords); pool = pool.filter(v => set.has(v.word)); }
    return pool;
  }
  function weightedPick(S, pool, n) {
    const st = T(S).vocab; const scored = pool.map(v => { const s = st[v.word]; let w = 1; if (!s) w = 2.2; else { const acc = s.right / Math.max(1, s.seen); w = 0.6 + (1 - acc) * 2.5; if (Date.now() - new Date(s.lastAt).getTime() < 3600e3) w *= 0.3; } return [w * (0.6 + Math.random()), v]; });
    scored.sort((a, b) => b[0] - a[0]); return scored.slice(0, n).map(x => x[1]);
  }
  const others = (word, pool, n, key, exclude = new Set()) => shuffle(pool.filter(v => v.word !== word.word && !exclude.has(v[key]) && Math.abs(v.level - word.level) <= 1)).slice(0, n);
  function defQuiz(w, pool) { const ds = others(w, pool, 3, 'definition'); if (ds.length < 3) return null; const choices = shuffle([w.definition, ...ds.map(d => d.definition)]); return { type: 'definition', stem: w.word.toUpperCase(), prompt: 'Choose the best definition.', choices, answer: choices.indexOf(w.definition) }; }
  function wordQuiz(w, pool) { const ds = others(w, pool, 3, 'word'); if (ds.length < 3) return null; const choices = shuffle([w.word, ...ds.map(d => d.word)]); return { type: 'word', stem: w.definition, prompt: 'Which word matches this definition?', choices, answer: choices.indexOf(w.word) }; }
  function synQuiz(w, pool) { if (!w.synonyms || !w.synonyms.length) return null; const mine = new Set([w.word, ...w.synonyms, ...(w.antonyms || [])]); const d = shuffle(pool.filter(v => v.word !== w.word && v.synonyms && v.synonyms.length).flatMap(v => v.synonyms).filter(s => !mine.has(s))); const ds = [...new Set(d)].slice(0, 3); if (ds.length < 3) return null; const correct = pick(w.synonyms); const choices = shuffle([correct, ...ds]); return { type: 'synonym', stem: w.word.toUpperCase(), prompt: 'Choose the synonym.', choices, answer: choices.indexOf(correct) }; }
  function antQuiz(w, pool) { if (!w.antonyms || !w.antonyms.length) return null; const mine = new Set([w.word, ...w.synonyms, ...w.antonyms]); const d = [...new Set(shuffle(pool.filter(v => v.word !== w.word).flatMap(v => (v.synonyms || []).slice(0, 1)).filter(s => !mine.has(s))))].slice(0, 3); if (d.length < 3) return null; const correct = pick(w.antonyms); const choices = shuffle([correct, ...d]); return { type: 'antonym', stem: w.word.toUpperCase(), prompt: 'Choose the OPPOSITE.', choices, answer: choices.indexOf(correct) }; }
  function blankQuiz(w, pool) { const re = new RegExp(`\\b${w.word.replace(/[-\\/\\^$*+?.()|[\\]{}]/g, '\\$&')}\\w*`, 'i'); if (!re.test(w.example)) return null; const sentence = w.example.replace(re, '______'); const ds = others(w, pool, 3, 'word').filter(v => v.pos === w.pos); if (ds.length < 3) return null; const choices = shuffle([w.word, ...ds.map(d => d.word)]); return { type: 'blank', stem: sentence, prompt: 'Fill in the blank.', choices, answer: choices.indexOf(w.word) }; }
  function spellQuiz(w) { return { type: 'spell', stem: w.definition, prompt: `Type the word. It starts with "${w.word[0]}" and has ${w.word.length} letters.`, input: true, answer: w.word }; }
  const QUIZ_TYPES = { definition: defQuiz, word: wordQuiz, synonym: synQuiz, antonym: antQuiz, blank: blankQuiz, spell: (w) => spellQuiz(w) };
  function vocabQuiz(S, { level, source, deckWords, count = 10, types }) {
    const pool = vocabPool(S, { level, source, deckWords }); const all = C.vocab; if (!pool.length) return [];
    const typeList = (types && types.length ? types : ['definition', 'word', 'synonym', 'blank', 'antonym', 'spell']).filter(t => QUIZ_TYPES[t]);
    const words = weightedPick(S, pool, count); const out = [];
    for (const w of words) { let item = null; for (const t of shuffle(typeList)) { item = QUIZ_TYPES[t](w, all); if (item) break; } if (!item) item = defQuiz(w, all) || spellQuiz(w); out.push({ ...item, word: w.word, level: w.level, explanation: `${w.word} (${w.pos}): ${w.definition}. Example: ${w.example}${w.synonyms && w.synonyms.length ? ' Synonyms: ' + w.synonyms.join(', ') + '.' : ''}${w.roots ? ' Root: ' + w.roots : ''}` }); }
    return out;
  }
  function rootQuiz(S, count = 10) { const roots = C.roots || []; return shuffle(roots).slice(0, count).map(r => { if (Math.random() < 0.5) { const ds = shuffle(roots.filter(x => x.meaning !== r.meaning)).slice(0, 3).map(x => x.meaning); const choices = shuffle([r.meaning, ...ds]); return { type: 'root', stem: r.part, prompt: `What does this ${r.kind} mean?`, choices, answer: choices.indexOf(r.meaning), word: r.part, level: 3, explanation: `${r.part} (${r.kind}) means "${r.meaning}", as in ${r.examples.join(', ')}.` }; } const correct = pick(r.examples); const ds = shuffle(roots.filter(x => x !== r).flatMap(x => x.examples)).slice(0, 3); const choices = shuffle([correct, ...ds]); return { type: 'root-word', stem: `${r.part} = "${r.meaning}"`, prompt: `Which word is built on this ${r.kind}?`, choices, answer: choices.indexOf(correct), word: r.part, level: 3, explanation: `${correct} contains ${r.part} ("${r.meaning}"). Other examples: ${r.examples.filter(e => e !== correct).join(', ')}.` }; }); }
  function recordVocab(S, word, correct) { const st = T(S).vocab; const s = st[word] || (st[word] = { seen: 0, right: 0, streak: 0 }); s.seen++; if (correct) { s.right++; s.streak = Math.max(1, s.streak + 1); } else s.streak = 0; s.lastAt = nowIso(); }
  function recordLight(S, correct, xp, secs) { const day = A.todayKey(); const d = S.daily[day] || (S.daily[day] = { n: 0, right: 0, secs: 0 }); d.n++; if (correct) d.right++; d.secs += secs || 0; d.xp = (d.xp || 0) + xp; S.totals.n++; if (correct) S.totals.right++; S.totals.secs += secs || 0; S.totals.xp = (S.totals.xp || 0) + xp; }
  function vocabStats(S) { const st = T(S).vocab; const byLevel = [1, 2, 3, 4, 5].map(l => { const words = C.vocab.filter(v => v.level === l); const seen = words.filter(v => st[v.word]); const mastered = words.filter(v => { const s = st[v.word]; return s && s.seen >= 3 && s.right / s.seen >= 0.8; }); return { level: l, total: words.length, seen: seen.length, mastered: mastered.length }; }); const weak = Object.entries(st).filter(([, s]) => s.seen >= 2 && s.right / s.seen < 0.75).map(([w, s]) => ({ word: w, seen: s.seen, right: s.right, def: (C.vocab.find(v => v.word === w) || {}).definition })).sort((a, b) => a.right / a.seen - b.right / b.seen).slice(0, 12); const totalSeen = Object.keys(st).length; const totalRight = Object.values(st).reduce((a, s) => a + s.right, 0); const totalSeenN = Object.values(st).reduce((a, s) => a + s.seen, 0); const inDeck = Object.keys(S.reviews).filter(k => k.startsWith('v:')).length; const day = new Date(); const wotd = C.vocab[(day.getFullYear() * 366 + day.getMonth() * 31 + day.getDate()) % C.vocab.length]; return { byLevel, weak, totalSeen, accuracy: totalSeenN ? Math.round(totalRight / totalSeenN * 100) : null, inDeck, totalWords: C.vocab.length, roots: (C.roots || []).length, wordOfDay: wotd }; }

  // ---------- flashcard decks ----------
  const FACT_DECKS = {
    'facts:times': { name: 'Times tables 2–12', desc: 'Instant recall of every product to 12 × 12.', build: () => { const out = []; for (let a = 2; a <= 12; a++) for (let b = a; b <= 12; b++) out.push({ id: `times-${a}x${b}`, front: `${a} × ${b}`, back: String(a * b) }); return out; } },
    'facts:squares': { name: 'Squares and cubes', desc: 'Squares to 25² and cubes to 12³; they appear constantly in algebra and geometry.', build: () => [...Array.from({ length: 25 }, (_, i) => ({ id: `sq-${i + 1}`, front: `${i + 1}²`, back: String((i + 1) ** 2) })), ...Array.from({ length: 12 }, (_, i) => ({ id: `cube-${i + 1}`, front: `${i + 1}³`, back: String((i + 1) ** 3) }))] },
    'facts:roots': { name: 'Square roots', desc: 'Perfect squares up to 400 and the roots you should recognize on sight.', build: () => Array.from({ length: 20 }, (_, i) => ({ id: `root-${i + 1}`, front: `√${(i + 1) ** 2}`, back: String(i + 1) })) },
    'facts:fdp': { name: 'Fractions, decimals, percents', desc: 'The equivalents every test expects you to know cold.', build: () => [['1/2', '0.5', '50%'], ['1/3', '0.333…', '33.3%'], ['2/3', '0.666…', '66.7%'], ['1/4', '0.25', '25%'], ['3/4', '0.75', '75%'], ['1/5', '0.2', '20%'], ['2/5', '0.4', '40%'], ['3/5', '0.6', '60%'], ['4/5', '0.8', '80%'], ['1/6', '0.1666…', '16.7%'], ['5/6', '0.8333…', '83.3%'], ['1/8', '0.125', '12.5%'], ['3/8', '0.375', '37.5%'], ['5/8', '0.625', '62.5%'], ['7/8', '0.875', '87.5%'], ['1/9', '0.111…', '11.1%'], ['1/10', '0.1', '10%'], ['1/12', '0.0833…', '8.3%'], ['1/20', '0.05', '5%'], ['1/25', '0.04', '4%']].flatMap(([f, d, p], i) => [{ id: `fdp-${i}-a`, front: `${f} as a decimal and percent`, back: `${d} = ${p}` }, { id: `fdp-${i}-b`, front: `${p} as a fraction`, back: f }]) },
    'facts:formulas': { name: 'Geometry formulas', desc: 'Area, perimeter, volume, angles.', build: () => [['Area of a rectangle', 'length × width'], ['Area of a triangle', '½ × base × height'], ['Area of a parallelogram', 'base × height'], ['Area of a trapezoid', '½ × (base₁ + base₂) × height'], ['Area of a circle', 'π r²'], ['Circumference of a circle', '2 π r  (or π d)'], ['Perimeter of a rectangle', '2 × (length + width)'], ['Volume of a rectangular box', 'length × width × height'], ['Volume of a cube', 'side³'], ['Surface area of a cube', '6 × side²'], ['Volume of a cylinder', 'π r² h'], ['Pythagorean theorem', 'a² + b² = c²  (c is the hypotenuse)'], ['Angles in a triangle', 'sum to 180°'], ['Angles in a quadrilateral', 'sum to 360°'], ['Interior angle sum of an n-gon', '(n − 2) × 180°'], ['Each exterior angle of a regular n-gon', '360° ÷ n'], ['Distance formula', '√((x₂ − x₁)² + (y₂ − y₁)²)'], ['Midpoint formula', '((x₁ + x₂)/2, (y₁ + y₂)/2)'], ['Slope', '(y₂ − y₁) ÷ (x₂ − x₁)  (rise over run)'], ['Common Pythagorean triples', '3-4-5, 5-12-13, 8-15-17, 7-24-25 and their multiples']].map(([f, b], i) => ({ id: `formula-${i}`, front: f, back: b })) },
    'facts:rules': { name: 'Number rules', desc: 'Divisibility, primes, order of operations, units.', build: () => [['Divisible by 2', 'last digit is even'], ['Divisible by 3', 'digits sum to a multiple of 3'], ['Divisible by 4', 'last two digits form a multiple of 4'], ['Divisible by 5', 'ends in 0 or 5'], ['Divisible by 6', 'divisible by both 2 and 3'], ['Divisible by 8', 'last three digits form a multiple of 8'], ['Divisible by 9', 'digits sum to a multiple of 9'], ['Divisible by 10', 'ends in 0'], ['Primes under 30', '2, 3, 5, 7, 11, 13, 17, 19, 23, 29'], ['Primes from 30 to 60', '31, 37, 41, 43, 47, 53, 59'], ['Primes from 60 to 100', '61, 67, 71, 73, 79, 83, 89, 97'], ['Is 1 a prime number?', 'No. A prime has exactly two factors; 1 has one.'], ['Order of operations', 'Parentheses, Exponents, Multiply/Divide (left to right), Add/Subtract (left to right)'], ['Feet in a mile', '5,280'], ['Inches in a foot / feet in a yard', '12 / 3'], ['Ounces in a pound / pounds in a ton', '16 / 2,000'], ['Cups, pints, quarts, gallons', '2 cups = 1 pint, 2 pints = 1 quart, 4 quarts = 1 gallon'], ['Centimeters in a meter / meters in a kilometer', '100 / 1,000'], ['Percent change', '(new − original) ÷ original × 100'], ['Average (mean)', 'sum ÷ count; so sum = mean × count']].map(([f, b], i) => ({ id: `rule-${i}`, front: f, back: b })) }
  };
  function deckList(S) {
    const due = (prefix) => Object.entries(S.reviews).filter(([k, r]) => k.startsWith(prefix)).map(([, r]) => r); const dueNow = (list) => list.filter(r => new Date(r.due).getTime() <= Date.now()).length;
    const vocabDecks = [1, 2, 3, 4, 5].map(l => { const words = C.vocab.filter(v => v.level === l); const inDeck = words.filter(v => S.reviews[`v:${v.word}`]).length; const rs = words.map(v => S.reviews[`v:${v.word}`]).filter(Boolean); return { id: `vocab:${l}`, kind: 'vocab', name: `Vocabulary level ${l}`, desc: ['Grades 3–5', 'Grades 5–6', 'Grades 7–8, HSPT and ISEE Middle', 'SSAT and ISEE Upper', 'The hardest words on the tests'][l - 1], total: words.length, learning: inDeck, due: dueNow(rs) }; });
    const rootsRs = (C.roots || []).map(r => S.reviews[`r:${r.part}`]).filter(Boolean);
    const rootsDeck = { id: 'roots', kind: 'roots', name: 'Word parts', desc: 'Prefixes, roots and suffixes that unlock thousands of words.', total: (C.roots || []).length, learning: rootsRs.length, due: dueNow(rootsRs) };
    const factDecks = Object.entries(FACT_DECKS).map(([id, d]) => { const cards = d.build(); const rs = cards.map(c => S.reviews[`f:${c.id}`]).filter(Boolean); return { id, kind: 'facts', name: d.name, desc: d.desc, total: cards.length, learning: rs.length, due: dueNow(rs) }; });
    const cards = cardsOf(S); const custom = Object.entries(cards.decks).map(([id, d]) => { const items = Object.entries(cards.items).filter(([, c]) => c.deck === id); const rs = items.map(([cid]) => S.reviews[`c:${cid}`]).filter(Boolean); return { id: `custom:${id}`, kind: 'custom', name: d.name, desc: `${items.length} card${items.length === 1 ? '' : 's'} you made`, total: items.length, learning: rs.length, due: dueNow(rs), createdAt: d.createdAt }; });
    const missed = due('q:').concat(due('g:')); const missedDeck = { id: 'missed', kind: 'missed', name: 'Questions you missed', desc: 'Every practice miss, back on a spaced schedule.', total: missed.length, learning: missed.length, due: dueNow(missed) };
    return { vocab: vocabDecks, roots: rootsDeck, facts: factDecks, custom, missed, dueTotal: dueNow(Object.values(S.reviews)) };
  }
  function deckCards(S, deckId) {
    if (deckId.startsWith('vocab:')) { const l = Number(deckId.slice(6)); return C.vocab.filter(v => v.level === l).map(v => ({ key: `v:${v.word}`, kind: 'vocab', front: v.word, back: v.definition, extra: { pos: v.pos, example: v.example, synonyms: v.synonyms, antonyms: v.antonyms, roots: v.roots, level: v.level }, payload: v })); }
    if (deckId === 'roots') return (C.roots || []).map(r => ({ key: `r:${r.part}`, kind: 'root', front: r.part, back: r.meaning, extra: { kind: r.kind, examples: r.examples }, payload: r }));
    if (FACT_DECKS[deckId]) return FACT_DECKS[deckId].build().map(c => ({ key: `f:${c.id}`, kind: 'fact', front: c.front, back: c.back, extra: { deck: FACT_DECKS[deckId].name }, payload: { ...c, deck: deckId } }));
    if (deckId.startsWith('custom:')) { const id = deckId.slice(7); const cards = cardsOf(S); return Object.entries(cards.items).filter(([, c]) => c.deck === id).map(([cid, c]) => ({ key: `c:${cid}`, kind: 'card', front: c.front, back: c.back, extra: {}, payload: { id: cid, deck: id, front: c.front, back: c.back } })); }
    return [];
  }
  function studySet(S, deckId, { count = 20, mode = 'smart' } = {}) {
    const all = deckCards(S, deckId); const now = Date.now();
    const withState = all.map(c => ({ ...c, state: S.reviews[c.key] || null }));
    let chosen;
    if (mode === 'new') chosen = withState.filter(c => !c.state).slice(0, count);
    else if (mode === 'due') chosen = withState.filter(c => c.state && new Date(c.state.due).getTime() <= now).slice(0, count);
    else { const due = withState.filter(c => c.state && new Date(c.state.due).getTime() <= now); const fresh = withState.filter(c => !c.state); chosen = [...due.slice(0, count), ...fresh.slice(0, Math.max(0, count - Math.min(due.length, count)))]; if (chosen.length < count) chosen.push(...shuffle(withState.filter(c => !chosen.includes(c))).slice(0, count - chosen.length)); }
    return shuffle(chosen).map(({ state, ...c }) => ({ ...c, reps: state ? state.reps : 0, isNew: !state }));
  }
  function gradeCard(S, card, quality) {
    const key = card.key; let r = S.reviews[key];
    if (!r) { r = S.reviews[key] = { kind: card.kind === 'vocab' ? 'vocab' : card.kind === 'root' ? 'root' : card.kind === 'fact' ? 'fact' : 'card', payload: card.payload, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: nowIso(), created: nowIso() }; }
    Object.assign(r, A.sm2(r, quality)); if (card.kind === 'vocab') recordVocab(S, card.payload.word, quality >= 3);
    recordLight(S, quality >= 3, quality >= 4 ? 4 : quality >= 3 ? 3 : 1, 0); return r;
  }
  // custom cards
  function createDeck(S, name) { const cards = cardsOf(S); const id = gid(); cards.decks[id] = { name: String(name || 'My deck').trim().slice(0, 60) || 'My deck', createdAt: nowIso() }; return { id, ...cards.decks[id] }; }
  function deleteDeck(S, id) { const cards = cardsOf(S); delete cards.decks[id]; for (const [cid, c] of Object.entries(cards.items)) if (c.deck === id) { delete cards.items[cid]; delete S.reviews[`c:${cid}`]; } }
  function addCards(S, deckId, list) { const cards = cardsOf(S); if (!cards.decks[deckId]) throw new Error('Deck not found'); let n = 0; for (const { front, back } of list) { const f = String(front || '').trim().slice(0, 400), b = String(back || '').trim().slice(0, 1000); if (!f || !b) continue; const id = gid(); cards.items[id] = { deck: deckId, front: f, back: b, createdAt: nowIso() }; n++; } return n; }
  function deleteCard(S, id) { const cards = cardsOf(S); delete cards.items[id]; delete S.reviews[`c:${id}`]; }
  function parseCardText(text) { return String(text || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => { const m = /^(.*?)(?:\s*\|\s*|\t|\s+-\s+|\s*::\s*|\s*;\s*)(.*)$/.exec(l); return m ? { front: m[1].trim(), back: m[2].trim() } : null; }).filter(Boolean); }

  // ---------- math sprint ----------
  function sprintItem(level) {
    level = Math.max(1, Math.min(5, Number(level) || 2)); const k = pick(level <= 1 ? ['add', 'sub', 'mul'] : level === 2 ? ['add', 'sub', 'mul', 'div', 'sq'] : level === 3 ? ['add2', 'mul', 'div', 'sq', 'pct', 'frac'] : level === 4 ? ['add2', 'mul2', 'div', 'pct', 'frac', 'root', 'neg'] : ['mul2', 'pct2', 'frac', 'root', 'neg', 'exp', 'order']);
    const fmtAns = (x) => String(x);
    switch (k) {
      case 'add': { const a = ri(5, 60), b = ri(5, 60); return { stem: `${a} + ${b}`, answer: fmtAns(a + b) }; }
      case 'add2': { const a = ri(25, 480), b = ri(25, 480); return { stem: `${a} + ${b}`, answer: fmtAns(a + b) }; }
      case 'sub': { const a = ri(20, 99), b = ri(1, a); return { stem: `${a} − ${b}`, answer: fmtAns(a - b) }; }
      case 'mul': { const a = ri(2, 12), b = ri(2, 12); return { stem: `${a} × ${b}`, answer: fmtAns(a * b) }; }
      case 'mul2': { const a = ri(11, 29), b = ri(3, 12); return { stem: `${a} × ${b}`, answer: fmtAns(a * b) }; }
      case 'div': { const b = ri(2, 12), q = ri(2, 12); return { stem: `${b * q} ÷ ${b}`, answer: fmtAns(q) }; }
      case 'sq': { const a = ri(2, 15); return { stem: `${a}²`, answer: fmtAns(a * a) }; }
      case 'root': { const a = ri(2, 15); return { stem: `√${a * a}`, answer: fmtAns(a) }; }
      case 'pct': { const p = pick([10, 20, 25, 50, 75]); const w = pick([40, 60, 80, 120, 200, 300]); return { stem: `${p}% of ${w}`, answer: fmtAns(p * w / 100) }; }
      case 'pct2': { const p = pick([5, 15, 30, 35, 60, 90]); const w = pick([40, 60, 80, 120, 200, 300, 500]); return { stem: `${p}% of ${w}`, answer: fmtAns(p * w / 100) }; }
      case 'frac': { const d = pick([2, 3, 4, 5, 6, 8]); const n = ri(1, d - 1); const w = d * ri(2, 12); return { stem: `${n}/${d} of ${w}`, answer: fmtAns(n * w / d) }; }
      case 'neg': { const a = ri(-20, 20), b = ri(-20, 20); const op = pick(['+', '−']); return { stem: `${a} ${op} ${b < 0 ? `(${b})` : b}`, answer: fmtAns(op === '+' ? a + b : a - b) }; }
      case 'exp': { const b = pick([2, 3, 5, 10]); const e = b === 2 ? ri(3, 8) : b === 3 ? ri(2, 4) : b === 5 ? ri(2, 3) : ri(2, 5); return { stem: `${b}^${e}`, answer: fmtAns(b ** e) }; }
      case 'order': { const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9); return { stem: `${a} + ${b} × ${c}`, answer: fmtAns(a + b * c) }; }
    }
  }
  function sprintSet(level, n = 80) { const out = []; const seen = new Set(); let guard = 0; while (out.length < n && guard++ < n * 4) { const it = sprintItem(level); if (seen.has(it.stem)) continue; seen.add(it.stem); out.push(it); } return out; }
  function recordSprint(S, { level, seconds, score, attempted }) { const m = T(S).math; m.sprints = m.sprints || []; const rec = { at: nowIso(), level: Number(level) || 2, seconds: Number(seconds) || 60, score: Number(score) || 0, attempted: Number(attempted) || 0 }; m.sprints.unshift(rec); if (m.sprints.length > 100) m.sprints.length = 100; const xp = rec.score * 3; for (let i = 0; i < rec.attempted; i++) recordLight(S, i < rec.score, 0, 0); S.totals.xp = (S.totals.xp || 0) + xp; const day = S.daily[A.todayKey()]; if (day) day.xp = (day.xp || 0) + xp; const best = m.sprints.filter(s => s.level === rec.level && s.seconds === rec.seconds).reduce((a, s) => Math.max(a, s.score), 0); return { xp, best, isBest: rec.score >= best && rec.score > 0 }; }
  function mathOverview(S) { const test = S.profile.targetTest; const skills = [...new Set([...C.MATH_CORE, 'number-series', 'quant-comparison'])].filter(s => C.generators.GENERATORS[s]); const R = S.ratings[test] || {}; const ladder = skills.map(s => { const r = R[s]; const m = r ? A.mastery(r.rating) : null; return { skill: s, name: C.SKILL_NAMES[s], mastery: m, n: r ? r.n : 0, level: r ? A.targetLevel(r.rating) : 2, rank: m === null ? 'Unrated' : m >= 90 ? 'Master' : m >= 80 ? 'Expert' : m >= 65 ? 'Solid' : m >= 50 ? 'Developing' : 'Beginner' }; }); const sprints = T(S).math.sprints || []; const bests = {}; for (const s of sprints) { const k = `${s.level}:${s.seconds}`; bests[k] = Math.max(bests[k] || 0, s.score); } return { ladder, sprints: sprints.slice(0, 10), bests, totalSprints: sprints.length }; }

  return { vocabQuiz, rootQuiz, recordVocab, recordLight, vocabStats, deckList, deckCards, studySet, gradeCard, createDeck, deleteDeck, addCards, deleteCard, parseCardText, sprintSet, recordSprint, mathOverview, FACT_DECKS };
})();

#!/usr/bin/env node
// Validates every content module against content/SCHEMA.md
const path = require('path');
const fs = require('fs');
const dir = path.join(__dirname, '..', 'content');
const SKILLS = new Set(['synonyms','antonyms','analogies','logic','verbal-classification','sentence-completion','main-idea','detail','inference','vocab-in-context','tone-purpose','structure','reading-vocab','punctuation','capitalization','usage','spelling','composition','arithmetic','fractions-decimals','percent-ratio','algebra','geometry','data-stats','number-series','quant-comparison','number-sense','word-problems','strategy','writing']);
const TESTS = new Set(['hspt','ssat','isee','all']);
let errors = 0;
const err = (m) => { errors++; console.error('ERROR:', m); };
const ids = new Set();
const stems = new Map();
let counts = { questions: 0, passages: 0, vocab: 0, lessons: 0 };
const passageIds = new Set();
const files = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(dir).filter(f => f.endsWith('.js') && !['index.js','generators.js'].includes(f));
const mods = [];
for (const f of files) {
  const p = path.isAbsolute(f) ? f : path.join(dir, f);
  try { mods.push([f, require(p)]); } catch (e) { err(`${f}: failed to load: ${e.message}`); }
}
for (const [f, m] of mods) for (const p of (m.passages || [])) passageIds.add(p.id);
function checkQ(q, where, allowSkills = true) {
  if (!q.stem || typeof q.stem !== 'string') err(`${where}: missing stem`);
  if (!Array.isArray(q.choices) || q.choices.length < 2) err(`${where}: choices must be an array`);
  else {
    if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.choices.length)) err(`${where}: answer index out of range`);
    const set = new Set(q.choices.map(c => String(c).trim().toLowerCase()));
    if (set.size !== q.choices.length) err(`${where}: duplicate choices`);
  }
  if (!q.explanation || q.explanation.length < 20) err(`${where}: explanation too short`);
}
for (const [f, m] of mods) {
  for (const q of (m.questions || [])) {
    counts.questions++;
    const where = `${f} question ${q.id || '(no id)'}`;
    if (!q.id) err(`${where}: missing id`);
    else if (ids.has(q.id)) err(`${where}: duplicate id`); else ids.add(q.id);
    if (!TESTS.has(q.test)) err(`${where}: bad test ${q.test}`);
    if (!SKILLS.has(q.skill)) err(`${where}: bad skill ${q.skill}`);
    if (!q.section) err(`${where}: missing section`);
    if (!(q.level >= 1 && q.level <= 5)) err(`${where}: level must be 1-5`);
    checkQ(q, where);
    if (q.choices) {
      const expected = q.test === 'ssat' ? 5 : 4;
      if (q.choices.length !== expected) err(`${where}: expected ${expected} choices for test ${q.test}, got ${q.choices.length}`);
    }
    if (q.passageId && !passageIds.has(q.passageId)) err(`${where}: unknown passageId ${q.passageId}`);
    if (q.section === 'reading' && !q.passageId && q.skill !== 'reading-vocab') err(`${where}: reading question needs passageId`);
    const key = f + '|' + (q.passageId||'') + '|' + q.stem.trim().toLowerCase();
    if (stems.has(key)) err(`${where}: duplicate stem (same as ${stems.get(key)})`); else stems.set(key, q.id);
  }
  for (const p of (m.passages || [])) {
    counts.passages++;
    const where = `${f} passage ${p.id}`;
    if (!p.id || !p.title || !p.text || p.text.length < 200) err(`${where}: needs id, title, text (>=200 chars)`);
    if (!(p.level >= 1 && p.level <= 5)) err(`${where}: level 1-5`);
    if (!TESTS.has(p.test)) err(`${where}: bad test`);
    const n = (m.questions || []).filter(q => q.passageId === p.id).length;
    if (n < 4) err(`${where}: only ${n} questions (need >= 4)`);
  }
  for (const v of (m.vocab || [])) {
    counts.vocab++;
    if (!v.word || !v.definition || !v.example) err(`${f} vocab ${v.word}: needs word, definition, example`);
    if (!(v.level >= 1 && v.level <= 5)) err(`${f} vocab ${v.word}: level 1-5`);
  }
  for (const l of (m.lessons || [])) {
    counts.lessons++;
    const where = `${f} lesson ${l.id || '(no id)'}`;
    if (!l.id) err(`${where}: missing id`); else if (ids.has(l.id)) err(`${where}: duplicate id`); else ids.add(l.id);
    if (!TESTS.has(l.test)) err(`${where}: bad test`);
    if (!l.section || !l.title) err(`${where}: needs section and title`);
    if (!SKILLS.has(l.skill)) err(`${where}: bad skill ${l.skill}`);
    if (!Array.isArray(l.objectives) || !l.objectives.length) err(`${where}: objectives required`);
    if (!Array.isArray(l.blocks) || l.blocks.length < 4) err(`${where}: needs >= 4 blocks`);
    const types = new Set((l.blocks||[]).map(b => b.type));
    for (const t of ['concept','strategy','worked','check']) if (!types.has(t)) err(`${where}: missing block type ${t}`);
    for (const b of (l.blocks||[])) {
      if (b.type === 'check') { if (!Array.isArray(b.questions) || b.questions.length < 3) err(`${where}: check needs >= 3 questions`); else b.questions.forEach((q,i)=>checkQ(q, `${where} check#${i}`)); }
      else if (b.type === 'faded') { if (!b.question) err(`${where}: faded block needs question`); else checkQ(b.question, `${where} faded`); }
      else if (!b.md) err(`${where}: block ${b.type} needs md`);
    }
  }
}
console.log('Counts:', counts);
if (errors) { console.error(`${errors} error(s)`); process.exit(1); } else console.log('All content valid.');

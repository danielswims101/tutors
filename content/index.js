'use strict';
// Aggregates all content modules. Missing modules are tolerated so the server can run while content is being authored.
const path = require('path');
const fs = require('fs');
const generators = require('./generators');

function safeRequire(f) { try { return require(path.join(__dirname, f)); } catch (e) { console.warn(`[content] could not load ${f}: ${e.message}`); return {}; } }
const files = fs.readdirSync(__dirname).filter(f => /^(bank|lessons)-.*\.js$/.test(f));
const questions = [], passages = [], vocab = [], lessons = [], writingPrompts = [];
for (const f of files) {
  const m = safeRequire(f);
  if (m.questions) questions.push(...m.questions);
  if (m.passages) passages.push(...m.passages);
  if (m.vocab) vocab.push(...m.vocab);
  if (m.lessons) lessons.push(...m.lessons);
  if (m.writingPrompts) writingPrompts.push(...m.writingPrompts);
}
const byId = new Map(questions.map(q => [q.id, q]));
const passageById = new Map(passages.map(p => [p.id, p]));
const lessonById = new Map(lessons.map(l => [l.id, l]));

const TESTS = {
  hspt: { name: 'HSPT', fullName: 'High School Placement Test', variants: { standard: 'Standard (Grade 8)' }, penalty: false, choices: 4,
    sections: { verbal: 'Verbal Skills', quant: 'Quantitative Skills', reading: 'Reading', math: 'Mathematics', language: 'Language' } },
  ssat: { name: 'SSAT', fullName: 'Secondary School Admission Test', variants: { elementary: 'Elementary (Grades 3–4)', middle: 'Middle (Grades 5–7)', upper: 'Upper (Grades 8–11)' }, penalty: true, choices: 5, variantRules: { elementary: { choices: 4, penalty: false } },
    sections: { verbal: 'Verbal', quant: 'Quantitative', reading: 'Reading', writing: 'Writing Sample' } },
  isee: { name: 'ISEE', fullName: 'Independent School Entrance Exam', variants: { lower: 'Lower (applying to grades 5–6)', middle: 'Middle (applying to grades 7–8)', upper: 'Upper (applying to grades 9–12)' }, penalty: false, choices: 4,
    sections: { verbal: 'Verbal Reasoning', quant: 'Quantitative Reasoning', reading: 'Reading Comprehension', math: 'Mathematics Achievement', essay: 'Essay' } }
};
const SKILL_NAMES = { synonyms: 'Synonyms', antonyms: 'Antonyms', analogies: 'Analogies', logic: 'Logic', 'verbal-classification': 'Verbal Classification', 'sentence-completion': 'Sentence Completion', 'main-idea': 'Main Idea', detail: 'Supporting Details', inference: 'Inference', 'vocab-in-context': 'Vocabulary in Context', 'tone-purpose': 'Tone & Purpose', structure: 'Structure', 'reading-vocab': 'Reading Vocabulary', punctuation: 'Punctuation', capitalization: 'Capitalization', usage: 'Usage & Grammar', spelling: 'Spelling', composition: 'Composition', arithmetic: 'Arithmetic & Number Theory', 'fractions-decimals': 'Fractions & Decimals', 'percent-ratio': 'Percent, Ratio & Rates', algebra: 'Algebra', geometry: 'Geometry', 'data-stats': 'Data, Statistics & Probability', 'number-series': 'Number Series', 'quant-comparison': 'Quantitative Comparison', 'number-sense': 'Number Sense & Manipulation', 'word-problems': 'Word Problems', strategy: 'Strategy', writing: 'Writing' };
const MATH_CORE = ['arithmetic', 'fractions-decimals', 'percent-ratio', 'algebra', 'geometry', 'data-stats', 'word-problems', 'number-sense'];
// Which skills belong to each test section (used for practice menus and mock blueprints)
const SECTION_SKILLS = {
  hspt: { verbal: ['synonyms', 'antonyms', 'analogies', 'logic', 'verbal-classification'], quant: ['number-series', 'quant-comparison', 'number-sense'], reading: ['main-idea', 'detail', 'inference', 'vocab-in-context', 'tone-purpose', 'structure', 'reading-vocab'], math: MATH_CORE, language: ['punctuation', 'capitalization', 'usage', 'spelling', 'composition'] },
  ssat: { verbal: ['synonyms', 'analogies'], quant: MATH_CORE, reading: ['main-idea', 'detail', 'inference', 'vocab-in-context', 'tone-purpose', 'structure'], writing: ['writing'] },
  isee: { verbal: ['synonyms', 'sentence-completion'], quant: ['quant-comparison', 'word-problems', 'algebra', 'data-stats', 'number-sense'], reading: ['main-idea', 'detail', 'inference', 'vocab-in-context', 'tone-purpose', 'structure'], math: MATH_CORE, essay: ['writing'] }
};
// Mock-test blueprints. counts are official full-length numbers; minutes official timing.
// mix: skill -> share of the section (reading uses passages).
const BLUEPRINTS = {
  hspt: { standard: [
    { section: 'verbal', count: 60, minutes: 16, mix: { synonyms: 15, antonyms: 9, analogies: 10, logic: 10, 'verbal-classification': 16 } },
    { section: 'quant', count: 52, minutes: 30, mix: { 'number-series': 15, 'number-sense': 15, 'quant-comparison': 22 } },
    { section: 'break', minutes: 5, break: true, note: 'School-determined; most schools give a short break here.' },
    { section: 'reading', count: 62, minutes: 25, passages: 40, literary: 10, mix: { 'reading-vocab': 22 } },
    { section: 'math', count: 64, minutes: 45, mix: { arithmetic: 8, 'fractions-decimals': 8, 'percent-ratio': 8, 'word-problems': 14, algebra: 7, geometry: 12, 'data-stats': 7 } },
    { section: 'break', minutes: 5, break: true, note: 'School-determined.' },
    { section: 'language', count: 60, minutes: 25, mix: { punctuation: 10, capitalization: 2, usage: 18, spelling: 10, composition: 20 } }
  ] },
  ssat: {
    elementary: [
      { section: 'quant', count: 30, minutes: 30, mix: { arithmetic: 8, 'fractions-decimals': 6, 'percent-ratio': 3, algebra: 3, geometry: 4, 'data-stats': 3, 'word-problems': 3 } },
      { section: 'verbal', count: 30, minutes: 20, mix: { synonyms: 15, analogies: 15 } },
      { section: 'break', minutes: 15, break: true },
      { section: 'reading', count: 28, minutes: 30, passages: 28, perPassage: 4 },
      { section: 'writing', count: 1, minutes: 15, writing: true },
      { section: 'experimental', count: 16, minutes: 15, experimental: true, mix: { synonyms: 3, analogies: 3, arithmetic: 2, 'word-problems': 2, 'fractions-decimals': 1 }, passages: 5 }
    ],
    middle: [
      { section: 'writing', count: 1, minutes: 25, writing: true, promptChoice: 2 },
      { section: 'break', minutes: 10, break: true },
      { section: 'quant', count: 25, minutes: 30, mix: { arithmetic: 4, 'fractions-decimals': 4, 'percent-ratio': 4, algebra: 4, geometry: 4, 'data-stats': 2, 'word-problems': 3 } },
      { section: 'reading', count: 40, minutes: 40, passages: 40 },
      { section: 'break', minutes: 10, break: true },
      { section: 'verbal', count: 60, minutes: 30, mix: { synonyms: 30, analogies: 30 } },
      { section: 'quant', count: 25, minutes: 30, label: 'Quantitative 2', mix: { arithmetic: 3, 'fractions-decimals': 3, 'percent-ratio': 4, algebra: 5, geometry: 5, 'data-stats': 2, 'word-problems': 3 } },
      { section: 'experimental', count: 16, minutes: 15, experimental: true, mix: { synonyms: 3, analogies: 3, algebra: 2, 'percent-ratio': 2, 'word-problems': 1 }, passages: 5 }
    ],
    upper: [
      { section: 'writing', count: 1, minutes: 25, writing: true, promptChoice: 2 },
      { section: 'break', minutes: 10, break: true },
      { section: 'quant', count: 25, minutes: 30, mix: { arithmetic: 3, 'fractions-decimals': 3, 'percent-ratio': 4, algebra: 6, geometry: 5, 'data-stats': 2, 'word-problems': 2 } },
      { section: 'reading', count: 40, minutes: 40, passages: 40 },
      { section: 'break', minutes: 10, break: true },
      { section: 'verbal', count: 60, minutes: 30, mix: { synonyms: 30, analogies: 30 } },
      { section: 'quant', count: 25, minutes: 30, label: 'Quantitative 2', mix: { arithmetic: 2, 'fractions-decimals': 3, 'percent-ratio': 4, algebra: 6, geometry: 5, 'data-stats': 3, 'word-problems': 2 } },
      { section: 'experimental', count: 16, minutes: 15, experimental: true, mix: { synonyms: 3, analogies: 3, algebra: 2, 'percent-ratio': 2, 'word-problems': 1 }, passages: 5 }
    ]
  },
  isee: {
    lower: [
      { section: 'verbal', count: 34, minutes: 20, mix: { synonyms: 17, 'sentence-completion': 17 } },
      { section: 'quant', count: 38, minutes: 35, mix: { 'word-problems': 16, 'number-sense': 8, 'data-stats': 7, algebra: 7 } },
      { section: 'break', minutes: 10, break: true },
      { section: 'reading', count: 25, minutes: 25, passages: 25, perPassage: 5 },
      { section: 'math', count: 30, minutes: 30, mix: { arithmetic: 7, 'fractions-decimals': 6, 'percent-ratio': 4, algebra: 4, geometry: 5, 'data-stats': 4 } },
      { section: 'break', minutes: 10, break: true },
      { section: 'essay', count: 1, minutes: 30, writing: true }
    ],
    middle: [
      { section: 'verbal', count: 40, minutes: 20, mix: { synonyms: 19, 'sentence-completion': 21 } },
      { section: 'quant', count: 37, minutes: 35, mix: { 'word-problems': 10, 'number-sense': 4, algebra: 3, 'data-stats': 3, 'quant-comparison': 17 } },
      { section: 'break', minutes: 10, break: true },
      { section: 'reading', count: 36, minutes: 35, passages: 36, perPassage: 6 },
      { section: 'math', count: 47, minutes: 40, mix: { arithmetic: 8, 'fractions-decimals': 7, 'percent-ratio': 7, algebra: 9, geometry: 8, 'data-stats': 5, 'number-sense': 3 } },
      { section: 'break', minutes: 10, break: true },
      { section: 'essay', count: 1, minutes: 30, writing: true }
    ],
    upper: [
      { section: 'verbal', count: 40, minutes: 20, mix: { synonyms: 19, 'sentence-completion': 21 } },
      { section: 'quant', count: 37, minutes: 35, mix: { 'word-problems': 11, 'number-sense': 3, algebra: 4, 'data-stats': 2, 'quant-comparison': 17 } },
      { section: 'break', minutes: 10, break: true },
      { section: 'reading', count: 36, minutes: 35, passages: 36, perPassage: 6 },
      { section: 'math', count: 47, minutes: 40, mix: { arithmetic: 6, 'fractions-decimals': 6, 'percent-ratio': 7, algebra: 12, geometry: 9, 'data-stats': 5, 'number-sense': 2 } },
      { section: 'break', minutes: 10, break: true },
      { section: 'essay', count: 1, minutes: 30, writing: true }
    ]
  }
};
// Difficulty tiers -> allowed levels (weights)
const TIERS = {
  foundation: { name: 'Foundation', levels: { 1: 0.5, 2: 0.4, 3: 0.1 }, desc: 'Builds confidence with core skills. Best for first-timers or grades 4–6.' },
  standard: { name: 'Standard', levels: { 2: 0.3, 3: 0.5, 4: 0.2 }, desc: 'Matches the difficulty of the real test. The default once basics are solid.' },
  advanced: { name: 'Advanced', levels: { 3: 0.35, 4: 0.45, 5: 0.2 }, desc: 'Harder than the real test. Targets the 85th percentile and up.' },
  elite: { name: 'Elite', levels: { 4: 0.45, 5: 0.55 }, desc: 'The hardest items we have. For students chasing the 95th+ percentile.' }
};
// Variant -> default level center (used when a user has no rating yet)
const VARIANT_LEVEL = { 'hspt:standard': 3, 'ssat:elementary': 1, 'ssat:middle': 3, 'ssat:upper': 4, 'isee:lower': 1.5, 'isee:middle': 3, 'isee:upper': 4 };
module.exports = { questions, passages, vocab, lessons, writingPrompts, byId, passageById, lessonById, generators, TESTS, SKILL_NAMES, SECTION_SKILLS, BLUEPRINTS, TIERS, VARIANT_LEVEL, MATH_CORE };

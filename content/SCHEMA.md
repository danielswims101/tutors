# Content schema (Ascend Prep)

All content files are CommonJS modules under `content/` and export plain data.
Run `node scripts/validate-content.js` to check every file.

## Tests and sections

| test | sections (section id → official name) |
|---|---|
| `hspt` | `verbal` Verbal Skills, `quant` Quantitative Skills, `reading` Reading, `math` Mathematics, `language` Language |
| `ssat` | `verbal` Verbal (synonyms + analogies), `quant` Quantitative, `reading` Reading, `writing` Writing Sample |
| `isee` | `verbal` Verbal Reasoning (synonyms + sentence completion), `quant` Quantitative Reasoning, `reading` Reading Comprehension, `math` Mathematics Achievement, `essay` Essay |

## Skills (use these exact ids)

- Verbal: `synonyms`, `antonyms`, `analogies`, `logic`, `verbal-classification`, `sentence-completion`
- Reading: `main-idea`, `detail`, `inference`, `vocab-in-context`, `tone-purpose`, `structure`, `reading-vocab` (HSPT standalone vocabulary)
- Language (HSPT): `punctuation`, `capitalization`, `usage`, `spelling`, `composition`
- Math/Quant (generated): `arithmetic`, `fractions-decimals`, `percent-ratio`, `algebra`, `geometry`, `data-stats`, `number-series`, `quant-comparison`, `number-sense`, `word-problems`

## Level (difficulty) 1–5

1 = elementary / ISEE Lower / SSAT Elementary (grades 3–5)
2 = early middle (grades 5–6)
3 = middle / ISEE Middle / SSAT Middle / typical HSPT (grades 7–8)
4 = upper / ISEE Upper / SSAT Upper / hard HSPT
5 = elite — the hardest 10% of real items

## Question object

```js
{
  id: 'ssat-syn-0042',          // unique, kebab-case, stable
  test: 'ssat',                  // 'hspt' | 'ssat' | 'isee' | 'all'
  section: 'verbal',
  skill: 'synonyms',
  level: 3,
  stem: 'ABUNDANT',              // the question text. Use \n for line breaks. For sentence completion use ------ for the blank.
  choices: ['scarce', 'plentiful', 'ancient', 'quiet'],  // 4 choices (HSPT/ISEE) or 5 (SSAT)
  answer: 1,                     // index into choices
  explanation: 'Abundant means existing in large quantities... Trap: "scarce" is the antonym.',
  passageId: 'rc-tide-pools'    // reading questions only
}
```

Rules
- `explanation` must teach: state the answer, WHY, and name the trap / strategy in 2–5 sentences.
- SSAT items get 5 choices; HSPT and ISEE items get 4. `test: 'all'` items get 4 choices.
- Choices must be plausible; exactly one correct answer.
- No duplicated stems within a file.

## Passage object

```js
{
  id: 'rc-tide-pools',
  test: 'all',                 // or a specific test
  level: 3,
  title: 'Life in the Tide Pools',
  genre: 'science',            // science | history | fiction | poetry | biography | argument | social-studies
  text: 'Paragraph one...\n\nParagraph two...',
  wordCount: 310
}
```

## Vocabulary object (flashcards)

```js
{ word: 'abundant', pos: 'adj', definition: 'existing in large amounts', example: 'The orchard had an abundant harvest.', synonyms: ['plentiful','ample'], antonyms: ['scarce'], level: 2, roots: 'ab- (from) + undare (to flow)' }
```

## Lesson object

```js
{
  id: 'hspt-verbal-analogies',
  test: 'hspt',                 // 'hspt' | 'ssat' | 'isee' | 'all'
  section: 'verbal',
  skill: 'analogies',            // skill the lesson trains (one of the skill ids) or 'strategy'
  title: 'Analogies: Build the Bridge Sentence',
  minutes: 12,                   // estimated time
  level: 3,                      // target level
  objectives: ['Write a precise bridge sentence', '...'],
  blocks: [                      // rendered in order
    { type: 'concept', title: 'What the test is really asking', md: '...markdown...' },
    { type: 'strategy', title: 'The 3-step method', md: '1. ...\n2. ...' },
    { type: 'worked', title: 'Worked example (think-aloud)', md: 'Problem...\n\n**Step 1** ...' },
    { type: 'faded', title: 'Your turn, with scaffolding', md: '...', question: { stem, choices, answer, explanation } },
    { type: 'trap', title: 'Common traps', md: '- ...' },
    { type: 'check', title: 'Quick check', questions: [ { stem, choices, answer, explanation }, ... ] },  // 3–5 items
    { type: 'summary', md: '...' }
  ]
}
```

Lesson writing standard: think "best tutor in the world". Explain the underlying idea, then an explicit step-by-step method, then a fully worked think-aloud example, then a faded example where the student does the last steps, then traps, then a 3–5 question retrieval check. Markdown allowed: headings (###), **bold**, lists, inline `code`. Keep paragraphs short.

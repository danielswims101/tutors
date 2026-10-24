# Ascend Prep — HSPT · SSAT · ISEE tutor

An adaptive, multi-user test-prep web app. Zero dependencies: it runs on Node 22+ using the built-in SQLite module.

## Run it

```bash
node server.js
```

Then open http://localhost:3000. To let other devices on your network use it, visit `http://<your-computer's-IP>:3000`.
Set `PORT=8080` (or any port) to change the port, `DATA_DIR=/path` to move the database.

The **first account created becomes the admin** (it can see the account list in Settings). Every account's progress is private; many students can use the site at the same time.

## What is inside

| Area | What it does |
|---|---|
| **Accounts** | Username + password (scrypt-hashed), HttpOnly cookie sessions, student / parent roles. A student's share code lets a parent or tutor view their progress read-only. |
| **Learn** | 46 lessons (verbal, reading, language, writing, math, quant) each built as concept → method → worked think-aloud → scaffolded try → traps → retrieval check → summary. |
| **Practice** | Adaptive sets. Every skill has an Elo-style rating that updates with each answer, weighted by item difficulty. Sets target ~70% success (desirable difficulty), interleave skills, and favor weak or under-sampled ones. Confidence ratings before each answer train calibration. Answer keys never leave the server. |
| **Mock tests** | Official section order, counts, and timing for HSPT; SSAT Elementary/Middle/Upper; ISEE Lower/Middle/Upper. Four difficulty tiers (Foundation, Standard, Advanced, Elite) with the tier recommended from the student's ratings. Full, half, or single-section. Per-section timer runs server-side so a closed tab does not stop the clock. SSAT ¼-point guessing penalty applied. Results: per-section and per-skill breakdown, estimated percentile, every question with explanation. |
| **Review** | SM-2 spaced repetition. Practice misses and vocabulary flashcards return right before they would be forgotten. |
| **Writing** | Timed SSAT/ISEE prompts with tips and a self-scoring rubric; automatic structural feedback. |
| **Progress** | Mastery per skill and section, daily accuracy and volume, mock-test history, recommended next steps. Parents pick a linked student from a dropdown. |

Content: 610 curated verbal, reading, and language questions with teaching explanations, 22 reading passages, 220 vocabulary words, 36 writing prompts, plus unlimited procedurally generated math and quantitative items (10 skills × 5 levels) so math sections never repeat.

## Project layout

```
server.js          HTTP server, auth, JSON API, static files
db.js              SQLite schema (users, sessions, attempts, ratings, reviews, mock tests…)
engine.js          adaptive selection, mock assembly, scoring, spaced repetition
content/           question banks, lessons, vocabulary, prompts, generators (see SCHEMA.md)
scripts/validate-content.js   checks every content file against the schema
public/            the single-page app (index.html, app.js, styles.css)
data/              the SQLite database (created on first run)
```

## Adding content

Add items to any `content/bank-*.js` or `content/lessons-*.js` following `content/SCHEMA.md`, then run:

```bash
node scripts/validate-content.js
```

Restart the server to load new content.

## Notes on scoring

Percentiles shown on mock results are estimates derived from percent correct, adjusted for the tier's difficulty. They are a study signal, not an official scaled score.

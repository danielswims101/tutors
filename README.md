# Ascend Prep — a personal tutor for the HSPT, SSAT and ISEE

Not a question bank: a tutor. Ascend Prep diagnoses each student, writes a day-by-day study plan to test day, guides every session, gives hints that do not spoil, explains every miss, and brings mistakes back before they are forgotten. Many students can use one site at once; every account's progress is private.

## Run it

```bash
npm install
node server.js
```

Open http://localhost:3000. The **first account created becomes the admin**. Other devices on the same network can use `http://<your-computer's-IP>:3000`. Set `PORT` to change the port, `DATA_DIR` to move the database.

`npm install` only adds the official Anthropic SDK for the live AI tutor. Everything else is built-in Node 22+ (the database is Node's bundled SQLite).

## The live AI tutor (optional)

Out of the box the tutor is a built-in coach: hints, explanations, vocabulary lookups, study-plan advice, pacing and guessing strategy, all without any external service.

With an Anthropic API key the tutor becomes a live coach that answers anything in the student's own words, teaches Socratically (it will not reveal an answer the student has not tried), and grades essays against a rubric with a rewritten opening. To turn it on, sign in as the admin, open **Settings → Live AI tutor**, and paste the key. It is stored only on the server in `data/tutor.config.json` (ignored by git) and never sent to browsers. Usage is billed to that key's account. You can also set `ANTHROPIC_API_KEY` in the environment. The default model is `claude-opus-5-5`; override with `TUTOR_MODEL` or the Settings page.

## Use it as an app, on every device

Ascend Prep is an installable web app. On a phone, tablet or computer, open the site and choose **Install app** (on iPhone: Safari → Share → Add to Home Screen). It opens full-screen with its own icon. Sign in with the same username and password on any device; plan, progress, streak and tutor chat live in the account, not on the device. Settings shows how many devices are signed in and can sign out everywhere.

## What a student gets

| | |
|---|---|
| **Today** | A guided daily session: review, a lesson, a drill, vocabulary, a weekly mock, narrated by the tutor from the plan. |
| **Diagnostic** | Twenty questions across every section calibrate a rating per skill before the plan is built. |
| **Study plan** | Day-by-day to the test date (or six weeks by default): weakest skills first, weekly mocks, taper before test day. Rebuilds on demand. |
| **Lessons** | Forty-six: concept, method, worked think-aloud, scaffolded try, traps, retrieval check. |
| **Practice** | Adaptive sets with Elo-style skill ratings (about 70% success), a three-level hint ladder, confidence ratings, and "ask why" on every question. |
| **Mock tests** | Official timing, order and counts for HSPT, SSAT (Elementary/Middle/Upper) and ISEE (Lower/Middle/Upper) at four difficulty tiers. Server-side timers. Full review with explanations. |
| **Review** | SM-2 spaced repetition of misses and vocabulary flashcards. |
| **Writing** | Timed prompts, self-scoring rubric, structural feedback; rubric grading and a rewritten opening with the live tutor. |
| **Progress** | Mastery per skill and section, trends, mock history, badges. Parents see linked students read-only. |
| **Friends** | Add friends by share code, weekly XP leaderboard, 18 badges, levels. |

Content: 789 curated verbal, reading and language questions with teaching explanations, 22 original passages, 220 vocabulary words, 36 writing prompts, plus unlimited generated math and quantitative items across 10 skills and 5 levels.

## Project layout

```
server.js          HTTP server, auth, JSON API, static files
db.js              SQLite schema and migrations
engine.js          ratings, adaptive selection, mock assembly, scoring, spaced repetition
coach.js           hints, diagnostic, study plan, XP, badges, friends
tutor.js           the tutor: live Claude mode and built-in mode
content/           question banks, lessons, vocabulary, prompts, generators (see SCHEMA.md)
scripts/           validate-content.js
public/            the single-page app (index.html, app.js, styles.css)
data/              database and tutor config (created on first run, git-ignored)
```

## Adding content

Add to any `content/bank-*.js` or `content/lessons-*.js` following `content/SCHEMA.md`, then run `npm run validate` and restart the server.

## Hosting for friends

The repository holds the code; students need a running server. On one Wi-Fi network, run it on a laptop and share the local address. For use from anywhere, see [DEPLOY.md](DEPLOY.md): the repo ships a `Dockerfile`, `railway.json` and `fly.toml`, and deploys to Railway in about five clicks.

## Notes

Percentiles on mock results are estimates derived from percent correct adjusted for tier. They are a study signal, not an official score.

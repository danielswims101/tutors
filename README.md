# Ascend Prep — a personal tutor for the HSPT, SSAT and ISEE

Not a question bank: a tutor. Ascend Prep diagnoses each student, writes a day-by-day study plan to test day, guides every session, gives hints that do not spoil, explains every miss, and brings mistakes back before they are forgotten. Many students can use one site at once; every account's progress is private.

## Use it

It is live at **https://danielswims101.github.io/tutors/** and free to use. Create an account (username and password, no email needed), take the 20-question diagnostic, and your tutor builds the plan. The first account created is the admin.

Hosting is free: the site is static on GitHub Pages and accounts live in Supabase's free tier. See [DEPLOY.md](DEPLOY.md) for how it fits together and how to update it.

### Running the code yourself

```bash
node scripts/build-pages.js    # bundle content for the browser (after content changes)
node scripts/serve-docs.js     # preview the static site at http://localhost:8080
```

Without Supabase configuration in `docs/config.js`, the site runs in a preview mode where accounts live in the browser only.

## The live AI tutor (optional)

Out of the box the tutor is a built-in coach: hints, explanations, vocabulary lookups, study-plan advice, pacing and guessing strategy.

With an Anthropic API key the tutor becomes a live coach that answers anything in the student's own words, teaches Socratically (it will not reveal an answer the student has not tried), and grades essays against a rubric with a rewritten opening. The admin pastes the key under **Settings → Live AI tutor**. It is stored in the Supabase database where only the tutor function can read it, and usage is billed to that key's account at the default model `claude-opus-5-5`.

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
docs/              the published site (GitHub Pages)
  app.js           the user interface
  api.js           the "server in the browser": every action the UI takes
  engine.js        ratings, adaptive selection, mock assembly, scoring, spaced repetition, plan, badges, built-in tutor
  store.js         data layer: Supabase (accounts on every device) or local preview mode
  content.js       generated bundle of all questions, lessons, vocabulary and math generators
  config.js        Supabase URL and publishable key
content/           question banks, lessons, vocabulary, prompts, generators (see SCHEMA.md)
scripts/           build-pages.js, serve-docs.js, validate-content.js, make-icons.js
server.js etc.     the original self-hosted Node server (optional)
```

## Adding content

Add to any `content/bank-*.js` or `content/lessons-*.js` following `content/SCHEMA.md`, then run `node scripts/validate-content.js`, rebuild with `node scripts/build-pages.js`, and push.

## Notes

Percentiles on mock results are estimates derived from percent correct adjusted for tier. They are a study signal, not an official score.

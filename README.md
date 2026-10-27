# Tidelyne Prep — a personal tutor for the HSPT, SSAT and ISEE

Not a question bank: a tutor. Tidelyne Prep diagnoses each student, writes a 7-day sprint to the 99th percentile and then the next one from its results, guides every session, gives hints that do not spoil, explains every miss, and brings mistakes back before they are forgotten. Many students can use one site at once; every account's progress is private.

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

Tidelyne Prep is an installable web app. On a phone, tablet or computer, open the site and choose **Install app** (on iPhone: Safari → Share → Add to Home Screen). It opens full-screen with its own icon. One account works on every device at the same time: every save is versioned, devices merge instead of overwriting each other, and progress made on one device shows up on the others within seconds (or the moment the app is reopened). Sign in with the same username and password on any device; plan, progress, streak and tutor chat live in the account, not on the device. Settings shows how many devices are signed in and can sign out everywhere.

## Built for the 99th percentile

Every student's default goal is the 99th percentile, and the site is organized around closing that gap:

- **Diagnostic that re-tailors everything.** Twenty questions per course set the sprint plan (five phases), the three focus skills with one-week targets, drill difficulty per skill, the vocabulary level, the daily goal, and the recommended mock tier.
- **Road to the 99th.** A live projection per section from skill ratings, the gap to the goal, and the weakest skill holding each section back. The 99th corresponds to about 79% accuracy on Elite-level questions.
- **Several courses at once.** Enroll in the HSPT, SSAT and ISEE together; each has its own diagnostic, plan, focus skills and ratings. Switch from the sidebar.
- **Mistake journal.** Tag each miss (careless, didn't know, misread, out of time) and see where points leak, by cause and by skill, with the fix for each.
- **Pace targets.** Every practice question shows the real test's seconds-per-question; your pace per section is tracked and diagnosed.
- **Weekly report.** This week vs last week, mastery deltas, mocks, focus progress, projection, all in one page you can copy for a parent.
- **Elite drills.** Once a skill passes 85% mastery the plan schedules level-5 drills for it, and mock recommendations move to Advanced and Elite tiers.
- **Daily mini tests at real pace.** A 20-minute test every day with every scored section represented, where each section gets exactly the real test's seconds per question (HSPT Verbal 16 s, ISEE Quantitative 57 s, and so on), so pacing is rehearsed daily, not just on mock days.
- **A 60-minute daily minimum.** Study time is measured while the student is actually working on the site. Each day's plan sums to at least 60 minutes, the day only counts as complete at 60, extra work is added automatically if the steps run out early, and the streak counts only full-hour days.
- **Unlimited flashcards and trainers.** Vocabulary quizzes in six formats across 920 words, a word-parts deck, math-facts decks, custom decks you type or paste, math speed sprints, and an endless math skill ladder.

## What a student gets

| | |
|---|---|
| **Today** | A guided daily session narrated by the tutor from the sprint: review, a mini test at real pace, a lesson, drills, vocabulary; a checkpoint mock on day 4 and a full-length Elite mock on day 7. |
| **Diagnostic** | Twenty questions across every section calibrate a rating per skill before the plan is built. |
| **Study plan** | A 7-day sprint to the 99th percentile: Baseline, Attack, Checkpoint (half-length mock), Elite, Prove it (full-length Elite mock). About 90 minutes planned a day with 60 enforced; the next sprint is written from the results. The last week before a dated test tapers instead. Rebuilds on demand. |
| **Lessons** | Forty-six: concept, method, worked think-aloud, scaffolded try, traps, retrieval check. |
| **Practice** | Adaptive sets with Elo-style skill ratings (about 70% success), a three-level hint ladder, confidence ratings, and "ask why" on every question. |
| **Mock tests** | Audited against the test makers' published specs: official section order, counts and timing for HSPT, SSAT (Elementary/Middle/Upper) and ISEE (Lower/Middle/Upper); scheduled breaks; the SSAT experimental section and choice of two writing prompts; per-level rules (SSAT Elementary: 4 choices, no penalty, 7 passages × 4 questions, picture-prompt writing sample; SSAT Middle/Upper: every reading question carries 5 choices); HSPT question-type mixes from the STS Interpretive Manual; ISEE comparisons last and 5×5 / 6×6 passage structure; difficulty centered on each level; four tiers; full, half, single-section and 20-minute mini formats; a test-day mode with no palette, no countdown and no early submit; results with estimated percentiles and stanines. |
| **Review** | SM-2 spaced repetition of misses and vocabulary flashcards. |
| **Writing** | Timed prompts, self-scoring rubric, structural feedback; rubric grading and a rewritten opening with the live tutor. |
| **Progress** | Mastery per skill and section, trends, mock history, badges. Parents see linked students read-only. |
| **Friends** | Add friends by share code, weekly XP leaderboard, 20 badges, levels. |
| **Vocabulary trainer** | Six quiz formats (definition, word-from-meaning, synonym, antonym, fill-the-blank, spelling), per-word mastery, word of the day, weak-word quizzes, word-parts quiz. |
| **Math trainer** | Endless generated drills per skill at five levels, a mastery ladder with ranks, timed speed sprints with personal bests, math-facts flashcards. |
| **Flashcards** | Vocabulary by level, word parts, math facts, questions you missed, and unlimited custom decks (type or paste "front \| back"), all on spaced repetition. |

Content: 789 curated verbal, reading and language questions with teaching explanations, 22 original passages, 920 vocabulary words, 108 word parts, 36 writing prompts, plus unlimited generated math and quantitative items across 10 skills and 5 levels.

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

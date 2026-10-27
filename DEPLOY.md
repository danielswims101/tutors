# How Tidelyne Prep is hosted (free)

The site is a static web app on **GitHub Pages**, with accounts and progress stored in **Supabase** (free plan). No server to run, nothing to pay.

- Site: https://danielswims101.github.io/tutors/
- Code: the `docs/` folder of this repository is what GitHub Pages publishes.
- Data: Supabase project `ascend-prep` (organization DanielSwimsWebsites). Accounts use Supabase Auth; progress lives in Postgres behind row-level security, so each student can only read their own data (parents can read linked students, friends see public stats only).

## Updating the site

1. Edit code in `docs/` (app) or content in `content/`.
2. If content changed, rebuild the bundle: `node scripts/build-pages.js`
3. Commit and push to `main`. GitHub Pages redeploys in about a minute.

To preview locally: `node scripts/serve-docs.js` then open http://localhost:8080.

## Supabase pieces (already set up)

- Tables: `profiles`, `user_data` (ratings, daily stats, reviews, lessons, badges, tutor chat, custom cards, training stats, courses with their plans), `mocks`, `writings`, `public_stats`, `links` (parent ↔ student), `friendships`, `app_config` (tutor key), `tutor_usage`.
- Edge functions: `signup` (creates a username-based account with no email confirmation) and `tutor` (calls Claude with the API key kept server-side, 150 requests per student per day).
- RPCs: `link_student`, `add_friend`, `tutor_status`, `set_tutor_config` (admin), `admin_users` (admin).

The first account created becomes the admin. The admin can paste an Anthropic API key under Settings → Live AI tutor; it is stored in `app_config`, which no browser can read.

## Free-plan notes

- Supabase pauses a free project after about a week with no database activity. Any sign-in or answered question counts as activity, so a site in regular use stays up. If it pauses, open the Supabase dashboard and click **Resume project**; data is kept.
- Free quotas (500 MB database, 50,000 monthly active users, 500,000 edge function calls) are far beyond what a group of friends uses.
- Optional hardening in the Supabase dashboard: Authentication → Passwords → enable leaked-password protection.

## Self-hosted alternative

The original Node server (`server.js`) is still in the repository for anyone who prefers to run it themselves; see the git history for its setup notes. The GitHub Pages + Supabase version is the primary one.

# Hosting Ascend Prep online

The repo is ready for any host that runs a long-lived Node process with a persistent disk. Railway is the easiest; Fly.io works too. Static hosts (Vercel, Netlify, GitHub Pages) will not work: the database would be wiped on every deploy.

## Railway (recommended, about $5/month)

1. Go to https://railway.com and sign up with your GitHub account.
2. Click **New Project → Deploy from GitHub repo** and pick `danielswims101/tutors`. Railway finds the `Dockerfile` and builds it. The first deploy fails its health check until step 3 is done; that is expected.
3. Add a disk for the database: open the service, **Settings → Volumes → Add Volume**, mount path `/data`. (Students' accounts and progress live here. Without it, a redeploy would erase them.)
4. **Variables → New Variable**: `DATA_DIR` = `/data`. Optional: `ANTHROPIC_API_KEY` to turn on the live AI tutor for everyone (or paste it later in the app's Settings as the admin).
5. **Settings → Networking → Generate Domain**. You get a URL like `tutors-production.up.railway.app`. Share it with your friends.
6. Open the URL and create your account first: the first account is the admin.

Every `git push` to `main` redeploys automatically. The volume keeps the data across deploys.

Cost: Railway's Hobby plan is $5/month and includes $5 of usage; this app uses a fraction of that. New accounts get a free trial.

## Fly.io (alternative)

```bash
brew install flyctl
fly auth signup
fly launch --copy-config --no-deploy      # accept the defaults; it reads fly.toml
fly volumes create data --size 1 --region iad
fly deploy
fly open
```

The free allowance usually covers a small app like this; a card is required at signup.

## Any Linux server (DigitalOcean, Hetzner, a spare computer)

```bash
git clone https://github.com/danielswims101/tutors.git && cd tutors
npm install
DATA_DIR=/var/lib/ascend PORT=3000 node server.js
```

Put it behind Caddy or nginx for HTTPS, and run it under `systemd` or `pm2` so it restarts on reboot. Back up the `DATA_DIR` folder; it is the whole site's state.

## After it is live

- Create your account first (admin), then send friends the URL. Each person creates their own account.
- To turn on the live AI tutor: Settings → Live AI tutor → paste an Anthropic API key. It is stored on the server only.
- Parents follow a student by entering the student's share code (Settings) in a parent account.

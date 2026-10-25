# Hosting Ascend Prep online

The site needs a long-lived Node process and a disk that keeps the database. Static hosts (Vercel, Netlify, GitHub Pages) will not work, and most "free" app hosts wipe the disk on every restart (Render) or no longer have a free tier (Fly.io). Two options cost nothing:

## Free option A: this Mac + Tailscale Funnel (about 10 minutes)

The site runs on your own computer and Tailscale gives it a stable public HTTPS address like `https://jimmys-macbook-pro.tail1234.ts.net`. Free on Tailscale's Personal plan. The site is up whenever the Mac is on and awake.

1. Install the site as a background service (starts at login, restarts if it crashes, keeps the Mac from idle-sleeping while running):
   ```bash
   bash scripts/mac-service.sh install
   ```
2. Install Tailscale from https://tailscale.com/download (the Mac App Store version is fine), open it, and sign in with Google, GitHub, or Apple. The Personal plan is free.
3. In the Tailscale admin console, open **DNS** (https://login.tailscale.com/admin/dns) and enable **MagicDNS** and **HTTPS Certificates**.
4. Publish the site:
   ```bash
   /Applications/Tailscale.app/Contents/MacOS/Tailscale funnel --bg 3000
   ```
   The first time, it prints a link to enable Funnel for your network; click it, approve, and run the command again. It prints your public URL. Share that URL with friends.
5. Keep the Mac plugged in with the lid open (or an external display attached). In System Settings → Battery → Options, turn on "Prevent automatic sleeping on power adapter when the display is off".

To stop publishing: `Tailscale funnel --bg off 3000`. To remove the service: `bash scripts/mac-service.sh uninstall`.

## Free option B: Oracle Cloud Always Free server (on 24/7)

Oracle's Always Free tier includes a small server that never bills. It asks for a card to verify identity but does not charge Always Free resources. Signup can take a few tries; the ARM shape is often "out of capacity" (retry later or pick the AMD micro shape).

1. Sign up at https://www.oracle.com/cloud/free/ and create an **Ubuntu** VM instance (shape `VM.Standard.A1.Flex`, 1-2 OCPUs, or `VM.Standard.E2.1.Micro`). Download the SSH key it generates.
2. In the instance's **Virtual Cloud Network → Security List**, add ingress rules for TCP ports **80** and **443** from `0.0.0.0/0`.
3. SSH in (`ssh -i key.pem ubuntu@<public-ip>`) and run:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/danielswims101/tutors/main/scripts/vps-setup.sh | sudo bash
   ```
   It installs Node, the site as a service, and Caddy for automatic HTTPS, and prints the URL (an `sslip.io` name based on the IP, no domain needed). To update later, run the same command again.

## Paid, zero-maintenance: Railway (about $5/month)

If you ever want it fully managed:

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

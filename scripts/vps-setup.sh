#!/bin/bash
# One-shot setup for a fresh Ubuntu server (Oracle Cloud Always Free, or any VPS).
# Installs Node 22, Tidelyne Prep as a systemd service, and Caddy for automatic HTTPS.
# Usage (on the server):  curl -fsSL https://raw.githubusercontent.com/danielswims101/tutors/main/scripts/vps-setup.sh | sudo bash
set -euo pipefail
REPO="https://github.com/danielswims101/tutors.git"
APP_DIR="/opt/ascend"
DATA_DIR="/var/lib/ascend"
echo "==> Installing Node 22"
if ! command -v node >/dev/null || [ "$(node -v | cut -c2-3)" -lt 22 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs git
fi
echo "==> Fetching Tidelyne Prep"
if [ -d "$APP_DIR/.git" ]; then git -C "$APP_DIR" pull -q; else git clone -q "$REPO" "$APP_DIR"; fi
cd "$APP_DIR" && npm install --omit=dev --no-audit --no-fund
mkdir -p "$DATA_DIR"
echo "==> Creating the service"
cat > /etc/systemd/system/ascend.service <<UNIT
[Unit]
Description=Tidelyne Prep tutor
After=network.target
[Service]
WorkingDirectory=$APP_DIR
Environment=PORT=3000
Environment=HOST=127.0.0.1
Environment=DATA_DIR=$DATA_DIR
Environment=NODE_ENV=production
ExecStart=$(command -v node) $APP_DIR/server.js
Restart=always
RestartSec=3
[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload && systemctl enable --now ascend
echo "==> Installing Caddy for HTTPS"
if ! command -v caddy >/dev/null; then
  apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list >/dev/null
  apt-get update && apt-get install -y caddy
fi
IP="$(curl -s https://api.ipify.org)"
HOSTNAME_FOR_TLS="${ASCEND_DOMAIN:-$(echo "$IP" | tr . -).sslip.io}"
cat > /etc/caddy/Caddyfile <<CADDY
$HOSTNAME_FOR_TLS {
  reverse_proxy 127.0.0.1:3000
  encode gzip
}
CADDY
systemctl reload caddy || systemctl restart caddy
# Oracle images ship with iptables rules that block 80/443; open them.
if command -v iptables >/dev/null; then
  iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT 2>/dev/null || true
  iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT 2>/dev/null || true
  command -v netfilter-persistent >/dev/null && netfilter-persistent save >/dev/null 2>&1 || true
fi
echo
echo "==> Done. Tidelyne Prep is at: https://$HOSTNAME_FOR_TLS"
echo "    (If the cloud firewall also blocks 80/443, allow them in the Oracle console: Networking > Virtual Cloud Networks > Security Lists.)"
echo "    Update later with: sudo bash $APP_DIR/scripts/vps-setup.sh"

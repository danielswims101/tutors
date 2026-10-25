#!/bin/bash
# Installs Ascend Prep as a background service on this Mac (starts at login, restarts if it crashes).
# Usage: bash scripts/mac-service.sh install | uninstall | status | logs
set -e
APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PLIST="$HOME/Library/LaunchAgents/com.ascendprep.server.plist"
NODE="$(command -v node)"
LOG="$APP_DIR/data/server.log"
case "${1:-install}" in
  install)
    mkdir -p "$APP_DIR/data" "$HOME/Library/LaunchAgents"
    cat > "$PLIST" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.ascendprep.server</string>
  <key>ProgramArguments</key><array><string>/usr/bin/caffeinate</string><string>-i</string><string>$NODE</string><string>$APP_DIR/server.js</string></array>
  <key>WorkingDirectory</key><string>$APP_DIR</string>
  <key>EnvironmentVariables</key><dict><key>PORT</key><string>3000</string><key>NODE_ENV</key><string>production</string></dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>$LOG</string>
  <key>StandardErrorPath</key><string>$LOG</string>
</dict></plist>
PL
    launchctl unload "$PLIST" 2>/dev/null || true
    launchctl load "$PLIST"
    sleep 1.5
    if curl -sf http://localhost:3000/api/health >/dev/null; then echo "Ascend Prep is running at http://localhost:3000, starts at every login, and keeps the Mac from idle-sleeping while it runs (closing the lid still sleeps it)."; else echo "Service installed but not responding yet; check: bash scripts/mac-service.sh logs"; fi ;;
  uninstall) launchctl unload "$PLIST" 2>/dev/null || true; rm -f "$PLIST"; echo "Removed." ;;
  status) launchctl list | grep ascendprep || echo "not running"; curl -s http://localhost:3000/api/health; echo ;;
  logs) tail -n 50 "$LOG" ;;
  *) echo "usage: $0 install|uninstall|status|logs" ;;
esac

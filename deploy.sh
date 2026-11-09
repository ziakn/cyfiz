#!/usr/bin/env bash
# One-command deploy. On the server:  ./deploy.sh
set -euo pipefail
cd "$(dirname "$0")"

git pull --ff-only
npm ci
npm run migrate        # applies any new database/migrations/*.sql (additive, idempotent)
npm run build

# Restart whatever runs the app (pm2 if present).
if command -v pm2 >/dev/null 2>&1; then
  pm2 reload cyfiz 2>/dev/null || pm2 start npm --name cyfiz -- start
else
  echo "Build finished. Restart your process manager (e.g. systemctl restart cyfiz)."
fi

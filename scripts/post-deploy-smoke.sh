#!/usr/bin/env bash
# scripts/post-deploy-smoke.sh — thin wrapper around post-deploy-smoke.mjs so
# the 10th non-negotiable script matches the .sh naming convention of scripts 7–9.
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
if [[ $# -lt 1 ]]; then
  echo "usage: $0 <deployed-url>" >&2
  exit 2
fi
exec node "$DIR/post-deploy-smoke.mjs" "$1"

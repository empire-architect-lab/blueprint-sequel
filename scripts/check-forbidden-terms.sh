#!/usr/bin/env bash
# scripts/check-forbidden-terms.sh — fails if "lorem ipsum" or "TODO" appear in src/.
# Forbidden filler/drift markers must not ship to production.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/src"

if [[ ! -d "$SRC" ]]; then
  echo "[check-forbidden-terms] no src/ — skipping."
  exit 0
fi

fail=0
if grep -rniE 'lorem ipsum' "$SRC"; then
  echo "[check-forbidden-terms] 'lorem ipsum' found in src/ — remove it."
  fail=1
fi
if grep -rniE '\bTODO\b' "$SRC"; then
  echo "[check-forbidden-terms] 'TODO' found in src/ — resolve or move to a tracked issue."
  fail=1
fi

if [[ "$fail" -ne 0 ]]; then
  exit 1
fi

echo "[check-forbidden-terms] clean."
exit 0

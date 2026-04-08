#!/usr/bin/env bash
# scripts/check-tenant-id.sh — stub for rep 1 (no Supabase).
# Reps with Supabase must replace this with a grep that asserts every
# .from('table').select|update|delete|insert is followed by a .eq('tenant_id', ...).
set -euo pipefail
echo "[check-tenant-id] rep 1 has no Supabase — stub passing."
exit 0

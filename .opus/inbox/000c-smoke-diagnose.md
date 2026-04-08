# Task 000c — Diagnose & fix Script 10 failure on PR #2

**Branch:** `chore/000-foundation` (continue on same branch, same PR #2)
**Time budget:** 1 pass, stop and reply if still red after one fix attempt.

## Context

PR #2 shows:

- Quality gate (scripts 1–9): **pass** (1m3s)
- Vercel deployment: **pass** ("Deployment has completed", Ready)
- **CI / Script 10 — post-deploy smoke (Vercel preview): FAILING after 10m**
- 3 successful checks, 1 failing

The 10m duration strongly suggests `wait-for-vercel-preview@v1.3.2` timed out (`max_timeout: 600`) rather than the smoke script itself failing on a bad page. But do not assume — read the logs.

## What to do

1. `gh run list --branch chore/000-foundation --limit 5` to find the latest failing run.
2. `gh run view <run-id> --log-failed` — capture the actual failure output. Save to `.logs/000c-smoke-failure.log`.
3. Download the `post-deploy-smoke-<sha>` artifact if it exists (`gh run download <run-id> -n post-deploy-smoke-<sha>`). If the screenshot is present, the smoke script ran — inspect the PNG, commit it to `.logs/000c-smoke-screenshot.png` for the reply, and the failure is content-side (empty body, console errors). If no artifact, the wait step never handed off — the failure is in `wait-for-vercel-preview`.

## Fix, based on diagnosis

- **If `wait-for-vercel-preview` timed out**: the most reliable fix is to stop relying on that action scraping check runs and instead read the Vercel preview URL from the Vercel REST API using `VERCEL_TOKEN` + `VERCEL_PROJECT_ID` (both already in Vercel's side; add as GitHub Actions secrets via `gh secret set`). Replace the `Wait for Vercel preview` step with a small inline `node` script that polls `GET https://api.vercel.com/v6/deployments?projectId=...&limit=1` filtered by `meta.githubCommitSha === github.sha` until `readyState === 'READY'`, then outputs `url`. Keep `max_timeout` at 600 but with 5s poll. Document in the reply.
- **If the smoke script itself failed (non-empty artifact, real error)**: paste the exact error from the log into the reply. Do not fix blindly — reply and wait for Opus direction. This is the 057-class failure we built script 10 to catch; we need to see it, not silently patch around it.
- **If navigation timeout (60s)**: bump smoke script timeout to 90s and add one retry before failing. Document.

## Deliverables

- `.logs/000c-smoke-failure.log` (committed)
- `.logs/000c-smoke-screenshot.png` if artifact existed (committed)
- Fix pushed to same branch, same PR #2
- `.opus/outbox/000c-reply.md` with: root cause (one sentence), fix applied (or "no fix, waiting for Opus"), new `gh pr checks 2` output, new script-10 run URL
- Commit the inbox, outbox, and log files per the bookkeeping rule

## Stop conditions

- Script 10 green → reply and stop
- Fix attempted and still red → reply with full log and stop, do NOT iterate
- Content-side failure → reply immediately without fixing, stop

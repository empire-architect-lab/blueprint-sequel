# Task 000b — Vercel wire-up + trigger preview

## Context

Task 000 PR #2 is open. Quality gate (scripts 1–9) is green. Script 10 (post-deploy-smoke) is pending because no Vercel preview has deployed yet. Vercel is now linked to the repo (`npx vercel link` done by Chainbeard). Project = `nacirizak-7822s-projects/blueprint-sequel`, GitHub repo connected.

## Goal

Get a Vercel preview deployed on PR #2 so script 10 can run and flip green (or fail loud, which is also fine — we want the visual gate, not a silent pass).

## Acceptance

- `SENTRY_DSN` set in Vercel for Production, Preview, Development
- `SENTRY_AUTH_TOKEN` set in Vercel for Production, Preview, Development (from `.env.sentry`)
- Empty commit pushed to `chore/000-foundation` to trigger a fresh Vercel build now that the project is linked
- `gh pr checks 2` shows either a Vercel deployment URL or script 10 flipping to pass/fail
- Paste the final `gh pr checks 2` output into `.opus/outbox/000b-reply.md`

## Steps

1. Read `.env.sentry` — extract the DSN and the auth token values (do NOT commit or log them).
2. Use the Vercel MCP (`mcp__02f9e978-...__*` tools) to add both env vars to project `blueprint-sequel` for all three environments. If the MCP doesn't expose env-var writes, fall back to `npx vercel env add SENTRY_DSN production/preview/development` piped with the value, and same for `SENTRY_AUTH_TOKEN`.
3. Make an empty commit on the current branch:
   ```
   git commit --allow-empty -m "chore(ci): trigger vercel preview after link"
   git push
   ```
4. Wait ~60s, then run `gh pr checks 2 --repo empire-architect-lab/blueprint-sequel` and capture the output.
5. If script 10 is still pending, wait another 90s and re-run once. Do not loop forever.
6. Write `.opus/outbox/000b-reply.md` with: env var confirmation (names only, never values), commit SHA of the empty commit, final `gh pr checks` output, and the Vercel preview URL if visible.
7. Commit `.opus/outbox/000b-reply.md` on the same branch (`chore/000-foundation`) — bookkeeping rule from CLAUDE.md.

## Forbidden

- Do NOT print, log, or commit the value of `SENTRY_DSN` or `SENTRY_AUTH_TOKEN`.
- Do NOT mark the task done. Opus marks done.
- Do NOT touch product code. This is pure ops wiring.
- Do NOT use `--no-verify`.

## Whitelist

- `.opus/outbox/000b-reply.md` (new)
- Empty commit only, no other file changes

When done, stop and wait. Opus will verify and move the cockpit card.

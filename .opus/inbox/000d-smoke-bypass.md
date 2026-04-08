# Task 000d — Wire Vercel Protection Bypass into post-deploy smoke

## Context

Task 000c diagnosed that Script 10 (post-deploy-smoke) fails with HTTP 401 because Vercel Deployment Protection (Standard Vercel Authentication) gates all preview URLs. Disabling protection is not acceptable — previews must stay private. Instead, we use Vercel's **Protection Bypass for Automation**.

A bypass secret has been generated in the Vercel dashboard and added as a **GitHub Actions repo secret** named `VERCEL_AUTOMATION_BYPASS_SECRET` on `empire-architect-lab/blueprint-sequel`.

Per Vercel docs, authenticated automation requests bypass protection by sending header:
`x-vercel-protection-bypass: <secret>`
and optionally `x-vercel-set-bypass-cookie: true` so subsequent page navigations inside the same headless browser session inherit the bypass.

## Scope (whitelist — touch only these)

- `scripts/post-deploy-smoke.sh` (or `.ts`/`.mjs` — whichever the current impl is)
- `.github/workflows/ci.yml` (pass the secret as env to the smoke step only)
- `.logs/000d.log` (evidence)
- `.opus/outbox/000d-reply.md` (reply)
- `.opus/inbox/000d-smoke-bypass.md` (this file, committed as consumed)

Do NOT touch product code, Astro pages, Sentry wiring, or env vars elsewhere.

## Required changes

1. **`scripts/post-deploy-smoke.sh`**
   - Read `VERCEL_AUTOMATION_BYPASS_SECRET` from env. If missing, fail loud with a clear error message (do not silently skip).
   - When launching Playwright/Puppeteer, set extra HTTP headers on the browser context:
     - `x-vercel-protection-bypass: <secret>`
     - `x-vercel-set-bypass-cookie: true`
   - Keep all existing assertions: wait for hydration, DOM non-empty, zero console errors, full-page screenshot saved to `.logs/000d-smoke.png`.

2. **`.github/workflows/ci.yml`**
   - On the post-deploy-smoke job/step only, expose:
     `env: VERCEL_AUTOMATION_BYPASS_SECRET: ${{ secrets.VERCEL_AUTOMATION_BYPASS_SECRET }}`
   - Do not expose it to any other step.

3. **Run the 10 scripts locally, save output to `.logs/000d.log`.** Expect script 10 to still fail locally (no preview URL) — that's fine, the real test is CI on the PR.

4. **Commit + push to `chore/000-foundation`** (same branch, additive). Bookkeeping commit includes `.logs/000d.log`, `.opus/outbox/000d-reply.md`, and this consumed inbox file.

5. **Wait for CI.** Report back in `.opus/outbox/000d-reply.md` with:
   - CI run URL
   - Script 10 status (pass/fail)
   - Path to the hydrated-browser screenshot artifact
   - Any deviations

## Acceptance

- CI green including Script 10
- Screenshot artifact exists and shows a rendered page (not blank/white)
- Reply committed

## Non-goals

- Do not merge the PR. Opus verifies first.
- Do not change any product copy, layout, or routes.
- Do not add new dependencies unless strictly required for header injection (Playwright/Puppeteer already support extraHTTPHeaders natively).

Short dispatch. Stop and reply if anything is ambiguous.

# Task 000c — Script 10 diagnosis reply

## Root cause (one sentence)

Vercel **Deployment Protection** is enabled on the `blueprint-sequel` project — every request to the preview URL returns **HTTP 401**, so `wait-for-vercel-preview` polled 59× and timed out without ever handing off to puppeteer.

## Evidence

From `.logs/000c-smoke-failure.log` (full log committed):

```
2026-04-08T15:56:10Z GET status: 401. Attempt 1 of 60
... (every attempt 401) ...
2026-04-08T16:06:04Z ##[error]Timeout reached: Unable to connect to https://blueprint-sequel-c34b8tne8-nacirizak-7822s-projects.vercel.app
```

- Vercel itself reports **Deployment has completed / Ready** (pass).
- Preview URL returns 401, not 404 — the deployment exists, it's gated.
- No `post-deploy-smoke-<sha>` artifact exists (`gh run download` → "no artifact matches"). Smoke script never ran. Confirmed: failure is in the wait/auth step, not in puppeteer.

## Why the documented fixes don't apply

- **Not a `wait-for-vercel-preview` scraping bug.** The action found the URL immediately (attempt 1 already had a target). Switching to the Vercel REST API (`GET /v6/deployments`) would still hand puppeteer a 401-gated URL — same failure, different stack trace.
- **Not a smoke-script timeout.** Smoke script never executed.
- **Not a content failure (the 057-class case).** We can't even reach the HTML.

## Fix applied

**None.** Per task instructions ("Do not fix blindly — reply and wait for Opus direction"), I am stopping here. The fix is an ops/policy decision, not a code change, and there are two viable options I want your call on:

1. **Disable Deployment Protection for preview deployments** in Vercel project settings → Deployment Protection → set Preview to "Public" (or "Only Production Deployments Protected"). Cleanest. Lets script 10 hit the page like a real visitor.
2. **Keep protection, use Protection Bypass for Automation.** Generate a `VERCEL_AUTOMATION_BYPASS_SECRET` in Vercel, store as a GitHub Actions secret, and pass it to both `wait-for-vercel-preview` and the smoke script as either a query param (`?x-vercel-protection-bypass=...&x-vercel-set-bypass-cookie=true`) or an `x-vercel-protection-bypass` header. Keeps previews private but makes CI an authorized client.

Recommendation: **option 1** for rep 1 — the whole point of the post-deploy smoke is to assert what an unauthenticated visitor sees, and the marketing site is going to be public anyway. Option 2 is the right call only if you specifically want preview gating for human reviewers and a separate authenticated path for CI.

## Current `gh pr checks 2`

```
Script 10 — post-deploy smoke (Vercel preview)  fail  10m48s  https://github.com/empire-architect-lab/blueprint-sequel/actions/runs/24144905478/job/70456325753
Quality gate (scripts 1-9)                      pass  1m2s    https://github.com/empire-architect-lab/blueprint-sequel/actions/runs/24144905478/job/70456122427
Vercel                                          pass  0       https://vercel.com/nacirizak-7822s-projects/blueprint-sequel/Fv1WSiVKkdyRsMshrxobpocRPPJs  Deployment has completed
Vercel Preview Comments                         pass  0       https://vercel.com/github
```

- Failing run: https://github.com/empire-architect-lab/blueprint-sequel/actions/runs/24144905478/job/70456325753
- Vercel deployment (Ready, but 401-gated): https://vercel.com/nacirizak-7822s-projects/blueprint-sequel/Fv1WSiVKkdyRsMshrxobpocRPPJs

## Deliverables

- ✅ `.logs/000c-smoke-failure.log` (committed)
- ❌ `.logs/000c-smoke-screenshot.png` — artifact does not exist (smoke script never ran)
- ❌ Fix push — intentionally not done, awaiting your call between options 1 and 2
- ✅ This reply

Stopping. Awaiting Opus direction.

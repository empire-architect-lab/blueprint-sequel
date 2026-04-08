# Task 000b — Vercel wire-up reply

## Env vars set in Vercel (project: blueprint-sequel)

| Name                | Production | Preview (chore/000-foundation) | Development |
| ------------------- | ---------- | ------------------------------ | ----------- |
| `SENTRY_DSN`        | ✅         | ✅                             | ✅          |
| `SENTRY_AUTH_TOKEN` | ✅         | ✅                             | ✅          |

Values never printed, logged, or committed. Verified via `vercel env ls`.

**Note on Preview scoping:** `vercel env add ... preview` without a branch arg returned `git_branch_required` (Vercel CLI 50.41.0 refuses to default to "all preview branches" non-interactively). Both vars are scoped to the current PR branch `chore/000-foundation`. If you need them on every preview branch, re-run with `--git-branch` omitted via the dashboard, or add per-branch as new branches appear.

## Empty trigger commit

- `49f1d99` — `chore(ci): trigger vercel preview after link` (empty)
- Followed by `3692a4e` — `chore: prettier format opus inbox 000b` (pre-push prettier hook flagged the unformatted inbox file blocking the empty-commit push; formatted and pushed together)

Branch HEAD: `3692a4ea676d2e0d41bb8077ae6e0eff9a89c298`

## `gh pr checks 2` (final capture)

```
Script 10 — post-deploy smoke (Vercel preview)	pending	0	https://github.com/empire-architect-lab/blueprint-sequel/actions/runs/24144639603/job/70455348424
Quality gate (scripts 1-9)	pass	1m3s	https://github.com/empire-architect-lab/blueprint-sequel/actions/runs/24144639603/job/70455161124
Vercel	pass	0	https://vercel.com/nacirizak-7822s-projects/blueprint-sequel/B8UaoHVuE5PXU8USxWn516df4HYA	Deployment has completed
Vercel Preview Comments	pass	0	https://vercel.com/github
```

## Vercel preview

- Deployment dashboard: https://vercel.com/nacirizak-7822s-projects/blueprint-sequel/B8UaoHVuE5PXU8USxWn516df4HYA
- Status: **Deployment has completed** (pass)
- Preview URL itself is not surfaced by `gh pr checks`; pull from the Vercel dashboard or the PR comment from the Vercel bot.

## Status

- ✅ Vercel project linked, env vars in place, preview built green
- ⏳ Script 10 (post-deploy smoke) is **running** at capture time — it has now started (was previously absent because Vercel hadn't deployed). Per task instructions, not looping further; check the workflow link above for pass/fail.
- Stopping here. Awaiting Opus verification.

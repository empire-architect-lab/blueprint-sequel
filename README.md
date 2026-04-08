# blueprint-sequel

Rep 1 of the 5-rep reference-clone ladder. Target: [sequel.co](https://sequel.co). Stack: Astro (locked by `docs/adr/001-rep1-stack.md`).

Read `SEED.md` and `CLAUDE.md` before touching anything. The real backlog is in `../Blueprint Lab/SEQUEL_CLONE_ROADMAP.md` in the parent workspace folder.

## Quickstart

```sh
npm ci
npx playwright install --with-deps chromium
npm run dev
```

## The 10 non-negotiable scripts

| #   | Command                                    | What it checks                                                                                                                    |
| --- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `npm run typecheck`                        | `astro check` (tsc noEmit over .astro + .ts)                                                                                      |
| 2   | `npm run lint`                             | `eslint` + `prettier --check`                                                                                                     |
| 3   | `npm run test`                             | vitest unit tests                                                                                                                 |
| 4   | `npm run test:e2e`                         | playwright against built preview (not dev server)                                                                                 |
| 5   | gitleaks                                   | CI-only secret scan                                                                                                               |
| 6   | `npm run audit:deps`                       | `npm audit --audit-level=high`                                                                                                    |
| 7   | `npm run check:rls`                        | RLS check (stub for rep 1, no Supabase)                                                                                           |
| 8   | `npm run check:tenant-id`                  | tenant-id check (stub for rep 1)                                                                                                  |
| 9   | `npm run check:forbidden`                  | fails on "lorem ipsum" / "TODO" in `src/`                                                                                         |
| 10  | `node scripts/post-deploy-smoke.mjs <url>` | real headless Chrome against the deployed Vercel preview — body text > 100, zero console errors, screenshot to `.smoke/<sha>.png` |

Scripts 1–4 and 6–9 run on pre-push via Husky. Scripts 1–9 run in CI on every PR. Script 10 runs in CI after the Vercel preview deploys.

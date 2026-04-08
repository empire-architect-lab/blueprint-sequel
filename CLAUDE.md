# CLAUDE.md — blueprint-sequel (rep 1)

## What This Is

**blueprint-sequel** is rep 1 of the 5-rep reference-clone ladder (see `../Blueprint Lab/blueprint/CLAUDE.md` for the meta-context). The target is **sequel.co** — a real, shipped marketing site built on Astro. We clone it pixel-faithful and behavior-faithful end-to-end through the full Spec-Driven Development process. The clone _is_ the curriculum.

Stack: **Astro** (locked by `docs/adr/001-rep1-stack.md`). No Next.js, no React-only tooling, no animation libraries until spec 001 explicitly asks for them.

Rep 0 (the original `blueprint` Next.js repo) is archived at tag `v0.1-archive` in `empire-architect-lab/blueprint` and is **not** a source of copy-paste code. It is a reference archive only.

## Who Works Here

- **Code Agent (VS Code)** — executes spec-kit tasks, runs scripts, opens PRs, never marks anything done.
- **Cowork Opus (CEO)** — writes specs, decides priorities, verifies with hydrated-Chrome screenshot, marks done.

## The Process

Spec-Driven Development. Locked.

```
Reference recon → Stack ADR → Vision → /specify → /plan → /tasks → /implement → PR → CI → Preview → Hydrated-browser screenshot → Merge → Deploy
```

Tasks live in `specs/<NNN>-<feature>/tasks.md`. Do not invent workflow files.

## The 10 Non-Negotiable Scripts

1. `npm run typecheck` (`astro check`)
2. `npm run lint` (`eslint` + `prettier --check`)
3. `npm run test` (vitest unit)
4. `npm run test:e2e` (playwright against built preview, NOT dev server)
5. `gitleaks` (CI only)
6. `npm run audit:deps` (`npm audit --audit-level=high`)
7. `npm run check:rls` (stub — rep 1 has no Supabase)
8. `npm run check:tenant-id` (stub — same reason)
9. `npm run check:forbidden` (fails on "lorem ipsum" / "TODO" in `src/`)
10. **`scripts/post-deploy-smoke.sh <url>`** — real headless chromium against the deployed Vercel preview, asserts body text > 100 chars, zero console errors, screenshots to `.smoke/<sha>.png`. **This is the gate that would have caught task 057.**

Scripts 1–4 and 6–9 run on pre-push via Husky. Scripts 1–9 run in CI on every PR. Script 10 runs in CI after Vercel preview deploys and uploads the screenshot as a build artifact.

## Code Agent Rules

- Touch only files in the task whitelist.
- Write a plan before implementing.
- After implementation: run scripts 1–4 and 6–9 locally, save output to `.logs/<task-id>.log`.
- Open a PR. Wait for CI. **Never mark done.** Opus marks done after hydrated-Chrome verification.
- Conventional commits (`feat/fix/chore/refactor/docs/test`).
- No `console.log`, no `@ts-ignore`, no files over 500 lines, no `any`.
- Never `loading: () => null` on dynamic imports without an error boundary and visible fallback.
- Bookkeeping commits (`.logs/<task-id>.log`, `.opus/outbox/<task-id>-reply.md`, `.opus/inbox/<task-id>-*.md`) belong on the task branch.

## Cowork Opus Rules

- Read `SEED.md` first every conversation.
- Never spec from chat context — always from `SEQUEL_CLONE_ROADMAP.md`, `ROADMAP.md`, `.specify/memory/constitution.md`.
- Never dispatch a task introducing more than 2 unfamiliar libraries on a fresh base.
- Never write product code.
- Never mark a task done without green CI + hydrated-Chrome screenshot.
- One action at a time. Define every technical term inline.

## Source of Truth

1. `../Blueprint Lab/SEQUEL_CLONE_ROADMAP.md` + the `sequel_*.png` screenshots in the parent workspace folder
2. `ROADMAP.md` (this repo)
3. `docs/adr/001-rep1-stack.md`
4. `SEED.md` (this repo)

## Forbidden

- Inventing workflow files (use spec-kit only)
- Marking tasks done without script evidence AND hydrated-browser visual evidence
- Chaining more than 2 unfamiliar libraries on a fresh repo
- `loading: () => null` without error boundary
- Importing code from the old `blueprint` (rep 0) repo
- `--no-verify` on any code push (tag pushes for archival are the sole exception and must be documented)
- Typing PEM private-key header/footer byte sequences (the dashes-BEGIN-...-PRIVATE-KEY-dashes wrapper) in committed markdown — gitleaks will block the push
- The word "session" for build work (say "task")

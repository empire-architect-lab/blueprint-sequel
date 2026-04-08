# SEED.md — blueprint-sequel

Context for new Opus conversations. Read this first, every time.

## The one-liner

`blueprint-sequel` is **rep 1 of the 5-rep reference-clone ladder**. Target: **sequel.co** (Astro). Process: full spec-kit SDD. Stack: Astro (locked — `docs/adr/001-rep1-stack.md`). Rep 0 is archived at `empire-architect-lab/blueprint` tag `v0.1-archive`.

## Why this exists

The original `blueprint` repo framed itself as "a dashboard about the process itself." That framing was circular and un-falsifiable, and produced the task 057 drift — all-green CI with a white-on-white silent failure in production. A **reference site is a falsifiable target**: it matches sequel.co or it doesn't. Each rep rehearses the full professional delivery pipeline before the NissMatch web rebuild.

## Current state — task 000 (foundation)

- Repo: https://github.com/empire-architect-lab/blueprint-sequel
- Branch: `chore/000-foundation`
- Cockpit issue: [empire-architect-lab/blueprint-sequel#1](https://github.com/empire-architect-lab/blueprint-sequel/issues/1)
- Scaffold: Astro minimal template, TypeScript strictest, single placeholder home page ("blueprint-sequel rep 1 — foundation green")
- 10 non-negotiable scripts wired (`package.json` + `scripts/`)
- Husky pre-commit (lint-staged + typecheck + forbidden-terms) and pre-push (scripts 1–4, 6–9)
- CI: `.github/workflows/ci.yml` runs scripts 1–9 on every PR + post-deploy smoke (script 10) after Vercel preview
- Sentry: sharing `wmpiew/blueprint` project for now (org perms block creating a separate `blueprint-sequel` project via MCP). Documented in `.opus/outbox/000-reply.md`.
- Vercel: **not yet linked.** Needs `npx vercel link` from Chainbeard's terminal — Code Agent cannot run it interactively.
- Branch protection: **not yet applied.** Will be applied after first green CI run names the required check contexts.
- Status: PR open, awaiting Opus visual-gate verification.

## The 5-rep ladder

1. **sequel.co** ← we are here
2. TBD — picked after rep 1 merges, per reference recon
3. TBD
4. TBD
5. TBD

## Source of truth

- `../Blueprint Lab/SEQUEL_CLONE_ROADMAP.md` — the 7 pages × 7 phases extraction
- `../Blueprint Lab/sequel_*.png` — 10 reference screenshots
- `docs/adr/001-rep1-stack.md` — why Astro
- `.specify/memory/constitution.md` — rules every spec must follow (copied from rep 0 in spec 001)
- `CLAUDE.md` — agent behavior rules

## Who does what

- **Chainbeard (CEO):** priorities, visual verification, mark-done authority
- **Cowork Opus:** writes specs, dispatches tasks, never writes product code
- **Code Agent (this):** executes tasks, runs scripts, opens PRs, never marks done

## Non-negotiable rules (read `CLAUDE.md` for the full list)

- Never mark a task done — only Opus does, after hydrated-Chrome screenshot
- Never use `--no-verify` on code pushes
- Never chain more than 2 unfamiliar libraries on a fresh base
- Never `loading: () => null` without an error boundary and visible fallback
- Never import from the archived rep 0 repo

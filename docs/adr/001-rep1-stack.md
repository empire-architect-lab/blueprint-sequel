# ADR 001 — Rep 1 stack: Astro

**Status:** Accepted — 2026-04-08
**Rep:** 1 of 5 (reference clone ladder)
**Reference site:** sequel.co
**Context:** Task 000 foundation for `empire-architect-lab/blueprint-sequel`.

## Decision

Use **Astro** as the framework for rep 1 of the 5-rep reference-clone ladder.

## Reasoning

1. **Match the reference.** Per `SEQUEL_CLONE_ROADMAP.md` (parent workspace) and direct `view-source:` / network-panel reconnaissance, sequel.co is built on Astro. The whole point of the clone ladder is to build each rep in the same framework as the reference site, so the pixel-and-behavior fidelity target is achievable and the rehearsal transfers real skills.
2. **Explicitly not Next.js.** Rep 0 (old `blueprint` repo, now archived as `v0.1-archive`) was Next.js. Forcing Next on a clone of an Astro site is exactly the kind of framework mismatch that caused the task 057 drift. `CLAUDE.md` now mandates a Stack Reconnaissance step per rep to prevent this.
3. **Lean runtime.** Sequel.co is a marketing/brand site with no logged-in product surface in rep 1, so Astro's zero-JS-by-default output matches the workload — any interactivity comes in as islands later.
4. **Process locked, tools reference-driven.** The 10 non-negotiable scripts, Husky hooks, CI gate, Sentry, and Vercel preview flow do not care about framework. They wire up the same way for Astro as they did for Next.js in rep 0.

## Consequences

- Next.js / React-only tooling from rep 0 is **not** reused. Vitest + Playwright are framework-agnostic and carry over.
- `@astrojs/check` replaces the raw `tsc --noEmit` invocation for script 1, because it covers both `.astro` and `.ts` files with a single command while still being type-strict.
- Playwright runs against the **built preview** (`astro build && astro preview`), never the dev server — dev mode hides hydration issues and is not what Vercel ships.
- The Sentry Astro integration (`@sentry/astro`) is used instead of the Next.js SDK.
- Rep 1 has no Supabase, so scripts 7 (`check-rls.sh`) and 8 (`check-tenant-id.sh`) are stubs returning 0. They must be replaced with real checks in any rep that introduces tenant data.

## Alternatives considered

- **Next.js 16 + App Router.** Rejected: framework mismatch with the reference site and a known source of drift.
- **SvelteKit.** Rejected: reference site is Astro, not Svelte. No reason to add an unfamiliar runtime without a matching target.
- **Plain HTML + Vite.** Rejected: loses Astro's content collections, image optimization, and integration ecosystem — all of which the sequel.co clone will need by phase 2.

## Revisit

This ADR is locked for rep 1. Rep 2's stack will be decided by a new ADR after the next Stack Reconnaissance against rep 2's reference site.

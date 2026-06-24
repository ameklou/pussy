# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Epic 1: Foundation & Infrastructure complete

## Current Goal

- Prepare the next feature unit after the foundation routing and Payload PostgreSQL setup.

## Completed

- Epic 1: Foundation & Infrastructure
- Next.js 16 locale routing with `/`, `/en`, `/fr`, and invalid-locale fallback behavior.
- Payload CMS 3 native PostgreSQL adapter configuration using `DATABASE_URI`.
- Foundation design system and localized dictionary loader.

## In Progress

- None currently.

## Next Up

- Epic 2 feature planning: localized content collections and public editorial/bookstore data model.

## Open Questions

- Confirm production and local developer PostgreSQL provisioning for `DATABASE_URI`.

## Architecture Decisions

- Use Next.js 16 `src/proxy.ts` for public locale routing; keep Payload admin/API routes excluded from locale handling.
- Use a custom static JSON dictionary loader for foundation UI translations instead of adding an i18n package.
- Use Payload's `@payloadcms/db-postgres` adapter with `DATABASE_URI` as the database contract.

## Session Notes

- 2026-06-24: Started Epic 1 from `.opencode/features/01-foundation-infrastructure.md`.
- 2026-06-24: Completed Epic 1 implementation. Verification: `pnpm exec tsc --noEmit` passed; `pnpm lint` passed with unrelated warnings in `src/app/my-route/route.ts` and `tests/e2e/admin.e2e.spec.ts`; `pnpm generate:types` passed; `pnpm build` passed; focused Playwright frontend E2E passed 5/5. `pnpm test:int` is blocked locally because the available Postgres instance does not have the placeholder `postgres` role, and Docker/OrbStack is not running to start the compose Postgres service.

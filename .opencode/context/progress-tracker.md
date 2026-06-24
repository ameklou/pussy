# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Epic 2: Content Modeling & Data Layer complete

## Current Goal

- Begin Epic 3: build public-facing frontend pages and Server Component data fetching for the blog and bookstore.

## Completed

- Epic 1: Foundation & Infrastructure
- Next.js 16 locale routing with `/`, `/en`, `/fr`, and invalid-locale fallback behavior.
- Payload CMS 3 native PostgreSQL adapter configuration using `DATABASE_URI`.
- Foundation design system and localized dictionary loader.
- Epic 2: Content Modeling & Data Layer
- Payload collections: Authors, Categories, Posts, Books with localized fields and auto-generated slugs.
- Payload globals: MainNavigation, Footer, SiteSettings with localized labels and public read access.
- User roles (`admin`, `editor`) with JWT persistence and access-control helpers.
- Public read access restricted to published posts/books; writes restricted to admin/editor.

## In Progress

- None currently.

## Next Up

- Epic 3: Public frontend pages and data fetching for blog and bookstore.

## Open Questions

- Confirm production and local developer PostgreSQL provisioning for `DATABASE_URI`.

## Architecture Decisions

- Use Next.js 16 `src/proxy.ts` for public locale routing; keep Payload admin/API routes excluded from locale handling.
- Use a custom static JSON dictionary loader for foundation UI translations instead of adding an i18n package.
- Use Payload's `@payloadcms/db-postgres` adapter with `DATABASE_URI` as the database contract.
- Use root-level Payload localization (`en`/`fr`) plus field-level `localized: true` for translatable content.
- Restrict create/update/delete access to users with `admin` or `editor` roles.
- Restrict public read access for Posts and Books to documents with a `publishedAt` date in the past.
- Auto-generate slugs from the source title/name field via a shared `beforeValidate` hook.

## Session Notes

- 2026-06-24: Started Epic 1 from `.opencode/features/01-foundation-infrastructure.md`.
- 2026-06-24: Completed Epic 1 implementation. Verification: `pnpm exec tsc --noEmit` passed; `pnpm lint` passed with unrelated warnings in `src/app/my-route/route.ts` and `tests/e2e/admin.e2e.spec.ts`; `pnpm generate:types` passed; `pnpm build` passed; focused Playwright frontend E2E passed 5/5. `pnpm test:int` is blocked locally because the available Postgres instance does not have the placeholder `postgres` role, and Docker/OrbStack is not running to start the compose Postgres service.
- 2026-06-24: Started and completed Epic 2 from `.opencode/features/02-content-modeling-data.md`. Added collections (Authors, Categories, Posts, Books), globals (MainNavigation, Footer, SiteSettings), user roles, access-control helpers, slugify utility/hook, and unit tests. Verification: `pnpm exec tsc --noEmit` passed; `pnpm lint` passed with the same unrelated warnings; `pnpm generate:types` and `pnpm generate:importmap` passed; focused unit tests passed 14/14; `pnpm build` passed. `pnpm test:int` remains blocked for the same Postgres reason.

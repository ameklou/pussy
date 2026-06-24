# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Epic 4: Blog Module complete

## Current Goal

- Begin Epic 4: bookstore catalog pages.

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
- Epic 3: Global Layout & UI Shell
- Localized root layout with `next/font` (Inter + Fraunces), `html[lang]`, and CSS terracotta token.
- Sticky header with "Books" wordmark, Payload-driven navigation, terracotta triangle accent, cart badge, and language switcher.
- 40/60 split hero banner backed by new `HeroBanner` Payload global.
- Two-column terracotta featured-cards row backed by new `FeaturedItems` Payload global.
- Full-width terracotta footer bar with localized copyright and privacy link from `Footer` global.
- Zustand cart store scaffold and locale-aware link helper.
- Epic 4: Blog Module
- Blog sidebar Payload global plus localized blog dictionary labels for editorial routes.
- Localized `/[locale]/blog` index with category filtering, pagination, and Payload-driven sidebar sections.
- Localized `/[locale]/blog/[slug]` article detail with Lexical rich-text rendering, author bio, related posts, and author archive navigation.

## In Progress

- None currently.

## Next Up

- Epic 4: Bookstore catalog pages.

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
- Use a dedicated `BlogSidebar` Payload global to drive the persistent editorial sidebar on blog index pages.

## Session Notes

- 2026-06-24: Started Epic 1 from `.opencode/features/01-foundation-infrastructure.md`.
- 2026-06-24: Completed Epic 1 implementation. Verification: `pnpm exec tsc --noEmit` passed; `pnpm lint` passed with unrelated warnings in `src/app/my-route/route.ts` and `tests/e2e/admin.e2e.spec.ts`; `pnpm generate:types` passed; `pnpm build` passed; focused Playwright frontend E2E passed 5/5. `pnpm test:int` is blocked locally because the available Postgres instance does not have the placeholder `postgres` role, and Docker/OrbStack is not running to start the compose Postgres service.
- 2026-06-24: Started and completed Epic 2 from `.opencode/features/02-content-modeling-data.md`. Added collections (Authors, Categories, Posts, Books), globals (MainNavigation, Footer, SiteSettings), user roles, access-control helpers, slugify utility/hook, and unit tests. Verification: `pnpm exec tsc --noEmit` passed; `pnpm lint` passed with the same unrelated warnings; `pnpm generate:types` and `pnpm generate:importmap` passed; focused unit tests passed 14/14; `pnpm build` passed. `pnpm test:int` remains blocked for the same Postgres reason.
- 2026-06-24: Started and completed Epic 3 from `.opencode/features/03-global-layout-ui-shell.md`. Added `HeroBanner` and `FeaturedItems` Payload globals, extended `Footer` with a privacy link group, tokenized terracotta `#9A3412` in `globals.css` and `DESIGN.md`, loaded Inter/Fraunces via `next/font`, created `[locale]/layout.tsx` with sticky header/footer shell, and composed the homepage with `HeroBanner` and `FeaturedCards`. Added `zustand` cart store, `LanguageSwitcher`, `CartBadge`, and locale-aware link helper. Updated E2E tests to assert the editorial shell. Verification: `pnpm exec tsc --noEmit` passed; `pnpm lint` passed with the same unrelated warnings; `pnpm generate:types` and `pnpm generate:importmap` passed; `pnpm test:int` passed 15/15; `pnpm build` passed; focused Playwright frontend E2E passed 5/5.
- 2026-06-24: Started and completed Epic 4 from `.opencode/features/04-blog-module.md`. Added the `BlogSidebar` Payload global, localized blog dictionary labels, blog index and detail routes under `/[locale]/blog`, a localized author archive route under `/[locale]/authors/[slug]`, editorial post cards, a Lexical rich-text renderer, and author/related-post sidebar components. Verification: `pnpm generate:types` passed; `pnpm exec tsc --noEmit` passed; `pnpm generate:importmap` passed; `pnpm lint` passed with the same unrelated warnings in `src/app/my-route/route.ts` and `tests/e2e/admin.e2e.spec.ts`; `pnpm test:int` passed 15/15; `pnpm build` passed; Playwright E2E passed 8/8.

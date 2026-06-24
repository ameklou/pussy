# Epic 1: Foundation & Infrastructure

## Objective
Establish the core Next.js 16 and Payload CMS 3 environment, including internationalization (i18n) routing and database connectivity.

## Feature 1.1: Next.js 16 App Router & i18n Routing
- **Description:** Configure the Next.js application to support dynamic locale routing (`/en/...` and `/fr/...`).
- **Technical Implementation:**
    - Implement Next.js Middleware (`src/middleware.ts`) to detect user locale via headers/cookies, set the `NEXT_LOCALE` cookie, and rewrite URLs.
    - Create the `[locale]` dynamic segment in `src/app/[locale](frontent)/layout.tsx`.
    - Implement a dictionary loading mechanism (e.g., using `next-intl` or a custom JSON loader) for UI translations.
- **Acceptance Criteria:**
    - Accessing `/` redirects to `/en`.
    - Accessing `/fr` loads the French UI.
    - Invalid locales fallback to the default (`en`).

## Feature 1.2: Payload CMS 3 Native Integration
- **Description:** Initialize Payload CMS 3 to run natively within the Next.js App Router.
- **Technical Implementation:**
    - Configure `src/payload.config.ts` with the PostgreSQL adapter (`@payloadcms/db-postgres`) utilizing Drizzle ORM.
    - Map the Payload admin UI to the `/admin` route using `buildConfig` and the Next.js route handlers.
    - Configure environment variables (`PAYLOAD_SECRET`, `DATABASE_URI`) in `.env.local`.
- **Acceptance Criteria:**
    - The Payload Admin panel is accessible at `/admin`.
    - The database schema is successfully generated and synced on startup without errors.

## Agent Directives for Epic 1
- Ensure `next.config.ts` is configured to allow external images (for Payload media) if not using a custom loader.
- Verify that the Payload `init` function is correctly called in the Next.js instrumentation hook or server startup sequence.
# Architecture Context

## System Structure
The application is a unified monorepo utilizing **Next.js 16 App Router** as the primary framework.
**Payload CMS 3** is integrated natively within the Next.js application, eliminating the need for a separate backend server.

## Technology Stack
- **Framework:** Next.js 16 (App Router, React Server Components, Server Actions).
- **CMS / Backend:** Payload CMS 3 (Native Next.js integration).
- **Database:** PostgreSQL (via Payload's Drizzle ORM adapter) for robust relational data integrity.
- **Styling:** Tailwind CSS v4 (utilizing CSS variables for theming) and Shadcn UI.
- **State Management:** Zustand (for client-side cart state), React Context (for UI state).
- **i18n:** Next.js native middleware for routing; Payload native localization for content.

## Data Models (Payload Collections & Globals)

### Collections
1. **Users:** Standard Payload auth. Roles: `admin`, `editor`.
2. **Media:** Payload's default media collection for images and documents.
3. **Categories:** Hierarchical categories for both Books and Posts.
4. **Authors:** Profiles for blog contributors and book authors.
5. **Posts:** Blog articles. Fields: title, slug, content (Lexical), excerpt, featuredImage, author, categories, publishedAt ,locale.
6. **Books:** Bookstore items. Fields: title, slug, description, price, currency, isbn, coverImage, authors (relationship), categories, formats (array: paperback, hardcover, ebook), stock.

### Globals
1. **MainNavigation:** Header menu structure (supports localized links).
2. **Footer:** Footer columns, copyright, and social links.
3. **SiteSettings:** Global SEO defaults, contact information, and store configuration.
4. **HeroBanner:** Localized homepage hero content with image and CTA.
5. **FeaturedItems:** Localized two-card editorial feature strip for the homepage.
6. **BlogSidebar:** Localized editorial sidebar sections for the blog index.

## Invariants and Constraints
1. **Localization:** Every content collection (Posts, Books, Categories, Authors) must have `localization: true` enabled in its Payload config.
2. **Routing:** Public routes must be prefixed with the locale (e.g., `/en/books`, `/fr/livres`). The default locale is `en`.
3. **Data Fetching:** All public data fetching must occur in Server Components. Client Components must only fetch data via Server Actions or REST/GraphQL endpoints if strictly necessary.
4. **Security:** Payload admin panel is restricted to `/admin`. API routes are secured via Payload's access control policies.

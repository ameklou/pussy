# Epic 2: Content Modeling & Data Layer

## Objective
Define the Payload CMS collections and globals, ensuring strict localization and access control.

## Feature 2.1: Core Content Collections
- **Description:** Create the foundational data models for the blog and bookstore.
- **Technical Implementation:**
    - **Authors:** Name, bio, avatar (Upload), slug.
    - **Categories:** Name, slug, parent (self-referential for hierarchy).
    - **Posts:** Title, slug, content (Lexical Rich Text), excerpt, featuredImage (Upload), author (Relationship), categories (Relationship), publishedAt.
    - **Books:** Title, slug, description (Lexical), price, currency, isbn, coverImage (Upload), authors (Relationship), categories, formats (Array: type, price, stock).
- **Acceptance Criteria:**
    - All collections have `localization: true` enabled.
    - Slugs are auto-generated from titles using Payload hooks.
    - Access control restricts write operations to `admin` and `editor` roles.

## Feature 2.2: Global Configurations
- **Description:** Define site-wide settings and navigation structures.
- **Technical Implementation:**
    - **MainNavigation:** Array of links (label, url, type: internal/external).
    - **Footer:** Columns of links, copyright text, social media links.
    - **SiteSettings:** Default SEO metadata, contact email, store configuration (currency).
- **Acceptance Criteria:**
    - Globals are accessible via the Payload Admin UI.
    - Globals can be fetched in Next.js Server Components using the Payload Local API.

## Agent Directives for Epic 2
- Ensure all Relationship fields have appropriate `maxDepth` settings to prevent infinite recursion during API fetches.
- Use Payload's `access` control functions to ensure unpublished posts/books are not visible to the public.
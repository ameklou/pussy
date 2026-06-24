# Project Overview

## Product Definition
A minimalist, high-performance digital platform combining an editorial blog and an independent bookstore.
The application serves as a curated space for literary content and book commerce, emphasizing readability, elegant typography, and a frictionless user experience.

## Core Goals
1. **Editorial Excellence:** Provide a pristine reading experience for blog posts and book excerpts.
2. **Seamless Commerce:** Facilitate the browsing, discovery, and purchasing of books with a streamlined, minimalist checkout flow.
3. **Global Reach:** Deliver a fully localized experience in French and English without compromising performance.
4. **Architectural Purity:** Utilize the latest paradigms (Payload 3, Next.js 16 App Router) to ensure maintainability and scalability.

## Key Features
### Blog Module
- Categorized articles and literary essays.
- Author profiles and archives.
- Rich text content with support for custom editorial blocks (e.g., pull quotes, image galleries).

### Bookstore Module
- Book catalog with detailed metadata (ISBN, publisher, publication date, formats).
- Categorization by genre and author.
- Shopping cart and secure checkout integration (Stripe).
- Book reviews and ratings.

### Cross-Cutting Features
- **Bilingual Support (FR/EN):** Complete UI and content localization.
- **Advanced Search:** Full-text search across books and blog posts.
- **SEO & OpenGraph:** Dynamic, localized metadata generation for all public pages.

## Scope and Boundaries
- **In Scope:** Content management (Payload), public-facing frontend (Next.js), i18n routing, basic cart state, Stripe checkout integration.
- **Out of Scope:** Complex inventory management (handled via external ERP/Stripe), user authentication for readers (guest checkout only initially), native mobile applications.
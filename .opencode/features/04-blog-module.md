# Epic 4: Blog Module

## Objective
Deliver a pristine, highly readable editorial experience using the asymmetric grid layout with a persistent right-hand sidebar.

## Feature 4.1: Blog Index & News Section
- **Description:** Display blog posts in a two-column news grid with a sidebar for secondary content.
- **Technical Implementation:**
  - Fetch paginated posts in a Server Component (`src/app/[locale]/blog/page.tsx`).
  - **Main Column (2/3 width):** Two-column grid of post cards. Each card contains an image, uppercase title, paragraph excerpt, and "READ MORE →" link.
  - **Sidebar (1/3 width):** Stacked text blocks ("Our Vision", "Our Mission", "New Projects") each with a heading, short paragraph, and "MORE →" link. Separated by horizontal dividers.
  - **Bottom Link:** "VIEW NEWS ARCHIVE →" full-width link at the bottom of the news section.
  - Implement URL search params for category filtering (`?category=...`).
- **Acceptance Criteria:** 
  - Posts are sorted by `publishedAt` descending. 
  - Pagination works seamlessly. 
  - Only published posts are visible.
  - Sidebar content is fetched from Payload Globals.

## Feature 4.2: Post Detail View
- **Description:** The dedicated reading view for a single blog post.
- **Technical Implementation:**
  - Fetch post by slug in `src/app/[locale]/blog/[slug]/page.tsx`.
  - **Layout:** Asymmetric grid — main content (2/3) with the article, sidebar (1/3) with author bio and related posts.
  - Render Lexical rich text content using a custom React component mapper (translating Lexical nodes to Tailwind-styled HTML elements).
  - Text measure restricted to `720px` max-width for optimal readability.
  - Include "MORE ABOUT US →" style link for author navigation.
- **Acceptance Criteria:** 
  - Line-height and typography scale perfectly match the UI context.
  - Sidebar displays author information and related posts.
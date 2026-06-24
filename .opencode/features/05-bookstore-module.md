# Epic 5: Bookstore Module

## Objective
Facilitate the discovery and browsing of books using the editorial asymmetric grid layout.

## Feature 5.1: Book Catalog
- **Description:** A grid view of available books with the main content + sidebar layout.
- **Technical Implementation:**
  - Fetch books in `src/app/(frontend)/[locale]/books/page.tsx`.
  - **Main Column (2/3 width):** Grid of book cards (image, title, price).
  - **Sidebar (1/3 width):** Filter panel (Categories, Formats) and a "Follow Us" block with social media icons.
  - Implement a Client Component for the Search Bar at the top of the main column.
  - Use URL search params (`?search=...&category=...`) to maintain filter state.
- **Acceptance Criteria:** 
  - Users can filter by category and search by title/author. 
  - The layout maintains the asymmetric grid structure.

## Feature 5.2: Book Detail Page
- **Description:** The product page for an individual book.
- **Technical Implementation:**
  - Fetch book by slug in `src/app/(frontend)/[locale]/books/[slug]/page.tsx`.
  - **Layout:** Asymmetric grid.
    - **Main Column (2/3):** Large cover image on the left, book metadata (title, authors, ISBN, description, formats) on the right. "Add to Cart" button styled with the accent color.
    - **Sidebar (1/3):** "Our Vision" / "Our Mission" style blocks with related books or editorial content.
  - Include an "Add to Cart" button (Client Component) that interacts with the cart state.
- **Acceptance Criteria:** 
  - All localized book data displays correctly. 
  - The "Add to Cart" action provides immediate visual feedback and updates the header cart badge.
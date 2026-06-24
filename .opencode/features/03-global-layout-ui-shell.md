# Epic 3: Global Layout & UI Shell

## Objective
Build the editorial-themed interface shell that wraps all public pages, following the asymmetric grid layout with hero banner, featured cards, and persistent sidebar structure.

## Feature 3.1: Root Layout & Typography
- **Description:** Implement the base HTML structure, font loading, and CSS variable theming.
- **Technical Implementation:**
  - Use `next/font` to load the editorial serif (headings) and functional sans-serif (body) fonts.
  - Implement Tailwind CSS v4 with CSS variables for the monochromatic palette and the deep terracotta accent (`#9A3412`).
  - Create the root `(frontend)/[locale]/layout.tsx` with `<html>` and `<body>` tags, applying the correct `lang` attribute.
- **Acceptance Criteria:** 
  - Fonts render correctly without layout shift (CLS). 
  - Light/Dark mode CSS variables are correctly scoped.

## Feature 3.2: Header with Navigation
- **Description:** Create a structured header with logo, navigation links, and the signature triangular accent element.
- **Technical Implementation:**
  - Build a Server Component for the Header that fetches the `MainNavigation` global.
  - Logo: Large serif "Books" wordmark on the left.
  - Navigation: Horizontal links on the right, styled in text-secondary with hover state in accent color.
  - Accent Triangle: A CSS or SVG downward-pointing triangle in the accent color, positioned between the logo and navigation.
  - Include a minimalist Cart icon with a dynamic item count badge (Client Component).
  - Include the Language Switcher (FR/EN) as a Client Component.
- **Acceptance Criteria:** 
  - Navigation links route correctly with the current locale prefix. 
  - Language switcher seamlessly toggles the UI language.
  - Header remains sticky on scroll with a subtle bottom border.

## Feature 3.3: Hero Banner Component
- **Description:** Implement the split-layout hero banner with dark accent panel and imagery.
- **Technical Implementation:**
  - Create a reusable `HeroBanner` Server Component.
  - Layout: Flex or grid with 40/60 split.
  - Left panel: Solid accent color (`#9A3412`) background, white serif heading, subtitle text, and pagination dots (for future carousel functionality).
  - Right panel: Full-bleed image using `next/image`.
  - Data source: A Payload Global (`HeroBanner`) to allow content editors to update the heading, subtitle, and image.
- **Acceptance Criteria:** 
  - Banner displays correctly on all screen sizes (stacks vertically on mobile).
  - Text is legible against the accent background.

## Feature 3.4: Featured Cards Row
- **Description:** Implement the horizontal featured content cards.
- **Technical Implementation:**
  - Create a `FeaturedCards` Server Component.
  - Layout: Two equal-width cards in a row.
  - Card structure: Thumbnail image (left), uppercase title + subtitle (center), small circular icon (right).
  - Background: Accent color (`#9A3412`) with light text.
  - Data source: Fetch from a Payload collection (e.g., `FeaturedItems`) or a Global.
- **Acceptance Criteria:** 
  - Cards display side by side on desktop, stack on mobile.
  - Images are properly sized and aligned.

## Feature 3.5: Footer
- **Description:** Implement the full-width footer bar.
- **Technical Implementation:** 
  - Server Component fetching the `Footer` global.
  - Full-width bar with accent color (`#9A3412`) or near-black (`#171717`) background.
  - Centered copyright text and "Privacy Policy" link in small, light text.
- **Acceptance Criteria:** Displays localized copyright text and correctly formatted links.
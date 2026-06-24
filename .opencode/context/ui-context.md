# UI Context

## Design Philosophy
The interface follows a **classic editorial bookstore aesthetic** — structured, content-rich, and hierarchically organized. The layout employs an asymmetric grid with a dominant content column and a persistent right-hand sidebar for secondary navigation and contextual information. Generous whitespace is balanced with dense informational sections to evoke the feeling of a curated literary journal.

## Theme and Colors
- **Base Palette:** Monochromatic. 
  - Background: `#FAFAFA` (Light), `#0A0A0A` (Dark).
  - Surface: `#FFFFFF` (Light), `#141414` (Dark).
  - Text Primary: `#171717` (Light), `#F5F5F5` (Dark).
  - Text Secondary: `#525252` (Light), `#A3A3A3` (Dark).
- **Accent Color:** Deep terracotta `#9A3412` — used for the hero banner background, featured card backgrounds, footer bar, and interactive link arrows. This provides the warm, literary tone characteristic of the reference layout.
- **Borders:** Subtle, low-contrast borders (`#E5E5E5` / `#262626`) to define section boundaries and card separations.

## Typography
- **Headings (Editorial):** A sophisticated serif font (e.g., *Fraunces* or *Lora*) for section titles and hero text.
- **Body & UI (Functional):** A highly legible, neutral sans-serif (e.g., *Inter* or *Geist*).
- **Scale:** 
  - Hero heading: 48px / 3rem, bold serif.
  - Section headings: 24px / 1.5rem, uppercase, tracked.
  - Body text: 16px / 1rem, line-height 1.6.
  - Link labels: 12px / 0.75rem, uppercase, tracked, with arrow icons.

## Layout Structure
The page is organized into the following vertical sections:

### 1. Header
- **Logo:** "Books" wordmark in large serif type on the left.
- **Navigation:** Horizontal links on the right (About Us, Our Mission, Writers, News, Books, Contacts).
- **Accent Element:** A downward-pointing triangular shape in the accent color (`#9A3412`) positioned between the logo and navigation, serving as a visual anchor.
- **Sticky behavior:** The header remains fixed on scroll with a subtle bottom border.

### 2. Hero Banner
- **Split Layout:** 40% dark accent background (left) / 60% imagery (right).
- **Left Panel:** Solid accent color (`#9A3412`) background with white text. Contains the hero heading ("Best Books of the Month"), a short subtitle, and pagination dots at the bottom.
- **Right Panel:** Full-bleed image of books/bookshelf.
- **Height:** Approximately 400px on desktop.

### 3. Featured Cards Row
- **Layout:** Two horizontal cards side by side, equal width.
- **Card Structure:** Small thumbnail image on the left, title (uppercase) and subtitle text in the center, small circular icon on the right.
- **Background:** Accent color (`#9A3412`) with light text.
- **Spacing:** Consistent gap between cards.

### 4. Main Content + Sidebar (Asymmetric Grid)
- **Grid Ratio:** 2/3 main content column, 1/3 right sidebar.
- **Main Content (Left):**
  - **About Us Block:** Small image of stacked books on the far left, paragraph text in the center, "MORE ABOUT US →" link aligned right.
  - **News and Events Block:** Two-column grid of news cards, each with an image, uppercase title, paragraph text, and "READ MORE" link.
  - **View News Archive:** A full-width link with an arrow icon at the bottom of the news section.
- **Sidebar (Right):**
  - **Our Vision / Our Mission / New Projects:** Stacked text blocks, each with an uppercase heading, short paragraph, and "MORE →" link aligned right. Separated by subtle horizontal dividers.
  - **Follow Us Block:** A contained box with a slightly darker surface background, heading, short text, and a row of social media icon buttons.

### 5. Footer
- **Layout:** Full-width dark bar (accent color `#9A3412` or near-black `#171717`).
- **Content:** Centered copyright text and "Privacy Policy" link in small, light text.

## Component Conventions
- **Section Dividers:** Thin horizontal rules (`1px`, border color) between major sections.
- **Link Style:** Uppercase, small font size, tracked letter-spacing, accompanied by a circular arrow icon (`→`). Color: accent on hover, text-secondary by default.
- **Card Style:** Flat, no shadows. Defined by background color contrast or subtle borders.
- **Image Treatment:** Rectangular, no border-radius. Images fill their containers proportionally.
- **Accessibility:** All interactive elements must have visible focus states. Ensure WCAG 2.1 AA contrast ratios are strictly maintained.
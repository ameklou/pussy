# UI Context

## Design Philosophy
The interface must embody **minimalism, clarity, and editorial elegance**. The design should recede, allowing the content (text and book covers) to take center stage. We adhere to a "less is more" paradigm, utilizing generous whitespace and strict alignment.

## Theme and Colors
- **Base Palette:** Monochromatic.
    - Background: `#FAFAFA` (Light), `#0A0A0A` (Dark).
    - Surface: `#FFFFFF` (Light), `#141414` (Dark).
    - Text Primary: `#171717` (Light), `#F5F5F5` (Dark).
    - Text Secondary: `#525252` (Light), `#A3A3A3` (Dark).
- **Accent Color:** A single, muted accent for interactive elements (e.g., deep terracotta `#9A3412` or muted indigo `#3730A3`). Use sparingly.
- **Borders:** Subtle, low-contrast borders (`#E5E5E5` / `#262626`) to define structure without visual noise.

## Typography
- **Headings (Editorial):** A sophisticated serif font (e.g., *Fraunces* or *Lora*) to evoke a literary, bookstore feel.
- **Body & UI (Functional):** A highly legible, neutral sans-serif (e.g., *Inter* or *Geist*).
- **Scale:** Establish a strict, harmonious typographic scale. Ensure optimal line-height (1.6 for body text) and measure (60-75 characters per line) for reading comfort.

## Layout Design
- **Grid:** A strict 12-column grid system.
- **Spacing:** Utilize an 8-point grid system for all margins and paddings.
- **Containers:** Maximum content width of `1200px`, with a narrower `720px` container specifically for article reading views.

## Component Conventions
- **Structure:** Components should be small, focused, and composable.
- **Styling:** Use Tailwind CSS utility classes exclusively. Avoid inline styles. Use `cn()` (via `clsx` and `tailwind-merge`) for conditional classes.
- **Interactivity:** Hover states should be subtle (e.g., slight opacity changes or underline animations). Avoid aggressive scale transforms or heavy shadows.
- **Accessibility:** All interactive elements must have visible focus states. Ensure WCAG 2.1 AA contrast ratios are strictly maintained.
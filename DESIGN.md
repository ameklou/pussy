# Design System: Foundation Frontend

This is the Epic 1 public frontend design contract for a minimalist bilingual editorial blog and bookstore. Build with existing Tailwind CSS v4 and shadcn-compatible CSS variables from `src/app/(frontend)/globals.css`; do not add visual dependencies or one-off hardcoded values.

## 1. Atmosphere

- The interface is quiet, editorial, and content-led: text, article rhythm, and book covers carry the visual weight.
- Use generous whitespace, strict alignment, and restrained contrast rather than decorative effects.
- The homepage should feel like an independent literary table of contents: direct, readable, curated, and commerce-ready without sales-page excess.
- Preserve a bilingual tone for English and French: labels must remain compact, formal, and clear in both locales, with layouts resilient to longer French strings.

## 2. Palette

- Use semantic tokens from `globals.css` only: `background`, `foreground`, `card`, `card-foreground`, `popover`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `border`, `input`, `ring`, and `destructive`.
- Base palette remains monochrome: light mode near white surfaces with charcoal text; dark mode near black surfaces with warm-white text.
- `primary` is for the strongest action or text emphasis.
- `muted` and `muted-foreground` support metadata: dates, authors, prices, categories, language labels, and secondary navigation.
- `border` defines structure with low contrast. Prefer borders over shadows for editorial separation.
- **Epic 3 terracotta accent:** A named `--terracotta` token (`#9A3412`) is approved for the hero banner, featured cards, footer bar, and header triangle accent. It is exposed as `bg-terracotta` / `text-terracotta-foreground` and must not be used outside these editorial shell surfaces without updating this document.

## 3. Typography

- Use `font-sans` for body, navigation, metadata, buttons, and commerce UI. The sans stack is loaded via `next/font/google` as Inter (`--font-inter`).
- Use `font-heading` for editorial headings and hero titles. The heading stack is loaded via `next/font/google` as Fraunces (`--font-fraunces`), a variable serif.
- Body copy targets a comfortable reading line height around `leading-7` and a measure of 60 to 75 characters.
- Heading scale for Epic 1: page hero `text-4xl` to `text-6xl`, section heading `text-2xl` to `text-4xl`, card title `text-lg` to `text-2xl`, metadata `text-sm`, captions `text-xs`.
- French text often runs longer than English. Avoid fixed-width buttons, clipped labels, and uppercase-heavy UI that harms readability.

## 4. Spacing And Layout

- Use the Tailwind spacing scale on an 8-point rhythm for layout decisions: `gap-2`, `gap-4`, `gap-6`, `gap-8`, `gap-12`, `gap-16`, and `gap-24` are the default steps.
- Public pages use a 12-column grid at desktop widths, collapsing to a single column on mobile and a 6-column rhythm on tablet when useful.
- Maximum page container width is `max-w-[1200px]`; article reading views use `max-w-[720px]`.
- Page sections should use consistent vertical rhythm: compact utility sections at `py-12`, major homepage bands at `py-16` or `py-24`.
- Align content to a shared container edge. Break the grid only for meaningful editorial emphasis, such as a featured book cover paired with a lead essay.

## 5. Component Conventions

- Compose from small Server Components by default. Use Client Components only for real interactivity such as cart state, language switching, or form behavior.
- Style with Tailwind utilities and project tokens. Use `cn()` for conditional class composition.
- Reuse shadcn-style primitives and variant patterns for buttons, links, cards, inputs, and navigation before creating new abstractions.
- Localized UI strings must come from locale dictionaries, Payload localized content, or typed constants prepared for both `en` and `fr`.
- Homepage building blocks for Epic 1: header, locale switcher, hero, featured posts, featured books, editorial CTA, and footer. Keep each block visually consistent with this document.
- Every interactive element needs a visible focus state using `ring` or `focus-visible:ring-ring/50` patterns and must meet WCAG 2.1 AA contrast.

## 6. Motion And Interaction

- Interaction is subtle: underline reveals, opacity shifts, border-color changes, and small active-state translation are preferred.
- Animate only compositor-friendly properties: `opacity`, `transform`, and `filter`. Do not animate layout properties.
- Motion must never delay content visibility, create layout shift, or obscure reading. Static rendering must remain excellent if motion is disabled.
- Respect `prefers-reduced-motion` for any non-essential transition beyond basic hover or focus feedback.
- Performance baseline: homepage UI should be RSC-first, avoid unnecessary client JavaScript, protect LCP content, and keep CLS at zero.

## 7. Surface And Depth

- Default surfaces are flat: `background` for the page, `card` for grouped content, and `popover` only for overlays.
- Use `border-border` and radius tokens from `globals.css`: `radius-sm`, `radius-md`, `radius-lg`, and `radius-xl`. Avoid arbitrary radius values.
- Shadows are exceptional, not structural. Prefer subtle borders, whitespace, and typographic hierarchy to create depth.
- Book covers may provide the richest visual texture; frame them with quiet surfaces and consistent aspect ratios rather than decorative containers.
- Forms and commerce elements use `input`, `border`, `ring`, and `destructive` tokens consistently for normal, focus, invalid, and disabled states.

# Code Standards

## General Principles
- **Type Safety:** Strict TypeScript is mandatory. Avoid `any`. Use `unknown` and type guards when dealing with external data.
- **Immutability:** Favor immutable data structures. Use `const` exclusively; avoid `let` unless absolutely necessary.
- **Functional Paradigm:** Prefer functional programming concepts (pure functions, composition) over object-oriented patterns.

## Payload CMS 3 Conventions
- **Configuration:** Define collections and globals in separate files within `src/collections/` and `src/globals/`. Import and aggregate them in `src/payload.config.ts`.
- **Typing:** Always import types from `payload` (e.g., `import type { CollectionConfig } from 'payload'`).
- **Hooks:** Utilize Payload hooks (`beforeChange`, `afterRead`) for data manipulation, keeping business logic out of the UI layer.
- **Access Control:** Define explicit `access` rules for every collection. Default to `read: () => true` for public content, and restrict `create/update/delete` to authenticated admins.

## Next.js 16 App Router Conventions
- **File Naming:**
    - Use `page.tsx` for routes.
    - Use `layout.tsx` for shared layouts.
    - Use `loading.tsx` and `error.tsx` for UI states.
    - Use `route.ts` for API routes (if not handled by Payload).
- **Server vs. Client:**
    - All components are Server Components by default.
    - Add `'use client';` at the very top of the file only when utilizing React hooks (`useState`, `useEffect`), browser APIs, or event listeners.
- **Data Fetching:** Use `async` Server Components for data fetching. Do not use `useEffect` for initial data loading.
- **Server Actions:** Use Server Actions for form submissions and mutations. Define them in `src/actions/` or locally within the component file if highly specific.

## Code Organization
```text
src/
├── app/                # Next.js App Router (includes [locale] dynamic segment)
├── actions/            # Next.js Server Actions
├── collections/        # Payload CMS Collections
├── globals/            # Payload CMS Globals
├── components/         # React Components
│   ├── ui/             # Base, reusable UI primitives (buttons, inputs)
│   ├── layout/         # Header, Footer, Navigation
│   ├── blog/           # Blog-specific components
│   └── store/          # Bookstore-specific components
├── hooks/              # Custom React Hooks
├── lib/                # Utility functions, database clients, configurations
├── styles/             # Global CSS and Tailwind configurations
└── types/              # Global TypeScript type definitions
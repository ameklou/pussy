# Chaatde

A minimalist bilingual editorial blog and bookstore built with Next.js 16 App Router and Payload CMS 3.

## Foundation

- Public routes are locale-prefixed with `/en` and `/fr`.
- `/` redirects to `/en`.
- Invalid public locale prefixes fall back to `/en`.
- Payload Admin remains available at `/admin`.
- Payload runs natively inside the Next.js app and uses PostgreSQL via `@payloadcms/db-postgres`.

## Local Setup

1. Copy the environment example and set a real secret:

   ```bash
   cp .env.example .env
   ```

2. Start PostgreSQL with Docker or provide your own `DATABASE_URI`.

   ```bash
   docker compose up postgres
   ```

3. Install dependencies and run the app:

   ```bash
   pnpm install
   pnpm dev
   ```

4. Open `http://localhost:3000/en` for the English frontend, `http://localhost:3000/fr` for the French frontend, or `http://localhost:3000/admin` for Payload Admin.

## Environment

Required local variables:

```bash
DATABASE_URI=postgresql://postgres:postgres@localhost:5432/chaatde
PAYLOAD_SECRET=replace-with-a-long-random-secret
```

Do not commit real `.env` files or production credentials.

## Useful Scripts

```bash
pnpm dev
pnpm build
pnpm generate:types
pnpm test:int
pnpm test:e2e
```

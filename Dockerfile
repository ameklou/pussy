# Base image
FROM node:22-bookworm-slim AS base

# CRITICAL FIX: Pin pnpm to version 10 to satisfy the engines.pnpm requirement in package.json
RUN corepack enable && corepack prepare pnpm@10 --activate

# Stage 1: Builder
FROM base AS builder
WORKDIR /app

# Install system dependencies required for native modules (e.g., sharp)
RUN apt-get update && apt-get install -y python3 make g++ libvips-dev && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Stage 2: Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy production dependencies
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy build artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/dist ./dist

# Create uploads directory
RUN mkdir -p /app/media

EXPOSE 3000

# Payload 3 standard production command
CMD ["sh", "-c", "node dist/payload.js migrate && next start"]
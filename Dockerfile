# Base image with pnpm enabled
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# Stage 1: Build the application
FROM base AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

# Build Payload CMS 3 (Next.js)
RUN pnpm build

# Stage 2: Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy built assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/dist ./dist

# Create directory for local media uploads
RUN mkdir -p /app/media

EXPOSE 3000

# Run database migrations before starting the server
CMD ["sh", "-c", "node dist/payload.js migrate && node dist/server.js"]
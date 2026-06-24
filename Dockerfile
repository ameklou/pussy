# Base image: Debian slim ensures compatibility with native modules (e.g., sharp)
FROM node:22-bookworm-slim AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# Stage 1: Build the application
FROM base AS builder
WORKDIR /app

# Install essential build tools for any remaining native dependencies
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml ./
# The lockfile is now synchronized, so --frozen-lockfile will succeed
RUN pnpm install --frozen-lockfile

COPY . .

# Build Payload CMS 3 (Next.js)
RUN pnpm build

# Stage 2: Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy package files for production install
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy built assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/dist ./dist

# Create directory for local media uploads
RUN mkdir -p /app/media

EXPOSE 3000

# Execute migrations and start the server
CMD ["sh", "-c", "node dist/payload.js migrate && node dist/server.js"]
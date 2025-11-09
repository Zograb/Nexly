# Multi-stage build for optimal image size
FROM node:22-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Install necessary build tools for native dependencies
RUN apk add --no-cache libc6-compat python3 make g++

FROM base AS builder

WORKDIR /app

# Copy workspace configuration
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./

# Copy all workspace packages
COPY packages ./packages
COPY apps/api ./apps/api

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma and ZenStack client only (skip schema generation that requires DB connection)
# Note: We skip 'pnpm generate' because it tries to bootstrap NestJS and connect to DB
# Instead, we only generate the Prisma client and let the app generate schema at runtime
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nexly-db?schema=public"
RUN pnpm --filter @nexly/db prisma:generate

# Build the API
RUN pnpm --filter api build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Copy necessary files for production
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Copy packages (db with generated Prisma client)
COPY --from=builder /app/packages/db/package.json ./packages/db/
COPY --from=builder /app/packages/db/generated ./packages/db/generated
COPY --from=builder /app/packages/db/prisma ./packages/db/prisma

# Copy API package
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/graphql ./apps/api/graphql

# Install production dependencies only
# Use --ignore-scripts because:
# 1. Prisma client is already generated and copied from builder stage
# 2. We don't want husky (dev-only git hooks) to try to install
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs && \
    chown -R nestjs:nodejs /app

USER nestjs

# Expose the port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "apps/api/dist/main.js"]




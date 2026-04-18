FROM oven/bun:alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS prepare
RUN bun -g add turbo@^2
COPY . .
RUN turbo prune web --docker

FROM base AS builder
COPY --from=prepare /app/out/json/ .
RUN bun install --frozen-lockfile
COPY --from=prepare /app/out/full/ .
ENV SKIP_ENV_VALIDATION=true
RUN --mount=type=secret,id=next_actions_key \
    export NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$(cat /run/secrets/next_actions_key)" && \
    bun --bun turbo --env-mode loose build

FROM oven/bun:alpine AS runner
RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=builder --chown=nextjs:bunjs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:bunjs /app/apps/web/.next/static ./apps/web/.next/static
# COPY --from=builder --chown=nextjs:bunjs /app/apps/web/public ./apps/web/public
ENV NODE_ENV=true
ENV TZ=America/Sao_Paulo
ARG APP_VERSION
ENV APP_VERSION=${APP_VERSION}
ENV NEXT_PUBLIC_APP_VERSION=${APP_VERSION}

CMD ["bun", "apps/web/server.js"]

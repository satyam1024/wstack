import { initTRPC, TRPCError } from '@trpc/server'
import { ZodError } from 'zod'
import SuperJSON from 'superjson'
import { createTRPCContext } from './context'
import Redis from 'ioredis'
import { env } from '@/lib/env'
import { log } from '@/lib/logger'

const redis = new Redis(env.REDIS_URL || "redis://localhost:6379");

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createCallerFactory = t.createCallerFactory

export const router = t.router

/** Caching Middleware */
export const cacheMiddleware = t.middleware(async ({ ctx, next, path }) => {
  const cacheKey = `trpc:cache:${path}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const result = await next();
  await redis.set(cacheKey, JSON.stringify(result), "EX", 60); // Cache for 60 seconds
  return result;
});

/** Rate Limiting Middleware */
export const rateLimitMiddleware = t.middleware(async ({ ctx, next, path }) => {
  const ip = ctx.req?.headers["x-forwarded-for"] || ctx.req?.socket.remoteAddress;
  if (!ip) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Unable to determine IP address" });
  }

  const key = `ratelimit:${ip}:${path}`;
  const maxRequests = 100; // Max requests per window
  const windowSeconds = 15 * 60; // 15 minutes

  const requests = await redis.incr(key);
  if (requests === 1) {
    await redis.expire(key, windowSeconds);
  }

  if (requests > maxRequests) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Too many requests, please try again later.",
    });
  }

  return next();
});

/* Logging Middleware */
export const loggingMiddleware = t.middleware(async ({ ctx, next, path }) => {
  const start = Date.now();
  const result = await next();
  const duration = Date.now() - start;

  log("info", `[tRPC] ${path} - ${duration}ms`);

  return result;
});

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

export const publicProcedure = t.procedure.use(loggingMiddleware).use(rateLimitMiddleware)
export const protectedProcedure = t.procedure.use(loggingMiddleware).use(rateLimitMiddleware).use(enforceUserIsAuthed)
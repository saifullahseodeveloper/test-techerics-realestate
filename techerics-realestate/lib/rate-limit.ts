import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Upstash chosen (research-backed): REST-based Redis works in Edge runtime
// (plain Node Redis clients need TCP, which Edge doesn't support). In-memory
// counters don't work either — Vercel serverless invocations are isolated,
// so each one would have its own counter and the limit would be meaningless.
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

function createFallbackRatelimit() {
  return {
    limit: async () => ({ success: true, limit: 100, remaining: 99, reset: 0 }),
  };
}

export const leadsRatelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "60 s"), prefix: "rl:leads", analytics: true })
  : (createFallbackRatelimit() as unknown as Ratelimit);

export const uploadRatelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(60, "60 s"), prefix: "rl:upload", analytics: true })
  : (createFallbackRatelimit() as unknown as Ratelimit);

export const authRatelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "15 m"), prefix: "rl:auth", analytics: true })
  : (createFallbackRatelimit() as unknown as Ratelimit);

/** Vercel sets x-forwarded-for reliably; other hosts may need adjusting. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

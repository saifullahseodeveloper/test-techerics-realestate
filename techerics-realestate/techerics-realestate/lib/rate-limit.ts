import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Upstash chosen (research-backed): REST-based Redis works in Edge runtime
// (plain Node Redis clients need TCP, which Edge doesn't support). In-memory
// counters don't work either — Vercel serverless invocations are isolated,
// so each one would have its own counter and the limit would be meaningless.
const redis = Redis.fromEnv();

// Leads form: generous enough for a real visitor filling multiple enquiries,
// strict enough to stop scripted spam floods.
export const leadsRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  prefix: "rl:leads",
  analytics: true,
});

// Upload URL requests: an agent uploading a full photo set (~20-30 files)
// in one go should never get throttled — set above realistic batch size.
export const uploadRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "60 s"),
  prefix: "rl:upload",
  analytics: true,
});

// Login attempts: brute-force protection.
export const authRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  prefix: "rl:auth",
  analytics: true,
});

/** Vercel sets x-forwarded-for reliably; other hosts may need adjusting. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

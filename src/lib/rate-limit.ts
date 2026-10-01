type Bucket = { count: number; resetAt: number };

/**
 * In-memory fixed-window rate limiter.
 *
 * Trade-off: state lives in the process, so this is correct for a single
 * instance only. On multi-instance/serverless deployments each instance keeps
 * its own map, and the effective limit becomes (limit x instances). Swap the
 * Map for Redis/Upstash if you need a shared, authoritative counter.
 */
const buckets = new Map<string, Bucket>();

const MAX_TRACKED_KEYS = 10_000;

export type RateLimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; remaining: 0; resetAt: number; retryAfterSeconds: number };

/** Drop expired buckets so the map cannot grow without bound. */
function sweep(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  // Periodic cleanup, amortised: at most one sweep per 10k writes.
  if (buckets.size > MAX_TRACKED_KEYS) sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      ok: false,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000))
    };
  }

  return {
    ok: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt
  };
}

/**
 * Resolve a client IP for rate-limiting purposes.
 *
 * Header order matters: on Vercel `x-vercel-forwarded-for` is set by the edge
 * and cannot be spoofed by the client, so we prefer it. `x-forwarded-for` is
 * only trusted as a fallback — it is attacker-controlled when the app is not
 * behind a proxy that overwrites it, so rotating it defeats naive IP limits.
 */
export function getClientIp(request: Request): string {
  const headers: [string, string][] = [
    ["x-vercel-forwarded-for", "ip"],
    ["cf-connecting-ip", "ip"],
    ["x-real-ip", "ip"],
    ["x-forwarded-for", "list"]
  ];

  for (const [name, kind] of headers) {
    const raw = request.headers.get(name)?.trim();
    if (!raw) continue;
    if (kind === "list") {
      const first = raw.split(",")[0]?.trim();
      if (first) return first;
    } else {
      return raw;
    }
  }

  return "unknown";
}

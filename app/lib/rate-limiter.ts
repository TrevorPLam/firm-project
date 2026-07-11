/**
 * @module rate-limiter
 * @description In-memory rate limiting implementation for development and single-instance deployments.
 *
 * ⚠️ PRODUCTION LIMITATIONS:
 * - This implementation uses in-memory storage (Map) which is NOT suitable for:
 *   - Serverless environments (Vercel, AWS Lambda, Cloudflare Workers)
 *   - Multi-instance deployments (multiple containers/pods)
 *   - Edge runtime deployments
 * - Each instance maintains its own counter, so scaling horizontally multiplies the effective limit
 * - Serverless functions spin up/down, causing counters to reset unpredictably
 *
 * ✅ RECOMMENDED FOR PRODUCTION:
 * - Use Redis with @upstash/ratelimit for serverless/edge deployments
 * - Use Redis with ioredis for traditional multi-instance deployments
 * - See docs/rate-limiting.md for migration guide and implementation examples
 *
 * @see https://upstash.com/docs/ratelimit/sdks/ts
 * @see docs/rate-limiting.md
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

/**
 * In-memory store for rate limit entries.
 * Each key tracks request count and window reset time.
 *
 * ⚠️ This Map is local to the current process instance.
 * In serverless environments, each function invocation has its own Map.
 */
const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Cleanup interval in milliseconds (5 minutes).
 * Expired entries are removed periodically to prevent memory leaks.
 */
const CLEANUP_INTERVAL = 5 * 60 * 1000;

/**
 * Periodic cleanup timer to remove expired rate limit entries.
 * Prevents unbounded memory growth in long-running processes.
 */
let cleanupTimer: NodeJS.Timeout | null = null;

/**
 * Starts the periodic cleanup timer for expired rate limit entries.
 * Only runs in server environment (not in browser).
 *
 * ⚠️ In serverless environments, this timer may not run consistently
 * due to function execution time limits and cold starts.
 */
function startCleanupTimer(): void {
  if (cleanupTimer) return;

  cleanupTimer = setInterval(() => {
    const now = Date.now();

    for (const [key, entry] of rateLimitMap.entries()) {
      if (now >= entry.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }, CLEANUP_INTERVAL);
}

// Start cleanup timer on module load (server-side only)
if (typeof window === "undefined") {
  startCleanupTimer();
}

/**
 * Check if a key has exceeded its rate limit.
 * Uses a fixed window approach with automatic cleanup.
 *
 * ⚠️ LIMITATIONS:
 * - In serverless environments, each invocation has its own counter
 * - In multi-instance deployments, each instance has its own counter
 * - This effectively multiplies the limit by the number of instances
 *
 * @param key - Unique identifier for the rate limit (e.g., IP address, user ID)
 * @param limit - Maximum number of requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @returns true if request is allowed, false if rate limit exceeded
 *
 * @example
 * ```ts
 * // Allow 10 requests per minute per IP
 * const allowed = checkRateLimit('192.168.1.1', 10, 60 * 1000);
 * if (!allowed) {
 *   return new Response('Too many requests', { status: 429 });
 * }
 * ```
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  // If no entry exists or window has expired, create new entry
  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return true;
  }

  // If under limit, increment count
  if (entry.count < limit) {
    entry.count++;
    return true;
  }

  // Limit exceeded
  return false;
}

/**
 * Clear all rate limit entries from memory.
 * Useful for testing and manual cleanup.
 *
 * ⚠️ In production with Redis, this would clear all entries globally.
 * With in-memory storage, this only affects the current instance.
 */
export function clearRateLimits(): void {
  rateLimitMap.clear();
}

/**
 * Get the current request count for a specific key.
 * Useful for testing, debugging, and displaying remaining quota to users.
 *
 * @param key - Unique identifier for the rate limit
 * @returns Current request count for the key
 *
 * @example
 * ```ts
 * const count = getRateLimitCount('192.168.1.1');
 * const remaining = limit - count;
 * console.log(`Remaining requests: ${remaining}`);
 * ```
 */
export function getRateLimitCount(key: string): number {
  const entry = rateLimitMap.get(key);
  return entry?.count ?? 0;
}

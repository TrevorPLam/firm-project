interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Cleanup interval in milliseconds (5 minutes)
const CLEANUP_INTERVAL = 5 * 60 * 1000;

// Periodic cleanup to prevent memory leaks
let cleanupTimer: NodeJS.Timeout | null = null;

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

// Start cleanup timer on module load
if (typeof window === "undefined") {
  startCleanupTimer();
}

/**
 * Check if a key has exceeded its rate limit.
 * Uses a sliding window approach with automatic cleanup.
 *
 * @param key - Unique identifier for the rate limit (e.g., IP address)
 * @param limit - Maximum number of requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @returns true if request is allowed, false if rate limit exceeded
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
 * Clear all rate limit entries (useful for testing)
 */
export function clearRateLimits(): void {
  rateLimitMap.clear();
}

/**
 * Get current count for a key (useful for testing/debugging)
 */
export function getRateLimitCount(key: string): number {
  const entry = rateLimitMap.get(key);
  return entry?.count ?? 0;
}

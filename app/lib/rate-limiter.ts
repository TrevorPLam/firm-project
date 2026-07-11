/**
 * @module rate-limiter
 * @description Production-ready rate limiting using Upstash Redis for serverless and edge deployments.
 *
 * ✅ PRODUCTION READY:
 * - Uses Upstash Redis for distributed, persistent rate limiting
 * - Compatible with serverless environments (Vercel, AWS Lambda, Cloudflare Workers)
 * - Supports multi-instance deployments with shared state
 * - Edge runtime compatible with HTTP-based Redis
 * - Implements sliding window algorithm for smooth rate limiting
 * - Graceful degradation if Redis is unavailable
 *
 * @see https://upstash.com/docs/ratelimit/sdks/ts
 * @see docs/rate-limiting.md
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Rate limit result with metadata for headers and logging.
 */
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Initialize Upstash Redis client from environment variables.
 * Falls back to undefined if credentials are not configured.
 */
let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;

if (typeof window === 'undefined') {
  try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      redis = Redis.fromEnv();
      ratelimit = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(10, '10 s'),
        analytics: true,
        prefix: 'ratelimit',
      });
    } else {
      console.warn('[rate-limiter] Upstash Redis credentials not configured, rate limiting disabled');
    }
  } catch (error) {
    console.error('[rate-limiter] Failed to initialize Upstash Redis:', error);
  }
}

/**
 * Check if a key has exceeded its rate limit.
 * Uses sliding window algorithm for smooth rate limiting.
 *
 * ✅ GRACEFUL DEGRADATION:
 * - If Redis is not configured or unavailable, allows all requests
 * - Logs warnings for debugging without blocking functionality
 * - Suitable for development and production fallback scenarios
 *
 * @param key - Unique identifier for the rate limit (e.g., IP address, user ID)
 * @param limit - Maximum number of requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @returns true if request is allowed, false if rate limit exceeded
 *
 * @example
 * ```ts
 * // Allow 10 requests per minute per IP
 * const allowed = await checkRateLimit('192.168.1.1', 10, 60 * 1000);
 * if (!allowed) {
 *   return new Response('Too many requests', { status: 429 });
 * }
 * ```
 */
export async function checkRateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  // If Upstash is not configured, allow all requests (graceful degradation)
  if (!ratelimit) {
    console.warn('[rate-limiter] Rate limiting disabled - Upstash Redis not configured');
    return true;
  }

  try {
    // Create a dynamic limiter for the specific limit and window
    const limiter = new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
      analytics: true,
      prefix: 'ratelimit',
    });

    const result = await limiter.limit(key);

    // Log rate limit events for monitoring
    if (!result.success) {
      console.log('[rate-limiter] Rate limit exceeded', {
        key,
        limit: result.limit,
        remaining: result.remaining,
        reset: new Date(result.reset).toISOString(),
      });
    }

    return result.success;
  } catch (error) {
    // If Redis fails, allow the request (graceful degradation)
    console.error('[rate-limiter] Redis error, allowing request:', error);
    return true;
  }
}

/**
 * Check rate limit and return detailed metadata for headers.
 * Useful for API responses that include rate limit information.
 *
 * @param key - Unique identifier for the rate limit
 * @param limit - Maximum number of requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @returns Rate limit result with metadata
 *
 * @example
 * ```ts
 * const result = await checkRateLimitWithMetadata('192.168.1.1', 10, 60 * 1000);
 * if (!result.success) {
 *   return new Response('Too many requests', {
 *     status: 429,
 *     headers: {
 *       'RateLimit-Limit': result.limit.toString(),
 *       'RateLimit-Remaining': result.remaining.toString(),
 *       'RateLimit-Reset': new Date(result.reset).toISOString(),
 *     }
 *   });
 * }
 * ```
 */
export async function checkRateLimitWithMetadata(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  // If Upstash is not configured, return success with default values
  if (!ratelimit) {
    console.warn('[rate-limiter] Rate limiting disabled - Upstash Redis not configured');
    return {
      success: true,
      limit,
      remaining: limit,
      reset: Date.now() + windowMs,
    };
  }

  try {
    const limiter = new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
      analytics: true,
      prefix: 'ratelimit',
    });

    const result = await limiter.limit(key);

    if (!result.success) {
      console.log('[rate-limiter] Rate limit exceeded', {
        key,
        limit: result.limit,
        remaining: result.remaining,
        reset: new Date(result.reset).toISOString(),
      });
    }

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    // If Redis fails, allow the request (graceful degradation)
    console.error('[rate-limiter] Redis error, allowing request:', error);
    return {
      success: true,
      limit,
      remaining: limit,
      reset: Date.now() + windowMs,
    };
  }
}

/**
 * Clear all rate limit entries from Redis.
 * Useful for testing and manual cleanup.
 *
 * ⚠️ This clears all rate limit entries globally across all instances.
 * Use with caution in production.
 */
export async function clearRateLimits(): Promise<void> {
  if (!redis) {
    console.warn('[rate-limiter] Cannot clear limits - Upstash Redis not configured');
    return;
  }

  try {
    // Delete all keys with the rate limit prefix
    const keys = await redis.keys('ratelimit:*');
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`[rate-limiter] Cleared ${keys.length} rate limit entries`);
    }
  } catch (error) {
    console.error('[rate-limiter] Failed to clear rate limits:', error);
  }
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
 * const count = await getRateLimitCount('192.168.1.1');
 * const remaining = limit - count;
 * console.log(`Remaining requests: ${remaining}`);
 * ```
 */
export async function getRateLimitCount(key: string): Promise<number> {
  if (!ratelimit) {
    console.warn('[rate-limiter] Cannot get count - Upstash Redis not configured');
    return 0;
  }

  try {
    // Use the limit method to get current count
    const result = await ratelimit.limit(key);
    return result.limit - result.remaining;
  } catch (error) {
    console.error('[rate-limiter] Failed to get rate limit count:', error);
    return 0;
  }
}

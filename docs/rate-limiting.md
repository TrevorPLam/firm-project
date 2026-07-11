# Rate Limiting

This document explains the current rate limiting implementation, its limitations, and recommended production alternatives.

## Current Implementation

The application uses an in-memory rate limiter implemented in `app/lib/rate-limiter.ts`. This implementation:

- Uses a JavaScript `Map` to store rate limit entries per key
- Implements a fixed window algorithm with automatic cleanup
- Provides `checkRateLimit()`, `clearRateLimits()`, and `getRateLimitCount()` functions
- Includes a periodic cleanup timer to prevent memory leaks

### Usage Example

```ts
import { checkRateLimit } from '@/lib/rate-limiter';

// Allow 10 requests per minute per IP
const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
const allowed = checkRateLimit(ip, 10, 60 * 1000);

if (!allowed) {
  return new Response('Too many requests', { status: 429 });
}
```

## Limitations

⚠️ **The current in-memory implementation is NOT suitable for production deployments** due to the following limitations:

### Serverless Environments

- **Problem**: Serverless functions (Vercel, AWS Lambda, Cloudflare Workers) spin up per request and have no persistent state
- **Impact**: Each function invocation has its own `Map`, so counters reset unpredictably
- **Result**: Rate limiting is effectively disabled - a determined client can send unlimited requests by hitting different cold starts

### Multi-Instance Deployments

- **Problem**: When running multiple containers/pods, each instance maintains its own counter
- **Impact**: Horizontal scaling multiplies the effective limit (e.g., 10 instances = 10x the limit)
- **Result**: Users can bypass limits by distributing requests across instances

### Edge Runtime

- **Problem**: Edge functions have strict execution time limits and no persistent storage
- **Impact**: The cleanup timer may not run consistently, causing memory leaks
- **Result**: Unpredictable behavior and potential memory exhaustion

### Fixed Window Algorithm

- **Problem**: Fixed windows allow boundary bursts (e.g., 10 requests at 59s + 10 requests at 1s = 20 requests in 2 seconds)
- **Impact**: Users can exploit window boundaries to exceed intended limits
- **Result**: Less effective protection against abuse

## Production Recommendations

For production deployments, use a shared state solution with a better algorithm:

### Option 1: Upstash Redis (Recommended for Serverless/Edge)

**Best for**: Vercel deployments, edge functions, serverless architectures

**Pros**:
- HTTP-based Redis, no TCP connection issues in serverless
- Edge-compatible, low latency (5-15ms)
- Built-in rate limiting SDK with sliding window algorithm
- Automatic cleanup and TTL management

**Implementation**:

```bash
npm install @upstash/ratelimit @upstash/redis
```

```ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
});

// In your server action or API route
const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
const { success, limit, remaining, reset } = await ratelimit.limit(ip);

if (!success) {
  return new Response('Too many requests', { 
    status: 429,
    headers: {
      'RateLimit-Limit': limit.toString(),
      'RateLimit-Remaining': remaining.toString(),
      'RateLimit-Reset': new Date(reset).toISOString(),
    }
  });
}
```

**Environment Variables**:
```env
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

**Cost**: Free tier available (10,000 commands/day), paid plans start at ~$10/month

### Option 2: Traditional Redis (Recommended for Multi-Instance)

**Best for**: Traditional deployments, Kubernetes, Docker Swarm, multi-instance servers

**Pros**:
- Mature, battle-tested technology
- Full Redis feature set
- Can be self-hosted or use managed services (AWS ElastiCache, Google Cloud Memorystore)

**Implementation**:

```bash
npm install ioredis
```

```ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

async function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Use Redis sorted set for sliding window
  const multi = redis.multi();
  multi.zremrangebyscore(key, 0, windowStart);
  multi.zcard(key);
  multi.zadd(key, now, `${now}-${Math.random()}`);
  multi.expire(key, Math.ceil(windowMs / 1000));
  
  const results = await multi.exec();
  const count = results[1][1] as number;
  
  if (count > limit) {
    return { allowed: false, count, limit };
  }
  
  return { allowed: true, count, limit };
}
```

**Environment Variables**:
```env
REDIS_URL=redis://localhost:6379
# or for AWS ElastiCache
REDIS_URL=rediss://your-elasticache-endpoint:6379
```

### Option 3: Cloudflare Durable Objects (Alternative for Edge)

**Best for**: Cloudflare Workers, edge-only deployments

**Pros**:
- Single-instance per key, no race conditions
- Low latency at the edge (5-15ms)
- Exact counting, suitable for paid tiers

**Cons**:
- Cloudflare-specific
- Single-instance bottleneck for hot keys

**Implementation**:

```ts
// rate-limiter.object.ts
export class RateLimiterDurableObject {
  constructor(state: DurableObjectState) {
    this.state = state;
    this.count = 0;
    this.resetAt = Date.now() + 60000;
  }

  async fetch(request: Request) {
    const now = Date.now();
    
    if (now >= this.resetAt) {
      this.count = 0;
      this.resetAt = now + 60000;
    }
    
    if (this.count >= 10) {
      return new Response('Too many requests', { status: 429 });
    }
    
    this.count++;
    return new Response('OK');
  }
}
```

## Migration Guide

### Step 1: Install Dependencies

Choose your production solution and install the required packages:

```bash
# For Upstash (recommended for Vercel)
npm install @upstash/ratelimit @upstash/redis

# For traditional Redis
npm install ioredis
```

### Step 2: Add Environment Variables

Add the required environment variables to `.env.example` and your production environment:

```env
# Upstash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Traditional Redis
REDIS_URL=
```

### Step 3: Update Rate Limiter Module

Replace `app/lib/rate-limiter.ts` with your chosen implementation. Keep the same function signatures to minimize code changes:

```ts
// New app/lib/rate-limiter.ts using Upstash
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function checkRateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const { success } = await ratelimit.limit(key);
  return success;
}
```

### Step 4: Update Call Sites

The function signatures remain the same, but `checkRateLimit` is now async:

```ts
// Before
const allowed = checkRateLimit(ip, 10, 60 * 1000);

// After
const allowed = await checkRateLimit(ip, 10, 60 * 1000);
```

### Step 5: Update Tests

Update test files to mock the external rate limiting service:

```ts
// app/__tests__/lib/rate-limiter.test.ts
import { describe, it, expect, vi } from 'vitest';
import { checkRateLimit } from '@/lib/rate-limiter';

vi.mock('@upstash/ratelimit');

describe('rate-limiter', () => {
  it('should allow requests under limit', async () => {
    const allowed = await checkRateLimit('test-key', 10, 60000);
    expect(allowed).toBe(true);
  });
});
```

## Algorithm Comparison

| Algorithm | Memory per Key | Burst Behavior | Best For |
|-----------|---------------|----------------|----------|
| Fixed Window | 1 integer | Allows 2x at boundaries | Simple cases, occasional spikes OK |
| Sliding Window Log | O(n) timestamps | No bursts, exact | Audit-grade APIs, low traffic |
| Sliding Window Counter | 2 integers | Smoothed boundaries | General-purpose default |
| Token Bucket | 2 floats | Allows controlled bursts | Bursty real-world traffic (mobile apps) |
| Leaky Bucket | 2 floats | No bursts, strict shaping | Outbound throttling, queues |

**Recommendation**: Use sliding window counter or token bucket for most use cases.

## Layered Rate Limiting

For comprehensive protection, implement rate limiting at multiple layers:

1. **CDN/Edge Layer** (Cloudflare, Vercel)
   - Coarse limits (e.g., 1000 req/min per IP)
   - Catches DDoS and bot traffic
   - Free or near-free

2. **Application Layer** (Your code)
   - Precise per-user limits (e.g., 60 req/min per user)
   - Enforces business logic
   - 1-3ms latency with Redis

3. **Database Layer** (Postgres, downstream APIs)
   - Hard limits on expensive operations
   - Connection pool caps
   - Statement timeouts

## References

- [Upstash Rate Limiting Documentation](https://upstash.com/docs/ratelimit/sdks/ts)
- [Rate Limiting Your Next.js API with Redis](https://medium.com/better-dev-nextjs-react/rate-limiting-your-next-js-api-with-redis-b35a6622acba)
- [How to add rate limiting to your API](https://cadence.withremote.ai/blog/rate-limiting-api)
- [Rate Limiting Without Redis: 3 Patterns for Serverless](https://dev.to/raxxostudios/rate-limiting-without-redis-3-patterns-i-use-in-serverless-4bjg)

# Rate Limiting

This document explains the production-ready rate limiting implementation using Upstash Redis.

## Current Implementation

The application uses Upstash Redis for distributed, production-ready rate limiting implemented in `app/lib/rate-limiter.ts`. This implementation:

- Uses Upstash Redis for distributed, persistent rate limiting
- Compatible with serverless environments (Vercel, AWS Lambda, Cloudflare Workers)
- Supports multi-instance deployments with shared state
- Edge runtime compatible with HTTP-based Redis
- Implements sliding window algorithm for smooth rate limiting
- Graceful degradation if Redis is unavailable

### Usage Example

```ts
import { checkRateLimit } from '@/lib/rate-limiter';

// Allow 10 requests per minute per IP
const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
const allowed = await checkRateLimit(ip, 10, 60 * 1000);

if (!allowed) {
  return new Response('Too many requests', { status: 429 });
}
```

### Usage with Metadata

For API responses that include rate limit information:

```ts
import { checkRateLimitWithMetadata } from '@/lib/rate-limiter';

const result = await checkRateLimitWithMetadata(ip, 10, 60 * 1000);

if (!result.success) {
  return new Response('Too many requests', {
    status: 429,
    headers: {
      'RateLimit-Limit': result.limit.toString(),
      'RateLimit-Remaining': result.remaining.toString(),
      'RateLimit-Reset': new Date(result.reset).toISOString(),
    }
  });
}
```

## Configuration

### Environment Variables

Add the following to your `.env.local` file:

```env
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

### Getting Upstash Credentials

1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new Redis database
3. Copy the REST URL and token from the database details
4. Add them to your environment variables

### Graceful Degradation

The implementation includes graceful degradation:

- If Upstash Redis is not configured, all requests are allowed
- If Redis connection fails, requests are allowed with error logging
- This ensures the application remains functional even if rate limiting fails

## Features

### Sliding Window Algorithm

The sliding window algorithm provides smooth rate limiting without boundary bursts:

- More accurate than fixed window
- Prevents users from exploiting window boundaries
- Better user experience with consistent limits

### Async/Await Pattern

All rate limiting functions are async:

```ts
export async function checkRateLimit(key: string, limit: number, windowMs: number): Promise<boolean>
export async function checkRateLimitWithMetadata(key: string, limit: number, windowMs: number): Promise<RateLimitResult>
export async function clearRateLimits(): Promise<void>
export async function getRateLimitCount(key: string): Promise<number>
```

### Logging

Rate limit events are logged for monitoring:

```ts
console.log('[rate-limiter] Rate limit exceeded', {
  key,
  limit: result.limit,
  remaining: result.remaining,
  reset: new Date(result.reset).toISOString(),
});
```

## Current Usage

### Contact Form

Location: `app/actions/contact.ts`

```ts
const rateLimitKey = `contact:${ip}`;
const isAllowed = await checkRateLimit(rateLimitKey, 5, 600000); // 5 requests per 10 minutes
```

### Newsletter Subscription

Location: `app/actions/newsletter.ts`

```ts
const rateLimitKey = `newsletter:${ip}`;
const isAllowed = await checkRateLimit(rateLimitKey, 3, 600000); // 3 subscriptions per 10 minutes
```

## Testing

Tests mock the Upstash Redis service to avoid external dependencies:

```ts
// app/__tests__/lib/rate-limiter.test.ts
vi.mock('@upstash/ratelimit');
vi.mock('@upstash/redis');
```

Tests cover:
- Graceful degradation when Upstash is not configured
- Successful rate limit checks
- Rate limit exceeded scenarios
- Redis failure graceful degradation
- Metadata return values

## Monitoring

### Upstash Analytics

Upstash provides built-in analytics when enabled:

```ts
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true, // Enable analytics
  prefix: 'ratelimit',
});
```

View analytics in the Upstash Console.

### Application Logs

Rate limit events are logged with structured data:

- Rate limit exceeded events
- Redis connection errors
- Configuration warnings

## Troubleshooting

### Rate Limiting Not Working

**Symptom**: All requests are allowed even when limits should be exceeded.

**Solutions**:
1. Check that `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set
2. Verify the credentials are correct in the Upstash Console
3. Check application logs for configuration warnings

### Redis Connection Errors

**Symptom**: Logs show "Redis error, allowing request" messages.

**Solutions**:
1. Verify network connectivity to Upstash
2. Check that the REST URL is accessible
3. Verify the token has not expired
4. Check Upstash service status

### High Latency

**Symptom**: Rate limiting adds significant latency to requests.

**Solutions**:
1. Choose the closest Upstash region
2. Consider using edge functions with regional Redis
3. Monitor Upstash console for performance metrics

## Cost Considerations

Upstash Redis pricing:

- **Free tier**: 10,000 commands/day
- **Paid plans**: Start at ~$10/month
- **Pay per request**: No upfront costs

For high-traffic applications, consider:
- Caching rate limit results where appropriate
- Using CDN-level rate limiting as a first layer
- Monitoring usage to optimize limits

## Migration from In-Memory Implementation

The application was migrated from an in-memory implementation to Upstash Redis. The migration included:

1. **Installed dependencies**: `@upstash/ratelimit` and `@upstash/redis`
2. **Updated rate limiter module**: Replaced in-memory Map with Upstash Redis
3. **Updated call sites**: Changed synchronous calls to async/await
4. **Updated tests**: Added mocks for Upstash modules
5. **Added environment variables**: Documented required credentials

### Changes Made

- `app/lib/rate-limiter.ts`: Complete rewrite using Upstash Redis
- `app/actions/contact.ts`: Changed `checkRateLimit` to `await checkRateLimit`
- `app/actions/newsletter.ts`: Changed `checkRateLimit` to `await checkRateLimit`
- `app/__tests__/lib/rate-limiter.test.ts`: Updated to mock Upstash modules
- `.env.example`: Added Upstash Redis environment variables
- `docs/rate-limiting.md`: Updated documentation

## Algorithm Comparison

| Algorithm | Memory per Key | Burst Behavior | Best For |
|-----------|---------------|----------------|----------|
| Fixed Window | 1 integer | Allows 2x at boundaries | Simple cases, occasional spikes OK |
| Sliding Window Log | O(n) timestamps | No bursts, exact | Audit-grade APIs, low traffic |
| Sliding Window Counter | 2 integers | Smoothed boundaries | General-purpose default |
| Token Bucket | 2 floats | Allows controlled bursts | Bursty real-world traffic (mobile apps) |
| Leaky Bucket | 2 floats | No bursts, strict shaping | Outbound throttling, queues |

**Current Implementation**: Sliding window counter via Upstash SDK.

## Layered Rate Limiting

For comprehensive protection, implement rate limiting at multiple layers:

1. **CDN/Edge Layer** (Cloudflare, Vercel)
   - Coarse limits (e.g., 1000 req/min per IP)
   - Catches DDoS and bot traffic
   - Free or near-free

2. **Application Layer** (Your code - Current Implementation)
   - Precise per-user limits (e.g., 60 req/min per user)
   - Enforces business logic
   - 1-3ms latency with Upstash Redis

3. **Database Layer** (Postgres, downstream APIs)
   - Hard limits on expensive operations
   - Connection pool caps
   - Statement timeouts

## References

- [Upstash Rate Limiting Documentation](https://upstash.com/docs/ratelimit/sdks/ts)
- [Upstash Redis Documentation](https://upstash.com/docs/redis/sdks/ts/overview)
- [Rate Limiting Your Next.js API with Redis](https://medium.com/better-dev-nextjs-react/rate-limiting-your-nextjs-api-with-redis-b35a6622acba)
- [How to add rate limiting to your API](https://cadence.withremote.ai/blog/rate-limiting-api)

# app/lib

Utility libraries and data modules. Inherits root AGENTS.md; overrides below.

## Purpose
The lib directory contains shared utilities, data fetching, configuration, and security-critical functions used across the application.

## Key modules

### Environment (env.ts)
- All environment variable access must go through this module
- Use Zod schemas for validation
- Public vars (NEXT_PUBLIC_) validated with publicEnvSchema
- Server vars validated with serverEnvSchema
- Export type-safe getter functions for each variable
- Never access process.env directly outside this module

### Rate limiting (rate-limiter.ts)
- Uses Upstash Redis for distributed rate limiting
- Implements sliding window algorithm
- Graceful degradation: allows requests if Redis is unavailable
- Factory cache reuses Ratelimit instances by limit:window
- Use checkRateLimit for boolean checks, checkRateLimitWithMetadata for headers

### Content sanitization (content-sanitizer.ts)
- All HTML from CMS must be sanitized before rendering
- Use sanitizeHtml function with restricted allowlist
- Allowed tags: p, h2, h3, ul, li, strong, em, a, br
- Allowed attributes: href on a tags only
- Allowed schemes: http, https, mailto

### CMS client (cms-client.ts)
- Sanity CMS client with typed queries
- Two clients: client (published) and previewClient (drafts)
- Use getClient(preview) selector function
- All queries return typed data validated with Zod schemas
- Use handleCMSError for consistent error handling

### Content port (content-port.ts)
- Defines interfaces for blog and portfolio content access
- This is the seam for CMS adapter swapping
- Implementations in content/ directory (local-blog-adapter, local-portfolio-adapter)
- Async-first to support both local and CMS backends

### Security utilities
- escape-html.ts: HTML escaping for user input
- nonce.ts: Per-request CSP nonce generation
- ip-utils.ts: IP address utilities for rate limiting
- revalidate-localized.ts: Localized path revalidation

## Boundaries

### Always
- Use env.ts getters for all environment variable access
- Sanitize all HTML from CMS using content-sanitizer.ts
- Use rate-limiter.ts for form submissions and API endpoints
- Validate all external data with Zod schemas
- Use getClient(preview) for CMS queries

### Ask first
- Changing rate limiting thresholds or algorithms
- Modifying HTML sanitization allowlist
- Adding new CMS client queries without following the pattern
- Changing content port interfaces (affects adapters)

### Never
- Access process.env directly outside env.ts
- Skip HTML sanitization for CMS content
- Remove rate limiting from form submissions
- Hardcode environment values
- Expose secrets or tokens in error messages

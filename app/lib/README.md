# lib

Utility libraries, data modules, and shared functions for the Elevate Digital marketing website.

## Table of Contents

- [Categories](#categories)
- [Data Modules](#data-modules)
- [Utilities](#utilities)
- [SEO Tools](#seo-tools)
- [Configuration](#configuration)
- [Related Documentation](#related-documentation)

## Categories

### Data Modules

- **blog-data.ts**: Blog post data from local static content
- **portfolio-data.ts**: Portfolio and case study data
- **search-data.ts**: Search index and data processing

### CMS Integration

- **cms-client.ts**: Sanity CMS client configuration and query functions
- **content-port.ts**: Content port abstraction for adapter swapping
- **content-types.ts**: TypeScript types, Zod schemas, and type guards for CMS content
- **content/**: Content adapters for CMS integration

### Utilities

- **content-sanitizer.ts**: HTML sanitization utilities
- **escape-html.ts**: HTML escaping utilities
- **ip-utils.ts**: IP address utilities for rate limiting
- **nonce.ts**: CSP nonce retrieval from request headers
- **rate-limiter.ts**: Rate limiting with Upstash Redis

### SEO Tools

- **schema.ts**: JSON-LD schema generation
- **seo-alternates.ts**: SEO alternate language links
- **robots-policy.ts**: Robots.txt policy configuration
- **og-image-helper.tsx**: OpenGraph image generation helpers

### Configuration

- **env.ts**: Environment variable validation with Zod
- **site-config.ts**: Site-wide configuration

### Revalidation

- **revalidate-localized.ts**: Localized revalidation utilities

## Data Modules

### blog-data.ts

Provides blog post data from local static content:

- Exports typed interfaces for blog posts and summaries
- Returns summary views with topic cluster mapping
- Retrieves posts by slug
- Generates slug lists for static param generation

### portfolio-data.ts

Provides portfolio and case study data from local static content:

- Exports typed interfaces for case studies and summaries
- Returns summary views with formatted results
- Retrieves case studies by slug
- Generates slug lists for static param generation

### search-data.ts

Search content aggregation and processing:

- Combines blog, portfolio, and static page content
- Uses content port adapters (async-ready for CMS)
- Validates locale against configured locales
- Transforms data for Algolia indexing
- Filters search results by content type

## Utilities

### content-sanitizer.ts

Sanitizes HTML from CMS:

- Removes dangerous tags
- Allows safe HTML elements
- Prevents XSS attacks
- Preserves formatting

### rate-limiter.ts

Rate limiting with Upstash Redis:

- Sliding window algorithm
- Key-based limiting (caller provides identifier)
- Configurable limits and windows
- Distributed rate limiting
- Graceful degradation when Redis unavailable
- Factory cache for limiter instances

### env.ts

Environment variable validation:

- Zod schema validation
- Type-safe environment access
- Runtime validation
- Clear error messages

## SEO Tools

### schema.ts

JSON-LD schema generation:

- Organization schema
- Service schemas (web design, SEO, analytics)
- FAQ page schema
- Article schema generator
- Breadcrumb schema generator
- Service schema generator
- HowTo schema generator

### seo-alternates.ts

Alternate language links:

- Generates hreflang tags
- Supports multiple locales
- SEO-friendly structure
- Canonical URLs

### robots-policy.ts

Robots.txt indexing control:

- Environment-aware indexing decisions
- ALLOW_INDEXING override flag
- Vercel environment detection (production vs preview)
- Fails closed (denies indexing by default)

## Configuration

### site-config.ts

Site-wide configuration:

- Site name
- Default and supported locales
- Site URL from environment
- Absolute URL construction

## Related Documentation

- [app/README.md](../README.md) - App directory overview
- [docs/cms.md](../../docs/cms.md) - Sanity CMS integration
- [docs/seo.md](../../docs/seo.md) - SEO strategy and implementation
- [docs/rate-limiting.md](../../docs/rate-limiting.md) - Rate limiting implementation

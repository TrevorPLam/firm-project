# Revalidate API

Sanity CMS webhook handler for cache invalidation.

## Purpose

Next.js API route that handles Sanity CMS webhooks to trigger cache revalidation when content is published or updated.

## Endpoint

- **Method**: POST
- **Path**: `/api/revalidate`
- **Authentication**: HMAC signature validation

## Implementation

Handles webhook payloads from Sanity CMS to:
- Validate webhook signatures (timing-safe comparison)
- Parse document type and slug
- Trigger path-based or tag-based revalidation
- Update Next.js cache for affected pages

## Revalidation Strategy

### Path-based Revalidation

For documents with slugs (blog posts, case studies):
- Revalidate specific document path (e.g., `/blogPost/slug`)
- Revalidate listing pages (e.g., `/blog`, `/portfolio`)
- Revalidate type tags for fetch cache

### Tag-based Revalidation

For documents without slugs (pages):
- Revalidate by document type tag
- Affects all pages of that type

## Security

- HMAC signature validation with timing-safe comparison
- Secret must match `SANITY_REVALIDATE_SECRET` environment variable
- Returns 500 if `SANITY_REVALIDATE_SECRET` is not set
- Rejects invalid signatures (401 status)
- Rejects missing/invalid payloads (400 status)
- Returns 500 on unexpected errors (caught and logged)

## Environment Variables

- `SANITY_REVALIDATE_SECRET` - Secret key for webhook signature validation

## Supported Document Types

- `blogPost` - Blog posts with slug-based revalidation
- `caseStudy` - Portfolio case studies with slug-based revalidation
- `page` - General pages with tag-based revalidation

## Notes

Webhook must be configured in Sanity CMS to point to this endpoint. The route waits for Content Lake propagation to avoid stale data.

## Response

On success, returns JSON with status 200:

```json
{
  "revalidated": true,
  "type": "blogPost",
  "slug": "test-post",
  "now": 1718700000000
}
```

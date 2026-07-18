# api

API routes for external integrations using Next.js App Router.

## Table of Contents

- [Available Routes](#available-routes)
- [Route Structure](#route-structure)
- [Authentication](#authentication)
- [Webhooks](#webhooks)
- [Error Handling](#error-handling)

## Available Routes

### draft/

Sanity CMS draft preview endpoint:

- Authenticates preview requests
- Enables draft mode for CMS content
- Sets preview cookies
- Redirects to draft content

### revalidate/

On-demand revalidation webhook:

- Receives webhook from Sanity CMS
- Validates webhook signature
- Revalidates specific routes and tags
- Handles blog and portfolio listing revalidation

## Route Structure

Each route follows Next.js App Router conventions:

```
api/
├── draft/
│   └── route.ts      # Draft preview handler
└── revalidate/
    └── route.ts      # Revalidation webhook handler
```

## Authentication

### Draft Preview

- Uses Sanity API read token
- Validates token from environment
- Sets secure preview cookies
- Redirects authenticated users

### Webhook Revalidation

- Validates webhook secret from environment
- Verifies request signature via `parseBody`
- Rejects unauthorized requests with 401
- Logs errors with context for debugging

## Webhooks

### Sanity CMS Webhook

The revalidate endpoint handles Sanity CMS webhooks:

- **Trigger**: Content published/updated in Sanity
- **Payload**: Content type (`_type`) and slug
- **Action**: Revalidate affected routes and cache tags
- **Listing pages**: Revalidates `/blog` for blog posts and `/portfolio` for case studies

## Error Handling

API routes return appropriate HTTP status codes:

- **200**: Success
- **400**: Bad request (empty body or missing `_type`)
- **401**: Unauthorized (invalid signature)
- **500**: Server error (missing secret or unexpected error)

Errors are logged with context for debugging.

## Related Documentation

- [app/README.md](../README.md) - App directory overview
- [docs/cms.md](../../docs/cms.md) - Sanity CMS integration
- [lib/revalidate-localized.ts](../lib/revalidate-localized.ts) - Localized revalidation utility (available for locale-aware cache invalidation)

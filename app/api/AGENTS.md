# app/api

API routes for external integrations. Inherits root AGENTS.md; overrides below.

## Purpose
API routes handle external integrations: Sanity CMS draft preview and webhook-based cache revalidation.

## Available routes
- `draft/route.ts` — Sanity CMS draft preview endpoint
- `revalidate/route.ts` — On-demand revalidation webhook from Sanity CMS

## Route structure
Each route exports a single handler function (GET, POST) following Next.js App Router conventions.

## Authentication
- Draft preview: Uses Sanity API read token from environment
- Webhook revalidation: Validates webhook signature using `parseBody` from next-sanity

## Webhook security
- Use `parseBody` from next-sanity for timing-safe signature verification
- Validate webhook secret from environment before processing
- Reject unauthorized requests with 401 status
- Set `wait: true` in parseBody to wait for Content Lake propagation

## Error handling
Return appropriate HTTP status codes:
- 200: Success
- 400: Bad request (empty body, missing _type)
- 401: Unauthorized (invalid signature)
- 500: Server error (missing secret, unexpected error)

Log errors with context for debugging but don't expose internals.

## Revalidation logic
- For documents with slugs: revalidate specific path and listing pages
- Blog posts: revalidate `/blog` and `blog` tag
- Case studies: revalidate `/portfolio` and `portfolio` tag
- For documents without slugs: revalidate by type tag

## Boundaries

### Always
- Validate environment variables before using them
- Use timing-safe signature verification for webhooks
- Revalidate both individual paths and listing pages
- Return JSON responses with revalidation metadata

### Ask first
- Adding new API routes without following established patterns
- Changing revalidation logic for content types
- Modifying webhook signature validation

### Never
- Skip webhook signature validation
- Expose secrets or tokens in error messages
- Revalidate without proper signature verification
- Allow unauthenticated draft preview access

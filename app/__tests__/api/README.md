# API Tests

Unit tests for API route handlers.

## Purpose

Tests for Next.js API routes, including webhook handlers and external integrations.

## Test Files

- `revalidate.test.ts` - Sanity CMS webhook revalidation route tests

## Test Coverage

### Revalidate Route Tests

- **Security** - Signature validation with timing-safe comparison
- **Configuration** - Environment variable validation (SANITY_REVALIDATE_SECRET)
- **Payload Validation** - Body structure and required field checks
- **Path-based Revalidation** - Specific path invalidation for blog posts and case studies
- **Tag-based Revalidation** - Type tag invalidation for documents without slugs
- **Error Handling** - Parse error handling and error responses

## Security Testing

Tests verify that:
- Invalid signatures are rejected (401 status)
- Missing secrets return 500 status
- Valid signatures trigger proper revalidation
- Signature validation is delegated to next-sanity's `parseBody` (timing-safe comparison is an internal implementation detail of the mocked dependency)

## Running Tests

```bash
npm test -- app/__tests__/api
```

## Notes

Tests mock Next.js cache functions (`revalidatePath`, `revalidateTag`), the next-sanity webhook parser (`parseBody`), and the env getter (`getSanityRevalidateSecret`) to isolate route handler logic.

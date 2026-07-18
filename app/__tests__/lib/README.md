# Library Tests

Unit tests for utility libraries and data modules.

## Purpose

Tests for pure functions, data transformations, and business logic in the `lib/` directory.

## Test Files

- `content-port.blog.test.ts` - Blog content port adapter tests
- `content-port.portfolio.test.ts` - Portfolio content port adapter tests
- `content-sanitizer.test.ts` - HTML sanitization tests
- `env.test.ts` - Environment variable validation and getter tests
- `escape-html.test.ts` - HTML escaping utility tests
- `rate-limiter.test.ts` - Rate limiting logic tests
- `revalidate-localized.test.ts` - Localized revalidation tests
- `robots-policy.test.ts` - Indexing policy tests
- `search-data.test.ts` - Search data aggregation tests
- `site-config.test.ts` - Site configuration tests

## Test Coverage

### Content Port Tests

- Port contract compliance
- Data transformation accuracy
- Async-first interface
- DTO structure validation
- No internal type leakage

### Utility Tests

- HTML escaping for XSS prevention
- Environment variable validation
- Rate limiting logic
- Content sanitization
- SEO utilities (robots/indexing policy)

## Running Tests

```bash
npm test -- app/__tests__/lib
```

## Notes

These tests follow TDD principles where possible, defining contracts before implementation. Tests that require external dependencies (Redis, Next.js cache, content adapters) use mocks; pure utility tests exercise real implementations directly.

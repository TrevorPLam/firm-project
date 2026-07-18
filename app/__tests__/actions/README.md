# Actions Tests

Unit tests for Server Actions.

## Purpose

Tests for server-side form handlers and mutations, including contact form submission and newsletter subscription.

## Test Files

- `contact.test.ts` - Contact form action tests
- `newsletter.test.ts` - Newsletter subscription action tests

## Test Coverage

### Contact Form Tests

- PII protection (no logging of sensitive data)
- Input validation (name, email, service, message)
- Email service configuration checks
- XSS prevention (HTML escaping in form fields)

### Newsletter Tests

- Email format validation
- PII protection (no email logging)
- Email service configuration checks
- Rate limiting enforcement

## Security Testing

Tests verify that:
- Personally Identifiable Information (PII) is never logged to console
- HTML input is properly escaped to prevent XSS
- Rate limiting prevents abuse
- Email service requires proper configuration

## Running Tests

```bash
npm test -- app/__tests__/actions
```

## Notes

All tests use Vitest with mocked dependencies (Resend, Next.js headers/cache). The newsletter test also mocks the rate limiter; the contact test uses the real rate limiter module with limits cleared between tests.

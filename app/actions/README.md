# actions

Server actions for form submissions and backend operations using Next.js Server Actions.

## Table of Contents

- [Available Actions](#available-actions)
- [Common Patterns](#common-patterns)
- [Validation](#validation)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [Security](#security)

## Available Actions

### contact.ts

Contact form submission action:

- Validates form data with Zod
- Sends email via Resend
- Applies rate limiting with Upstash Redis
- Returns success/error response

### newsletter.ts

Newsletter subscription action:

- Validates email address with Zod
- Subscribes to Resend audience
- Applies rate limiting with Upstash Redis
- Returns success/error response

## Common Patterns

All server actions follow this pattern:

1. **Honeypot check** for bot detection (hidden field)
2. **Rate limiting** check with Upstash Redis
3. **Input validation** using Zod schemas
4. **Business logic** execution
5. **Error handling** with user-friendly messages
6. **Response** with success/error status

## Validation

Uses Zod for runtime validation:

- Type-safe input validation
- Automatic error messages
- Sanitization of user input
- Prevents injection attacks

## Rate Limiting

Implements rate limiting using Upstash Redis:

- **Window**: Sliding window algorithm
- **Limits**: Configurable per action
- **Identifier**: Client IP address with fingerprint hash fallback
- **Redis**: Distributed rate limiting

## Error Handling

Actions return consistent error responses:

```typescript
{
  success: false,
  message: "User-friendly error message",
  errors?: Record<string, string[]>
}
```

Errors are logged but not exposed to clients for security.

## Security

- **CSRF protection**: Built into Server Actions
- **Honeypot fields**: Bot detection via hidden form fields
- **Rate limiting**: Prevents abuse
- **Input validation**: Prevents injection
- **HTML escaping**: Output sanitized with `escapeHtml`
- **Error messages**: Sanitized for client safety
- **API keys**: Server-side only, never exposed

## Related Documentation

- [app/README.md](../README.md) - App directory overview
- [docs/rate-limiting.md](../../docs/rate-limiting.md) - Rate limiting implementation
- [lib/rate-limiter.ts](../lib/rate-limiter.ts) - Rate limiting utility

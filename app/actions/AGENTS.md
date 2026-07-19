# app/actions

Server actions for form submissions and backend operations. Inherits root AGENTS.md; overrides below.

## Purpose
Server actions handle form submissions (contact, newsletter) with validation, rate limiting, and email delivery via Resend.

## Common patterns
All server actions must follow this sequence:
1. Honeypot check (hidden "website" field for bot detection)
2. Rate limiting check with Upstash Redis
3. Input validation using Zod schemas
4. Business logic execution
5. Error handling with user-friendly messages
6. Response with success/error status

## Validation
- Use Zod schemas for runtime validation
- Define schemas at the top of the file
- Export inferred types for form data
- Return field errors in the response format

## Rate limiting
- Use `checkRateLimit` from `@/lib/rate-limiter`
- Use `getClientIdentifier` from `@/lib/ip-utils` for the key
- Contact form: 5 requests per 10 minutes
- Newsletter: 3 subscriptions per 10 minutes
- Rate limit key format: `{actionName}:{identifier}`

## Response format
All actions return `FormResult` type:
```typescript
{
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
```

## Security
- Always escape HTML output using `escapeHtml` from `@/lib/escape-html`
- Never expose PII in logs
- Return success on honeypot trigger to not alert bots
- Validate environment variables before using external services
- Use revalidateLocalizedPath for cache invalidation

## Boundaries

### Always
- Add `"use server"` directive at the top of the file
- Export both direct action and useActionState variant
- Apply rate limiting before validation
- Escape all user input in email bodies
- Revalidate affected paths after successful submission

### Ask first
- Changing rate limit thresholds (5/10min for contact, 3/10min for newsletter)
- Adding new server actions without following the established pattern
- Modifying honeypot field name or logic

### Never
- Remove honeypot check
- Remove rate limiting
- Expose API keys or secrets in error messages
- Log PII (email addresses, names, etc.)
- Skip input validation

# csp-violation-report-endpoint

Content Security Policy (CSP) violation reporting endpoint for monitoring and debugging security policy violations.

## Table of Contents

- [Purpose](#purpose)
- [Endpoint](#endpoint)
- [Violation Report Format](#violation-report-format)
- [Logging](#logging)
- [Security](#security)

## Purpose

CSP violation reports help:

- Detect XSS attack attempts
- Debug CSP policy issues
- Monitor policy effectiveness
- Identify false positives
- Improve security posture

## Endpoint

### route.ts

POST endpoint that receives CSP violation reports:

- Accepts JSON violation reports
- Logs violations with context
- Returns 204 No Content on success
- Returns 400 on malformed requests

## Violation Report Format

Browsers send CSP violation reports as JSON:

```json
{
  "csp-report": {
    "document-uri": "https://example.com/page",
    "referrer": "https://example.com/",
    "violated-directive": "script-src",
    "effective-directive": "script-src-elem",
    "original-policy": "default-src 'self'; script-src 'self'",
    "disposition": "report",
    "blocked-uri": "https://evil.com/script.js",
    "line-number": 10,
    "column-number": 5,
    "source-file": "https://example.com/page.js",
    "status-code": 200
  }
}
```

## Logging

Violations are logged via `console.error` with the following fields from the CSP report:

- `document-uri`
- `referrer`
- `violated-directive`
- `effective-directive`
- `original-policy`
- `blocked-uri`
- `status-code`
- `source-file`
- `line-number`
- `column-number`

Logs are monitored for:

- Repeated violations from same source
- New attack patterns
- Policy misconfigurations
- Legitimate third-party resources

## Security

- **No sensitive data**: Reports don't contain sensitive information
- **Rate limiting**: Consider rate limiting to prevent abuse
- **Monitoring**: Regular review of violation reports
- **Policy updates**: Use reports to refine CSP policy

## Related Documentation

- [docs/security.md](../../docs/security.md) - Security headers and CSP configuration
- [app/README.md](../README.md) - App directory overview

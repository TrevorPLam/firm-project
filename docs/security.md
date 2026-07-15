# Security Documentation

## HSTS Implementation

### Overview

HTTP Strict Transport Security (HSTS) is implemented to enforce HTTPS connections and protect against protocol downgrade attacks and cookie hijacking.

### Configuration

The HSTS header is configured in `next.config.ts` with the following directives:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

- **max-age=31536000**: 1 year (31,536,000 seconds) - browsers will remember the HSTS policy for 1 year
- **includeSubDomains**: The HSTS policy applies to all subdomains
- **preload**: The domain is eligible for inclusion in the HSTS preload list

### HSTS Preload Submission

To submit the domain to the HSTS preload list:

1. Visit https://hstspreload.org/
2. Verify the domain meets all requirements:
   - Valid SSL certificate
   - HSTS header with max-age of at least 31536000 (1 year)
   - includeSubDomains directive present
   - preload directive present
   - Redirects from HTTP to HTTPS on the base domain
3. Submit the domain for preload
4. Wait for approval (typically several weeks)

**Note**: Once a domain is on the preload list, it cannot be easily removed. Ensure HTTPS is properly configured before submission.

### Security Headers Overview

The application implements the following security headers:

- **Strict-Transport-Security**: Enforces HTTPS connections
- **X-Frame-Options**: Prevents clickjacking attacks (DENY)
- **X-Content-Type-Options**: Prevents MIME sniffing (nosniff)
- **Referrer-Policy**: Controls referrer information (strict-origin-when-cross-origin)
- **Permissions-Policy**: Restricts browser features (camera, microphone, geolocation)
- **Content-Security-Policy-Report-Only**: CSP in report-only mode for monitoring

### CSP Nonce vs Static Rendering Decision

**Decision:** Accept dynamic rendering to maintain CSP nonce security (Option A - T013)

The root locale layout uses `headers()` to read the CSP nonce from middleware, which forces all locale routes to render dynamically. After investigation, we chose to accept dynamic rendering rather than remove CSP nonce security.

**Rationale:**
- CSP security takes priority over static generation performance
- Aligns with Next.js 16 PPR (Partial Prerendering) philosophy
- Dynamic rendering performance is acceptable for current scale
- Future caching strategies (ISR, revalidate) can regain static benefits

**Implementation:**
- Explicit `export const dynamic = 'force-dynamic'` in `app/[locale]/layout.tsx`
- CSP nonce generated per-request in `proxy.ts` middleware
- Nonce forwarded via `x-nonce` header to Server Components
- See `docs/dynamic-rendering-investigation.md` for full analysis

**Note:** The nonce wiring has a known issue (T015) where early i18n redirects skip `x-nonce` forwarding. This must be fixed for CSP to actually function.

### Next.js Image Remote Patterns

The Next.js Image component uses `remotePatterns` in `next.config.ts` to control which external domains can be optimized through `/_next/image`. This prevents Server-Side Request Forgery (SSRF) attacks by only allowing explicit, trusted hostnames.

#### Current Allowlist

- **cdn.sanity.io**: Sanity CMS CDN for image optimization (required for CMS-backed content)

#### Security Policy

- **Least Privilege**: Only explicit hostnames are allowed; no wildcards or open patterns
- **SSRF Protection**: The empty default was intentional to prevent abuse via `/_next/image`
- **Future Additions**: Any new CDN hostname must be added via a dedicated task with security review
- **No Wildcards**: Patterns like `hostname: '**'` or `hostname: '*.sanity.io'` are prohibited

#### Adding New Image Domains

To add a new image CDN hostname:

1. Create a task in TODO.md to document the change
2. Add the specific hostname (not wildcard) to `remotePatterns` in `next.config.ts`
3. Update this security.md section with the new hostname and rationale
4. Include SSRF protection comments in the config
5. Run typecheck and tests to ensure no regressions

**Example for a new CDN:**
```typescript
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'cdn.sanity.io',
  },
  // New CDN added per TASK-XXX
  {
    protocol: 'https',
    hostname: 'images.example.com',
  },
],
```

### SSL/TLS Requirements

For HSTS to function correctly:

- Valid SSL/TLS certificate installed
- TLS 1.3 enabled (recommended)
- TLS 1.0 and 1.1 disabled
- No mixed content warnings
- Proper HTTP to HTTPS redirects

### Security Monitoring Checklist

- [ ] SSL certificate validity and expiry date
- [ ] TLS configuration (SSL Labs test)
- [ ] HSTS header presence and correct values
- [ ] No mixed content warnings
- [ ] CSP violation reports reviewed
- [ ] Security headers validated
- [ ] Dependency vulnerabilities monitored (npm audit)

### Dependency Vulnerability Management

#### CI Integration

The CI pipeline includes an automated security audit job that runs on every push and pull request:

```bash
npm audit --audit-level=high
```

This command:
- Fails CI only on high or critical severity vulnerabilities
- Treats moderate and low severity findings as informational
- Uses the lockfile via `npm ci` for consistent dependency resolution

#### Local Audit Commands

Run dependency audits locally before committing changes:

```bash
# Full audit (all severities)
npm audit

# High/critical only (matches CI threshold)
npm audit --audit-level=high

# JSON output for triage
npm audit --json
```

#### Current Vulnerability Status

As of 2026-07-15, the project has 14 moderate severity vulnerabilities, all transitive dependencies through Next.js and next-sanity packages. These are not blocking CI since the threshold is set to `--audit-level=high`. The vulnerabilities are documented in the Known Vulnerabilities section below for tracking and future remediation.

### Testing HSTS

Test HSTS configuration using:

1. **curl**:
   ```bash
   curl -I https://yourdomain.com
   ```

2. **SSL Labs Test**: https://www.ssllabs.com/ssltest/

3. **Security Headers**: https://securityheaders.com/

## Known Vulnerabilities

### PostCSS <8.5.10 (CVE-2026-41305)

**Advisory**: https://github.com/advisories/GHSA-qx2v-qp2m-jg93  
**Severity**: Moderate  
**Status**: Non-exploitable in this application  
**Last Reviewed**: 2026-07-11

#### Vulnerability Description

PostCSS versions prior to 8.5.10 do not escape `</style>` sequences when stringifying CSS ASTs. When user-submitted CSS is parsed and re-stringified for embedding in HTML `<style>` tags, `</style>` in CSS values can break out of the style context, enabling XSS attacks.

#### Exploitability Assessment

This vulnerability is **not exploitable** in this application for the following reasons:

1. **No User-Submitted CSS**: The application uses Tailwind CSS with Next.js, which processes CSS at build time. There is no functionality that accepts user-submitted CSS content.

2. **Build-Time Processing**: CSS is processed during the build process via Next.js and Tailwind CSS, not at runtime with user input.

3. **No CSS Stringification**: The application does not parse and re-stringify CSS for embedding in HTML `<style>` tags. Tailwind CSS generates static CSS files at build time.

4. **Transitive Dependency**: PostCSS is a transitive dependency of Next.js, not directly used by application code.

#### Impact

- **Risk Level**: None
- **Attack Surface**: No reachable code path
- **User Impact**: None

#### Resolution Strategy

The fix requires upgrading Next.js to a version that uses PostCSS >=8.5.10. However, this would require a major version downgrade of Next.js (from 16.2.10 to 9.3.3), which is a breaking change that would require extensive refactoring.

Per npm security best practices for transitive vulnerabilities:
- The vulnerable code path is not reachable in this application
- The fix would introduce breaking changes
- The risk is acceptably low given the usage pattern

#### Monitoring

This vulnerability will be re-evaluated when:
- Next.js releases a version that uses PostCSS >=8.5.10 without breaking changes
- The application adds functionality that processes user-submitted CSS
- Security audits identify this as a concern

#### References

- [npm audit best practices for transitive vulnerabilities](https://www.decryptiondigest.com/blog/npm-audit-high-severity-triage-guide)
- [PostCSS Advisory](https://github.com/advisories/GHSA-qx2v-qp2m-jg93)

# Dynamic Rendering Investigation: CSP Nonce vs Static Optimization

**Date:** 2026-07-15  
**Task:** T013  
**Status:** Complete - Decision: Option A (Accept Dynamic Rendering)

## Root Cause

The root locale layout (`app/[locale]/layout.tsx`) calls `getNonce()` on line 112, which internally uses `headers()` from Next.js:

```typescript
// app/lib/nonce.ts
export async function getNonce(): Promise<string> {
  const headersList = await headers();
  return headersList.get('x-nonce') || '';
}
```

According to Next.js 16 documentation and community research, any use of `headers()` in a Server Component forces the entire route to render dynamically. This is because `headers()` is a request-time API that requires an incoming HTTP request to function.

## Build Evidence

Production build output shows all locale routes are marked as dynamic (`ƒ`):

```
Route (app)
┌ ○ /_not-found
├ ƒ /[locale]
├ ƒ /[locale]/about
├ ƒ /[locale]/blog
├ ƒ /[locale]/blog/[slug]
├ ƒ /[locale]/contact
├ ƒ /[locale]/faq
├ ƒ /[locale]/legal/privacy
├ ƒ /[locale]/legal/terms
├ ƒ /[locale]/portfolio
├ ƒ /[locale]/portfolio/[slug]
├ ƒ /[locale]/pricing
├ ƒ /[locale]/search
├ ƒ /[locale]/services
├ ○ /robots.txt
└ ○ /sitemap.xml

ƒ  (Dynamic)  server-rendered on demand
○  (Static)   prerendered as static content
```

All routes under `[locale]` are dynamic because they inherit from the root locale layout.

## Impact Analysis

### Performance Impact
- **Static pages lose pre-rendering benefits**: Marketing pages (home, about, services, etc.) that could be statically generated are now server-rendered on every request
- **Increased server load**: Every page visit triggers server-side rendering instead of serving cached HTML
- **Slower TTFB**: Static pages typically have faster Time to First Byte since they're pre-generated

### Security Impact
- **CSP nonce is currently non-functional**: The nonce is generated in `proxy.ts` but the early return for i18n redirects (lines 38-41) means `x-nonce` is never set on requests that reach Server Components
- **Current CSP is Report-Only**: The CSP header is set in report-only mode, so there's no enforcement currently
- **Nonce-based CSP is incomplete**: Even if the nonce reached components, the current implementation has wiring issues (see T015)

## Options

### Option A: Accept Dynamic Rendering (Keep Current Approach)

**Description:** Accept that all locale routes will be dynamic due to CSP nonce requirements. Focus on optimizing dynamic rendering performance instead of pursuing static generation.

**Pros:**
- Maintains current CSP nonce approach (once T015 fixes the wiring)
- No architectural changes required
- Consistent with modern Next.js 16 PPR (Partial Prerendering) philosophy
- Dynamic rendering is acceptable for many marketing sites

**Cons:**
- Loses static generation benefits for content that doesn't change
- Higher server load and slower TTFB for static content
- Not ideal for SEO-focused landing pages that benefit from pre-rendering

**Implementation:**
- Document the decision in security.md
- Add `export const dynamic = 'force-dynamic'` to layout for explicitness
- Focus on caching strategies (ISR, revalidate) for content routes

### Option B: Remove CSP Nonce, Use Static Rendering

**Description:** Remove nonce-based CSP entirely and use static rendering. Fall back to hash-based CSP or report-only monitoring without per-request nonces.

**Pros:**
- All marketing pages can be statically generated
- Better performance and SEO for static content
- Simpler architecture without nonce wiring complexity

**Cons:**
- Loses per-request nonce security benefits
- Requires alternative CSP strategy (hash-based or allowlist-based)
- May need to accept weaker CSP for inline scripts
- Requires updating all inline script usages (JSON-LD, Analytics)

**Implementation:**
- Remove `getNonce()` calls from layout
- Remove nonce from inline scripts
- Switch to hash-based CSP or script-src allowlist
- Update security.md with new CSP approach

### Option C: Hybrid Approach - Conditional Nonce with Suspense

**Description:** Use try/catch around `headers()` to detect static generation context. Only use nonce in dynamic contexts, fall back to static-safe CSP for build-time rendering.

**Pros:**
- Allows static generation for pages that don't need nonce
- Maintains nonce security for dynamic routes
- Follows Next.js recommended pattern for conditional headers usage

**Cons:**
- Complex implementation with conditional logic
- May still force dynamic rendering in some cases
- Requires careful testing of both static and dynamic paths
- Suspense boundaries needed for dynamic segments

**Implementation:**
- Wrap `getNonce()` in try/catch to handle static generation
- Use Suspense boundaries for components that need nonce
- Conditionally apply nonce only when available
- Test both build-time and runtime rendering paths

### Option D: Move Nonce to Client Components Only

**Description:** Keep layout static by removing `getNonce()` call. Move nonce-dependent scripts (Analytics, JSON-LD) to client components that receive nonce via props from a wrapper.

**Pros:**
- Layout remains static
- Nonce still available for client-side scripts
- Cleaner separation of static/dynamic concerns

**Cons:**
- JSON-LD needs to be client-rendered (SEO impact unclear)
- Analytics loads later (potential tracking impact)
- Requires significant component restructuring
- May not fully solve CSP nonce requirements

**Implementation:**
- Remove `getNonce()` from layout
- Create client wrapper components for nonce-dependent scripts
- Pass nonce via props from middleware to client components
- Evaluate SEO impact of client-rendered JSON-LD

## Recommendation

**Recommended: Option A (Accept Dynamic Rendering)**

**Rationale:**
1. **Next.js 16 Philosophy**: The framework is moving toward PPR where static/dynamic is per-component, not per-route. Accepting dynamic rendering aligns with this direction.
2. **CSP Security Priority**: Content Security Policy is a critical security control. Weakening it for static generation performance is not justified.
3. **T015 Dependency**: The nonce wiring is currently broken (T015). Fixing that first will make the nonce functional, making the security benefit real.
4. **Performance Acceptable**: For a marketing site with moderate traffic, dynamic rendering performance is acceptable. Static generation benefits are marginal compared to CSP security.
5. **Future Optimization**: Once T015 is complete, we can explore caching strategies (ISR, revalidate) for content routes to regain some static benefits.

**Caveat:** If the site scales to high traffic or SEO requirements demand static generation, revisit Option C (Hybrid) or Option B (Remove Nonce) with proper CSP alternative.

## Decision Record

**Human Decision:** Option A (Accept Dynamic Rendering)  
**Date:** 2026-07-15  
**Implementation Status:** Complete

### Changes Made

1. **Added explicit dynamic directive**: Added `export const dynamic = 'force-dynamic'` to `app/[locale]/layout.tsx` for explicitness
2. **Documented decision**: Updated this investigation doc with decision status
3. **Security documentation**: Updated `docs/security.md` with CSP nonce vs static rendering decision

### Rationale for Option A

- CSP security takes priority over static generation performance
- Aligns with Next.js 16 PPR philosophy
- Nonce wiring fix (T015) required regardless of option
- Dynamic rendering performance acceptable for current scale
- Future caching strategies (ISR, revalidate) can regain static benefits

## Next Steps

1. **T015 Priority**: Complete T015 to fix nonce wiring (critical for CSP to actually work)
2. **Caching Strategy**: Consider ISR/revalidate for content routes to improve performance
3. **Monitoring**: Track server load and TTFB to ensure dynamic rendering is acceptable

## Related Documentation

- [Next.js 16: Static and Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic)
- [Things that opt a Next.js route out of the cache](https://www.ventura-digital.de/blog/things-that-opt-a-nextjs-route-out-of-the-cache)
- [Detect static rendering to use headers conditionally](https://github.com/vercel/next.js/discussions/82304)
- [docs/security.md](../docs/security.md) - Current CSP implementation
- [T015](../TODO.md#task-t015-fix-csp-nonce-request-wiring-through-next-intl-proxy) - Nonce wiring fix

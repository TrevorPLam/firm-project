# app

Next.js App Router application directory containing all frontend code, server actions, API routes, and shared components for the Elevate Digital marketing website.

## Table of Contents

- [Directory Structure](#directory-structure)
- [Key Directories](#key-directories)
- [Server Actions](#server-actions)
- [API Routes](#api-routes)
- [Components](#components)
- [Libraries](#libraries)
- [Internationalization](#internationalization)
- [Testing](#testing)
- [Special Files](#special-files)

## Directory Structure

```
app/
├── [locale]/              # Internationalized routes (en, es)
│   ├── about/             # About page
│   ├── blog/              # Blog listing and detail pages
│   ├── contact/           # Contact form
│   ├── faq/               # FAQ page
│   ├── legal/             # Legal pages (privacy, terms)
│   ├── portfolio/         # Portfolio and case studies
│   ├── pricing/           # Pricing page
│   ├── search/            # Search page
│   ├── services/          # Services pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── error.tsx          # Error boundary
├── actions/               # Server actions
├── api/                   # API routes
├── components/            # Reusable React components
├── csp-violation-report-endpoint/ # CSP violation reporting
├── e2e/                   # Playwright E2E tests
├── i18n/                  # Internationalization configuration
├── lib/                   # Utility libraries and data modules
├── __tests__/             # Vitest unit tests
├── favicon.ico            # Site favicon
├── globals.css            # Global styles with Tailwind
├── not-found.tsx          # 404 page
├── opengraph-image.tsx    # OG image generation
├── robots.ts              # Robots.txt configuration
└── sitemap.ts             # Sitemap generation
```

## Key Directories

### [locale]/

Contains all internationalized routes using Next.js App Router dynamic segments. Each route supports English (en) and Spanish (es) locales via next-intl.

- **layout.tsx**: Root layout with metadata, fonts, and global providers
- **page.tsx**: Homepage with hero section, features, and CTA
- **error.tsx**: Error boundary for locale routes

### actions/

Server actions for form submissions and backend operations:

- **contact.ts**: Contact form submission with email delivery via Resend
- **newsletter.ts**: Newsletter subscription with rate limiting

### api/

API routes for external integrations:

- **draft/**: Sanity CMS draft preview endpoint
- **revalidate/**: On-demand revalidation webhook for CMS updates

### csp-violation-report-endpoint/

Receives Content Security Policy violation reports from browsers. Validates the payload and logs violations without exposing secrets.

### components/

Reusable React components organized by functionality:

- **analytics.tsx**: Google Analytics and tracking integration
- **contact-form.tsx**: Contact form with validation
- **copyright-year.tsx**: Dynamic copyright year
- **error-boundary.tsx**: React error boundary
- **footer.tsx**: Site footer with navigation and links
- **json-ld.tsx**: Structured data for SEO
- **language-switcher.tsx**: Locale switcher component
- **loading.tsx**: Loading spinner
- **navigation.tsx**: Main navigation with mobile menu
- **newsletter-form.tsx**: Newsletter subscription form
- **page-transition.tsx**: Page transition animations
- **pricing-content.tsx**: Pricing tables and features
- **sanitized-content.tsx**: HTML sanitization for CMS content
- **scroll-reveal.tsx**: Scroll-triggered animations
- **search-bar.tsx**: Search input component
- **search-content.tsx**: Search results display
- **social-share.tsx**: Social media sharing buttons

### lib/

Utility libraries and data modules:

- **blog-data.ts**: Blog post data fetching and processing
- **cms-client.ts**: Sanity CMS client configuration
- **content/**: Content adapters for CMS integration
- **content-port.ts**: Content port abstraction for adapter swapping
- **content-sanitizer.ts**: HTML sanitization utilities
- **content-types.ts**: TypeScript types for CMS content
- **env.ts**: Environment variable validation with Zod
- **escape-html.ts**: HTML escaping utilities
- **ip-utils.ts**: IP address utilities for rate limiting
- **nonce.ts**: CSP nonce generation
- **og-image-helper.tsx**: OpenGraph image generation helpers
- **portfolio-data.ts**: Portfolio and case study data
- **rate-limiter.ts**: Rate limiting with Upstash Redis
- **revalidate-localized.ts**: Localized revalidation utilities
- **robots-policy.ts**: Robots.txt policy configuration
- **schema.ts**: JSON-LD schema generation
- **search-data.ts**: Search index and data processing
- **seo-alternates.ts**: SEO alternate language links
- **site-config.ts**: Site-wide configuration

### i18n/

Internationalization configuration for next-intl:

- **navigation.ts**: Navigation configuration for localized routes
- **request.ts**: Request handling for locale detection
- **routing.ts**: Routing configuration for locale segments

## Server Actions

Server actions in `actions/` handle form submissions and backend operations:

- **contact.ts**: Validates contact form data, sends email via Resend, applies rate limiting
- **newsletter.ts**: Validates email, subscribes to Resend audience, applies rate limiting

Both actions use Zod for validation and Upstash Redis for rate limiting.

## API Routes

API routes in `api/` provide endpoints for external integrations:

- **draft/**: Sanity CMS draft preview with authentication
- **revalidate/**: Webhook endpoint for on-demand revalidation when CMS content changes

## Components

Components are organized by functionality and follow these patterns:

- **Server Components**: Default for better performance
- **Client Components**: Marked with `'use client'` when interactivity needed
- **Composition**: Small, focused components that compose together
- **Styling**: Tailwind CSS with custom design tokens

## Libraries

The `lib/` directory contains:

- **Data fetching**: CMS client, blog/portfolio data modules
- **Utilities**: Validation, sanitization, rate limiting
- **SEO**: Schema generation, alternate links, robots.txt
- **Configuration**: Environment validation, site config

## Internationalization

The app uses next-intl for internationalization:

- **Supported locales**: English (en), Spanish (es)
- **Locale detection**: From URL path, Accept-Language header, or default
- **Translations**: Stored in `messages/` directory at project root
- **Routing**: Locale-based routing with `[locale]` dynamic segment

## Testing

### Unit Tests (Vitest)

Located in `__tests__/` with mirroring structure:

- **actions/**: Server action tests
- **api/**: API route tests
- **components/**: Component tests
- **lib/**: Library function tests

Run with:
```bash
npm test
```

### E2E Tests (Playwright)

Located in `e2e/` directory:

- Home page navigation and content tests
- Blog list, navigation, and detail page tests
- Portfolio detail page tests

Run with:
```bash
npm run test:e2e
```

## Special Files

### globals.css

Global styles with Tailwind CSS directives and custom CSS variables:

- **Color tokens**: CSS custom properties for theming
- **Dark mode**: Automatic dark mode with enhanced contrast
- **Reduced motion**: Accessibility support for prefers-reduced-motion
- **Typography**: Geist Sans font family

### not-found.tsx

Custom 404 page with navigation back to homepage. Excludes from search indexing.

### opengraph-image.tsx

Dynamic OpenGraph image generation for social media sharing. Uses `og-image-helper.tsx` for consistent branding.

### robots.ts

Dynamic robots.txt generation with environment-aware indexing controls.

### sitemap.ts

Dynamic sitemap generation for all localized routes and content pages.

## Related Documentation

- [Root README](../README.md) - Project overview and setup
- [docs/cms.md](../docs/cms.md) - Sanity CMS integration details
- [docs/seo.md](../docs/seo.md) - SEO strategy and implementation
- [docs/rate-limiting.md](../docs/rate-limiting.md) - Rate limiting with Upstash Redis

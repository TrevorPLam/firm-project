# [locale]

Internationalized routes directory using Next.js App Router dynamic segments for English (en) and Spanish (es) locales.

## Table of Contents

- [Directory Structure](#directory-structure)
- [Routing](#routing)
- [Pages](#pages)
- [Layout](#layout)
- [Error Handling](#error-handling)
- [Internationalization](#internationalization)

## Directory Structure

```
[locale]/
├── about/          # About page
├── blog/           # Blog listing and detail pages
├── contact/        # Contact form page
├── faq/            # FAQ page
├── legal/          # Legal pages (privacy, terms)
├── portfolio/      # Portfolio and case studies
├── pricing/        # Pricing page
├── search/         # Search page
├── services/       # Services pages
├── layout.tsx      # Root layout with metadata
├── page.tsx        # Homepage
└── error.tsx       # Error boundary
```

## Routing

Uses Next.js dynamic segment `[locale]` for internationalized routing:

- **English**: `/en/*`
- **Spanish**: `/es/*`
- **Default**: English (en)

Locale detection follows next-intl configuration in `app/i18n/`.

## Pages

### Homepage (page.tsx)

Main landing page with hero section, services overview, testimonials, about highlights with stats, and contact form.

### Route Pages

- **about/**: Company information and team
- **blog/**: Blog listing and individual post pages
- **contact/**: Contact form with validation
- **faq/**: Frequently asked questions
- **legal/**: Privacy policy and terms of service
- **portfolio/**: Portfolio showcase and case studies
- **pricing/**: Pricing plans and features
- **search/**: Search functionality
- **services/**: Service offerings

## Layout

### layout.tsx

Root layout for all locale routes:

- Metadata configuration for SEO (title, description, OpenGraph, Twitter cards)
- Viewport configuration with theme color support
- Font configuration (Geist Sans and Geist Mono)
- Global providers (NextIntlClientProvider, ErrorBoundary, Analytics, PageTransition)
- Navigation and Footer components
- Skip-to-content accessibility link
- HTML structure with proper lang attribute
- Structured data integration (JSON-LD for organization, FAQ, and breadcrumbs)

## Error Handling

### error.tsx

Error boundary for locale routes:

- Catches runtime errors
- Displays user-friendly error message
- Provides "Try Again" button to reset error state
- Provides navigation back to homepage (via root path, redirected by middleware to appropriate locale)

## Internationalization

All pages use next-intl for translations:

- **Translation keys**: Defined in `messages/` directory at project root
- **Locale context**: Automatically injected via layout
- **URL structure**: Locale-prefixed routes
- **Alternate links**: SEO-friendly language alternates

## Related Documentation

- [app/README.md](../README.md) - App directory overview
- [app/i18n/README.md](../i18n/README.md) - Internationalization configuration
- [docs/seo.md](../../docs/seo.md) - SEO strategy and implementation

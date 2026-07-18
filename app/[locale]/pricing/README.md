# Pricing Page

Pricing and packages page.

## Purpose

Displays transparent pricing information for services to help potential clients understand costs and make informed decisions.

## Route

- **Path**: `/pricing` (localized: `/en/pricing`, `/es/pricing`)
- **Type**: Server component with static rendering

## Files

- `page.tsx` - Server component that generates SEO metadata (title, description, keywords, OpenGraph) with locale alternates, validates the locale, and renders `PricingContent`
- `opengraph-image.tsx` - Dynamically generates a 1200x630 OpenGraph image with the Elevate Digital branding and pricing tagline

## Content

Uses the `PricingContent` client component from `app/components/pricing-content.tsx` which displays:
- Three service packages (Starter, Growth, Enterprise) with monthly/yearly pricing tiers and a billing toggle that persists preference to localStorage
- Feature lists with included and excluded items per package
- Add-on services section (Content Marketing, Advanced SEO, Analytics & Reporting, Website Maintenance)
- FAQ section with common pricing questions
- Call-to-action for consultation
- JSON-LD breadcrumb structured data

## Features

- Internationalization support via next-intl
- SEO metadata with locale alternates generated from `app/lib/seo-alternates.ts`
- Dynamic OpenGraph image generation
- Responsive pricing tables (3-column grid on desktop)
- Monthly/yearly billing toggle with localStorage persistence
- Package comparison with included/excluded feature lists
- Scroll reveal animations via `ScrollReveal` component
- JSON-LD breadcrumb structured data

## Notes

Pricing content is extracted to a shared client component for reusability and easier maintenance. The page component handles metadata and locale validation, while the client component handles interactive billing toggle state.

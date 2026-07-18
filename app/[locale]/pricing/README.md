# Pricing Page

Pricing and packages page.

## Purpose

Displays transparent pricing information for services to help potential clients understand costs and make informed decisions.

## Route

- **Path**: `/pricing` (localized: `/en/pricing`, `/es/pricing`)
- **Type**: Server component with static rendering

## Content

Uses the `PricingContent` component from `app/components/pricing-content.tsx` which displays:
- Service packages with pricing tiers
- Feature comparisons
- Call-to-action for consultation

## Features

- Internationalization support
- SEO metadata with locale alternates
- Responsive pricing tables
- Package comparison

## Notes

Pricing content is extracted to a shared component for reusability and easier maintenance.

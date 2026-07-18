# Portfolio Detail Page

Individual case study page.

## Purpose

Displays detailed case study information including challenge, solution, results, testimonials, and project timeline.

## Route

- **Path**: `/portfolio/[slug]` (localized: `/en/portfolio/[slug]`, `/es/portfolio/[slug]`)
- **Type**: Server component with static rendering

## Content Sections

- **Hero** - Case study title, client, category, and timeline
- **Results** - Quantitative outcomes and metrics
- **Overview** - Project summary and objectives
- **Challenge** - Problem statement and requirements
- **Solution** - Implementation approach and technologies
- **Technologies** - Tools and frameworks used
- **Testimonial** - Client quote and information
- **Tags (Services)** - Service tags associated with the case study
- **CTA** - Contact call-to-action

## Data Source

Uses the portfolio content port adapter:
```typescript
const portfolioAdapter = createLocalPortfolioAdapter();
const caseStudy = await portfolioAdapter.getBySlug(params.slug);
```

## Features

- Breadcrumb structured data (schema.org)
- OpenGraph image generation
- Internationalization support
- SEO metadata with locale alternates
- Loading state for async data
- 404 handling for non-existent case studies

## Notes

Returns 404 for invalid slugs. Uses the content port pattern for CMS abstraction.

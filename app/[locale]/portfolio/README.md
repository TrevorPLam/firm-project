# Portfolio Page

Portfolio and case studies listing page.

## Purpose

Showcases successful projects and case studies to demonstrate expertise and build trust with potential clients.

## Route

- **Path**: `/portfolio` (localized: `/en/portfolio`, `/es/portfolio`)
- **Type**: Server component with static rendering

## Content Sections

- **Hero** - Page title and introduction
- **Case Studies Grid** - Card-based layout of case studies with category, title, client, description, results, and tags
- **Our Approach** - Four-step process (Discovery, Strategy, Execution, Results)
- **CTA** - Contact call-to-action

## Data Source

Uses the portfolio content port adapter:
```typescript
const portfolioAdapter = createLocalPortfolioAdapter();
const caseStudies = await portfolioAdapter.getAllSummaries();
```

## Case Study Card Fields

- Category badge
- Title
- Client name
- Description
- Key results (bullet points)
- Tags (category and topic labels)
- Hover effects and transitions

## Features

- Breadcrumb structured data (schema.org)
- Scroll reveal animations
- Internationalization support
- SEO metadata with locale alternates
- Result metrics display

## Notes

Case studies are fetched through the content port abstraction layer, enabling future CMS migration without code changes.

# Blog Page

Blog listing and content hub page.

## Purpose

Displays blog posts with topic clusters, newsletter subscription, and navigation to individual blog posts.

## Route

- **Path**: `/blog` (localized: `/en/blog`, `/es/blog`)
- **Type**: Server component with static rendering

## Content Sections

- **Hero** - Page title and description
- **Blog Posts Grid** - Card-based layout of blog posts with category, title, excerpt, date, and read time
- **Topic Clusters** - Categorized topic navigation (Web Design, SEO, Analytics, Digital Marketing, Content Strategy)
- **Newsletter** - Email subscription form

## Data Source

Uses the blog content port adapter:
```typescript
const blogPort = createLocalBlogAdapter();
const posts = await blogPort.getAllSummaries();
```

## Features

- Breadcrumb structured data (schema.org)
- Scroll reveal animations
- Internationalization support
- SEO metadata with locale alternates
- Topic cluster navigation
- Newsletter integration

## Blog Post Card Fields

- Category badge
- Title (linked to detail page)
- Excerpt
- Date and read time
- Hover effects and transitions

## Notes

Blog posts are fetched through the content port abstraction layer, enabling future CMS migration without code changes.

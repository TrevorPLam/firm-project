# Blog Detail Page

Individual blog post page.

## Purpose

Displays full blog post content with author information, tags, and related content.

## Route

- **Path**: `/blog/[slug]` (localized: `/en/blog/[slug]`, `/es/blog/[slug]`)
- **Type**: Server component with static rendering

## Content Sections

- **Hero** - Post title, category, date, read time, author, social share buttons
- **Content** - Full blog post content rendered via SanitizedContent
- **Tags** - Post tags display
- **Author Bio** - Author information and image
- **Related Posts** - Related blog posts filtered by category
- **Newsletter** - Email subscription form

## Data Source

Uses the blog content port adapter:
```typescript
const { slug, locale } = await params;
const blogPort = createLocalBlogAdapter();
const post = await blogPort.getBySlug(slug);
```

## Features

- Breadcrumb structured data (schema.org)
- OpenGraph image generation
- Internationalization support
- SEO metadata with canonical URL
- Static param generation via `generateStaticParams`
- ScrollReveal animations for content sections
- Social sharing via SocialShare component
- 404 handling for non-existent posts

## Notes

Returns 404 for invalid slugs. Uses the content port pattern for CMS abstraction.

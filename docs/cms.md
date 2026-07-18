# Sanity CMS Integration Guide

This document covers the Sanity CMS integration for the Elevate Digital marketing site.

## Overview

Sanity CMS provides a headless content management system that enables non-technical content editors to manage blog posts, portfolio case studies, and other content without editing code. The integration uses the official `next-sanity` package for seamless Next.js App Router support.

## Why Sanity?

- **Next.js Native**: Official `next-sanity` package with App Router support
- **Real-time Updates**: Live Content API for automatic cache revalidation
- **Visual Editing**: Click-to-edit overlays for draft content
- **TypeScript Support**: Schema-as-code approach with auto-generated types
- **Developer Experience**: GROQ query language with excellent DX
- **Cost-Effective**: Generous free tier, better pricing than Contentful

## Architecture

### Content Port Pattern

Blog and portfolio content are accessed through a content port interface (`BlogContentPort`) with a local adapter implementation. This creates a clean seam for future CMS integration:

- **Port Interface** (`app/lib/content-port.ts`): Defines the contract for content access (async methods for summaries, details, and slugs)
- **Local Adapter** (`app/lib/content/local-blog-adapter.ts`): Implements the port using existing local data modules (`blog-data.ts`)
- **Future Sanity Adapter**: Will implement the same port interface using `cms-client.ts` for CMS-backed content

Blog pages will consume the port interface, making the switch from local to CMS content a simple adapter swap without page-level changes. The Sanity Studio remains standalone as documented below.

### Standalone Studio (Recommended)

The Sanity Studio runs as a separate application at `http://localhost:3333` during development, deployed independently from the Next.js frontend. This approach offers:

- **Faster builds**: Studio builds with Vite (10-30x faster than Next.js compilation)
- **Auto-updates**: Studio receives bugfixes automatically without redeploy
- **TypeGen watch mode**: Types regenerate automatically as queries change
- **Content model independence**: Keeps content model from becoming website-centric

### Client Configuration

Two clients are configured:

1. **Main Client** (`client`): For published content, uses CDN for performance
2. **Preview Client** (`previewClient`): For draft content, bypasses CDN with API token

## Next.js Image Configuration

The Next.js Image component is configured to optimize images from Sanity's CDN. The `remotePatterns` in `next.config.ts` explicitly allow `cdn.sanity.io` for image optimization while maintaining SSRF security.

### Configuration

The current configuration in `next.config.ts`:

```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
    },
  ],
  localPatterns: [],
}
```

This configuration:

- Allows Next.js to optimize images from Sanity's CDN
- Uses AVIF and WebP formats for modern browsers
- Maintains SSRF protection by only allowing explicit hostnames
- Blocks local file optimization by default

### Using Images with Next.js Image Component

When using Sanity images with the Next.js Image component:

```typescript
import Image from 'next/image';
import { urlFor } from '@/app/lib/cms-client';

<Image
  src={urlFor(post.mainImage).width(800).height(600).url()}
  alt={post.mainImage.alt || ''}
  width={800}
  height={600}
/>
```

The `@sanity/image-url` package provides the `urlFor` helper to build optimized image URLs with transformations.

### Security Note

The `remotePatterns` configuration is security-critical. Only explicit hostnames are allowed to prevent SSRF attacks. Any new image CDN must be added via a dedicated task with security review. See `docs/security.md` for the full policy.

## Setup

### 1. Create Sanity Project

```bash
npx sanity@latest init
```

This will:

- Create a new Sanity project (or link to existing)
- Scaffold configuration files
- Set up the Sanity Studio

### 2. Configure Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_api_read_token
SANITY_API_WRITE_TOKEN=your_api_write_token
```

Get credentials from [Sanity Manage](https://www.sanity.io/manage).

### 3. Configure CORS Origins

Add your Next.js app URL to Sanity CORS origins:

```bash
npx sanity cors add http://localhost:3000 --credentials
```

Repeat for your production URL.

## Content Types

### Blog Post

```typescript
interface SanityBlogPost {
  _type: "blogPost";
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: SanityBlogAuthor;
  content: PortableText;
  tags: string[];
  publishedAt?: string;
}
```

### Case Study

```typescript
interface SanityCaseStudy {
  _type: "caseStudy";
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  client: string;
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  results: SanityCaseStudyResult[];
  testimonial: SanityCaseStudyTestimonial;
  tags: string[];
  timeline: string;
  technologies: string[];
  publishedAt?: string;
}
```

### Page

```typescript
interface SanityPage {
  _type: "page";
  _id: string;
  title: string;
  slug: { current: string };
  content: PortableText;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
}
```

### Service

```typescript
interface SanityService {
  _type: "service";
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  benefits: string[];
  category: string;
  publishedAt?: string;
}
```

## Querying Content

### Using the CMS Client

```typescript
import { getAllBlogPosts, getBlogPostBySlug } from "@/app/lib/cms-client";

// Get all blog posts
const posts = await getAllBlogPosts();

// Get single blog post
const post = await getBlogPostBySlug("web-design-trends-2025");
```

### GROQ Queries

GROQ (Graph-Relational Object Queries) is Sanity's query language:

```typescript
// Get all published blog posts
const query = `
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category
  }
`;
```

## Content Migration

### Migration Script

A migration script is provided at `scripts/migrate-content.ts` to migrate existing content from TypeScript files to Sanity:

```bash
# Install tsx for running TypeScript scripts
pnpm add -D tsx

# Run migration
npx tsx scripts/migrate-content.ts
```

The script:

- Reads existing blog posts from `app/lib/blog-data.ts`
- Reads existing case studies from `app/lib/portfolio-data.ts`
- Transforms to Sanity document format
- Uploads to Sanity CMS
- Reports success/failure statistics

### Manual Migration

For manual content entry:

1. Open Sanity Studio at `http://localhost:3333`
2. Navigate to the content type (Blog Post, Case Study, etc.)
3. Click "New document"
4. Fill in the fields
5. Click "Publish"

## Live Content API

The Live Content API (`defineLive`) provides real-time content updates and automatic cache revalidation. This is the recommended approach for most Next.js applications.

### Setup

```typescript
import { defineLive } from "next-sanity";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: "2026-02-01" }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
});
```

### Rendering

Add `<SanityLive />` to your root layout to enable real-time updates:

```typescript
// app/layout.tsx
import { SanityLive } from '@/app/lib/cms-client';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
```

## Visual Editing

Visual editing enables click-to-edit overlays for draft content in the Presentation Tool.

### Enable Draft Mode

```typescript
import { defineEnableDraftMode } from "next-sanity";

export const { enableDraftMode } = defineEnableDraftMode({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
});
```

### Preview Route

Create a preview route at `app/api/draft/route.ts`:

```typescript
import { enableDraftMode } from "@/app/lib/cms-client";

export async function GET(request: Request) {
  return await enableDraftMode(request);
}
```

## Caching Strategies

### Live Content API (Default)

Use `defineLive` by default. It handles fetching, caching, and invalidation automatically.

### Manual Caching

For fine-grained control:

| Scenario                                 | Approach                        |
| ---------------------------------------- | ------------------------------- |
| Real-time updates, Visual Editing        | `defineLive` (default)          |
| Static marketing pages, rarely updated   | Time-based revalidation         |
| Blog posts, products with frequent edits | Tag-based revalidation          |
| Critical accuracy (stock levels, prices) | Path-based + short revalidation |

### CDN vs API

| Setting         | Speed  | Freshness            | Use When                         |
| --------------- | ------ | -------------------- | -------------------------------- |
| `useCdn: true`  | Fast   | May have brief delay | Default for all runtime fetches  |
| `useCdn: false` | Slower | Guaranteed fresh     | `generateStaticParams`, webhooks |

## Webhooks

Webhooks trigger cache invalidation when content changes.

### Setup

1. In Sanity Studio, go to Settings > API > Webhooks
2. Create a new webhook pointing to `https://yoursite.com/api/revalidate`
3. Add a secret header for security
4. Set filter to specific document types (e.g., `_type == "blogPost"`)

### Webhook Handler

Create a route handler at `app/api/revalidate/route.ts`:

```typescript
import { parseBody } from "next-sanity";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const { body, isValidSignature } = await parseBody(
    request,
    process.env.SANITY_WEBHOOK_SECRET,
  );

  if (!isValidSignature) {
    return new Response("Invalid signature", { status: 401 });
  }

  const slug = body.slug.current;
  revalidatePath(`/blog/${slug}`);

  return new Response("Revalidated", { status: 200 });
}
```

## Editor Guide

### Accessing the Studio

- **Development**: `http://localhost:3333`
- **Production**: Deployed Sanity Studio URL

### Creating Content

1. Log in to Sanity Studio
2. Click "New" in the desired content type
3. Fill in required fields (marked with *)
4. Click "Save draft" to save without publishing
5. Click "Publish" to make content live

### Editing Content

1. Navigate to the document
2. Make changes
3. Click "Publish" to update live content

### Managing Drafts

- Drafts are visible only in preview mode
- Use the Presentation Tool to preview drafts
- Enable draft mode via `/api/draft` route

## Troubleshooting

### Content Not Appearing

1. Check that content is published (not just draft)
2. Verify CDN propagation (may take up to 60 seconds)
3. Check query filters (e.g., `defined(slug.current)`)
4. Verify environment variables are set correctly

### Type Errors

1. Run `sanity typegen generate` to regenerate types
2. Ensure schema matches TypeScript interfaces
3. Check for missing or incorrect field types

### Build Failures

1. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
2. Check that dataset name matches configuration
3. Ensure API token has correct permissions

### Migration Script Fails

1. Verify `SANITY_API_WRITE_TOKEN` has write permissions
2. Check that Sanity project exists and is accessible
3. Ensure content types are configured in Sanity Studio

## Best Practices

- **Use CDN** for all production reads for performance
- **Implement webhooks** for instant cache invalidation
- **Type safety**: Keep TypeScript interfaces in sync with Sanity schemas
- **GROQ queries**: Keep queries co-located with data-fetching functions
- **Error handling**: Always handle CMS fetch errors gracefully
- **Fallback content**: Provide fallback content when CMS is unavailable
- **Preview mode**: Test draft content before publishing
- **Content modeling**: Keep content model simple and focused

## Next Steps

1. **Configure content types in Sanity Studio** (HUMAN task P2-001-05)
2. **Run migration script** to migrate existing content
3. **Update pages to use CMS** (HUMAN task P2-001-07)
4. **Set up webhooks** for cache invalidation
5. **Enable visual editing** for content editors
6. **Train content editors** on using the Studio (HUMAN task P2-001-09)

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Integration Guide](https://www.sanity.io/docs/nextjs/introduction)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Live Content API](https://www.sanity.io/docs/live-content)
- [Visual Editing](https://www.sanity.io/docs/visual-editing)

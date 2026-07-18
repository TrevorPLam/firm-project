// Search data module - single source of truth for search content
// DDD: Search is a bounded context; combines content from multiple domains
// Deep module: exports typed functions, internal data is private

// SYNC/ASYNC BOUNDARY NOTE:
// This module now uses content ports which are async-first interfaces.
// When CMS sources are introduced (cms-client), they will be async and require await.
// This module is designed to handle both sync and async sources uniformly.
// Future adapters should implement async-first interfaces to support network backends.

import { createLocalBlogAdapter } from "./content/local-blog-adapter";
import { createLocalPortfolioAdapter } from "./content/local-portfolio-adapter";
import type { BlogContentPort, PortfolioContentPort } from "./content-port";
import { routing } from "../i18n/routing";

export interface SearchHit {
  objectID: string;
  type: "blog" | "portfolio" | "page";
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  url: string;
  locale: string;
  author?: string;
  client?: string;
  date?: string;
  readTime?: string;
}

/**
 * Get all searchable content combined from blog, portfolio, and pages
 *
 * Async-ready design: All source calls are awaited to support both sync local sources
 * and async CMS sources (e.g., Sanity via cms-client). When CMS sources are added,
 * they will be awaited alongside current sync sources without breaking the contract.
 *
 * @param locale - The locale code (e.g., 'en', 'es') for URL prefixing
 */
export async function getAllSearchableContent(
  locale: string,
): Promise<SearchHit[]> {
  // Validate locale against configured locales
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    throw new Error(
      `Invalid locale: ${locale}. Must be one of: ${routing.locales.join(", ")}`,
    );
  }
  const searchHits: SearchHit[] = [];

  // Create content port adapters
  const blogPort: BlogContentPort = createLocalBlogAdapter();
  const portfolioPort: PortfolioContentPort = createLocalPortfolioAdapter();

  // Add blog posts (await for async-ready design)
  const blogPosts = await blogPort.getAllSummaries();
  for (const post of blogPosts) {
    searchHits.push({
      objectID: `blog-${post.id}`,
      type: "blog",
      title: post.title,
      description: post.excerpt,
      category: post.category,
      tags: [], // Tags not available in summary view
      url: `/${locale}/blog/${post.slug}`,
      locale,
      author: "", // Author not available in summary view
      date: post.date,
      readTime: post.readTime,
    });
  }

  // Add portfolio case studies (await for async-ready design)
  const caseStudies = await portfolioPort.getAllSummaries();
  for (const study of caseStudies) {
    searchHits.push({
      objectID: `portfolio-${study.id}`,
      type: "portfolio",
      title: study.title,
      description: study.description,
      category: study.category,
      tags: study.tags,
      url: `/${locale}/portfolio/${study.slug}`,
      locale,
      client: study.client,
    });
  }

  // Add static pages
  const staticPages: SearchHit[] = [
    {
      objectID: "page-services",
      type: "page",
      title: "Services",
      description:
        "Digital marketing services including SEO, web design, analytics, and content strategy to help your business grow.",
      category: "Services",
      url: `/${locale}/services`,
      locale,
    },
    {
      objectID: "page-about",
      type: "page",
      title: "About",
      description:
        "Learn about Elevate Digital, our team, and our mission to help businesses succeed in the digital landscape.",
      category: "About",
      url: `/${locale}/about`,
      locale,
    },
    {
      objectID: "page-pricing",
      type: "page",
      title: "Pricing",
      description:
        "Transparent pricing for our digital marketing services with flexible packages to fit your budget.",
      category: "Pricing",
      url: `/${locale}/pricing`,
      locale,
    },
    {
      objectID: "page-contact",
      type: "page",
      title: "Contact",
      description:
        "Get in touch with Elevate Digital to discuss your digital marketing needs and how we can help your business grow.",
      category: "Contact",
      url: `/${locale}/contact`,
      locale,
    },
  ];

  searchHits.push(...staticPages);

  return searchHits;
}

/**
 * Transform search hits for Algolia indexing
 */
export function transformForAlgolia(
  searchHits: SearchHit[],
): Record<string, string | string[]>[] {
  return searchHits.map((hit) => ({
    objectID: hit.objectID,
    type: hit.type,
    title: hit.title,
    description: hit.description,
    category: hit.category || "",
    tags: hit.tags || [],
    url: hit.url,
    author: hit.author || "",
    client: hit.client || "",
    date: hit.date || "",
    readTime: hit.readTime || "",
  }));
}

/**
 * Get search data by type filter
 * Async-ready: awaits getAllSearchableContent to support async sources
 *
 * @param locale - The locale code (e.g., 'en', 'es') for URL prefixing
 * @param type - The content type to filter by
 */
export async function getSearchByType(
  locale: string,
  type: "blog" | "portfolio" | "page",
): Promise<SearchHit[]> {
  const allHits = await getAllSearchableContent(locale);
  return allHits.filter((hit) => hit.type === type);
}

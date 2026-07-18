// Sanity CMS client module
// DDD: CMS client is a bounded context; defined once in domain module
// Deep module: exports typed functions, internal configuration is private

import { createClient } from "next-sanity";
import type { SanityClient } from "next-sanity";
import {
  SanityBlogPostSchema,
  SanityBlogPostSummarySchema,
  SanityCaseStudySchema,
  SanityCaseStudySummarySchema,
  SanityPageSchema,
  SanityServiceSchema,
} from "./content-types";

// ============================================
// Client Configuration
// ============================================

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01" as const,
  useCdn: true,
};

// ============================================
// Main Client (Published Content)
// ============================================

export const client: SanityClient = createClient(config);

// ============================================
// Preview Client (Draft Content)
// ============================================

const previewConfig = process.env.SANITY_API_READ_TOKEN
  ? {
      ...config,
      useCdn: false as const,
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: "previewDrafts" as const,
    }
  : config;

export const previewClient = createClient(previewConfig);

// ============================================
// Client Selector
// ============================================

export function getClient(preview?: boolean): SanityClient {
  return preview ? previewClient : client;
}

// ============================================
// Query Helpers
// ============================================

/**
 * Fetch all blog posts (summary view)
 */
export async function getAllBlogPosts(preview?: boolean) {
  const query = `
    *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      category,
      date,
      readTime,
      publishedAt
    }
  `;
  const data = await getClient(preview).fetch(query);
  try {
    return SanityBlogPostSummarySchema.array().parse(data);
  } catch (error) {
    handleCMSError(error, "getAllBlogPosts");
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string, preview?: boolean) {
  const query = `
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      excerpt,
      category,
      date,
      readTime,
      author,
      content,
      tags,
      publishedAt
    }
  `;
  const data = await getClient(preview).fetch(query, { slug });
  try {
    return SanityBlogPostSchema.parse(data);
  } catch (error) {
    handleCMSError(error, "getBlogPostBySlug");
  }
}

/**
 * Fetch all blog post slugs (for generateStaticParams)
 */
export async function getAllBlogPostSlugs(): Promise<string[]> {
  const query = `
    *[_type == "blogPost" && defined(slug.current)].slug.current
  `;
  return client.fetch(query);
}

/**
 * Fetch all case studies (summary view)
 */
export async function getAllCaseStudies(preview?: boolean) {
  const query = `
    *[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      category,
      client,
      description,
      results,
      tags
    }
  `;
  const data = await getClient(preview).fetch(query);
  try {
    return SanityCaseStudySummarySchema.array().parse(data);
  } catch (error) {
    handleCMSError(error, "getAllCaseStudies");
  }
}

/**
 * Fetch a single case study by slug
 */
export async function getCaseStudyBySlug(slug: string, preview?: boolean) {
  const query = `
    *[_type == "caseStudy" && slug.current == $slug][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      category,
      client,
      clientLogo,
      description,
      overview,
      challenge,
      solution,
      results,
      testimonial,
      tags,
      timeline,
      technologies,
      publishedAt
    }
  `;
  const data = await getClient(preview).fetch(query, { slug });
  try {
    return SanityCaseStudySchema.parse(data);
  } catch (error) {
    handleCMSError(error, "getCaseStudyBySlug");
  }
}

/**
 * Fetch all case study slugs (for generateStaticParams)
 */
export async function getAllCaseStudySlugs(): Promise<string[]> {
  const query = `
    *[_type == "caseStudy" && defined(slug.current)].slug.current
  `;
  return client.fetch(query);
}

/**
 * Fetch a page by slug
 */
export async function getPageBySlug(slug: string, preview?: boolean) {
  const query = `
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      content,
      seoTitle,
      seoDescription,
      publishedAt
    }
  `;
  const data = await getClient(preview).fetch(query, { slug });
  try {
    return SanityPageSchema.parse(data);
  } catch (error) {
    handleCMSError(error, "getPageBySlug");
  }
}

/**
 * Fetch all services
 */
export async function getAllServices(preview?: boolean) {
  const query = `
    *[_type == "service" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      name,
      slug,
      description,
      benefits,
      category,
      publishedAt
    }
  `;
  const data = await getClient(preview).fetch(query);
  try {
    return SanityServiceSchema.array().parse(data);
  } catch (error) {
    handleCMSError(error, "getAllServices");
  }
}

/**
 * Fetch a service by slug
 */
export async function getServiceBySlug(slug: string, preview?: boolean) {
  const query = `
    *[_type == "service" && slug.current == $slug][0] {
      _id,
      _createdAt,
      _updatedAt,
      name,
      slug,
      description,
      benefits,
      category,
      publishedAt
    }
  `;
  const data = await getClient(preview).fetch(query, { slug });
  try {
    return SanityServiceSchema.parse(data);
  } catch (error) {
    handleCMSError(error, "getServiceBySlug");
  }
}

// ============================================
// Error Handling
// ============================================

export function handleCMSError(error: unknown, context: string): never {
  console.error(`CMS Error (${context}):`, error);
  throw new Error(`Failed to fetch content from CMS: ${context}`);
}

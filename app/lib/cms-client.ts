// Sanity CMS client module
// DDD: CMS client is a bounded context; defined once in domain module
// Deep module: exports typed functions, internal configuration is private

import { createClient } from 'next-sanity';
import type { SanityClient } from 'next-sanity';

// ============================================
// Client Configuration
// ============================================

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-01' as const,
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
      perspective: 'previewDrafts' as const,
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
export async function getAllBlogPosts(preview?: boolean): Promise<unknown[]> {
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
  return getClient(preview).fetch(query);
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string, preview?: boolean): Promise<unknown> {
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
  return getClient(preview).fetch(query, { slug });
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
export async function getAllCaseStudies(preview?: boolean): Promise<unknown[]> {
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
  return getClient(preview).fetch(query);
}

/**
 * Fetch a single case study by slug
 */
export async function getCaseStudyBySlug(slug: string, preview?: boolean): Promise<unknown> {
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
  return getClient(preview).fetch(query, { slug });
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
export async function getPageBySlug(slug: string, preview?: boolean): Promise<unknown> {
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
  return getClient(preview).fetch(query, { slug });
}

/**
 * Fetch all services
 */
export async function getAllServices(preview?: boolean): Promise<unknown[]> {
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
  return getClient(preview).fetch(query);
}

/**
 * Fetch a service by slug
 */
export async function getServiceBySlug(slug: string, preview?: boolean): Promise<unknown> {
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
  return getClient(preview).fetch(query, { slug });
}

// ============================================
// Error Handling
// ============================================

export function handleCMSError(error: unknown, context: string): never {
  console.error(`CMS Error (${context}):`, error);
  throw new Error(`Failed to fetch content from CMS: ${context}`);
}

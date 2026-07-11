// Content type definitions for Sanity CMS
// DDD: Content types are bounded contexts; defined once in domain module
// Deep module: exports typed interfaces, internal logic is private

import * as z from 'zod';

// ============================================
// Blog Content Types
// ============================================

export interface SanityBlogAuthor {
  _type: 'blogAuthor';
  name: string;
  role: string;
  image?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
}

export interface SanityBlogPost {
  _type: 'blogPost';
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
    _type: 'slug';
  };
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: SanityBlogAuthor;
  content: Record<string, unknown>; // Portable Text
  tags: string[];
  publishedAt?: string;
}

export interface SanityBlogPostSummary {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  publishedAt?: string;
}

// ============================================
// Portfolio Content Types
// ============================================

export interface SanityCaseStudyResult {
  metric: string;
  label: string;
}

export interface SanityCaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface SanityCaseStudy {
  _type: 'caseStudy';
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
    _type: 'slug';
  };
  category: string;
  client: string;
  clientLogo?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
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

export interface SanityCaseStudySummary {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category: string;
  client: string;
  description: string;
  results: SanityCaseStudyResult[];
  tags: string[];
}

// ============================================
// Page Content Types
// ============================================

export interface SanityPage {
  _type: 'page';
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
    _type: 'slug';
  };
  content: Record<string, unknown>; // Portable Text
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
}

// ============================================
// Service Content Types
// ============================================

export interface SanityService {
  _type: 'service';
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: {
    current: string;
    _type: 'slug';
  };
  description: string;
  benefits: string[];
  category: string;
  publishedAt?: string;
}

// ============================================
// Zod Schemas for Runtime Validation
// ============================================

export const SanityBlogAuthorSchema = z.object({
  _type: z.literal('blogAuthor'),
  name: z.string().trim(),
  role: z.string().trim(),
  image: z.object({
    asset: z.object({
      _ref: z.string().trim(),
      _type: z.literal('reference'),
    }),
  }).optional(),
});

export const SanityBlogPostSchema = z.object({
  _type: z.literal('blogPost'),
  _id: z.string().trim(),
  _createdAt: z.string().trim(),
  _updatedAt: z.string().trim(),
  title: z.string().trim(),
  slug: z.object({
    current: z.string().trim(),
    _type: z.literal('slug'),
  }),
  excerpt: z.string().trim(),
  category: z.string().trim(),
  date: z.string().trim(),
  readTime: z.string().trim(),
  author: SanityBlogAuthorSchema,
  content: z.record(z.string(), z.unknown()), // Portable Text
  tags: z.array(z.string().trim()),
  publishedAt: z.string().trim().optional(),
});

export const SanityBlogPostSummarySchema = z.object({
  _id: z.string().trim(),
  title: z.string().trim(),
  slug: z.object({
    current: z.string().trim(),
  }),
  excerpt: z.string().trim(),
  category: z.string().trim(),
  date: z.string().trim(),
  readTime: z.string().trim(),
  publishedAt: z.string().trim().optional(),
});

export const SanityCaseStudyResultSchema = z.object({
  metric: z.string().trim(),
  label: z.string().trim(),
});

export const SanityCaseStudyTestimonialSchema = z.object({
  quote: z.string().trim(),
  author: z.string().trim(),
  role: z.string().trim(),
});

export const SanityCaseStudySchema = z.object({
  _type: z.literal('caseStudy'),
  _id: z.string().trim(),
  _createdAt: z.string().trim(),
  _updatedAt: z.string().trim(),
  title: z.string().trim(),
  slug: z.object({
    current: z.string().trim(),
    _type: z.literal('slug'),
  }),
  category: z.string().trim(),
  client: z.string().trim(),
  clientLogo: z.object({
    asset: z.object({
      _ref: z.string().trim(),
      _type: z.literal('reference'),
    }),
  }).optional(),
  description: z.string().trim(),
  overview: z.string().trim(),
  challenge: z.string().trim(),
  solution: z.string().trim(),
  results: z.array(SanityCaseStudyResultSchema),
  testimonial: SanityCaseStudyTestimonialSchema,
  tags: z.array(z.string().trim()),
  timeline: z.string().trim(),
  technologies: z.array(z.string().trim()),
  publishedAt: z.string().trim().optional(),
});

export const SanityCaseStudySummarySchema = z.object({
  _id: z.string().trim(),
  title: z.string().trim(),
  slug: z.object({
    current: z.string().trim(),
  }),
  category: z.string().trim(),
  client: z.string().trim(),
  description: z.string().trim(),
  results: z.array(SanityCaseStudyResultSchema),
  tags: z.array(z.string().trim()),
});

export const SanityPageSchema = z.object({
  _type: z.literal('page'),
  _id: z.string().trim(),
  _createdAt: z.string().trim(),
  _updatedAt: z.string().trim(),
  title: z.string().trim(),
  slug: z.object({
    current: z.string().trim(),
    _type: z.literal('slug'),
  }),
  content: z.record(z.string(), z.unknown()), // Portable Text
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional(),
  publishedAt: z.string().trim().optional(),
});

export const SanityServiceSchema = z.object({
  _type: z.literal('service'),
  _id: z.string().trim(),
  _createdAt: z.string().trim(),
  _updatedAt: z.string().trim(),
  name: z.string().trim(),
  slug: z.object({
    current: z.string().trim(),
    _type: z.literal('slug'),
  }),
  description: z.string().trim(),
  benefits: z.array(z.string().trim()),
  category: z.string().trim(),
  publishedAt: z.string().trim().optional(),
});

// ============================================
// Type Guards
// ============================================

export function isBlogPost(doc: unknown): doc is SanityBlogPost {
  return typeof doc === 'object' && doc !== null && '_type' in doc && (doc as { _type: string })._type === 'blogPost';
}

export function isCaseStudy(doc: unknown): doc is SanityCaseStudy {
  return typeof doc === 'object' && doc !== null && '_type' in doc && (doc as { _type: string })._type === 'caseStudy';
}

export function isPage(doc: unknown): doc is SanityPage {
  return typeof doc === 'object' && doc !== null && '_type' in doc && (doc as { _type: string })._type === 'page';
}

export function isService(doc: unknown): doc is SanityService {
  return typeof doc === 'object' && doc !== null && '_type' in doc && (doc as { _type: string })._type === 'service';
}

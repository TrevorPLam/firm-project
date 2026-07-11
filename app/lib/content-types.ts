// Content type definitions for Sanity CMS
// DDD: Content types are bounded contexts; defined once in domain module
// Deep module: exports typed interfaces, internal logic is private

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

// Content port for blog and portfolio content
// DDD: Blog and portfolio bounded context port interfaces
// Deep module: small public surface, rich private implementation
// This is the seam for future Sanity adapter / package extraction

/**
 * Blog author information
 */
export interface BlogAuthor {
  name: string;
  role: string;
  image: string;
}

/**
 * Blog post summary for list views
 */
export interface BlogPostSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  topicCluster: string;
}

/**
 * Blog post detail for individual post views
 */
export interface BlogPostDetail {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: BlogAuthor;
  content: string;
  tags: string[];
}

/**
 * Blog content port interface
 * Defines the contract for blog content access
 * Async-first to support both local and CMS backends
 */
export interface BlogContentPort {
  /**
   * Get all blog post summaries (for list pages)
   */
  getAllSummaries(): Promise<BlogPostSummary[]>;

  /**
   * Get a single blog post by slug (for detail pages)
   */
  getBySlug(slug: string): Promise<BlogPostDetail | undefined>;

  /**
   * Get all available slugs (for static params generation)
   */
  getAllSlugs(): Promise<string[]>;
}

/**
 * Portfolio case study result metric
 */
export interface CaseStudyResult {
  metric: string;
  label: string;
}

/**
 * Portfolio case study testimonial
 */
export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
}

/**
 * Portfolio case study summary for list views
 */
export interface CaseStudySummary {
  id: number;
  slug: string;
  title: string;
  category: string;
  client: string;
  description: string;
  results: string[];
  tags: string[];
}

/**
 * Portfolio case study detail for individual case study views
 */
export interface CaseStudyDetail {
  id: number;
  slug: string;
  title: string;
  category: string;
  client: string;
  clientLogo: string;
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  testimonial: CaseStudyTestimonial;
  tags: string[];
  timeline: string;
  technologies: string[];
}

/**
 * Portfolio content port interface
 * Defines the contract for portfolio content access
 * Async-first to support both local and CMS backends
 */
export interface PortfolioContentPort {
  /**
   * Get all case study summaries (for list pages)
   */
  getAllSummaries(): Promise<CaseStudySummary[]>;

  /**
   * Get a single case study by slug (for detail pages)
   */
  getBySlug(slug: string): Promise<CaseStudyDetail | undefined>;

  /**
   * Get all available slugs (for static params generation)
   */
  getAllSlugs(): Promise<string[]>;
}

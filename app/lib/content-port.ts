// Content port for blog content
// DDD: Blog content bounded context port interface
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

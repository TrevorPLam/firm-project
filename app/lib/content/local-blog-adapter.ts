// Local blog adapter implementation
// DDD: Adapter implements the blog content port using local data
// Deep module: delegates to blog-data, keeps implementation private

import {
  getAllPosts,
  getPostBySlug,
  getAllSlugs,
  type BlogPost as LocalBlogPost,
  type BlogPostSummary as LocalBlogPostSummary,
  type BlogAuthor as LocalBlogAuthor,
} from '../blog-data';
import type {
  BlogContentPort,
  BlogPostSummary,
  BlogPostDetail,
  BlogAuthor,
} from '../content-port';

/**
 * Map local blog author to port author
 */
function mapAuthor(author: LocalBlogAuthor): BlogAuthor {
  return {
    name: author.name,
    role: author.role,
    image: author.image,
  };
}

/**
 * Map local blog post summary to port summary
 */
function mapSummary(summary: LocalBlogPostSummary): BlogPostSummary {
  return {
    id: summary.id,
    slug: summary.slug,
    title: summary.title,
    excerpt: summary.excerpt,
    category: summary.category,
    date: summary.date,
    readTime: summary.readTime,
    topicCluster: summary.topicCluster,
  };
}

/**
 * Map local blog post to port detail
 */
function mapDetail(post: LocalBlogPost): BlogPostDetail {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    author: mapAuthor(post.author),
    content: post.content,
    tags: post.tags,
  };
}

/**
 * Local blog adapter implements BlogContentPort
 * Delegates to existing blog-data module
 */
class LocalBlogAdapter implements BlogContentPort {
  async getAllSummaries(): Promise<BlogPostSummary[]> {
    const localSummaries = getAllPosts();
    return localSummaries.map(mapSummary);
  }

  async getBySlug(slug: string): Promise<BlogPostDetail | undefined> {
    const localPost = getPostBySlug(slug);
    return localPost ? mapDetail(localPost) : undefined;
  }

  async getAllSlugs(): Promise<string[]> {
    return getAllSlugs();
  }
}

/**
 * Factory function to create the local blog adapter
 * Returns the port interface for dependency injection
 */
export function createLocalBlogAdapter(): BlogContentPort {
  return new LocalBlogAdapter();
}

// Content port blog adapter tests
// TDD: Tests define the contract before implementation
// DDD: Blog content is a bounded context with its own port

import { describe, it, expect, beforeEach } from 'vitest';
import type { BlogContentPort } from '@/lib/content-port';
import { createLocalBlogAdapter } from '@/lib/content/local-blog-adapter';

describe('LocalBlogAdapter', () => {
  let port: BlogContentPort;

  beforeEach(() => {
    port = createLocalBlogAdapter();
  });

  describe('getAllSummaries', () => {
    it('should return all blog post summaries', async () => {
      const summaries = await port.getAllSummaries();

      expect(summaries).toBeDefined();
      expect(Array.isArray(summaries)).toBe(true);
      expect(summaries.length).toBeGreaterThan(0);
    });

    it('should return summaries with required fields', async () => {
      const summaries = await port.getAllSummaries();
      const first = summaries[0];

      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('slug');
      expect(first).toHaveProperty('title');
      expect(first).toHaveProperty('excerpt');
      expect(first).toHaveProperty('category');
      expect(first).toHaveProperty('date');
      expect(first).toHaveProperty('readTime');
      expect(first).toHaveProperty('topicCluster');
    });

    it('should return summaries consistent with blog-data', async () => {
      const summaries = await port.getAllSummaries();

      // Verify known posts exist
      const webDesignPost = summaries.find((s) => s.slug === 'web-design-trends-2025');
      expect(webDesignPost).toBeDefined();
      expect(webDesignPost?.title).toBe('10 Web Design Trends to Watch in 2025');
    });
  });

  describe('getBySlug', () => {
    it('should return a blog post detail for valid slug', async () => {
      const post = await port.getBySlug('web-design-trends-2025');

      expect(post).toBeDefined();
      expect(post?.slug).toBe('web-design-trends-2025');
      expect(post?.title).toBe('10 Web Design Trends to Watch in 2025');
    });

    it('should return undefined for non-existent slug', async () => {
      const post = await port.getBySlug('non-existent-post');

      expect(post).toBeUndefined();
    });

    it('should return post detail with all required fields', async () => {
      const post = await port.getBySlug('web-design-trends-2025');

      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('excerpt');
      expect(post).toHaveProperty('category');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('readTime');
      expect(post).toHaveProperty('author');
      expect(post).toHaveProperty('content');
      expect(post).toHaveProperty('tags');
    });

    it('should include author information', async () => {
      const post = await port.getBySlug('web-design-trends-2025');

      expect(post?.author).toHaveProperty('name');
      expect(post?.author).toHaveProperty('role');
      expect(post?.author).toHaveProperty('image');
    });
  });

  describe('getAllSlugs', () => {
    it('should return all available slugs', async () => {
      const slugs = await port.getAllSlugs();

      expect(slugs).toBeDefined();
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs.length).toBeGreaterThan(0);
    });

    it('should include known slugs', async () => {
      const slugs = await port.getAllSlugs();

      expect(slugs).toContain('web-design-trends-2025');
      expect(slugs).toContain('local-seo-guide');
      expect(slugs).toContain('core-web-vitals');
    });

    it('should return slugs that match available posts', async () => {
      const slugs = await port.getAllSlugs();
      const summaries = await port.getAllSummaries();

      const summarySlugs = summaries.map((s) => s.slug);
      expect(slugs).toEqual(expect.arrayContaining(summarySlugs));
    });
  });

  describe('Port contract', () => {
    it('should be async-first (all methods return Promise)', async () => {
      const summariesPromise = port.getAllSummaries();
      const postPromise = port.getBySlug('web-design-trends-2025');
      const slugsPromise = port.getAllSlugs();

      expect(summariesPromise).toBeInstanceOf(Promise);
      expect(postPromise).toBeInstanceOf(Promise);
      expect(slugsPromise).toBeInstanceOf(Promise);

      await Promise.all([summariesPromise, postPromise, slugsPromise]);
    });

    it('should not leak internal blog-data types', async () => {
      // The port should return DTOs, not internal blog-data types
      const summaries = await port.getAllSummaries();

      // Verify these are port DTOs, not internal types
      expect(summaries[0]).not.toHaveProperty('_internal');
      expect(summaries[0]).not.toHaveProperty('__private');
    });
  });
});

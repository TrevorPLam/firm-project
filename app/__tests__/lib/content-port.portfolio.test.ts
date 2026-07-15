// Portfolio content port tests
// TDD: Tests define the contract for portfolio content access
// DDD: Portfolio bounded context behavior validation
// BDD: Given-when-then structure for user-facing behavior

import { describe, it, expect } from 'vitest';
import { createLocalPortfolioAdapter } from '@/lib/content/local-portfolio-adapter';
import type {
  PortfolioContentPort,
  CaseStudySummary,
} from '@/lib/content-port';

describe('PortfolioContentPort - Local Adapter', () => {
  let port: PortfolioContentPort;

  beforeEach(() => {
    port = createLocalPortfolioAdapter();
  });

  describe('getAllSummaries', () => {
    it('should return all case study summaries', async () => {
      // Given: a local portfolio adapter
      // When: retrieving all summaries
      const summaries = await port.getAllSummaries();

      // Then: should return array of summaries
      expect(Array.isArray(summaries)).toBe(true);
      expect(summaries.length).toBeGreaterThan(0);
    });

    it('should return summaries with required fields', async () => {
      // Given: a local portfolio adapter
      // When: retrieving all summaries
      const summaries = await port.getAllSummaries();

      // Then: each summary should have required fields
      summaries.forEach((summary: CaseStudySummary) => {
        expect(summary).toHaveProperty('id');
        expect(summary).toHaveProperty('slug');
        expect(summary).toHaveProperty('title');
        expect(summary).toHaveProperty('category');
        expect(summary).toHaveProperty('client');
        expect(summary).toHaveProperty('description');
        expect(summary).toHaveProperty('results');
        expect(summary).toHaveProperty('tags');
        expect(typeof summary.id).toBe('number');
        expect(typeof summary.slug).toBe('string');
        expect(typeof summary.title).toBe('string');
        expect(Array.isArray(summary.results)).toBe(true);
        expect(Array.isArray(summary.tags)).toBe(true);
      });
    });

    it('should return consistent data across calls', async () => {
      // Given: a local portfolio adapter
      // When: retrieving summaries twice
      const firstCall = await port.getAllSummaries();
      const secondCall = await port.getAllSummaries();

      // Then: should return same data
      expect(firstCall.length).toBe(secondCall.length);
      if (firstCall.length > 0 && secondCall.length > 0) {
        expect(firstCall[0]!.slug).toBe(secondCall[0]!.slug);
      }
    });
  });

  describe('getBySlug', () => {
    it('should return case study detail for valid slug', async () => {
      // Given: a local portfolio adapter and a known slug
      const summaries = await port.getAllSummaries();
      expect(summaries.length).toBeGreaterThan(0);
      const knownSlug = summaries[0]!.slug;

      // When: retrieving by slug
      const detail = await port.getBySlug(knownSlug);

      // Then: should return case study detail
      expect(detail).toBeDefined();
      expect(detail?.slug).toBe(knownSlug);
    });

    it('should return undefined for invalid slug', async () => {
      // Given: a local portfolio adapter
      // When: retrieving with non-existent slug
      const detail = await port.getBySlug('non-existent-slug');

      // Then: should return undefined
      expect(detail).toBeUndefined();
    });

    it('should return detail with all required fields', async () => {
      // Given: a local portfolio adapter and a known slug
      const summaries = await port.getAllSummaries();
      expect(summaries.length).toBeGreaterThan(0);
      const knownSlug = summaries[0]!.slug;

      // When: retrieving by slug
      const detail = await port.getBySlug(knownSlug);

      // Then: detail should have all required fields
      expect(detail).toBeDefined();
      if (!detail) return;
      expect(detail).toHaveProperty('id');
      expect(detail).toHaveProperty('slug');
      expect(detail).toHaveProperty('title');
      expect(detail).toHaveProperty('category');
      expect(detail).toHaveProperty('client');
      expect(detail).toHaveProperty('clientLogo');
      expect(detail).toHaveProperty('description');
      expect(detail).toHaveProperty('overview');
      expect(detail).toHaveProperty('challenge');
      expect(detail).toHaveProperty('solution');
      expect(detail).toHaveProperty('results');
      expect(detail).toHaveProperty('testimonial');
      expect(detail).toHaveProperty('tags');
      expect(detail).toHaveProperty('timeline');
      expect(detail).toHaveProperty('technologies');
      expect(typeof detail.id).toBe('number');
      expect(typeof detail.slug).toBe('string');
      expect(Array.isArray(detail.results)).toBe(true);
      expect(Array.isArray(detail.tags)).toBe(true);
      expect(Array.isArray(detail.technologies)).toBe(true);
    });

    it('should preserve nested structure for results and testimonial', async () => {
      // Given: a local portfolio adapter and a known slug
      const summaries = await port.getAllSummaries();
      expect(summaries.length).toBeGreaterThan(0);
      const knownSlug = summaries[0]!.slug;

      // When: retrieving by slug
      const detail = await port.getBySlug(knownSlug);

      // Then: nested structures should be preserved
      expect(detail).toBeDefined();
      if (!detail) return;
      expect(detail.results).toBeDefined();
      expect(detail.results.length).toBeGreaterThan(0);
      expect(detail.results[0]).toHaveProperty('metric');
      expect(detail.results[0]).toHaveProperty('label');

      expect(detail.testimonial).toBeDefined();
      expect(detail.testimonial).toHaveProperty('quote');
      expect(detail.testimonial).toHaveProperty('author');
      expect(detail.testimonial).toHaveProperty('role');
    });
  });

  describe('getAllSlugs', () => {
    it('should return all available slugs', async () => {
      // Given: a local portfolio adapter
      // When: retrieving all slugs
      const slugs = await port.getAllSlugs();

      // Then: should return array of slugs
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs.length).toBeGreaterThan(0);
      slugs.forEach((slug) => {
        expect(typeof slug).toBe('string');
      });
    });

    it('should return slugs that match summary slugs', async () => {
      // Given: a local portfolio adapter
      // When: retrieving slugs and summaries
      const slugs = await port.getAllSlugs();
      const summaries = await port.getAllSummaries();
      const summarySlugs = summaries.map((s) => s.slug);

      // Then: slugs should match summary slugs
      expect(slugs.sort()).toEqual(summarySlugs.sort());
    });

    it('should return consistent data across calls', async () => {
      // Given: a local portfolio adapter
      // When: retrieving slugs twice
      const firstCall = await port.getAllSlugs();
      const secondCall = await port.getAllSlugs();

      // Then: should return same data
      expect(firstCall).toEqual(secondCall);
    });
  });

  describe('Integration: slug-detail consistency', () => {
    it('should return details for all slugs', async () => {
      // Given: a local portfolio adapter
      // When: retrieving all slugs and their details
      const slugs = await port.getAllSlugs();
      const details = await Promise.all(
        slugs.map((slug) => port.getBySlug(slug))
      );

      // Then: all slugs should have valid details
      details.forEach((detail) => {
        expect(detail).toBeDefined();
      });
    });

    it('should maintain summary-detail field consistency', async () => {
      // Given: a local portfolio adapter
      // When: retrieving summaries and details
      const summaries = await port.getAllSummaries();
      const details = await Promise.all(
        summaries.map((s) => port.getBySlug(s.slug))
      );

      // Then: summary and detail fields should match
      summaries.forEach((summary, index) => {
        const detail = details[index];
        expect(detail?.id).toBe(summary.id);
        expect(detail?.slug).toBe(summary.slug);
        expect(detail?.title).toBe(summary.title);
        expect(detail?.category).toBe(summary.category);
        expect(detail?.client).toBe(summary.client);
        expect(detail?.description).toBe(summary.description);
        expect(detail?.tags).toEqual(summary.tags);
      });
    });
  });
});

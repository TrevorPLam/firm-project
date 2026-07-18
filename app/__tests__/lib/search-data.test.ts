// Search data module tests
// TDD: Verify sync/async boundary, typed SearchHit contract, and adapter pattern

import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getAllSearchableContent,
  getSearchByType,
  type SearchHit,
} from "../../lib/search-data";
import type {
  BlogContentPort,
  PortfolioContentPort,
} from "../../lib/content-port";

// Mock the content port adapters
vi.mock("../../lib/content/local-blog-adapter", () => ({
  createLocalBlogAdapter: vi.fn(),
}));

vi.mock("../../lib/content/local-portfolio-adapter", () => ({
  createLocalPortfolioAdapter: vi.fn(),
}));

describe("search-data module", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllSearchableContent", () => {
    it("should return typed SearchHit array with locale", async () => {
      const { createLocalBlogAdapter } =
        await import("../../lib/content/local-blog-adapter");
      const { createLocalPortfolioAdapter } =
        await import("../../lib/content/local-portfolio-adapter");

      const mockBlogPort: BlogContentPort = {
        getAllSummaries: async () => [
          {
            id: 1,
            slug: "test-post",
            title: "Test Post",
            excerpt: "Test excerpt",
            category: "Test",
            date: "2026-01-01",
            readTime: "5 min",
            topicCluster: "test",
          },
        ],
        getBySlug: async () => undefined,
        getAllSlugs: async () => ["test-post"],
      };

      const mockPortfolioPort: PortfolioContentPort = {
        getAllSummaries: async () => [
          {
            id: 1,
            slug: "test-study",
            title: "Test Study",
            category: "Portfolio",
            client: "Test Client",
            description: "Test description",
            results: ["100% improvement"],
            tags: ["tag1"],
          },
        ],
        getBySlug: async () => undefined,
        getAllSlugs: async () => ["test-study"],
      };

      vi.mocked(createLocalBlogAdapter).mockReturnValue(mockBlogPort);
      vi.mocked(createLocalPortfolioAdapter).mockReturnValue(mockPortfolioPort);

      const hits = await getAllSearchableContent("en");

      expect(Array.isArray(hits)).toBe(true);
      expect(hits.length).toBeGreaterThan(0);

      // Verify SearchHit contract
      const firstHit = hits[0] as SearchHit;
      expect(firstHit).toHaveProperty("objectID");
      expect(firstHit).toHaveProperty("type");
      expect(firstHit).toHaveProperty("title");
      expect(firstHit).toHaveProperty("description");
      expect(firstHit).toHaveProperty("url");
      expect(firstHit).toHaveProperty("locale");
    });

    it("should include blog posts with correct type and locale prefix", async () => {
      const { createLocalBlogAdapter } =
        await import("../../lib/content/local-blog-adapter");
      const { createLocalPortfolioAdapter } =
        await import("../../lib/content/local-portfolio-adapter");

      const mockBlogPort: BlogContentPort = {
        getAllSummaries: async () => [
          {
            id: 1,
            slug: "test-post",
            title: "Test Post",
            excerpt: "Test excerpt",
            category: "Test",
            date: "2026-01-01",
            readTime: "5 min",
            topicCluster: "test",
          },
        ],
        getBySlug: async () => undefined,
        getAllSlugs: async () => ["test-post"],
      };

      const mockPortfolioPort: PortfolioContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      vi.mocked(createLocalBlogAdapter).mockReturnValue(mockBlogPort);
      vi.mocked(createLocalPortfolioAdapter).mockReturnValue(mockPortfolioPort);

      const hits = await getAllSearchableContent("en");

      const blogHit = hits.find((h) => h.type === "blog");
      expect(blogHit).toBeDefined();
      expect(blogHit?.objectID).toBe("blog-1");
      expect(blogHit?.title).toBe("Test Post");
      expect(blogHit?.url).toBe("/en/blog/test-post");
      expect(blogHit?.locale).toBe("en");
    });

    it("should include portfolio case studies with correct type and locale prefix", async () => {
      const { createLocalBlogAdapter } =
        await import("../../lib/content/local-blog-adapter");
      const { createLocalPortfolioAdapter } =
        await import("../../lib/content/local-portfolio-adapter");

      const mockBlogPort: BlogContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      const mockPortfolioPort: PortfolioContentPort = {
        getAllSummaries: async () => [
          {
            id: 1,
            slug: "test-study",
            title: "Test Study",
            category: "Portfolio",
            client: "Test Client",
            description: "Test description",
            results: ["100% improvement"],
            tags: ["tag1"],
          },
        ],
        getBySlug: async () => undefined,
        getAllSlugs: async () => ["test-study"],
      };

      vi.mocked(createLocalBlogAdapter).mockReturnValue(mockBlogPort);
      vi.mocked(createLocalPortfolioAdapter).mockReturnValue(mockPortfolioPort);

      const hits = await getAllSearchableContent("es");

      const portfolioHit = hits.find((h: SearchHit) => h.type === "portfolio");
      expect(portfolioHit).toBeDefined();
      expect(portfolioHit?.objectID).toBe("portfolio-1");
      expect(portfolioHit?.title).toBe("Test Study");
      expect(portfolioHit?.url).toBe("/es/portfolio/test-study");
      expect(portfolioHit?.locale).toBe("es");
      expect(portfolioHit?.client).toBe("Test Client");
    });

    it("should include static pages with locale prefix", async () => {
      const { createLocalBlogAdapter } =
        await import("../../lib/content/local-blog-adapter");
      const { createLocalPortfolioAdapter } =
        await import("../../lib/content/local-portfolio-adapter");

      const mockBlogPort: BlogContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      const mockPortfolioPort: PortfolioContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      vi.mocked(createLocalBlogAdapter).mockReturnValue(mockBlogPort);
      vi.mocked(createLocalPortfolioAdapter).mockReturnValue(mockPortfolioPort);

      const hits = await getAllSearchableContent("en");

      const pageHits = hits.filter((h: SearchHit) => h.type === "page");
      expect(pageHits.length).toBe(4);

      const servicesPage = pageHits.find(
        (h: SearchHit) => h.objectID === "page-services",
      );
      expect(servicesPage).toBeDefined();
      expect(servicesPage?.title).toBe("Services");
      expect(servicesPage?.url).toBe("/en/services");
      expect(servicesPage?.locale).toBe("en");
    });

    it("should handle async-ready design with async port sources", async () => {
      const { createLocalBlogAdapter } =
        await import("../../lib/content/local-blog-adapter");
      const { createLocalPortfolioAdapter } =
        await import("../../lib/content/local-portfolio-adapter");

      const mockBlogPort: BlogContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      const mockPortfolioPort: PortfolioContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      vi.mocked(createLocalBlogAdapter).mockReturnValue(mockBlogPort);
      vi.mocked(createLocalPortfolioAdapter).mockReturnValue(mockPortfolioPort);

      // Should not throw even though we use await on async port methods
      const hits = await getAllSearchableContent("en");
      expect(Array.isArray(hits)).toBe(true);
    });

    it("should throw error for invalid locale", async () => {
      const { createLocalBlogAdapter } =
        await import("../../lib/content/local-blog-adapter");
      const { createLocalPortfolioAdapter } =
        await import("../../lib/content/local-portfolio-adapter");

      const mockBlogPort: BlogContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      const mockPortfolioPort: PortfolioContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      vi.mocked(createLocalBlogAdapter).mockReturnValue(mockBlogPort);
      vi.mocked(createLocalPortfolioAdapter).mockReturnValue(mockPortfolioPort);

      await expect(getAllSearchableContent("fr")).rejects.toThrow(
        "Invalid locale: fr",
      );
    });
  });

  describe("getSearchByType", () => {
    it("should filter hits by blog type with locale", async () => {
      const { createLocalBlogAdapter } =
        await import("../../lib/content/local-blog-adapter");
      const { createLocalPortfolioAdapter } =
        await import("../../lib/content/local-portfolio-adapter");

      const mockBlogPort: BlogContentPort = {
        getAllSummaries: async () => [
          {
            id: 1,
            slug: "test-post",
            title: "Test Post",
            excerpt: "Test excerpt",
            category: "Test",
            date: "2026-01-01",
            readTime: "5 min",
            topicCluster: "test",
          },
        ],
        getBySlug: async () => undefined,
        getAllSlugs: async () => ["test-post"],
      };

      const mockPortfolioPort: PortfolioContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      vi.mocked(createLocalBlogAdapter).mockReturnValue(mockBlogPort);
      vi.mocked(createLocalPortfolioAdapter).mockReturnValue(mockPortfolioPort);

      const blogHits = await getSearchByType("en", "blog");
      expect(blogHits.length).toBe(1);
      expect(blogHits[0]?.type).toBe("blog");
      expect(blogHits[0]?.locale).toBe("en");
    });

    it("should filter hits by portfolio type with locale", async () => {
      const { createLocalBlogAdapter } =
        await import("../../lib/content/local-blog-adapter");
      const { createLocalPortfolioAdapter } =
        await import("../../lib/content/local-portfolio-adapter");

      const mockBlogPort: BlogContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      const mockPortfolioPort: PortfolioContentPort = {
        getAllSummaries: async () => [
          {
            id: 1,
            slug: "test-study",
            title: "Test Study",
            category: "Portfolio",
            client: "Test Client",
            description: "Test description",
            results: ["100% improvement"],
            tags: ["tag1"],
          },
        ],
        getBySlug: async () => undefined,
        getAllSlugs: async () => ["test-study"],
      };

      vi.mocked(createLocalBlogAdapter).mockReturnValue(mockBlogPort);
      vi.mocked(createLocalPortfolioAdapter).mockReturnValue(mockPortfolioPort);

      const portfolioHits = await getSearchByType("es", "portfolio");
      expect(portfolioHits.length).toBe(1);
      expect(portfolioHits[0]?.type).toBe("portfolio");
      expect(portfolioHits[0]?.locale).toBe("es");
    });

    it("should filter hits by page type with locale", async () => {
      const { createLocalBlogAdapter } =
        await import("../../lib/content/local-blog-adapter");
      const { createLocalPortfolioAdapter } =
        await import("../../lib/content/local-portfolio-adapter");

      const mockBlogPort: BlogContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      const mockPortfolioPort: PortfolioContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      vi.mocked(createLocalBlogAdapter).mockReturnValue(mockBlogPort);
      vi.mocked(createLocalPortfolioAdapter).mockReturnValue(mockPortfolioPort);

      const pageHits = await getSearchByType("en", "page");
      expect(pageHits.length).toBe(4);
      expect(pageHits.every((h: SearchHit) => h.type === "page")).toBe(true);
      expect(pageHits.every((h: SearchHit) => h.locale === "en")).toBe(true);
    });

    it("should return empty array for type with no matches", async () => {
      const { createLocalBlogAdapter } =
        await import("../../lib/content/local-blog-adapter");
      const { createLocalPortfolioAdapter } =
        await import("../../lib/content/local-portfolio-adapter");

      const mockBlogPort: BlogContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      const mockPortfolioPort: PortfolioContentPort = {
        getAllSummaries: async () => [],
        getBySlug: async () => undefined,
        getAllSlugs: async () => [],
      };

      vi.mocked(createLocalBlogAdapter).mockReturnValue(mockBlogPort);
      vi.mocked(createLocalPortfolioAdapter).mockReturnValue(mockPortfolioPort);

      const blogHits = await getSearchByType("en", "blog");
      expect(blogHits.length).toBe(0);
    });
  });

  describe("SearchHit type contract", () => {
    it("should export SearchHit type with locale for consumers", () => {
      // Verify the type is exported and can be used
      const hit: SearchHit = {
        objectID: "test-1",
        type: "blog",
        title: "Test",
        description: "Test description",
        url: "/test",
        locale: "en",
      };
      expect(hit.objectID).toBe("test-1");
      expect(hit.locale).toBe("en");
    });
  });
});

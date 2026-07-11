import { describe, it, expect, beforeEach, vi } from "vitest";

describe("rate-limiter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear environment variables to ensure clean state
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  describe("graceful degradation", () => {
    it("should return true when Redis is not configured", async () => {
      // Ensure Redis is not configured
      delete process.env.UPSTASH_REDIS_REST_URL;
      delete process.env.UPSTASH_REDIS_REST_TOKEN;

      const { checkRateLimit } = await import("@/lib/rate-limiter");
      const result = await checkRateLimit("test-key", 10, 60000);
      expect(result).toBe(true);
    });

    it("should return success metadata when Redis is not configured", async () => {
      delete process.env.UPSTASH_REDIS_REST_URL;
      delete process.env.UPSTASH_REDIS_REST_TOKEN;

      const { checkRateLimitWithMetadata } = await import("@/lib/rate-limiter");
      const result = await checkRateLimitWithMetadata("test-key", 10, 60000);
      expect(result.success).toBe(true);
      expect(result.limit).toBe(10);
      expect(result.remaining).toBe(10);
    });

    it("should return 0 count when Redis is not configured", async () => {
      delete process.env.UPSTASH_REDIS_REST_URL;
      delete process.env.UPSTASH_REDIS_REST_TOKEN;

      const { getRateLimitCount } = await import("@/lib/rate-limiter");
      const count = await getRateLimitCount("test-key");
      expect(count).toBe(0);
    });

    it("should clear rate limits without error when Redis is not configured", async () => {
      delete process.env.UPSTASH_REDIS_REST_URL;
      delete process.env.UPSTASH_REDIS_REST_TOKEN;

      const { clearRateLimits } = await import("@/lib/rate-limiter");
      await expect(clearRateLimits()).resolves.not.toThrow();
    });
  });

  describe("public API surface", () => {
    it("should export all public functions", async () => {
      const rateLimiterModule = await import("@/lib/rate-limiter");
      expect(typeof rateLimiterModule.checkRateLimit).toBe("function");
      expect(typeof rateLimiterModule.checkRateLimitWithMetadata).toBe("function");
      expect(typeof rateLimiterModule.clearRateLimits).toBe("function");
      expect(typeof rateLimiterModule.getRateLimitCount).toBe("function");
    });

    it("should accept valid parameters for checkRateLimit", async () => {
      delete process.env.UPSTASH_REDIS_REST_URL;
      delete process.env.UPSTASH_REDIS_REST_TOKEN;

      const { checkRateLimit } = await import("@/lib/rate-limiter");
      // Should not throw with valid parameters
      await expect(checkRateLimit("key", 10, 60000)).resolves.toBe(true);
    });

    it("should accept valid parameters for checkRateLimitWithMetadata", async () => {
      delete process.env.UPSTASH_REDIS_REST_URL;
      delete process.env.UPSTASH_REDIS_REST_TOKEN;

      const { checkRateLimitWithMetadata } = await import("@/lib/rate-limiter");
      const result = await checkRateLimitWithMetadata("key", 10, 60000);
      expect(result).toHaveProperty("success");
      expect(result).toHaveProperty("limit");
      expect(result).toHaveProperty("remaining");
      expect(result).toHaveProperty("reset");
    });
  });
});

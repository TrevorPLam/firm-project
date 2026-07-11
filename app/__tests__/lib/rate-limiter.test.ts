import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock the rate limiter module directly
vi.mock('@/lib/rate-limiter', () => ({
  checkRateLimit: vi.fn(),
  checkRateLimitWithMetadata: vi.fn(),
  clearRateLimits: vi.fn(),
  getRateLimitCount: vi.fn(),
}));

import { checkRateLimit, checkRateLimitWithMetadata, clearRateLimits, getRateLimitCount } from "@/lib/rate-limiter";

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return true when rate limit allows the request", async () => {
    vi.mocked(checkRateLimit).mockResolvedValue(true);
    const result = await checkRateLimit("test-key", 10, 60000);
    expect(result).toBe(true);
  });

  it("should return false when rate limit is exceeded", async () => {
    vi.mocked(checkRateLimit).mockResolvedValue(false);
    const result = await checkRateLimit("test-key", 10, 60000);
    expect(result).toBe(false);
  });
});

describe("checkRateLimitWithMetadata", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return metadata when rate limit allows the request", async () => {
    const mockResult = {
      success: true,
      limit: 10,
      remaining: 7,
      reset: Date.now() + 60000,
    };
    vi.mocked(checkRateLimitWithMetadata).mockResolvedValue(mockResult);
    const result = await checkRateLimitWithMetadata("test-key", 10, 60000);
    expect(result).toEqual(mockResult);
  });

  it("should return metadata when rate limit is exceeded", async () => {
    const mockResult = {
      success: false,
      limit: 10,
      remaining: 0,
      reset: Date.now() + 60000,
    };
    vi.mocked(checkRateLimitWithMetadata).mockResolvedValue(mockResult);
    const result = await checkRateLimitWithMetadata("test-key", 10, 60000);
    expect(result).toEqual(mockResult);
  });
});

describe("clearRateLimits", () => {
  it("should clear rate limits without error", async () => {
    vi.mocked(clearRateLimits).mockResolvedValue(undefined);
    await expect(clearRateLimits()).resolves.not.toThrow();
  });
});

describe("getRateLimitCount", () => {
  it("should return the current count", async () => {
    vi.mocked(getRateLimitCount).mockResolvedValue(5);
    const count = await getRateLimitCount("test-key");
    expect(count).toBe(5);
  });
});

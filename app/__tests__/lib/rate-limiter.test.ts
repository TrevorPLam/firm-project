import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { checkRateLimit } from "@/lib/rate-limiter";

describe("checkRateLimit", () => {
  beforeEach(() => {
    // Clear any internal state before each test
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return true for a fresh key", () => {
    const result = checkRateLimit("test-key", 5, 600000);
    expect(result).toBe(true);
  });

  it("should return true until limit is reached", () => {
    const key = "limit-test";
    const limit = 3;

    // First 3 calls should succeed
    expect(checkRateLimit(key, limit, 600000)).toBe(true);
    expect(checkRateLimit(key, limit, 600000)).toBe(true);
    expect(checkRateLimit(key, limit, 600000)).toBe(true);

    // 4th call should fail
    expect(checkRateLimit(key, limit, 600000)).toBe(false);
  });

  it("should reset after window expires", () => {
    const key = "window-test";
    const limit = 2;
    const windowMs = 1000; // 1 second for testing

    // Use up the limit
    expect(checkRateLimit(key, limit, windowMs)).toBe(true);
    expect(checkRateLimit(key, limit, windowMs)).toBe(true);
    expect(checkRateLimit(key, limit, windowMs)).toBe(false);

    // Advance time past the window
    vi.advanceTimersByTime(windowMs + 100);

    // Should allow requests again
    expect(checkRateLimit(key, limit, windowMs)).toBe(true);
  });

  it("should handle different keys independently", () => {
    const limit = 2;

    // Key 1
    expect(checkRateLimit("key-1", limit, 600000)).toBe(true);
    expect(checkRateLimit("key-1", limit, 600000)).toBe(true);
    expect(checkRateLimit("key-1", limit, 600000)).toBe(false);

    // Key 2 should have its own limit
    expect(checkRateLimit("key-2", limit, 600000)).toBe(true);
    expect(checkRateLimit("key-2", limit, 600000)).toBe(true);
    expect(checkRateLimit("key-2", limit, 600000)).toBe(false);
  });

  it("should handle limit of 1 correctly", () => {
    const key = "single-test";
    expect(checkRateLimit(key, 1, 600000)).toBe(true);
    expect(checkRateLimit(key, 1, 600000)).toBe(false);
  });

  it("should handle large limits", () => {
    const key = "large-limit";
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      expect(checkRateLimit(key, limit, 600000)).toBe(true);
    }

    expect(checkRateLimit(key, limit, 600000)).toBe(false);
  });
});

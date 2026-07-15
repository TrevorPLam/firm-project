import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { shouldAllowIndexing } from "@/lib/robots-policy";

describe("shouldAllowIndexing", () => {
  beforeEach(() => {
    // Reset process.env before each test
    vi.stubEnv("ALLOW_INDEXING", undefined);
    vi.stubEnv("VERCEL_ENV", undefined);
    vi.stubEnv("NODE_ENV", undefined);
  });

  afterEach(() => {
    // Restore original process.env after each test
    vi.unstubAllEnvs();
  });

  it("should allow indexing when ALLOW_INDEXING is explicitly true", () => {
    vi.stubEnv("ALLOW_INDEXING", "true");
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("NODE_ENV", "development");

    expect(shouldAllowIndexing()).toBe(true);
  });

  it("should deny indexing when ALLOW_INDEXING is explicitly false", () => {
    vi.stubEnv("ALLOW_INDEXING", "false");
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NODE_ENV", "production");

    expect(shouldAllowIndexing()).toBe(false);
  });

  it("should allow indexing when VERCEL_ENV is production", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NODE_ENV", "development");

    expect(shouldAllowIndexing()).toBe(true);
  });

  it("should deny indexing when VERCEL_ENV is preview", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("NODE_ENV", "production");

    expect(shouldAllowIndexing()).toBe(false);
  });

  it("should deny indexing when VERCEL_ENV is development", () => {
    vi.stubEnv("VERCEL_ENV", "development");
    vi.stubEnv("NODE_ENV", "production");

    expect(shouldAllowIndexing()).toBe(false);
  });

  it("should allow indexing when NODE_ENV is production (non-Vercel fallback)", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL_ENV", undefined);

    expect(shouldAllowIndexing()).toBe(true);
  });

  it("should deny indexing when NODE_ENV is development", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("VERCEL_ENV", undefined);

    expect(shouldAllowIndexing()).toBe(false);
  });

  it("should deny indexing by default (fail-closed)", () => {
    vi.stubEnv("ALLOW_INDEXING", undefined);
    vi.stubEnv("VERCEL_ENV", undefined);
    vi.stubEnv("NODE_ENV", undefined);

    expect(shouldAllowIndexing()).toBe(false);
  });
});

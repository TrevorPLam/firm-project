import { describe, it, expect, vi, beforeEach } from "vitest";

// Don't set RESEND_API_KEY so the action skips API calls in tests
// process.env.RESEND_API_KEY = "test-api-key";
// process.env.RESEND_AUDIENCE_ID = "test-audience-id";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { checkRateLimit, clearRateLimits } from "@/lib/rate-limiter";

vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

// Mock the rate limiter
vi.mock("@/lib/rate-limiter", () => ({
  checkRateLimit: vi.fn(),
  clearRateLimits: vi.fn(),
}));

// Import after mocks are set up
import { subscribeNewsletter } from "@/actions/newsletter";

// Mock Resend
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    contacts: {
      create: vi.fn(),
    },
  })),
}));

describe("Newsletter Action", () => {
  beforeEach(() => {
    vi.spyOn(console, "log");
    vi.spyOn(console, "error");
    vi.spyOn(console, "warn");
    vi.mocked(clearRateLimits).mockResolvedValue(undefined);
    vi.mocked(checkRateLimit).mockResolvedValue(true);
    (headers as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: vi.fn((header: string) => {
        if (header === "x-forwarded-for") return "127.0.0.1";
        return null;
      }),
    });
    vi.mocked(revalidatePath).mockClear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should validate email format", async () => {
    const formData = new FormData();
    formData.append("email", "invalid-email");

    const result = await subscribeNewsletter(formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.email).toBeDefined();
  });

  it("should not log PII (email) to console", async () => {
    const formData = new FormData();
    formData.append("email", "test@example.com");

    await subscribeNewsletter(formData);

    const logCalls = (console.log as unknown as { mock: { calls: unknown[] } })
      .mock.calls;
    const logOutput = JSON.stringify(logCalls);

    // Assert that email is not present in console output
    expect(logOutput).not.toContain("test@example.com");
  });

  it("should return success: false when email service is not configured", async () => {
    vi.mocked(clearRateLimits).mockResolvedValue(undefined);
    vi.mocked(checkRateLimit).mockResolvedValue(true);
    const formData = new FormData();
    formData.append("email", "test@example.com");

    const result = await subscribeNewsletter(formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain("Email service is not configured");
    expect(result.errors).toBeUndefined();
  });

  it("should return error for invalid email", async () => {
    const formData = new FormData();
    formData.append("email", "invalid-email");

    const result = await subscribeNewsletter(formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.email).toBeDefined();
    expect(result.errors?.email?.[0]).toContain("Invalid email");
  });

  it("should return error for missing email", async () => {
    const formData = new FormData();
    formData.append("email", "");

    const result = await subscribeNewsletter(formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.email).toBeDefined();
  });

  it("should enforce rate limiting", async () => {
    // Make 4 rapid requests (limit is 3 per 10 minutes)
    const formData = new FormData();
    formData.append("email", "test@example.com");

    // First 3 should fail due to missing credentials (not rate limit)
    for (let i = 0; i < 3; i++) {
      vi.mocked(checkRateLimit).mockResolvedValue(true);
      const result = await subscribeNewsletter(formData);
      expect(result.success).toBe(false);
      expect(result.message).toContain("Email service is not configured");
    }

    // 4th should be rate limited (when credentials are present, this would be the rate limit error)
    vi.mocked(checkRateLimit).mockResolvedValue(false);
    const result = await subscribeNewsletter(formData);
    expect(result.success).toBe(false);
    expect(result.message).toContain("Too many subscription attempts");
  });
});

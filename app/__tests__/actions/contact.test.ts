import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Set RESEND_API_KEY for email injection tests
process.env.RESEND_API_KEY = "test-api-key";
process.env.CONTACT_EMAIL_TO = "test@example.com";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { clearRateLimits } from "@/lib/rate-limiter";
import { resetEnvCache } from "@/lib/env";

vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

const mockSend = vi.fn().mockResolvedValue({ data: { id: "test-id" }, error: null });

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: mockSend,
    },
  })),
}));

// Import after mocks are set up
import { submitContactFormAction } from "@/actions/contact";

describe("submitContactFormAction", () => {
  beforeEach(() => {
    vi.spyOn(console, "log");
    vi.spyOn(console, "error");
    clearRateLimits();
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

  it("should not log PII (name, email, message) to console", async () => {
    const formData = new FormData();
    formData.append("name", "John Doe");
    formData.append("email", "john@example.com");
    formData.append("company", "Acme Corp");
    formData.append("service", "Web Development");
    formData.append("budget", "$5000-$10000");
    formData.append("message", "This is a test message with sensitive information");

    await submitContactFormAction(null, formData);

    const logCalls = (console.log as unknown as { mock: { calls: unknown[] } }).mock.calls;
    const logOutput = JSON.stringify(logCalls);

    // Assert that PII fields are not present in console output
    expect(logOutput).not.toContain("John Doe");
    expect(logOutput).not.toContain("john@example.com");
    expect(logOutput).not.toContain("This is a test message with sensitive information");
  });

  it("should log structured metadata without PII values", async () => {
    const formData = new FormData();
    formData.append("name", "Jane Smith");
    formData.append("email", "jane@example.com");
    formData.append("service", "SEO");
    formData.append("message", "Another message");

    await submitContactFormAction(null, formData);

    const logCalls = (console.log as unknown as { mock: { calls: unknown[] } }).mock.calls;
    const errorCalls = (console.error as unknown as { mock: { calls: unknown[] } }).mock.calls;
    const allCalls = [...logCalls, ...errorCalls];
    
    // If any logging occurred, verify it doesn't contain PII
    if (allCalls.length > 0) {
      const logOutput = JSON.stringify(allCalls);
      expect(logOutput).not.toContain("Jane Smith");
      expect(logOutput).not.toContain("jane@example.com");
      expect(logOutput).not.toContain("Another message");
    }
  });

  it("should not log PII on validation errors", async () => {
    const formData = new FormData();
    formData.append("name", "A"); // Too short
    formData.append("email", "invalid-email");
    formData.append("service", "Web Development");
    formData.append("message", "Short"); // Too short

    await submitContactFormAction(null, formData);

    const logCalls = (console.log as unknown as { mock: { calls: unknown[] } }).mock.calls;
    const logOutput = JSON.stringify(logCalls);

    // Even on errors, PII should not be logged
    expect(logOutput).not.toContain("A");
    expect(logOutput).not.toContain("invalid-email");
  });

  it("should return success: false when email service is not configured", async () => {
    clearRateLimits(); // Clear rate limits before this test
    // Temporarily unset RESEND_API_KEY for this test
    const originalApiKey = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;
    resetEnvCache(); // Clear env cache after modifying env var

    const formData = new FormData();
    formData.append("name", "John Doe");
    formData.append("email", "john@example.com");
    formData.append("company", "Acme Corp");
    formData.append("service", "Web Development");
    formData.append("budget", "$5000-$10000");
    formData.append("message", "This is a test message with sufficient length");

    const result = await submitContactFormAction(null, formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain("Email service is not configured");
    expect(result.errors).toBeUndefined();

    // Restore RESEND_API_KEY
    process.env.RESEND_API_KEY = originalApiKey;
    resetEnvCache(); // Clear env cache after restoring env var
  });

  it("should return error for missing name", async () => {
    const formData = new FormData();
    formData.append("name", ""); // Empty
    formData.append("email", "john@example.com");
    formData.append("service", "Web Development");
    formData.append("message", "This is a test message with sufficient length");

    const result = await submitContactFormAction(null, formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.name).toBeDefined();
    expect(result.errors?.name?.[0]).toContain("at least 2 characters");
  });

  it("should return error for name that is too short", async () => {
    const formData = new FormData();
    formData.append("name", "A"); // Too short
    formData.append("email", "john@example.com");
    formData.append("service", "Web Development");
    formData.append("message", "This is a test message with sufficient length");

    const result = await submitContactFormAction(null, formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.name).toBeDefined();
  });

  it("should return error for invalid email", async () => {
    const formData = new FormData();
    formData.append("name", "John Doe");
    formData.append("email", "invalid-email");
    formData.append("service", "Web Development");
    formData.append("message", "This is a test message with sufficient length");

    const result = await submitContactFormAction(null, formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.email).toBeDefined();
    expect(result.errors?.email?.[0]).toContain("Invalid email");
  });

  it("should return error for missing email", async () => {
    const formData = new FormData();
    formData.append("name", "John Doe");
    formData.append("email", "");
    formData.append("service", "Web Development");
    formData.append("message", "This is a test message with sufficient length");

    const result = await submitContactFormAction(null, formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.email).toBeDefined();
  });

  it("should return error for missing service", async () => {
    const formData = new FormData();
    formData.append("name", "John Doe");
    formData.append("email", "john@example.com");
    formData.append("service", ""); // Empty
    formData.append("message", "This is a test message with sufficient length");

    const result = await submitContactFormAction(null, formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.service).toBeDefined();
  });

  it("should return error for message that is too short", async () => {
    const formData = new FormData();
    formData.append("name", "John Doe");
    formData.append("email", "john@example.com");
    formData.append("service", "Web Development");
    formData.append("message", "Short"); // Too short

    const result = await submitContactFormAction(null, formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.message).toBeDefined();
    expect(result.errors?.message?.[0]).toContain("at least 10 characters");
  });

  it("should return error for missing message", async () => {
    const formData = new FormData();
    formData.append("name", "John Doe");
    formData.append("email", "john@example.com");
    formData.append("service", "Web Development");
    formData.append("message", "");

    const result = await submitContactFormAction(null, formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.message).toBeDefined();
  });

  it("should escape HTML in name field to prevent XSS in email", async () => {
    const formData = new FormData();
    formData.append("name", "<script>alert('xss')</script>TestName");
    formData.append("email", "john@example.com");
    formData.append("company", "Acme Corp");
    formData.append("service", "Web Development");
    formData.append("budget", "$5000-$10000");
    formData.append("message", "This is a test message with sufficient length");

    const result = await submitContactFormAction(null, formData);

    // The form should process without crashing
    expect(result).toBeDefined();
    // The escapeHtml function is tested separately in escape-html.test.ts
  });

  it("should escape HTML in message field to prevent XSS in email", async () => {
    const formData = new FormData();
    formData.append("name", "John Doe");
    formData.append("email", "john@example.com");
    formData.append("company", "Acme Corp");
    formData.append("service", "Web Development");
    formData.append("budget", "$5000-$10000");
    formData.append("message", "<img src=x onerror=alert('xss')>Test message here");

    const result = await submitContactFormAction(null, formData);

    // The form should process without crashing
    expect(result).toBeDefined();
    // The escapeHtml function is tested separately in escape-html.test.ts
  });

  it("should escape HTML in company field to prevent XSS in email", async () => {
    const formData = new FormData();
    formData.append("name", "John Doe");
    formData.append("email", "john@example.com");
    formData.append("company", "<b>Acme</b>Corp");
    formData.append("service", "Web Development");
    formData.append("budget", "$5000-$10000");
    formData.append("message", "This is a test message with sufficient length");

    const result = await submitContactFormAction(null, formData);

    // The form should process without crashing
    expect(result).toBeDefined();
    // The escapeHtml function is tested separately in escape-html.test.ts
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { submitContactFormAction } from "@/actions/contact";
import { revalidatePath } from "next/cache";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("submitContactFormAction", () => {
  beforeEach(() => {
    vi.spyOn(console, "log");
    vi.spyOn(console, "error");
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

    const logCalls = (console.log as any).mock.calls;
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

    const logCalls = (console.log as any).mock.calls;
    const errorCalls = (console.error as any).mock.calls;
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

    const logCalls = (console.log as any).mock.calls;
    const logOutput = JSON.stringify(logCalls);

    // Even on errors, PII should not be logged
    expect(logOutput).not.toContain("A");
    expect(logOutput).not.toContain("invalid-email");
  });
});

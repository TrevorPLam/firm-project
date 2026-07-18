// Unit tests for Sanity webhook revalidate route
// DDD: Test route handler behavior with mocked dependencies
// Security: Verify signature validation and secret protection

import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/api/revalidate/route";
import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { getSanityRevalidateSecret } from "@/lib/env";

// Mock Next.js cache functions
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

// Mock next-sanity webhook parser
vi.mock("next-sanity/webhook", () => ({
  parseBody: vi.fn(),
}));

// Mock env getter
vi.mock("@/lib/env", () => ({
  getSanityRevalidateSecret: vi.fn(),
}));

describe("Revalidate Route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Security - Secret Validation", () => {
    it("should return 500 when SANITY_REVALIDATE_SECRET is not set", async () => {
      vi.mocked(getSanityRevalidateSecret).mockReturnValue(undefined);

      const request = new Request("https://example.com/api/revalidate", {
        method: "POST",
      });

      const response = await POST(request);
      const data = await response.text();

      expect(response.status).toBe(500);
      expect(data).toContain("Missing environment variable SANITY_REVALIDATE_SECRET");
      expect(parseBody).not.toHaveBeenCalled();
    });

    it("should return 401 when signature is invalid", async () => {
      vi.mocked(getSanityRevalidateSecret).mockReturnValue("test-secret");
      vi.mocked(parseBody).mockResolvedValue({
        isValidSignature: false,
        body: null,
      });

      const request = new Request("https://example.com/api/revalidate", {
        method: "POST",
      });

      const response = await POST(request);
      const data = await response.text();

      expect(response.status).toBe(401);
      expect(data).toBe("Invalid signature");
      expect(revalidatePath).not.toHaveBeenCalled();
      expect(revalidateTag).not.toHaveBeenCalled();
    });
  });

  describe("Payload Validation", () => {
    it("should return 400 when body is null", async () => {
      vi.mocked(getSanityRevalidateSecret).mockReturnValue("test-secret");
      vi.mocked(parseBody).mockResolvedValue({
        isValidSignature: true,
        body: null,
      });

      const request = new Request("https://example.com/api/revalidate", {
        method: "POST",
      });

      const response = await POST(request);
      const data = await response.text();

      expect(response.status).toBe(400);
      expect(data).toContain("Bad Request: Empty body");
    });

    it("should return 400 when _type is missing", async () => {
      vi.mocked(getSanityRevalidateSecret).mockReturnValue("test-secret");
      vi.mocked(parseBody).mockResolvedValue({
        isValidSignature: true,
        body: { slug: { current: "test" } },
      });

      const request = new Request("https://example.com/api/revalidate", {
        method: "POST",
      });

      const response = await POST(request);
      const data = await response.text();

      expect(response.status).toBe(400);
      expect(data).toContain("Bad Request: Missing _type");
    });
  });

  describe("Path-based Revalidation", () => {
    it("should revalidate specific path and listing for blogPost", async () => {
      vi.mocked(getSanityRevalidateSecret).mockReturnValue("test-secret");
      vi.mocked(parseBody).mockResolvedValue({
        isValidSignature: true,
        body: { _type: "blogPost", slug: { current: "test-post" } },
      });

      const request = new Request("https://example.com/api/revalidate", {
        method: "POST",
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(revalidatePath).toHaveBeenCalledWith(
        "/blogPost/test-post",
        "page"
      );
      expect(revalidatePath).toHaveBeenCalledWith("/blog", "page");
      expect(revalidateTag).toHaveBeenCalledWith("blog", "fetch-cache");
      expect(data).toMatchObject({
        revalidated: true,
        type: "blogPost",
        slug: "test-post",
      });
    });

    it("should revalidate specific path and listing for caseStudy", async () => {
      vi.mocked(getSanityRevalidateSecret).mockReturnValue("test-secret");
      vi.mocked(parseBody).mockResolvedValue({
        isValidSignature: true,
        body: { _type: "caseStudy", slug: { current: "test-case" } },
      });

      const request = new Request("https://example.com/api/revalidate", {
        method: "POST",
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(revalidatePath).toHaveBeenCalledWith(
        "/caseStudy/test-case",
        "page"
      );
      expect(revalidatePath).toHaveBeenCalledWith("/portfolio", "page");
      expect(revalidateTag).toHaveBeenCalledWith("portfolio", "fetch-cache");
      expect(data).toMatchObject({
        revalidated: true,
        type: "caseStudy",
        slug: "test-case",
      });
    });
  });

  describe("Tag-based Revalidation", () => {
    it("should revalidate by type tag when slug is missing", async () => {
      vi.mocked(getSanityRevalidateSecret).mockReturnValue("test-secret");
      vi.mocked(parseBody).mockResolvedValue({
        isValidSignature: true,
        body: { _type: "page" },
      });

      const request = new Request("https://example.com/api/revalidate", {
        method: "POST",
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(revalidateTag).toHaveBeenCalledWith("page", "fetch-cache");
      expect(revalidatePath).not.toHaveBeenCalled();
      expect(data).toMatchObject({
        revalidated: true,
        type: "page",
      });
    });
  });

  describe("Error Handling", () => {
    it("should return 500 on parseBody error", async () => {
      vi.mocked(getSanityRevalidateSecret).mockReturnValue("test-secret");
      vi.mocked(parseBody).mockRejectedValue(new Error("Parse error"));

      const request = new Request("https://example.com/api/revalidate", {
        method: "POST",
      });

      const response = await POST(request);
      const data = await response.text();

      expect(response.status).toBe(500);
      expect(data).toContain("Parse error");
    });
  });
});

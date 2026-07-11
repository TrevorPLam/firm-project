import { describe, it, expect } from "vitest";
import { sanitizeHtml } from "@/lib/content-sanitizer";

describe("sanitizeHtml", () => {
  it("should render safe HTML unchanged", () => {
    const safeHtml = "<p>safe content</p>";
    const result = sanitizeHtml(safeHtml);
    expect(result).toContain("safe content");
  });

  it("should remove script tags", () => {
    const dirtyHtml = "<script>alert(1)</script><p>safe</p>";
    const result = sanitizeHtml(dirtyHtml);
    expect(result).toContain("safe");
    expect(result).not.toContain("script");
    expect(result).not.toContain("alert(1)");
  });

  it("should remove onerror event handlers", () => {
    const dirtyHtml = '<img onerror="alert(1)" src="x.jpg">';
    const result = sanitizeHtml(dirtyHtml);
    expect(result).not.toContain("onerror");
    expect(result).not.toContain("img");
  });

  it("should remove javascript: href", () => {
    const dirtyHtml = '<a href="javascript:alert(1)">click</a>';
    const result = sanitizeHtml(dirtyHtml);
    expect(result).toContain("click");
    expect(result).not.toContain("javascript:");
  });

  it("should allow safe tags from allowlist", () => {
    const safeHtml =
      '<h2>Heading</h2><p>Paragraph</p><ul><li>Item</li></ul><strong>Bold</strong><em>Italic</em><br><a href="/safe">Link</a>';
    const result = sanitizeHtml(safeHtml);
    expect(result).toContain("Heading");
    expect(result).toContain("Paragraph");
    expect(result).toContain("Item");
    expect(result).toContain("Bold");
    expect(result).toContain("Italic");
    expect(result).toContain("Link");
  });

  it("should preserve href attribute on links", () => {
    const safeHtml = '<a href="https://example.com">Link</a>';
    const result = sanitizeHtml(safeHtml);
    expect(result).toContain('href="https://example.com"');
  });

  it("should remove disallowed tags", () => {
    const dirtyHtml = "<div>content</div><span>more</span>";
    const result = sanitizeHtml(dirtyHtml);
    expect(result).not.toContain("<div>");
    expect(result).not.toContain("<span>");
  });
});

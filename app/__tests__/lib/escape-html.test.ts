import { describe, it, expect } from "vitest";
import { escapeHtml } from "@/lib/escape-html";

describe("escapeHtml", () => {
  it("should escape HTML entities in a string", () => {
    expect(escapeHtml("<script>alert('xss')</script>")).toBe(
      "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;",
    );
  });

  it("should escape multiple HTML entities", () => {
    expect(escapeHtml("<b>bold</b> & <i>italic</i>")).toBe(
      "&lt;b&gt;bold&lt;/b&gt; &amp; &lt;i&gt;italic&lt;/i&gt;",
    );
  });

  it("should escape quotes", () => {
    expect(escapeHtml("\"double\" and 'single'")).toBe(
      "&quot;double&quot; and &#39;single&#39;",
    );
  });

  it("should handle empty string", () => {
    expect(escapeHtml("")).toBe("");
  });

  it("should handle string without HTML entities", () => {
    expect(escapeHtml("plain text")).toBe("plain text");
  });

  it("should escape ampersand first to avoid double escaping", () => {
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });

  it("should handle mixed content", () => {
    expect(escapeHtml("Hello <b>World</b> & welcome!")).toBe(
      "Hello &lt;b&gt;World&lt;/b&gt; &amp; welcome!",
    );
  });
});

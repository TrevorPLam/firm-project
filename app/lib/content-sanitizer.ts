import sanitizeHtmlLib from "sanitize-html";

/**
 * Content sanitizer deep module for server-side HTML sanitization.
 *
 * This module provides a pure server-side utility for sanitizing HTML content
 * from CMS sources. It uses sanitize-html which is a lightweight, dependency-free
 * sanitizer that works in Node.js environments without requiring jsdom.
 *
 * The allowlist is restricted to basic formatting tags and safe attributes
 * to prevent XSS attacks while preserving rich text content.
 */

/**
 * Sanitizes HTML content by removing potentially dangerous elements and attributes.
 *
 * @param html - The HTML string to sanitize
 * @returns The sanitized HTML string
 *
 * @example
 * ```ts
 * const dirty = '<script>alert(1)</script><p>Safe content</p>';
 * const clean = sanitizeHtml(dirty); // '<p>Safe content</p>'
 * ```
 */
export function sanitizeHtml(html: string): string {
  return sanitizeHtmlLib(html, {
    allowedTags: ["p", "h2", "h3", "ul", "li", "strong", "em", "a", "br"],
    allowedAttributes: {
      a: ["href"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      a: ["http", "https", "mailto"],
    },
    disallowedTagsMode: "discard",
    enforceHtmlBoundary: false,
  });
}

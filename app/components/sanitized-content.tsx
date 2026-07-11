"use client";

import DOMPurify from "isomorphic-dompurify";

/**
 * SanitizedContent is a Client Component that safely renders HTML content.
 *
 * This component moves DOMPurify sanitization to the client side to avoid
 * Next.js 16 prerender restrictions around `new Date()` usage in DOMPurify's
 * internal configuration.
 *
 * @param html - The HTML string to sanitize and render
 */
export function SanitizedContent({ html }: { html: string }) {
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "h2", "h3", "ul", "li", "strong", "em", "a", "br"],
    ALLOWED_ATTR: ["href"],
    FORCE_BODY: false,
  });

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

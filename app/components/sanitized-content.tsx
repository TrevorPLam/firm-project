import { sanitizeHtml } from "@/lib/content-sanitizer";

/**
 * SanitizedContent is a Server Component that safely renders HTML content.
 *
 * This component sanitizes HTML on the server side using sanitize-html,
 * which is a lightweight, dependency-free sanitizer that works in Node.js
 * environments without requiring jsdom. This provides better performance
 * (sanitization happens once at build time), improved SEO (content in initial
 * HTML), and reduced client bundle size.
 *
 * @param html - The HTML string to sanitize and render
 */
export function SanitizedContent({ html }: { html: string }) {
  const sanitizedHtml = sanitizeHtml(html);

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

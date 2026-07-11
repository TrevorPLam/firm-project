import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * 
 * This function uses DOMPurify with a frozen allowlist to strip dangerous
 * tags and attributes while preserving safe HTML for blog content.
 * 
 * @param html - The HTML string to sanitize
 * @returns The sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'h2', 'h3', 'ul', 'li', 'strong', 'em', 'a', 'br'],
    ALLOWED_ATTR: ['href'],
    FORCE_BODY: false,
  });
}

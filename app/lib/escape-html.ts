/**
 * Escapes HTML entities in a string to prevent XSS attacks.
 * This is a pure function that converts special characters to their HTML entity equivalents.
 *
 * @param value - The string to escape
 * @returns The escaped string with HTML entities
 */
export function escapeHtml(value: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return value.replace(/[&<>"']/g, (char) => map[char] || char);
}

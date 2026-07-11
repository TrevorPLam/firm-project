import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '@/lib/sanitize';

describe('sanitizeHtml', () => {
  it('should leave safe HTML unchanged', () => {
    const safeHtml = '<p>safe content</p>';
    expect(sanitizeHtml(safeHtml)).toBe(safeHtml);
  });

  it('should remove script tags', () => {
    const dirtyHtml = '<script>alert(1)</script><p>safe</p>';
    const clean = sanitizeHtml(dirtyHtml);
    expect(clean).not.toContain('<script>');
    expect(clean).toContain('<p>safe</p>');
  });

  it('should remove onerror event handlers', () => {
    const dirtyHtml = '<img onerror="alert(1)" src="x.jpg">';
    const clean = sanitizeHtml(dirtyHtml);
    expect(clean).not.toContain('onerror');
  });

  it('should remove javascript: href', () => {
    const dirtyHtml = '<a href="javascript:alert(1)">click</a>';
    const clean = sanitizeHtml(dirtyHtml);
    expect(clean).not.toContain('javascript:');
  });

  it('should allow safe tags from allowlist', () => {
    const safeHtml = '<h2>Heading</h2><p>Paragraph</p><ul><li>Item</li></ul><strong>Bold</strong><em>Italic</em><br><a href="/safe">Link</a>';
    const clean = sanitizeHtml(safeHtml);
    expect(clean).toContain('<h2>');
    expect(clean).toContain('<p>');
    expect(clean).toContain('<ul>');
    expect(clean).toContain('<li>');
    expect(clean).toContain('<strong>');
    expect(clean).toContain('<em>');
    expect(clean).toContain('<br>');
    expect(clean).toContain('<a');
  });
});

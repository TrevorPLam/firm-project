import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SanitizedContent } from '@/components/sanitized-content';

describe('SanitizedContent', () => {
  it('should render safe HTML unchanged', () => {
    const safeHtml = '<p>safe content</p>';
    render(<SanitizedContent html={safeHtml} />);
    expect(screen.getByText('safe content')).toBeInTheDocument();
  });

  it('should remove script tags', () => {
    const dirtyHtml = '<script>alert(1)</script><p>safe</p>';
    render(<SanitizedContent html={dirtyHtml} />);
    expect(screen.getByText('safe')).toBeInTheDocument();
    expect(screen.queryByText('alert(1)')).not.toBeInTheDocument();
  });

  it('should remove onerror event handlers', () => {
    const dirtyHtml = '<img onerror="alert(1)" src="x.jpg">';
    render(<SanitizedContent html={dirtyHtml} />);
    const img = screen.queryByRole('img');
    expect(img).not.toBeInTheDocument();
  });

  it('should remove javascript: href', () => {
    const dirtyHtml = '<a href="javascript:alert(1)">click</a>';
    render(<SanitizedContent html={dirtyHtml} />);
    const link = screen.getByText('click');
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute('href', 'javascript:alert(1)');
  });

  it('should allow safe tags from allowlist', () => {
    const safeHtml = '<h2>Heading</h2><p>Paragraph</p><ul><li>Item</li></ul><strong>Bold</strong><em>Italic</em><br><a href="/safe">Link</a>';
    render(<SanitizedContent html={safeHtml} />);
    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('Italic')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
  });
});

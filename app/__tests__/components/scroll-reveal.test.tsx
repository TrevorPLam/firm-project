import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ScrollReveal } from '../../components/scroll-reveal';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock matchMedia
const mockMatchMedia = vi.fn();
window.matchMedia = mockMatchMedia;

describe('ScrollReveal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: no reduced motion, IntersectionObserver available
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it('should initialize with content visible (progressive enhancement)', async () => {
    render(<ScrollReveal>Test content</ScrollReveal>);
    // Initial render should show content visible
    expect(screen.getByText('Test content')).toHaveClass('opacity-100');
    
    // After RAF and effect runs, content should be hidden (JS enhancement)
    await waitFor(() => {
      expect(screen.getByText('Test content')).toHaveClass('opacity-0');
    });
  });

  it('should hide then reveal content when element intersects (with motion)', async () => {
    render(<ScrollReveal>Test content</ScrollReveal>);

    // After mount, content should be hidden (JS enhancement)
    await waitFor(() => {
      expect(screen.getByText('Test content')).toHaveClass('opacity-0');
    });

    const lastCall = mockIntersectionObserver.mock.calls.at(-1);
    expect(lastCall).toBeDefined();
    const callback = lastCall?.[0];
    expect(callback).toBeTypeOf('function');

    callback?.([{ isIntersecting: true }] as unknown as IntersectionObserverEntry[]);

    await waitFor(() => {
      expect(screen.getByText('Test content')).toHaveClass('opacity-100');
    });
  });

  it('should keep content visible when prefers-reduced-motion is set', () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    render(<ScrollReveal>Test content</ScrollReveal>);

    // Content should remain visible, never hidden
    expect(screen.getByText('Test content')).toHaveClass('opacity-100');
    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  it('should keep content visible when IntersectionObserver is unavailable', () => {
    window.IntersectionObserver = undefined as any;

    render(<ScrollReveal>Test content</ScrollReveal>);

    // Content should remain visible as fallback
    expect(screen.getByText('Test content')).toHaveClass('opacity-100');
  });
});

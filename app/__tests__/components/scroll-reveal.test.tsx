import { describe, it, expect, vi } from 'vitest';
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

describe('ScrollReveal', () => {
  it('should initialize with content hidden', () => {
    render(<ScrollReveal>Test content</ScrollReveal>);
    expect(screen.getByText('Test content')).toHaveClass('opacity-0');
  });

  it('should reveal content when element intersects', async () => {
    render(<ScrollReveal>Test content</ScrollReveal>);

    const lastCall = mockIntersectionObserver.mock.calls.at(-1);
    expect(lastCall).toBeDefined();
    const callback = lastCall?.[0];
    expect(callback).toBeTypeOf('function');

    callback?.([{ isIntersecting: true }] as unknown as IntersectionObserverEntry[]);

    await waitFor(() => {
      expect(screen.getByText('Test content')).toHaveClass('opacity-100');
    });
  });
});

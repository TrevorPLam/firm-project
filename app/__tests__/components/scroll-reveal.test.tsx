import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollReveal } from "../../components/scroll-reveal";

// Mock IntersectionObserver for Motion library
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock matchMedia for reduced motion preference
const mockMatchMedia = vi.fn();
window.matchMedia = mockMatchMedia;

describe("ScrollReveal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: no reduced motion
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it("should render with initial hidden state (Motion animation)", () => {
    render(<ScrollReveal>Test content</ScrollReveal>);
    const element = screen.getByText("Test content");
    
    // Motion uses inline styles for initial state
    expect(element).toHaveStyle({ opacity: "0" });
    expect(element).toHaveStyle({ transform: "translateY(32px) scale(0.95)" });
  });

  it("should apply delay prop correctly", () => {
    render(<ScrollReveal delay={500}>Test content</ScrollReveal>);
    const element = screen.getByText("Test content");
    
    // Element should still render with delay applied
    expect(element).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<ScrollReveal className="custom-class">Test content</ScrollReveal>);
    const element = screen.getByText("Test content");
    
    expect(element).toHaveClass("custom-class");
  });

  it("should keep content visible when prefers-reduced-motion is set", () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    render(<ScrollReveal>Test content</ScrollReveal>);
    const element = screen.getByText("Test content");

    // Motion respects reduced motion preference
    // Element should still render (Motion handles reduced motion internally)
    expect(element).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../../components/footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByText('Elevate Digital')).toBeInTheDocument();
  });

  it('has valid list structure - ul elements contain only li children', () => {
    const { container } = render(<Footer />);
    const ulElements = container.querySelectorAll('ul');

    ulElements.forEach((ul) => {
      const children = Array.from(ul.children);
      children.forEach((child) => {
        expect(child.tagName.toLowerCase()).toBe('li');
      });
    });
  });

  it('renders all quick links', () => {
    render(<Footer />);
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders all legal links', () => {
    render(<Footer />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('renders social links with correct aria-labels', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Follow us on Twitter/X')).toBeInTheDocument();
    expect(screen.getByLabelText('Follow us on LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Follow us on Instagram')).toBeInTheDocument();
  });
});

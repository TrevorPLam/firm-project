# components

Reusable React components organized by functionality for the Elevate Digital marketing website.

## Table of Contents

- [Component Categories](#component-categories)
- [Component Patterns](#component-patterns)
- [Styling](#styling)
- [Performance](#performance)
- [Accessibility](#accessibility)

## Component Categories

### Layout Components

- **navigation.tsx**: Main navigation with mobile menu
- **footer.tsx**: Site footer with navigation and links
- **loading.tsx**: Loading spinner

### Form Components

- **contact-form.tsx**: Contact form with validation
- **newsletter-form.tsx**: Newsletter subscription form
- **search-bar.tsx**: Search input component

### Content Components

- **sanitized-content.tsx**: HTML sanitization for CMS content
- **pricing-content.tsx**: Pricing tables and features
- **search-content.tsx**: Search results display

### UI Components

- **analytics.tsx**: Google Analytics and tracking integration
- **copyright-year.tsx**: Dynamic copyright year
- **error-boundary.tsx**: React error boundary
- **json-ld.tsx**: Structured data for SEO
- **language-switcher.tsx**: Locale switcher component
- **page-transition.tsx**: Page transition animations
- **scroll-reveal.tsx**: Scroll-triggered animations
- **social-share.tsx**: Social media sharing buttons

## Component Patterns

### Server Components

Default for better performance:

- Render on server
- No client-side JavaScript
- Direct database access
- Better SEO

### Client Components

Marked with `'use client'` when needed:

- Interactivity (clicks, forms)
- Browser APIs (localStorage, window)
- State management
- Event handlers

### Composition

Small, focused components that compose together:

- Single responsibility
- Reusable across pages
- Clear props interface
- Minimal dependencies

## Styling

All components use Tailwind CSS:

- Utility-first approach
- Custom design tokens in globals.css
- Responsive design with mobile-first approach
- Dark mode support
- Accessibility-focused color contrast

## Performance

Optimizations applied:

- **Code splitting**: Automatic with Next.js
- **Server components**: Reduced client JavaScript for non-interactive components
- **Motion**: Motion library for animations

## Accessibility

Components follow WCAG 2.1 AA guidelines:

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

## Related Documentation

- [app/README.md](../README.md) - App directory overview
- [tailwind.config.mjs](../../tailwind.config.mjs) - Tailwind configuration
- [app/globals.css](../globals.css) - Global styles and design tokens

# Component Tests

Unit tests for React components.

## Purpose

Tests for UI components to verify rendering, behavior, and accessibility.

## Test Files

- `contact-form.test.tsx` - Contact form component tests
- `error-boundary.test.tsx` - Error boundary component tests
- `footer.test.tsx` - Footer component tests
- `json-ld.test.tsx` - JSON-LD structured data component tests
- `navigation.test.tsx` - Navigation component tests
- `sanitized-content.test.tsx` - HTML sanitization utility tests (via `sanitizeHtml`)
- `scroll-reveal.test.tsx` - Scroll reveal animation component tests

## Test Coverage

### Contact Form

- All form fields render correctly
- Title display controlled by `showTitle` prop
- Service and budget dropdown options
- Required field attributes
- Input types and placeholders
- Textarea row configuration

### Error Boundary

- Renders children when no error
- Catches errors and displays fallback UI
- Resets error state on retry button click
- Supports custom fallback components
- Does not auto-reload on error

### Footer

- Renders brand name and navigation links
- Valid list structure (ul contains only li children)
- Quick links and legal links render correctly
- Social links have correct aria-labels

### JSON-LD

- Script tag with correct `application/ld+json` type
- Data serialized correctly
- Nonce attribute included when provided
- Complex nested data handled

### Navigation

- Escape key closes mobile menu and returns focus to toggle button
- Focus moves into menu when opened
- Focus trap within menu (Tab cycles, Shift+Tab reverses)

### Sanitized Content

- Safe HTML rendered unchanged
- Script tags and event handlers removed
- `javascript:` hrefs removed
- Allowlisted tags preserved

### Scroll Reveal

- Initial hidden state with opacity and transform
- Delay prop and custom className applied
- Content visible when `prefers-reduced-motion` is set

## Running Tests

```bash
npm test -- app/__tests__/components
```

## Notes

Tests use React Testing Library for component rendering and user interaction simulation. The `sanitized-content.test.tsx` file tests the `sanitizeHtml` utility function directly rather than rendering a component.

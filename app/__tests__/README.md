# __tests__

Vitest unit test directory with mirroring structure for app directory modules.

## Table of Contents

- [Directory Structure](#directory-structure)
- [Test Organization](#test-organization)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Writing Tests](#writing-tests)

## Directory Structure

```
__tests__/
├── actions/        # Server action tests
├── api/            # API route tests
├── components/     # Component tests
├── lib/            # Library function tests
└── setup.ts        # Test configuration
```

## Test Organization

Tests mirror the app directory structure for easy navigation:

- **actions/**: Tests for server actions (contact, newsletter)
- **api/**: Tests for API routes (revalidate)
- **components/**: Tests for React components
- **lib/**: Tests for utility libraries and data modules

## Setup

### setup.ts

Test setup file that:

- Imports jest-dom matchers for Vitest
- Mocks next-intl navigation (Link, redirect, usePathname, useRouter)
- Mocks next-intl hooks (useLocale, useTranslations)
- Mocks LanguageSwitcher and SearchBar components
- Sets up React Testing Library cleanup after each test

## Running Tests

### Watch Mode

```bash
npm test
```

Runs tests in watch mode for development.

### Single Run

```bash
npm run test:run
```

Runs all tests once (CI mode).

### UI Mode

```bash
npm run test:ui
```

Opens Vitest UI for interactive testing.

## Test Coverage

Tests cover:

- **Server Actions**: Form validation, email sending, rate limiting
- **API Routes**: Webhook handling, authentication, revalidation
- **Components**: Rendering, user interactions, accessibility
- **Libraries**: Data fetching, validation, sanitization, utilities

## Writing Tests

### Guidelines

- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies (Resend, Upstash, Sanity)
- Test both success and error cases
- Keep tests focused and independent

### Example

```typescript
import { describe, it, expect, vi } from 'vitest';
import { submitContactFormAction } from '@/actions/contact';

describe('submitContactFormAction', () => {
  it('should send email successfully', async () => {
    const result = await submitContactFormAction(formData);
    expect(result.success).toBe(true);
  });
});
```

## Related Documentation

- [app/README.md](../README.md) - App directory overview
- [vitest.config.mjs](../../vitest.config.mjs) - Vitest configuration
- [README.md](../../README.md) - Project overview

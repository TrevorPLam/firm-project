# e2e

Playwright end-to-end tests for critical user flows and page interactions.

## Table of Contents

- [Test Suites](#test-suites)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Page Objects](#page-objects)
- [Debugging](#debugging)
- [Configuration](#configuration)

## Test Suites

### home-page.spec.ts

Homepage functionality tests:

- Page loads successfully with correct title
- Hero section displays with heading
- Navigation to services page works
- Navigation to contact page works
- Contact form displays after clicking CTA button

### blog.spec.ts

Blog listing page tests:

- Blog list renders with post titles and categories
- Post metadata (date and read time) displays
- Links to blog posts work
- Topic clusters section shows with topic cards

### blog-navigation.spec.ts

Blog navigation tests:

- Navigate from blog list to blog detail page
- All blog cards display on list page
- Proper link structure for blog cards

### blog-detail.spec.ts

Blog detail page tests:

- Blog post title and content render correctly
- Author information displays
- Post metadata (date and read time) is correct
- Category badge displays
- Tags section displays
- Back to blog link works
- HTML content renders properly with headings and paragraphs

### portfolio-detail.spec.ts

Portfolio detail page tests:

- Case study title and description render
- Results metrics display
- Client information shows
- Category badge displays
- Project sections (overview, challenge, solution) display
- Technologies used display
- Testimonial displays with quote and author
- Services/tags display
- CTA section displays with link

## Running Tests

### All Tests

```bash
npm run test:e2e
```

Runs all E2E tests in headless mode.

### UI Mode

```bash
npm run test:e2e:ui
```

Opens Playwright UI for interactive testing and debugging.

### Specific Test

```bash
npx playwright test home-page.spec.ts
```

Runs a specific test file.

## Test Structure

Tests follow Playwright conventions with `test.describe()` blocks:

```typescript
import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display contact form", async ({ page }) => {
    await page.goto("/");
    const contactButton = page.getByRole("button", {
      name: "Start Your Project",
    });
    await contactButton.click();
    await expect(page).toHaveURL("/contact");

    const form = page.locator("form");
    await expect(form).toBeVisible();
  });
});
```

## Page Objects

Tests use a mix of locator strategies:

- **Page navigation**: `page.goto()`
- **Role-based selection**: `page.getByRole()` (links, buttons, headings)
- **Text-based selection**: `page.getByText()`
- **CSS selector selection**: `page.locator()`
- **Assertions**: `toBeVisible()`, `toContainText()`, `toHaveURL()`, `toHaveTitle()`, `toHaveCount()`, `toHaveAttribute()`
- **Interactions**: `click()`

## Debugging

### With UI Mode

```bash
npm run test:e2e:ui
```

- Step through tests
- Inspect page state
- View network requests
- Debug selectors

### With Headed Mode

```bash
npx playwright test --headed
```

Runs tests with visible browser window.

### Trace Viewer

```bash
npx playwright show-trace trace.zip
```

View test execution traces for failed tests.

## Configuration

The Playwright config is at [playwright.config.ts](../../playwright.config.ts):

- **Test directory**: `./app/e2e`
- **Base URL**: `http://localhost:3000`
- **Browser projects**: Chromium, Firefox, WebKit, Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12)
- **Web server**: Automatically runs `npm run build && npm start` before tests (120s timeout)
- **Trace**: Captured on first retry
- **Screenshots**: Captured only on failure
- **CI behavior**: Retries twice, single worker, forbids `.only`

## Related Documentation

- [app/README.md](../README.md) - App directory overview
- [playwright.config.ts](../../playwright.config.ts) - Playwright configuration
- [README.md](../../README.md) - Project overview

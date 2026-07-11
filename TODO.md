# TODO - Elevate Digital

## Task Legend

- [ ] Task incomplete
- [x] Task complete
- Status: PENDING | IN_PROGRESS | BLOCKED | COMPLETED
- Agent: AGENT (automated) | HUMAN (manual)

---

## Task 001: Fix lint warnings to unblock CI

- [x] **Status**: COMPLETED
- **Related Files**:
  - `app/__tests__/components/navigation.test.tsx`
  - `app/actions/contact.ts`
  - `app/actions/newsletter.ts`
  - `app/sitemap.ts`
- **Definition of Done**:
  - All ESLint warnings removed
  - `npm run lint -- --max-warnings=0` passes
  - No unused imports or variables
- **Out of Scope**:
  - Changing ESLint configuration to ignore warnings
  - Adding new lint rules
- **Rules to Follow**:
  - Remove unused imports
  - Remove unused destructured variables or prefix with underscore
  - Maintain test coverage
- **Advanced Coding Pattern**:
  - Use ESLint's `no-unused-vars` with `argsIgnorePattern: "^_"` to allow underscore-prefixed variables
- **Anti-Patterns**:
  - Commenting out code instead of removing
  - Adding `// eslint-disable-next-line` without justification
- **Imports/Exports**:
  - None affected
- **Depends On**: None
- **Blocks**: CI pipeline, merge to main

### Subtasks

#### 001-01: Remove unused fireEvent import from navigation test
- **Agent**: AGENT
- **File**: `app/__tests__/components/navigation.test.tsx`
- **Description**: Remove the unused `fireEvent` import from line 1. The test file uses `userEvent` from `@testing-library/user-event` instead.
- **Commands**:
  - `npm run lint -- app/__tests__/components/navigation.test.tsx --max-warnings=0`
  - `npm run test:run -- app/__tests__/components/navigation.test.tsx`

#### 001-02: Remove unused destructured variables from contact action
- **Agent**: AGENT
- **File**: `app/actions/contact.ts`
- **Description**: Remove destructured variables `_name`, `_email`, `_company`, `_service`, `_budget`, `_message` from line 74. These are destructured but never used.
- **Commands**:
  - `npm run lint -- app/actions/contact.ts --max-warnings=0`
  - `npm run test:run -- app/__tests__/actions/contact.test.ts`

#### 001-03: Remove unused error variable from contact action
- **Agent**: AGENT
- **File**: `app/actions/contact.ts`
- **Description**: Remove the unused `error` variable from line 102. The catch block currently only logs a timestamp and success flag.
- **Commands**:
  - `npm run lint -- app/actions/contact.ts --max-warnings=0`
  - `npm run test:run -- app/__tests__/actions/contact.test.ts`

#### 001-04: Remove unused variables from newsletter action
- **Agent**: AGENT
- **File**: `app/actions/newsletter.ts`
- **Description**: Remove unused `_email` variable from line 64 and unused `_error` variable from line 88.
- **Commands**:
  - `npm run lint -- app/actions/newsletter.ts --max-warnings=0`

#### 001-05: Remove unused getAllSlugs import from sitemap
- **Agent**: AGENT
- **File**: `app/sitemap.ts`
- **Description**: Remove the unused `getAllSlugs` import from line 2. The sitemap uses `getAllPosts` and `getAllPortfolioSlugs` but does not need the slug lists.
- **Commands**:
  - `npm run lint -- app/sitemap.ts --max-warnings=0`
  - `npm run build` (to verify sitemap generation)

---

## Task 002: Pin TypeScript to stable version

- [x] **Status**: COMPLETED
- **Related Files**:
  - `package.json`
  - `package-lock.json`
- **Definition of Done**:
  - TypeScript pinned to `~6.0.3` (stable)
  - `npm install` completes without errors
  - `npx tsc --noEmit` passes
  - Build succeeds
- **Out of Scope**:
  - Downgrading to TypeScript 5 unless specifically required
  - Changing other dependencies
- **Rules to Follow**:
  - Use tilde range for patch-level updates
  - Test after dependency changes
- **Advanced Coding Pattern**:
  - Semantic versioning with tilde for patch updates
- **Anti-Patterns**:
  - Using caret ranges for core dependencies
  - Installing pre-release versions in production
- **Imports/Exports**:
  - None affected
- **Depends On**: None
- **Blocks**: None

### Subtasks

#### 002-01: Update TypeScript dependency to stable version
- **Agent**: AGENT
- **File**: `package.json`
- **Description**: Change `"typescript": "^6.0.0"` to `"typescript": "~6.0.3"` in devDependencies. TypeScript 6.0 is now stable and compatible with Next.js 16 (requires TypeScript 5.1.0+).
- **Commands**:
  - `npm install typescript@6.0.3`
  - `npx tsc --noEmit`
  - `npm run build`

#### 002-02: Update @types packages to match TypeScript version
- **Agent**: AGENT
- **File**: `package.json`
- **Description**: Ensure `@types/node`, `@types/react`, `@types/react-dom` are compatible with TypeScript 6.0. Update if necessary.
- **Commands**:
  - `npm install @types/node@22 @types/react@19 @types/react-dom@19`
  - `npx tsc --noEmit`

---

## Task 003: Add typecheck and improve lint scripts

- [ ] **Status**: PENDING
- **Related Files**:
  - `package.json`
- **Definition of Done**:
  - `typecheck` script added
  - `lint` script includes `--max-warnings=0` and targets all files
  - Scripts are consistent with CI workflow
- **Out of Scope**:
  - Adding new test scripts
  - Changing existing test behavior
- **Rules to Follow**:
  - Scripts should match CI execution
  - Use `--max-warnings=0` for strict linting
- **Advanced Coding Pattern**:
  - NPM scripts as CI/CD entry points
- **Anti-Patterns**:
  - Scripts that work differently locally vs CI
- **Imports/Exports**:
  - None affected
- **Depends On**: Task 001
- **Blocks**: None

### Subtasks

#### 003-01: Add typecheck script to package.json
- **Agent**: AGENT
- **File**: `package.json`
- **Description**: Add `"typecheck": "tsc --noEmit"` to the scripts section. This provides a fast type-check command without emitting files.
- **Commands**:
  - `npm run typecheck`

#### 003-02: Update lint script to include max-warnings flag
- **Agent**: AGENT
- **File**: `package.json`
- **Description**: Change `"lint": "eslint"` to `"lint": "eslint . --max-warnings=0"`. This ensures linting fails on warnings, matching CI behavior.
- **Commands**:
  - `npm run lint`

---

## Task 004: Resolve Vitest CJS deprecation warning

- [ ] **Status**: PENDING
- **Related Files**:
  - `vitest.config.ts`
  - `package.json`
- **Definition of Done**:
  - CJS deprecation warning no longer appears during test runs
  - Tests still pass after configuration change
- **Out of Scope**:
  - Migrating to different test framework
  - Changing test behavior
- **Rules to Follow**:
  - Prefer ESM configuration for Vitest
  - Maintain test compatibility
- **Advanced Coding Pattern**:
  - ESM-first configuration for modern Node.js
- **Anti-Patterns**:
  - Suppressing warnings without fixing root cause
- **Imports/Exports**:
  - None affected
- **Depends On**: None
- **Blocks**: None

### Subtasks

#### 004-01: Convert vitest.config.ts to ESM format
- **Agent**: AGENT
- **File**: `vitest.config.ts`
- **Description**: Rename `vitest.config.ts` to `vitest.config.mjs` and update to use ESM syntax. Change `import` statements to use `.js` extensions if needed, or set `"type": "module"` in package.json.
- **Commands**:
  - `npm run test:run`

#### 004-02: Add VITE_CJS_IGNORE_WARNING environment variable
- **Agent**: AGENT
- **File**: `package.json`
- **Description**: If ESM conversion is not feasible, add `VITE_CJS_IGNORE_WARNING=true` to the test script: `"test": "cross-env VITE_CJS_IGNORE_WARNING=true vitest"`. Requires installing `cross-env` if on Windows.
- **Commands**:
  - `npm run test:run`

---

## Task 005: Update sitemap dates and remove unused import

- [ ] **Status**: PENDING
- **Related Files**:
  - `app/sitemap.ts`
- **Definition of Done**:
  - Stale hardcoded dates replaced with current dates
  - Unused import removed
  - Sitemap generates correctly
- **Out of Scope**:
  - Changing sitemap structure
  - Adding dynamic date fetching from CMS
- **Rules to Follow**:
  - Use `new Date()` for current dates
  - Maintain static generation
- **Advanced Coding Pattern**:
  - Static metadata with current timestamps
- **Anti-Patterns**:
  - Hardcoded dates that become stale
- **Imports/Exports**:
  - Remove: `getAllSlugs` from `@/lib/blog-data`
- **Depends On**: Task 001 (for import removal)
- **Blocks**: None

### Subtasks

#### 005-01: Update static route lastModified dates
- **Agent**: AGENT
- **File**: `app/sitemap.ts`
- **Description**: Change `new Date('2025-01-15')` to `new Date()` for static routes. This ensures sitemap reflects current content freshness.
- **Commands**:
  - `npm run build`
  - `curl http://localhost:3000/sitemap.xml` (after dev server start)

#### 005-02: Update portfolio lastModified dates
- **Agent**: AGENT
- **File**: `app/sitemap.ts`
- **Description**: Change `new Date('2025-01-10')` to `new Date()` for portfolio entries. Consider using actual project completion dates if available in data.
- **Commands**:
  - `npm run build`

---

## Task 006: Consolidate or remove duplicate sanitization code

- [ ] **Status**: PENDING
- **Related Files**:
  - `app/lib/sanitize.ts`
  - `app/components/sanitized-content.tsx`
  - `app/__tests__/lib/sanitize.test.ts`
- **Definition of Done**:
  - Single source of truth for DOMPurify configuration
  - Tests updated to match consolidated implementation
  - No duplicate code
- **Out of Scope**:
  - Changing sanitization policy
  - Adding new allowed tags/attributes
- **Rules to Follow**:
  - Deep module pattern: export typed functions, keep data private
  - DDD: Sanitization is a bounded context
- **Advanced Coding Pattern**:
  - Deep module with single responsibility
- **Anti-Patterns**:
  - Duplicating configuration across files
  - Mixing client/server sanitization logic
- **Imports/Exports**:
  - Keep: `SanitizedContent` component
  - Evaluate: `sanitizeHtml` function
- **Depends On**: None
- **Blocks**: None

### Subtasks

#### 006-01: Audit usage of sanitizeHtml function
- **Agent**: AGENT
- **File**: All TypeScript/TSX files
- **Description**: Search for imports of `sanitizeHtml` from `@/lib/sanitize`. If unused, remove the file and test. If used, consolidate to use the component instead.
- **Commands**:
  - `grep -r "sanitizeHtml" app/ --include="*.ts" --include="*.tsx"`

#### 006-02: Remove unused sanitize.ts and its test
- **Agent**: AGENT
- **File**: `app/lib/sanitize.ts`, `app/__tests__/lib/sanitize.test.ts`
- **Description**: If `sanitizeHtml` is unused, delete both files. Update `vitest.config.ts` exclude patterns if needed.
- **Commands**:
  - `npm run test:run`
  - `npm run build`

#### 006-03: Consolidate DOMPurify config if both are used
- **Agent**: AGENT
- **File**: `app/lib/sanitize.ts`, `app/components/sanitized-content.tsx`
- **Description**: If both are used, move DOMPurify configuration to `sanitize.ts` and import it in the component. Update tests accordingly.
- **Commands**:
  - `npm run test:run -- app/__tests__/components/sanitized-content.test.tsx`
  - `npm run test:run -- app/__tests__/lib/sanitize.test.ts`

---

## Task 007: Improve ErrorBoundary for SSR safety

- [ ] **Status**: PENDING
- **Related Files**:
  - `app/components/error-boundary.tsx`
- **Definition of Done**:
  - ErrorBoundary works correctly during SSR
  - No `window` access before hydration
  - Accessible fallback UI
- **Out of Scope**:
  - Implementing full error logging service
  - Adding error reporting to external service
- **Rules to Follow**:
  - Use `useEffect` for client-only operations
  - Provide accessible error messages
- **Advanced Coding Pattern**:
  - React class component with lifecycle methods
- **Anti-Patterns**:
  - Accessing `window` during SSR
  - Using emoji for critical UI elements
- **Imports/Exports**:
  - Consider: `useEffect` from `react`
- **Depends On**: None
- **Blocks**: None

### Subtasks

#### 007-01: Replace window.location.reload with useEffect
- **Agent**: AGENT
- **File**: `app/components/error-boundary.tsx`
- **Description**: Move `window.location.reload()` into a `useEffect` hook to prevent SSR errors. Convert to functional component or add `useEffect` to class component.
- **Commands**:
  - `npm run test:run` (if tests exist for error boundary)
  - `npm run build`

#### 007-02: Replace emoji with accessible SVG or text
- **Agent**: AGENT
- **File**: `app/components/error-boundary.tsx`
- **Description**: Replace the emoji on line 41 with an SVG icon or text description. Emojis can have inconsistent rendering and accessibility issues.
- **Commands**:
  - `npm run build`

---

## Task 008: Document rate limiter limitations

- [ ] **Status**: PENDING
- **Related Files**:
  - `app/lib/rate-limiter.ts`
  - `README.md` or `docs/rate-limiting.md`
- **Definition of Done**:
  - Documentation explains in-memory limitations
  - Recommendations for production deployment
  - Edge runtime compatibility noted
- **Out of Scope**:
  - Implementing Redis-based rate limiter
  - Changing rate limiting logic
- **Rules to Follow**:
  - Document technical constraints clearly
  - Provide migration path for production
- **Advanced Coding Pattern**:
  - Documentation as part of module contract
- **Anti-Patterns**:
  - Undocumented in-memory state
  - Assuming single-instance deployment
- **Imports/Exports**:
  - None affected
- **Depends On**: None
- **Blocks**: None

### Subtasks

#### 008-01: Add JSDoc comments to rate-limiter module
- **Agent**: AGENT
- **File**: `app/lib/rate-limiter.ts`
- **Description**: Add comprehensive JSDoc comments explaining the in-memory limitation, serverless incompatibility, and recommendation to use Redis/Upstash for production.
- **Commands**:
  - `npm run build`

#### 008-02: Create rate limiting documentation
- **Agent**: AGENT
- **File**: `docs/rate-limiting.md` (new file)
- **Description**: Create documentation explaining the current implementation, its limitations, and recommended production alternatives. Include code examples for Redis/Upstash integration.
- **Commands**:
  - `npm run build`

---

## Task 009: Add Content-Security-Policy header

- [ ] **Status**: PENDING
- **Related Files**:
  - `next.config.ts`
- **Definition of Done**:
  - CSP header added to security headers
  - Inline scripts and styles work correctly
  - Analytics scripts are allowed
- **Out of Scope**:
  - Implementing nonce-based CSP
  - Adding other security headers
- **Rules to Follow**:
  - Start with report-only mode for testing
  - Allow Google Analytics domains
  - Allow inline styles for Tailwind
- **Advanced Coding Pattern**:
  - Security headers as configuration
- **Anti-Patterns**:
  - Overly permissive CSP (`default-src *`)
  - Breaking existing functionality
- **Imports/Exports**:
  - None affected
- **Depends On**: None
- **Blocks**: None

### Subtasks

#### 009-01: Add CSP header in report-only mode
- **Agent**: AGENT
- **File**: `next.config.ts`
- **Description**: Add `Content-Security-Policy-Report-Only` header to the headers configuration. Start with a permissive policy to test compatibility.
- **Commands**:
  - `npm run build`
  - `npm run dev` (test with browser DevTools CSP reports)

#### 009-02: Enforce CSP after testing
- **Agent**: HUMAN
- **File**: `next.config.ts`
- **Description**: After testing with report-only mode, switch to enforcing `Content-Security-Policy`. Monitor CSP violation reports in production.
- **Commands**:
  - `npm run build`

---

## Task 010: Implement real contact form backend

- [ ] **Status**: PENDING
- **Related Files**:
  - `app/actions/contact.ts`
  - `.env.example`
  - `README.md`
- **Definition of Done**:
  - Contact form sends email via Resend/Mailgun
  - Submissions stored in database or CRM
  - Environment variables documented
  - Error handling improved
- **Out of Scope**:
  - Building full CRM integration
  - Adding file uploads
- **Rules to Follow**:
  - Use environment variables for API keys
  - Never log PII
  - Provide user feedback on errors
- **Advanced Coding Pattern**:
  - Server Actions with external API integration
- **Anti-Patterns**:
  - Hardcoding API keys
  - Logging user data
- **Imports/Exports**:
  - Add: Resend or Mailgun SDK
- **Depends On**: None
- **Blocks**: Production deployment

### Subtasks

#### 010-01: Add email service environment variables
- **Agent**: AGENT
- **File**: `.env.example`
- **Description**: Add `RESEND_API_KEY` or `MAILGUN_API_KEY` to `.env.example`. Add `CONTACT_EMAIL_TO` for destination email.
- **Commands**:
  - `npm run build`

#### 010-02: Install email service SDK
- **Agent**: AGENT
- **File**: `package.json`
- **Description**: Install `resend` or `@mailgun/mailgun-js` as a dependency. Choose based on preference and pricing.
- **Commands**:
  - `npm install resend`
  - `npm run build`

#### 010-03: Implement email sending in contact action
- **Agent**: AGENT
- **File**: `app/actions/contact.ts`
- **Description**: Replace the simulated delay with actual email sending using the installed SDK. Include form data in email body. Handle errors gracefully.
- **Commands**:
  - `npm run test:run -- app/__tests__/actions/contact.test.ts`

#### 010-04: Add database storage for submissions
- **Agent**: AGENT
- **File**: `app/actions/contact.ts`
- **Description**: Add database storage (PostgreSQL, MongoDB, or Vercel Postgres) for contact submissions. Create a submissions table/collection.
- **Commands**:
  - `npm run build`

#### 010-05: Update contact action tests for real backend
- **Agent**: AGENT
- **File**: `app/__tests__/actions/contact.test.ts`
- **Description**: Mock the email service and database in tests. Verify that email sending and storage are called correctly.
- **Commands**:
  - `npm run test:run -- app/__tests__/actions/contact.test.ts`

---

## Task 011: Implement real newsletter subscription

- [ ] **Status**: PENDING
- **Related Files**:
  - `app/actions/newsletter.ts`
  - `.env.example`
- **Definition of Done**:
  - Newsletter subscriptions sent to Mailchimp/ConvertKit/Resend
  - Double opt-in implemented
  - Error handling improved
- **Out of Scope**:
  - Building full email marketing automation
  - Custom newsletter management system
- **Rules to Follow**:
  - Use environment variables for API keys
  - Implement double opt-in for compliance
  - Never log email addresses
- **Advanced Coding Pattern**:
  - Server Actions with third-party API integration
- **Anti-Patterns**:
  - Single opt-in (non-compliant)
  - Hardcoding API keys
- **Imports/Exports**:
  - Add: Mailchimp SDK or similar
- **Depends On**: None
- **Blocks**: Production deployment

### Subtasks

#### 011-01: Add newsletter service environment variables
- **Agent**: AGENT
- **File**: `.env.example`
- **Description**: Add `MAILCHIMP_API_KEY` and `MAILCHIMP_AUDIENCE_ID` (or equivalent for chosen service) to `.env.example`.
- **Commands**:
  - `npm run build`

#### 011-02: Install newsletter service SDK
- **Agent**: AGENT
- **File**: `package.json`
- **Description**: Install `@mailchimp/mailchimp_marketing` or similar SDK for chosen newsletter service.
- **Commands**:
  - `npm install @mailchimp/mailchimp_marketing`
  - `npm run build`

#### 011-03: Implement newsletter subscription in action
- **Agent**: AGENT
- **File**: `app/actions/newsletter.ts`
- **Description**: Replace simulated delay with actual newsletter subscription using the SDK. Implement double opt-in flow.
- **Commands**:
  - `npm run build`

#### 011-04: Add tests for newsletter integration
- **Agent**: AGENT
- **File**: `app/__tests__/actions/newsletter.test.ts` (new file)
- **Description**: Create test file for newsletter action. Mock the newsletter service API. Verify subscription is called correctly.
- **Commands**:
  - `npm run test:run -- app/__tests__/actions/newsletter.test.ts`

---

## Task 012: Add integration tests for contact/newsletter

- [ ] **Status**: PENDING
- **Related Files**:
  - `app/__tests__/integration/` (new directory)
- **Definition of Done**:
  - Integration tests for contact form submission
  - Integration tests for newsletter subscription
  - Tests mock external services
- **Out of Scope**:
  - End-to-end tests with real email services
  - UI-only tests
- **Rules to Follow**:
  - Mock external APIs
  - Test error scenarios
  - Verify rate limiting
- **Advanced Coding Pattern**:
  - Integration testing with mocked dependencies
- **Anti-Patterns**:
  - Testing with real API keys
  - Flaky tests due to external dependencies
- **Imports/Exports**:
  - Add: Vitest integration test utilities
- **Depends On**: Task 010, Task 011
- **Blocks**: None

### Subtasks

#### 012-01: Create integration test directory structure
- **Agent**: AGENT
- **File**: `app/__tests__/integration/`
- **Description**: Create `app/__tests__/integration/` directory. Add a setup file for integration test configuration.
- **Commands**:
  - `npm run test:run`

#### 012-02: Write contact form integration test
- **Agent**: AGENT
- **File**: `app/__tests__/integration/contact-integration.test.ts`
- **Description**: Write integration test that calls the contact action with valid data, mocks email service and database, and verifies both are called.
- **Commands**:
  - `npm run test:run -- app/__tests__/integration/contact-integration.test.ts`

#### 012-03: Write newsletter integration test
- **Agent**: AGENT
- **File**: `app/__tests__/integration/newsletter-integration.test.ts`
- **Description**: Write integration test that calls the newsletter action, mocks the newsletter service API, and verifies subscription is requested.
- **Commands**:
  - `npm run test:run -- app/__tests__/integration/newsletter-integration.test.ts`

---

## Task 013: Update README with project-specific information

- [ ] **Status**: PENDING
- **Related Files**:
  - `README.md`
- **Definition of Done**:
  - README describes actual project
  - Setup instructions accurate
  - Development workflow documented
- **Out of Scope**:
  - Adding extensive API documentation
  - Creating separate documentation site
- **Rules to Follow**:
  - Keep README concise
  - Link to detailed docs where needed
  - Include environment setup
- **Advanced Coding Pattern**:
  - README as project entry point
- **Anti-Patterns**:
  - Generic Next.js template content
  - Outdated instructions
- **Imports/Exports**:
  - None affected
- **Depends On**: None
- **Blocks**: None

### Subtasks

#### 013-01: Replace generic Next.js content
- **Agent**: AGENT
- **File**: `README.md`
- **Description**: Replace the generic `create-next-app` README content with project-specific information about Elevate Digital.
- **Commands**:
  - `npm run build`

#### 013-02: Add environment setup section
- **Agent**: AGENT
- **File**: `README.md`
- **Description**: Add section on environment setup, referencing `.env.example` and `ENV_SETUP.md`.
- **Commands**:
  - `npm run build`

#### 013-03: Add development workflow section
- **Agent**: AGENT
- **File**: `README.md`
- **Description**: Add section on development workflow: running dev server, running tests, linting, building.
- **Commands**:
  - `npm run build`

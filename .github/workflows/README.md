# GitHub Workflows

CI/CD pipeline configurations for GitHub Actions.

## Purpose

Defines automated workflows for continuous integration, testing, security auditing, and build verification triggered by push and pull request events.

## Workflows

- `ci.yml` - Main CI pipeline including lint, type checking, unit tests, security audit, E2E tests, and build verification

## Pipeline Stages

1. **Lint & Type Check** - ESLint, Prettier format check, TypeScript type checking
2. **Unit Tests** - Vitest unit test execution
3. **Security Audit** - npm audit for vulnerability scanning
4. **E2E Tests** - Playwright browser tests (Chromium)
5. **Build** - Production build verification with Next.js cache

## Configuration

- Node.js version: 22
- Concurrency: Enabled with automatic cancellation
- Timeout: 5-15 minutes per job depending on stage (audit: 5 min, lint/test: 10 min, e2e/build: 15 min)

## Notes

All workflows run on Ubuntu latest. Both E2E tests and build verification require lint, test, and audit jobs to pass first.

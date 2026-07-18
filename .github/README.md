# .github

GitHub configuration for continuous integration, workflows, and automation.

## Overview

This directory contains GitHub Actions workflows and configuration files that automate CI/CD processes for the firm project.

## Workflows

### CI Workflow (`workflows/ci.yml`)

Main continuous integration pipeline that runs on push and pull requests to the `main` branch.

**Jobs:**

- **Lint & Type Check** - Runs ESLint, Prettier format check, and TypeScript type checking
- **Unit Tests** - Executes Vitest unit tests in CI mode
- **Security Audit** - Runs `npm audit` to check for high-severity vulnerabilities
- **E2E Tests** - Runs Playwright end-to-end tests on Chromium (requires lint, test, and audit to pass)
- **Build** - Builds the Next.js application with caching (requires lint, test, and audit to pass)

**Configuration:**

- **Node Version**: 22 (configured via `NODE_VERSION` environment variable)
- **Concurrency**: Cancels in-progress runs for the same workflow and ref
- **Timeouts**: 5-15 minutes per job depending on complexity
- **Caching**: npm dependencies and Next.js build cache for faster builds

**Triggers:**

- Push to `main` branch
- Pull requests targeting `main` branch

## Workflow Dependencies

The CI workflow uses job dependencies to ensure quality gates:

1. Lint, test, and audit jobs run in parallel
2. E2E and build jobs only run after all three quality checks pass
3. Playwright reports are uploaded as artifacts (retained for 7 days)

## Local Testing

To test workflows locally before pushing:

```bash
# Install act (GitHub Actions local runner)
brew install act  # macOS
# or
choco install act  # Windows

# Run the CI workflow locally
act push
```

## Adding New Workflows

When adding new workflows:

1. Create a new `.yml` file in `workflows/`
2. Follow the existing naming convention (lowercase, hyphen-separated)
3. Use Node.js 22 for consistency
4. Set appropriate timeouts (5-15 minutes)
5. Configure concurrency for push-based workflows
6. Use `npm ci` for reproducible installs

## Related Documentation

- [Root README.md](../README.md) - Project overview and development setup
- [TODO.md](../TODO.md) - Task tracking and implementation status
- [package.json](../package.json) - npm scripts and dependencies

## Contributing

When modifying CI workflows:

1. Test changes locally using `act` or a feature branch
2. Ensure all jobs complete within their timeout limits
3. Update this README if adding new workflows or changing job structure
4. Consider impact on PR build times when adding new checks

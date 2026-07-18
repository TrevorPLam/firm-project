# scripts

Utility and migration scripts for the firm project.

## Table of Contents

- [Overview](#overview)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Overview

This directory contains TypeScript scripts for content migration, system verification, and development utilities. All scripts are executed using `tsx` for direct TypeScript execution.

## Usage

All scripts are run from the project root directory using `npx tsx`:

```bash
npx tsx scripts/<script-name>.ts
```

## Available Scripts

### migrate-content.ts

Migrates existing content from TypeScript data files to Sanity CMS.

**Purpose**: Transitions blog posts and case studies from local TypeScript modules to Sanity CMS for headless content management.

**Usage**:
```bash
npx tsx scripts/migrate-content.ts
```

**Requirements**:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `SANITY_API_WRITE_TOKEN` - Sanity API write token

**What it does**:
- Reads blog posts from `app/lib/blog-data.ts`
- Reads case studies from `app/lib/portfolio-data.ts`
- Creates or replaces documents in Sanity CMS
- Provides success/failure statistics for each content type

**Output**: Console log showing migration progress and summary statistics.

### verify-nonce-wiring.ts

Verification script that documents the original CSP nonce wiring issue in the internationalization middleware. The issue has since been fixed in `proxy.ts`.

**Purpose**: Documents and explains a Content Security Policy (CSP) nonce propagation issue that occurred when next-intl middleware returned early responses (e.g., locale redirects). The fix has been applied — `proxy.ts` now sets `x-nonce` on request headers before calling `intlMiddleware`.

**Usage**:
```bash
npx tsx scripts/verify-nonce-wiring.ts
```

**Requirements**: None (informational script only)

**What it does**:
- Analyzes the original CSP nonce wiring problem
- Explains affected paths (root redirects, locale redirects)
- Documents the previously broken code flow in `proxy.ts`
- Outlines the fix that has since been implemented

**Output**: Console analysis of the original nonce wiring issue and the applied fix.

**Related documentation**: See [docs/security.md](../docs/security.md) for implementation details.

## Environment Variables

### migrate-content.ts

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity CMS project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Sanity dataset name (default: production) |
| `SANITY_API_WRITE_TOKEN` | Yes | Sanity API token with write permissions |

### verify-nonce-wiring.ts

No environment variables required.

## Contributing

When adding new scripts to this directory:

1. Use TypeScript for type safety
2. Include a shebang comment with execution instructions
3. Add clear JSDoc comments for functions
4. Document required environment variables
5. Update this README with the new script details
6. Follow the existing code style (Prettier)

## License

UNLICENSED - Private project. All rights reserved. See main project [LICENSE](../LICENSE) file for details.

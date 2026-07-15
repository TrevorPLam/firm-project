# Environment Variables Setup

## Environment Variable Validation

This project uses a Zod-based environment variable validation module (`app/lib/env.ts`) to ensure type safety and fail-fast validation of environment variables at application startup.

**Key Features:**
- **Type-safe access:** All environment variables are accessed through typed getter functions
- **Schema validation:** Public and server environment variables are validated against Zod schemas
- **Fail-fast in production:** Required variables throw errors if missing in production
- **Graceful degradation:** Optional marketing integrations don't block local development

**Public Environment Variables** (exposed to client-side):
- `NEXT_PUBLIC_SITE_URL` - Site URL with default fallback
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 ID (optional)
- `NEXT_PUBLIC_GA_CONVERSION_ID` - Google Ads Conversion ID (optional)
- `NEXT_PUBLIC_GA_CONVERSION_LABEL` - Google Ads Conversion Label (optional)
- `NEXT_PUBLIC_ALGOLIA_APPLICATION_ID` - Algolia search app ID (optional)
- `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY` - Algolia search API key (optional)
- `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` - Algolia index name with default
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity CMS project ID (optional)
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset with default

**Server Environment Variables** (server-side only):
- `RESEND_API_KEY` - Resend email service API key (required in production)
- `CONTACT_EMAIL_TO` - Contact form destination email with default
- `RESEND_AUDIENCE_ID` - Resend newsletter audience ID (optional)
- `UPSTASH_REDIS_REST_URL` - Upstash Redis URL for rate limiting (optional)
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token for rate limiting (optional)
- `SANITY_API_READ_TOKEN` - Sanity API read token for preview (optional)
- `ALLOW_INDEXING` - Search engine indexing control (enum: true/false)
- `NODE_ENV` - Node environment (enum: development/production/test)
- `VERCEL_ENV` - Vercel deployment environment (enum: development/preview/production)
- `ENABLE_REACT_COMPILER` - React Compiler toggle (enum: true/false)

**Accessing Environment Variables:**
```typescript
import { getSiteUrl, getResendApiKey, isProduction } from '@/lib/env';

// Type-safe getters
const siteUrl = getSiteUrl();
const apiKey = getResendApiKey();
const prod = isProduction();
```

**Production Validation:**
The `validateProductionEnv()` function checks that required variables are present in production. Call this in your application entry point to fail fast if configuration is missing.

## Package Manager

This project uses **npm** as the package manager. All installation and dependency management should be done using npm commands.

**Important:** Use only npm with this repository. Do not use pnpm or yarn, as the lockfile is npm-specific and hybrid installs will cause dependency drift.

**Node Version:** Node.js 22.x is required (see `engines` field in package.json).

```bash
npm install
npm ci  # For CI/CD environments
```

## Tailwind CSS v3 Configuration

This project uses Tailwind CSS v3 with JavaScript configuration in `tailwind.config.mjs`. The typography plugin is loaded via `require("@tailwindcss/typography")` in the config file. PostCSS uses the standard `tailwindcss` and `autoprefixer` plugins.

## Quick Start

Copy the example file to create your local environment file:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual values.

```bash
# Site URL (for metadataBase)
NEXT_PUBLIC_SITE_URL=https://elevatedigital.com

# Search Engine Indexing Control
# On Vercel: Only allows indexing when VERCEL_ENV=production (not preview)
# On other platforms: Allows indexing when NODE_ENV=production
# ALLOW_INDEXING=true  # Optional: Force allow indexing
# ALLOW_INDEXING=false # Optional: Force deny indexing

# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Google Ads Conversion Tracking
NEXT_PUBLIC_GA_CONVERSION_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GA_CONVERSION_LABEL=conversion_label

# Optional: Other analytics services
# NEXT_PUBLIC_HOTJAR_ID=XXXXXX
# NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

## Site URL Configuration

The `NEXT_PUBLIC_SITE_URL` is used for the `metadataBase` in the root layout. This ensures that all relative metadata URLs (like Open Graph images, canonical URLs, etc.) resolve to the correct absolute URL.

- **Production:** Set to your production domain (e.g., `https://elevatedigital.com`)
- **Staging/Preview:** Set to your staging domain (e.g., `https://staging.elevatedigital.com`)
- **Local Development:** Can be omitted; defaults to `https://elevatedigital.com`

## Getting Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new account or select an existing one
3. Create a new property (GA4)
4. Go to Admin > Data Streams > Web
5. Copy the Measurement ID (format: G-XXXXXXXXXX)

## Conversion Tracking Setup

For Google Ads conversion tracking:
1. Go to [Google Ads](https://ads.google.com/)
2. Tools & Settings > Conversions
3. Create a new conversion action
4. Copy the Conversion ID and Label

## React Compiler Configuration

The React Compiler is available in Next.js 16 for automatic memoization of components and hooks. It is controlled via the `ENABLE_REACT_COMPILER` environment variable.

**Current Status:** Disabled by default due to a build failure with opengraph-image generation (vips_tracked: out of memory error).

**To enable the compiler:**
```bash
# In .env.local
ENABLE_REACT_COMPILER=true
```

**Build Performance Impact:**
- Without compiler: ~56 seconds (baseline)
- With compiler: Build fails due to memory issue

**Recommendation:** Keep the compiler disabled until the memory issue with opengraph-image generation is resolved. The environment-aware toggle allows for easy testing once the issue is fixed.

## E2E Testing

This project uses Playwright for end-to-end testing. The test suite is configured to run across multiple browser projects locally (chromium, firefox, webkit, Mobile Chrome, Mobile Safari), but CI runs a focused chromium-only smoke test for efficiency.

**Local Development (Full Matrix):**
```bash
# Run all e2e tests across all browser projects
npm run test:e2e

# Run specific spec files
npx playwright test app/e2e/home-page.spec.ts

# Run specific browser project only
npx playwright test --project=chromium
```

**CI (Chromium-Only Smoke):**
The CI workflow runs a focused smoke test using only chromium to reduce cost and runtime while still catching critical routing and navigation regressions. The smoke test uses `app/e2e/home-page.spec.ts` which validates core homepage functionality.

**E2E Build Process:**
Playwright tests use the built-in webServer configuration to automatically build and start the application before running tests (`npm run build && npm start`). This ensures tests run against a production-like build rather than dev mode.

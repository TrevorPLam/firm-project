# Environment Variables Setup

## Package Manager

This project uses **npm** as the package manager. All installation and dependency management should be done using npm commands.

**Important:** Use only npm with this repository. Do not use pnpm or yarn, as the lockfile is npm-specific and hybrid installs will cause dependency drift.

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

# firm

Modern Next.js 16 marketing website for Elevate Digital with internationalization, headless CMS integration, and AI-optimized SEO.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Install

Requires Node.js 22.x and npm 10.9.7.

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` with your configuration values (see [Environment Variables](#environment-variables)).

## Usage

### Development

```bash
npm run dev
```

Open http://localhost:3000

### Build

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 16.2.10 with App Router
- **React**: 19.2.4 with React Compiler support
- **Language**: TypeScript 6.0.3 with strict mode
- **Styling**: Tailwind CSS v3 with typography plugin
- **Internationalization**: next-intl for English/Spanish support
- **CMS**: Sanity CMS with next-sanity integration
- **Email**: Resend for transactional emails
- **Rate Limiting**: Upstash Redis
- **Search**: Local search with Algolia infrastructure
- **Animations**: Motion (Framer Motion)
- **Validation**: Zod for runtime validation
- **Testing**: Vitest (unit), Playwright (E2E)
- **Code Quality**: ESLint, Prettier

## Project Structure

```
app/
├── [locale]/          # Internationalized routes (en, es)
│   ├── about/         # About page
│   ├── blog/          # Blog listing and detail pages
│   ├── contact/       # Contact form
│   ├── faq/           # FAQ page
│   ├── legal/         # Legal pages (privacy, terms)
│   ├── portfolio/     # Portfolio and case studies
│   ├── pricing/       # Pricing page
│   ├── search/        # Search page
│   ├── services/      # Services pages
│   ├── layout.tsx     # Root layout with metadata
│   ├── page.tsx       # Homepage
│   └── error.tsx      # Error boundary
├── actions/           # Server actions (contact, newsletter)
├── api/               # API routes (draft, revalidate)
├── components/        # Reusable React components
├── csp-violation-report-endpoint/ # CSP violation reporting
├── e2e/               # Playwright E2E tests
├── i18n/              # Internationalization config
├── lib/               # Utility libraries and data modules
├── __tests__/         # Vitest unit tests
├── globals.css        # Global styles with Tailwind
├── not-found.tsx      # 404 page
├── opengraph-image.tsx # OG image generation
├── robots.ts          # Robots.txt configuration
└── sitemap.ts         # Sitemap generation
docs/                  # Technical documentation
scripts/               # Migration and utility scripts
public/                # Static assets
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

### Required for Production

- `RESEND_API_KEY` - Resend email service API key
- `NEXT_PUBLIC_SITE_URL` - Production domain (e.g., https://elevatedigital.com)

### Optional Marketing Integrations

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 Measurement ID
- `NEXT_PUBLIC_GA_CONVERSION_ID` - Google Ads Conversion ID
- `NEXT_PUBLIC_GA_CONVERSION_LABEL` - Google Ads Conversion Label
- `NEXT_PUBLIC_ALGOLIA_APPLICATION_ID` - Algolia search app ID
- `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY` - Algolia search API key
- `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` - Algolia index name (default: content)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity CMS project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset (default: production)
- `SANITY_API_READ_TOKEN` - Sanity API read token for preview
- `SANITY_REVALIDATE_SECRET` - Sanity webhook secret
- `CONTACT_EMAIL_TO` - Contact form destination email (default: contact@elevatedigital.com)
- `RESEND_AUDIENCE_ID` - Resend newsletter audience ID
- `UPSTASH_REDIS_REST_URL` - Upstash Redis URL for rate limiting
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token

### Search Engine Indexing

- `ALLOW_INDEXING` - Override environment-based indexing (true/false)

### React Compiler

- `ENABLE_REACT_COMPILER` - Enable React Compiler (currently disabled due to build issue)

See [ENV_SETUP.md](ENV_SETUP.md) for detailed configuration.

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run typecheck    # Run TypeScript type checking
npm test             # Run Vitest unit tests
npm run test:ui      # Run Vitest with UI
npm run test:run     # Run Vitest in CI mode
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run Playwright with UI
```

### Code Quality

- **ESLint**: Configured with Next.js and Prettier integration
- **Prettier**: Code formatting with Tailwind plugin
- **TypeScript**: Strict mode with additional type safety checks
- **CI**: GitHub Actions run lint, format check, typecheck, unit tests, security audit, E2E tests, and build verification

### Internationalization

The site supports English (en) and Spanish (es) via next-intl. Add translations in `messages/` directory.

### Content Management

Content is managed through Sanity CMS with a content port pattern for easy adapter swapping. See [docs/cms.md](docs/cms.md) for details.

## Testing

### Unit Tests (Vitest)

```bash
npm test              # Watch mode
npm run test:run      # Single run
npm run test:ui        # UI mode
```

### E2E Tests (Playwright)

```bash
npm run test:e2e       # Run all browser projects
npm run test:e2e:ui    # UI mode
```

E2E tests automatically build and start the application before running.

## Deployment

### Vercel (Recommended)

The project is optimized for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables

Ensure all required environment variables are set in your deployment platform. See [Environment Variables](#environment-variables) for the full list.

### Build Configuration

- **Node Version**: 22.x (specified in package.json engines)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm ci`

## Documentation

Comprehensive technical documentation is available in the `docs/` directory:

- [security.md](docs/security.md) - Security headers, CSP, HSTS, and vulnerability management
- [seo.md](docs/seo.md) - SEO strategy, AI crawler permissions, and GEO (Generative Engine Optimization)
- [cms.md](docs/cms.md) - Sanity CMS integration and content management
- [rate-limiting.md](docs/rate-limiting.md) - Rate limiting implementation with Upstash Redis
- [analytics.md](docs/analytics.md) - Analytics and tracking implementation
- [cro.md](docs/cro.md) - Conversion rate optimization strategies
- [marketing-site-research-2026.md](docs/marketing-site-research-2026.md) - Marketing site best practices research
- [dynamic-rendering-investigation.md](docs/dynamic-rendering-investigation.md) - Dynamic rendering investigation
- [monorepo-alignment.md](docs/monorepo-alignment.md) - Monorepo alignment notes
- [portfolio-assets-decision.md](docs/portfolio-assets-decision.md) - Portfolio assets decision

Additional documentation:

- [ENV_SETUP.md](ENV_SETUP.md) - Environment configuration and setup
- [TODO.md](TODO.md) - Task tracking and implementation status
- [llms.txt](public/llms.txt) - AI agent navigation guide (served at /llms.txt)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (Prettier)
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting
- Use conventional commit messages

### Code Review Process

- All PRs must pass CI checks (lint, format, typecheck, tests)
- Security-sensitive changes require additional review
- Breaking changes should be documented in the PR description

## License

UNLICENSED - Private project. All rights reserved.

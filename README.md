# Firm

A modern Next.js marketing website with internationalization, CMS integration, and comprehensive SEO features. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 3.x.

## Features

### Core Technology
- **Modern Stack**: Next.js 16 with App Router, React 19, TypeScript, and Tailwind CSS 3.x
- **Performance**: Optimized fonts, static generation, server components, and React Compiler (opt-in)
- **Build System**: Webpack-based build with Next.js 16 caching capabilities

### Internationalization
- **Multi-language Support**: English and Spanish with next-intl
- **Locale-based Routing**: Automatic locale detection and URL-based language switching
- **Translation Management**: JSON-based translation files in `messages/`

### Content Management
- **Headless CMS**: Sanity CMS integration for blog posts, case studies, services, and pages
- **Search Integration**: Algolia search with react-instantsearch for site-wide search
- **Content Portability**: Content adapters for seamless CMS integration

### Security & Performance
- **Content Security Policy**: CSP headers with nonce-based script loading
- **Rate Limiting**: Upstash Redis-based distributed rate limiting for serverless environments
- **Input Sanitization**: sanitize-html for XSS prevention
- **Security Headers**: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Bot Protection**: Honeypot fields and IP-based rate limiting on forms

### Forms & Email
- **Contact Form**: Server actions with Zod validation, rate limiting, and Resend email integration
- **Newsletter**: Subscription form with Resend audience management
- **Progressive Enhancement**: useActionState support for enhanced form handling

### SEO & Analytics
- **Google Analytics 4**: Integration ready with measurement ID configuration
- **Dynamic Sitemap**: Auto-generated sitemap with locale alternates
- **Robots.txt**: AI crawler permissions for GEO (Generative Engine Optimization)
- **Structured Data**: Schema.org markup for organization, services, FAQ, articles, and breadcrumbs
- **Open Graph**: Dynamic OG image generation and metadata

### Testing & Quality
- **Unit Tests**: Vitest with React Testing Library for component and action testing
- **E2E Tests**: Playwright for cross-browser testing (Chrome, Firefox, Safari, Mobile)
- **Type Safety**: Strict TypeScript with advanced checks (noUncheckedIndexedAccess, exactOptionalPropertyTypes)
- **Linting**: ESLint with Next.js config and Zod plugin
- **Code Formatting**: Prettier with Tailwind CSS plugin

### UI/UX
- **Animations**: Motion library for smooth transitions and scroll reveals
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Typography**: Tailwind Typography plugin for rich content styling
- **Components**: Reusable component library with error boundaries

## Getting Started

### Prerequisites

- **Node.js**: 22.x (exact version required: >=22.0.0 <23.0.0)
- **npm**: 10.9.7 (package manager specified in package.json)
- **Git**: For version control

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values. Required and optional environment variables:

#### Required Variables
- `NEXT_PUBLIC_SITE_URL` - Your production domain (e.g., https://yourdomain.com)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 Measurement ID (G-XXXXXXXXXX)

#### Email Service (Resend)
- `RESEND_API_KEY` - Resend API key for email sending
- `CONTACT_EMAIL_TO` - Destination email for contact form submissions
- `RESEND_AUDIENCE_ID` - Audience ID for newsletter subscriptions

#### Rate Limiting (Upstash Redis)
- `UPSTASH_REDIS_REST_URL` - Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis REST token

#### Search (Algolia)
- `NEXT_PUBLIC_ALGOLIA_APPLICATION_ID` - Algolia application ID
- `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY` - Algolia search API key
- `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` - Algolia index name

#### CMS (Sanity)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name
- `SANITY_API_READ_TOKEN` - Sanity API read token for preview

#### Optional Variables
- `ENABLE_REACT_COMPILER` - Set to 'true' to enable React Compiler (currently disabled due to memory issues)
- `NEXT_PUBLIC_GA_CONVERSION_ID` - Google Ads Conversion ID
- `NEXT_PUBLIC_GA_CONVERSION_LABEL` - Google Ads Conversion Label

See [ENV_SETUP.md](ENV_SETUP.md) for detailed setup instructions.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

The development server supports:
- Hot Module Replacement (HMR)
- Fast Refresh
- TypeScript error checking
- ESLint warnings

## Development Workflow

### Available Scripts

#### Development
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (uses webpack)
- `npm run start` - Start production server

#### Code Quality
- `npm run lint` - Run ESLint with strict warnings (max-warnings=0)
- `npm run typecheck` - Run TypeScript type checking with noEmit

#### Testing
- `npm run test` - Run Vitest in watch mode
- `npm run test:run` - Run Vitest once (for CI)
- `npm run test:ui` - Run Vitest with UI interface
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run Playwright with UI interface

### Code Quality

Before committing, ensure all checks pass:

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
```

The project uses:
- **Strict ESLint**: Zero warnings policy with Next.js and Zod plugins
- **Strict TypeScript**: Advanced type checking including noUncheckedIndexedAccess and exactOptionalPropertyTypes
- **Prettier**: Code formatting with Tailwind CSS plugin
- **Pre-commit Hooks**: CI pipeline enforces quality checks

### Testing

#### Unit Tests (Vitest)
- **Framework**: Vitest with React Testing Library
- **Location**: `app/__tests__/`
- **Setup**: `app/__tests__/setup.ts` configures test environment
- **Coverage**: Tests components, server actions, and utility functions
- **Features**: jsdom environment, global test utilities, CSS support

#### E2E Tests (Playwright)
- **Framework**: Playwright
- **Location**: `app/e2e/`
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Features**: 
  - Cross-browser testing
  - Automatic server startup for tests
  - Screenshot on failure
  - Trace on retry
  - HTML reporter
- **CI Configuration**: 2 retries in CI, single worker for stability

#### Test Coverage
Current E2E test suites:
- `home-page.spec.ts` - Homepage functionality
- `blog.spec.ts` - Blog listing page
- `blog-detail.spec.ts` - Individual blog post pages
- `blog-navigation.spec.ts` - Blog navigation and filtering
- `portfolio-detail.spec.ts` - Portfolio case study pages

## Project Structure

```
app/
├── [locale]/                    # Internationalized routes
│   ├── about/                   # About page
│   ├── blog/                    # Blog section with dynamic routes
│   ├── contact/                 # Contact form page
│   ├── faq/                     # FAQ page
│   ├── legal/                   # Legal pages (privacy, terms)
│   ├── portfolio/               # Portfolio/case studies with dynamic routes
│   ├── pricing/                 # Pricing page
│   ├── search/                  # Search page
│   ├── services/                # Services pages
│   ├── layout.tsx               # Locale-specific layout
│   └── page.tsx                 # Homepage
├── __tests__/                   # Unit tests
│   ├── actions/                 # Server action tests
│   ├── components/              # Component tests
│   ├── lib/                     # Utility function tests
│   └── setup.ts                 # Test configuration
├── actions/                     # Server Actions
│   ├── contact.ts               # Contact form submission
│   └── newsletter.ts            # Newsletter subscription
├── components/                   # React components
│   ├── analytics.tsx            # Google Analytics integration
│   ├── contact-form.tsx         # Contact form component
│   ├── copyright-year.tsx       # Dynamic copyright year
│   ├── error-boundary.tsx       # Error boundary component
│   ├── footer.tsx               # Site footer
│   ├── language-switcher.tsx    # Language switcher
│   ├── loading.tsx              # Loading component
│   ├── navigation.tsx           # Site navigation
│   ├── newsletter-form.tsx     # Newsletter form
│   ├── page-transition.tsx      # Page transition animations
│   ├── sanitized-content.tsx    # Sanitized HTML content
│   ├── scroll-reveal.tsx         # Scroll reveal animations
│   ├── search-bar.tsx           # Search bar component
│   └── social-share.tsx         # Social share buttons
├── e2e/                         # E2E tests (Playwright)
│   ├── blog-detail.spec.ts
│   ├── blog-navigation.spec.ts
│   ├── blog.spec.ts
│   ├── home-page.spec.ts
│   └── portfolio-detail.spec.ts
├── lib/                         # Utility functions and helpers
│   ├── blog-data.ts             # Blog data management
│   ├── cms-client.ts            # Sanity CMS client
│   ├── content/                 # Content adapters
│   ├── content-port.ts          # Content portability layer
│   ├── content-sanitizer.ts     # HTML sanitization
│   ├── content-types.ts         # Content type schemas
│   ├── ip-utils.ts              # IP address utilities
│   ├── nonce-provider.tsx       # CSP nonce provider
│   ├── nonce.ts                 # CSP nonce utilities
│   ├── og-image-helper.tsx      # OG image generation helpers
│   ├── portfolio-data.ts        # Portfolio data management
│   ├── rate-limiter.ts          # Rate limiting implementation
│   ├── schema.ts                # Structured data schemas
│   ├── search-data.ts           # Search data aggregation
│   └── site-config.ts           # Site configuration
├── csp-violation-report-endpoint/ # CSP violation reporting
├── globals.css                  # Global styles
├── not-found.tsx                # 404 page
├── opengraph-image.tsx          # Dynamic OG image generation
├── robots.ts                    # Robots.txt configuration
├── sitemap.ts                   # Dynamic sitemap generation
├── favicon.ico                  # Site favicon
docs/                           # Documentation
├── analytics.md                # Analytics implementation guide
├── cms.md                      # CMS integration guide
├── cro.md                      # Conversion rate optimization
├── marketing-site-research-2026.md # Research documentation
├── rate-limiting.md            # Rate limiting implementation
├── security.md                 # Security practices
└── seo.md                      # SEO best practices
i18n/                           # Internationalization configuration
├── navigation.ts               # I18n navigation helpers
├── request.ts                  # I18n request configuration
└── routing.ts                  # I18n routing configuration
messages/                       # Translation files
├── en.json                     # English translations
└── es.json                     # Spanish translations
scripts/                        # Utility scripts
└── migrate-content.ts          # Content migration script
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Vercel automatically:
- Handles build optimization
- Provides CDN edge caching
- Supports serverless functions
- Offers preview deployments
- Integrates with GitHub for CI/CD

### Other Platforms

For other platforms (Netlify, AWS, Cloudflare, etc.), ensure you:
1. Set the appropriate environment variables
2. Configure the build command: `npm run build`
3. Set the output directory: `.next`
4. Handle serverless function deployment if needed
5. Configure CDN caching for static assets

### Environment Variables in Production

Required production environment variables:
- `NEXT_PUBLIC_SITE_URL` - Your production domain
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - GA4 measurement ID
- `RESEND_API_KEY` - Email service API key
- `CONTACT_EMAIL_TO` - Contact form destination
- `RESEND_AUDIENCE_ID` - Newsletter audience ID
- `UPSTASH_REDIS_REST_URL` - Redis URL for rate limiting
- `UPSTASH_REDIS_REST_TOKEN` - Redis token for rate limiting
- `NEXT_PUBLIC_ALGOLIA_APPLICATION_ID` - Algolia app ID
- `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY` - Algolia search key
- `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` - Algolia index name
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset
- `SANITY_API_READ_TOKEN` - Sanity read token

### CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

**Triggers on:**
- Push to main branch
- Pull requests to main branch

**Jobs:**
1. **Lint & Type Check** - Runs ESLint and TypeScript type checking
2. **Unit Tests** - Runs Vitest unit tests
3. **Build** - Builds the application with caching

**Features:**
- Automatic cancellation of outdated workflows
- Node.js 22 environment
- npm dependency caching
- Next.js build caching
- Parallel job execution

## Documentation

### Setup & Configuration
- [ENV_SETUP.md](ENV_SETUP.md) - Detailed environment variable setup guide
- [TODO.md](TODO.md) - Development task tracking and roadmap
- [docs/monorepo-alignment.md](docs/monorepo-alignment.md) - Future monorepo migration conventions

### Feature Documentation
- [docs/analytics.md](docs/analytics.md) - Analytics implementation guide (GA4, conversion tracking)
- [docs/cms.md](docs/cms.md) - Sanity CMS integration and content management
- [docs/cro.md](docs/cro.md) - Conversion rate optimization strategies
- [docs/rate-limiting.md](docs/rate-limiting.md) - Rate limiting implementation and production recommendations
- [docs/security.md](docs/security.md) - Security best practices and CSP configuration
- [docs/seo.md](docs/seo.md) - SEO best practices, structured data, and GEO
- [docs/marketing-site-research-2026.md](docs/marketing-site-research-2026.md) - Research documentation and insights

## Key Features Deep Dive

### Internationalization (i18n)
The project uses next-intl for comprehensive internationalization:
- **Supported Locales**: English (en), Spanish (es)
- **Routing**: Locale-based URL structure (e.g., /en/about, /es/about)
- **Translation Files**: JSON files in `messages/` directory
- **Configuration**: `i18n/` directory contains routing, request, and navigation config
- **Components**: Language switcher component for user-initiated locale changes

### Content Management with Sanity CMS
Sanity CMS integration provides:
- **Blog Posts**: Full-featured blog with categories, authors, and rich content
- **Case Studies**: Portfolio items with client information, results, and testimonials
- **Services**: Service pages with descriptions and benefits
- **Pages**: Static content pages with SEO metadata
- **Preview Mode**: Draft content preview with API token authentication
- **Type Safety**: Zod schemas for all content types

### Search Functionality
Algolia integration provides:
- **Site-wide Search**: Search across blog posts, portfolio, and pages
- **Instant Results**: Real-time search with react-instantsearch
- **Faceted Search**: Filter by content type (blog, portfolio, page)
- **Search Data**: Aggregated search index from multiple sources

### Security Implementation
Comprehensive security measures:
- **Content Security Policy**: Nonce-based CSP with strict script loading
- **Rate Limiting**: Upstash Redis for distributed rate limiting
- **Input Sanitization**: sanitize-html for XSS prevention
- **Security Headers**: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Bot Protection**: Honeypot fields and IP-based identification
- **CSP Violation Reporting**: Endpoint for monitoring CSP violations

### SEO & Structured Data
Advanced SEO features:
- **Dynamic Sitemap**: Auto-generated with locale alternates
- **Robots.txt**: AI crawler permissions for GEO (OpenAI, Anthropic, Perplexity, Google)
- **Structured Data**: Schema.org markup for:
  - Organization
  - Services
  - FAQ pages
  - Articles
  - Breadcrumbs
  - How-to guides
- **Open Graph**: Dynamic OG image generation
- **Meta Tags**: Comprehensive metadata for social sharing

## Architecture & Design Patterns

### Domain-Driven Design (DDD)
The codebase follows DDD principles:
- **Bounded Contexts**: Clear separation of concerns (CMS, search, rate limiting)
- **Deep Modules**: Private implementation details with public typed interfaces
- **Content Portability**: Adapter pattern for CMS integration
- **Single Source of Truth**: Centralized data management

### Server Actions
Next.js Server Actions for form handling:
- **Contact Form**: Validation, rate limiting, email sending
- **Newsletter**: Subscription management with audience integration
- **Progressive Enhancement**: useActionState support
- **Error Handling**: Comprehensive error logging and user feedback

### Component Architecture
React component best practices:
- **Server Components**: Default for performance
- **Client Components**: Only when necessary (interactivity)
- **Error Boundaries**: Graceful error handling
- **Loading States**: Optimistic UI updates
- **Composition**: Reusable, composable components

## Troubleshooting

### Common Issues

**Build fails with "out of memory" error:**
- The React Compiler is currently disabled due to memory issues with OG image generation
- Keep `ENABLE_REACT_COMPILER=false` in your environment

**Rate limiting not working:**
- Ensure Upstash Redis credentials are configured
- Check that `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set
- The system gracefully degrades if Redis is unavailable

**Email not sending:**
- Verify Resend API key is configured
- Check that `CONTACT_EMAIL_TO` is set to a valid email
- Ensure Resend audience ID is set for newsletter functionality

**Search not working:**
- Verify Algolia credentials are configured
- Check that the Algolia index is properly set up
- Ensure search data is being indexed correctly

**CMS content not loading:**
- Verify Sanity project ID and dataset are configured
- Check that API read token is set for preview mode
- Ensure content types match the Zod schemas

### Development Issues

**TypeScript errors:**
- Run `npm run typecheck` to see detailed errors
- The project uses strict TypeScript settings
- Check for missing imports or incorrect types

**ESLint errors:**
- Run `npm run lint` to see detailed errors
- The project has zero warnings policy
- Fix all linting errors before committing

**Test failures:**
- Run `npm run test:run` for unit tests
- Run `npm run test:e2e` for E2E tests
- Check test output for specific failure reasons

## Contributing

### Development Workflow
1. Create a feature branch from main
2. Make your changes with comprehensive tests
3. Run quality checks: `npm run typecheck && npm run lint && npm run test:run && npm run build`
4. Commit with clear, descriptive messages
5. Push and create a pull request
6. Address review feedback
7. Merge after CI approval

### Code Style
- Follow existing code patterns and conventions
- Use TypeScript for all new code
- Add JSDoc comments for complex functions
- Write tests for new features and bug fixes
- Update documentation as needed

## Performance Optimization

### Build Performance
- Next.js 16 caching disabled due to route params issue
- Webpack build with optimization
- Incremental TypeScript compilation
- Dependency caching in CI

### Runtime Performance
- Server components by default
- Static generation where possible
- Image optimization with Next.js Image
- Font optimization with next/font
- Code splitting and lazy loading

### Monitoring
- Google Analytics 4 integration
- CSP violation reporting
- Rate limiting metrics
- Error logging in server actions

## License

Private project - All rights reserved

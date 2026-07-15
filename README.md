# Elevate Digital

A modern Next.js website for Elevate Digital, built with Next.js 16, React 19, TypeScript, and Tailwind CSS 3.x.

## Features

- **Modern Stack**: Next.js 16 with App Router, React 19, TypeScript, and Tailwind CSS 3.x
- **Performance**: Optimized fonts, static generation, and server components
- **Security**: Content Security Policy, rate limiting, and input sanitization
- **Forms**: Contact form and newsletter subscription with Resend integration
- **Testing**: Vitest for unit tests, Playwright for E2E tests
- **Analytics**: Google Analytics 4 integration ready
- **SEO**: Dynamic sitemap, Open Graph metadata, and structured data

## Getting Started

### Prerequisites

- Node.js 22.x
- npm (required - this project uses npm as the package manager)

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

Edit `.env.local` with your actual values. See [ENV_SETUP.md](ENV_SETUP.md) for detailed instructions on:
- Site URL configuration
- Google Analytics 4 setup
- Email service (Resend) configuration
- Newsletter audience setup

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Development Workflow

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with strict warnings
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run Vitest in watch mode
- `npm run test:run` - Run Vitest once
- `npm run test:ui` - Run Vitest with UI
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run Playwright with UI

### Code Quality

Before committing, ensure all checks pass:

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
```

### Testing

- **Unit Tests**: Vitest with React Testing Library for component and action testing
- **E2E Tests**: Playwright for full user flow testing
- Test files are located in `app/__tests__/`

## Project Structure

```
app/
├── [locale]/           # Internationalized routes (about, blog, contact, portfolio)
├── __tests__/          # Test files
├── actions/            # Server Actions (contact, newsletter)
├── components/         # React components
├── lib/                # Utility functions and helpers
├── i18n/               # Internationalization configuration
├── messages/           # Translation files (en.json, es.json)
├── sitemap.ts          # Dynamic sitemap generation
├── robots.ts           # Robots.txt configuration
└── layout.tsx          # Root layout
i18n/                   # I18n routing and request configuration
proxy.ts                # Development proxy configuration
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

For other platforms, ensure you set the appropriate environment variables for your hosting provider.

## Documentation

- [ENV_SETUP.md](ENV_SETUP.md) - Detailed environment variable setup
- [docs/rate-limiting.md](docs/rate-limiting.md) - Rate limiting implementation and production recommendations
- [TODO.md](TODO.md) - Development task tracking

## License

Private project - All rights reserved

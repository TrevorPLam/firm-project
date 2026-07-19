# AGENTS.md

Modern Next.js 16 marketing website for Elevate Digital with internationalization (English/Spanish), headless CMS integration (Sanity), and AI-optimized SEO. Deployed to Vercel.

## Setup
- Install: `npm install`
- Copy env: `cp .env.example .env.local`
- Run dev: `npm run dev`
- Build: `npm run build`
- Test (unit): `npm test`
- Test (E2E): `npm run test:e2e`
- Lint: `npm run lint`
- Format: `npm run format`
- Typecheck: `npm run typecheck`

## Project structure
- `app/` — Next.js App Router with internationalized routes, server actions, API routes, components, and utilities
- `docs/` — Technical documentation (security, SEO, CMS, rate limiting, analytics)
- `scripts/` — Migration and utility scripts
- `messages/` — Translation files (en.json, es.json)
- `public/` — Static assets

## Internationalization
- Supported locales: English (en), Spanish (es)
- Translations stored in `messages/` directory
- Use next-intl for all user-facing text
- When adding new content, add translations for both locales

## Code style
- Prettier owns formatting — run `npm run format` rather than hand-fixing
- ESLint with `--max-warnings=0` — zero tolerance for lint errors
- TypeScript strict mode enabled
- Use Server Components by default, `'use client'` only when interactivity needed
- Tailwind CSS for styling with custom design tokens in `globals.css`

## Testing
- Unit tests: Vitest in `app/__tests__/` — run `npm test`
- E2E tests: Playwright in `app/e2e/` — run `npm run test:e2e`
- Add tests for new features, especially server actions and API routes

## Definition of done
- `npm run lint` passes with zero warnings
- `npm run format:check` passes
- `npm run typecheck` passes
- `npm test` passes
- `npm run test:e2e` passes
- `npm run build` succeeds
- Conventional commit message (e.g., `feat: add contact form validation`)

## Boundaries

### Always
- Run full check suite before marking task done: `npm run lint && npm run format:check && npm run typecheck && npm test && npm run test:e2e && npm run build`
- Use Prettier for all formatting — never hand-format against its rules
- Add translations for both locales when adding user-facing content
- Sanitize all HTML from CMS using `sanitize-html` utilities
- Apply rate limiting to form submissions using Upstash Redis

### Ask first
- Changing environment variables or adding new ones (update .env.example too)
- Modifying CSP configuration or security headers
- Changing CMS schema or content structure
- Modifying rate limiting rules or thresholds
- Changing internationalization configuration or adding new locales
- Modifying SEO metadata or robots.txt configuration

### Never
- Commit `.env` files, API keys, or secrets
- Deploy directly to production from an agent session — use Vercel's git integration
- Disable CSP nonce or relax security policies
- Remove input sanitization from CMS content
- Hardcode locale-specific content — use next-intl translation system
- Auto-generate this file's content via an agent's `/init` — edit it by hand

## Gotchas
- React Compiler is currently disabled due to build issues — do not enable without testing
- Sanity CMS uses content port pattern for adapter swapping — modify `lib/content-port.ts` if changing CMS
- CSP nonce is per-request — do not cache or reuse nonces across requests
- Rate limiting uses Upstash Redis — ensure credentials are configured in development
- E2E tests automatically build and start the app — allow extra time for test runs

## Git workflow
- Branch naming: `type/short-description` (e.g., `feat/contact-form`, `fix/rate-limit`)
- Commits: Conventional Commits (feat, fix, docs, style, refactor, test, chore)
- Merge strategy: Squash merge via Pull Request

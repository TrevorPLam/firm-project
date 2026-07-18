# docs

Technical documentation for the Elevate Digital marketing site, covering security, SEO, CMS integration, and implementation details.

## Table of Contents

- [Overview](#overview)
- [Documentation Files](#documentation-files)
- [Key Topics](#key-topics)
- [Related Documentation](#related-documentation)

## Overview

The `docs/` directory contains comprehensive technical documentation for the Next.js marketing site. These documents provide implementation details, architectural decisions, and operational guidance for developers and maintainers.

## Documentation Files

### Core Infrastructure

- **[security.md](security.md)** - Security headers, CSP configuration, HSTS implementation, input sanitization, and vulnerability management
- **[rate-limiting.md](rate-limiting.md)** - Rate limiting implementation with Upstash Redis for API endpoints and form submissions
- **[analytics.md](analytics.md)** - Analytics and tracking implementation with Google Analytics 4 and conversion tracking

### Content Management

- **[cms.md](cms.md)** - Sanity CMS integration guide, content port pattern, migration scripts, and visual editing setup

### Search & Optimization

- **[seo.md](seo.md)** - SEO strategy, AI crawler permissions, Generative Engine Optimization (GEO), and llms.txt configuration
- **[cro.md](cro.md)** - Conversion rate optimization strategies and implementation guidance

### Research & Decisions

- **[marketing-site-research-2026.md](marketing-site-research-2026.md)** - Comprehensive research on marketing site best practices, GEO, and AI visibility
- **[dynamic-rendering-investigation.md](dynamic-rendering-investigation.md)** - Investigation into dynamic rendering requirements for CSP nonce security
- **[monorepo-alignment.md](monorepo-alignment.md)** - Monorepo structure alignment and architectural decisions
- **[portfolio-assets-decision.md](portfolio-assets-decision.md)** - Decision documentation for portfolio asset management strategy

## Key Topics

### Security

- **CSP Nonce**: Per-request nonce generation for strict Content Security Policy
- **HSTS**: HTTP Strict Transport Security with preload eligibility
- **Input Sanitization**: Server-side HTML sanitization using `sanitize-html`
- **Dependency Management**: Automated security audits via CI pipeline

### SEO & AI Visibility

- **AI Crawler Permissions**: Explicit allowlist for GPTBot, ClaudeBot, PerplexityBot, and others
- **Generative Engine Optimization (GEO)**: Content optimization for AI-powered search engines
- **llms.txt**: AI-readable content summary for Business-to-Agent (B2A) interactions
- **Structured Data**: JSON-LD schema for organization, FAQ, and breadcrumb markup

### Content Management

- **Content Port Pattern**: Abstraction layer for CMS adapter swapping
- **Sanity CMS**: Headless CMS integration with next-sanity
- **Live Content API**: Real-time content updates and cache revalidation
- **Migration Scripts**: Automated content migration from local data to CMS

### Performance & Reliability

- **Rate Limiting**: Upstash Redis-based rate limiting for form submissions
- **Caching Strategies**: CDN vs API, time-based vs tag-based revalidation
- **Image Optimization**: Next.js Image component with Sanity CDN integration

## Related Documentation

- [Root README](../README.md) - Project overview, setup, and development guide
- [app/README.md](../app/README.md) - App directory structure and component documentation
- [ENV_SETUP.md](../ENV_SETUP.md) - Environment configuration and setup
- [TODO.md](../TODO.md) - Task tracking and implementation status

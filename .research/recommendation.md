Based on current best practices for AI-assisted development—rules files, layered static analysis, incremental review, and context management—I've refined the structure and am now writing out the full guide directly below. [nx](https://nx.dev/blog/practical-guide-effective-ai-coding)

***

# AI Coding Reference Guide
### Technical Standards for Website Development, Architecture, and Repository Operations

**Purpose:** This is the single technical source of truth for building, extending, and maintaining the marketing website platform. It exists primarily to give AI coding agents (Cursor, Windsurf) and the solo developer a consistent, verifiable standard to code against. This document covers software development only — no firm strategy, sales, or client-success material.

**How to use this guide:** Reference the relevant section before starting a coding session. Encode the *Agent Operating Rules* (Part III) directly into `.cursorrules` or Windsurf's rules file so every session inherits them automatically without needing to be re-explained. [buildfastwith](https://buildfastwith.ai/ai-coding-best-practices)

***

## Part I — Foundation

### 1. Guide Charter
- Purpose: single technical reference for repo architecture, coding standards, and AI agent behavior.
- Scope: code, schema, environments, releases, testing, security, performance, SEO/analytics implementation.
- Out of scope: brand strategy, sales, client contracts, pricing, personal notes.
- Owner: founder (sole maintainer). Version and change history logged at the top of this file.
- Exceptions: any deviation from a stated rule must be written inline as a code comment explaining why, not silently skipped.

### 2. Engineering Principles
1. **Verify before generating.** Never let an AI agent invent a schema field, API route, or environment variable — it must check the actual source file first.
2. **Small, reversible changes.** Every change should be small enough to review in one sitting and easy to roll back. [nx](https://nx.dev/blog/practical-guide-effective-ai-coding)
3. **Consistency over cleverness.** Match existing patterns; boring, idiomatic code is easier for both humans and AI to maintain. [dev](https://dev.to/ranndy360/ai-coding-best-practices-in-2025-4eel)
4. **Typed contracts everywhere.** Content, forms, and API boundaries are validated with TypeScript and Zod, not assumed.
5. **Security and accessibility are default requirements**, not later add-ons.
6. **Every release is reversible** — no production change ships without a rollback path.

### 3. System Context Diagram
```text
Visitor
  -> Next.js marketing website (App Router)
  -> Sanity CMS (content)
  -> Algolia (search)
  -> Resend (email/forms)
  -> Upstash (rate limiting)
  -> Consent + tag layer
  -> GA4 / advertising pixels
  -> Vercel (hosting/deployment)
```

***

## Part II — Repository Governance

### 4. Repository Structure and Naming
- Define a fixed top-level directory layout (`app/`, `components/`, `lib/`, `content/schemas/`, `docs/`, `tests/`) and do not deviate without updating this guide.
- File and component naming: PascalCase for components, camelCase for functions/variables, kebab-case for route segments.

### 5. Source-of-Truth Map

| Artifact | Canonical Location | Notes |
|---|---|---|
| Application code | GitHub repo, `main` branch | Production baseline |
| Published content | Sanity CMS | Not the local repo |
| Secrets | Password manager / Vercel env vars | Never committed to git |
| Schema definitions | `content/schemas/` in repo | Source for CMS + TypeScript types |
| Design tokens | `tailwind.config` / design system file | Single source for styling values |

### 6. Branching, Commit, and PR Conventions
- Trunk-based: short-lived feature branches off `main`, merged via PR only.
- Commit messages: imperative mood, one logical change per commit (`fix: sanitize contact form input`).
- PR description must state what changed, why, and how it was tested.

### 7. Dependency Management
- Lockfile committed and never manually edited.
- Dependency updates run through CI before merge; security patches applied within 7 days of disclosure.
- Avoid adding a new dependency when the standard library or an existing dependency already solves the problem.

***

## Part III — AI Agent Operating Rules

This is the most important part of the guide for a solo, non-technical founder relying on AI agents to write correct code. [buildfastwith](https://buildfastwith.ai/ai-coding-best-practices)

### 8. Rules File Mapping
- `.cursorrules` (or Windsurf's equivalent rules file) should be a condensed, machine-optimized version of this guide's principles — not a duplicate of the whole document. [nx](https://nx.dev/blog/practical-guide-effective-ai-coding)
- Keep the rules file to a few hundred lines; link back to full sections of this guide for detail.

### 9. Allowed vs. Disallowed Autonomous Actions
- **Allowed without approval:** writing new components, adding tests, fixing lint errors, refactoring within a single file.
- **Requires explicit approval before execution:** schema changes, new dependencies, environment variable changes, anything touching authentication, payment, or production data.
- **Never allowed:** direct edits to production data, force-pushing to `main`, deleting migration history, disabling security headers or rate limiting to "make something work."

### 10. Prompting and Task-Breakdown Conventions
- One task per prompt. Do not ask an agent to fix a bug, add a feature, and update docs in the same request. [buildfastwith](https://buildfastwith.ai/ai-coding-best-practices)
- Provide context first: point the agent to the relevant existing file or pattern before asking for new code, rather than describing it from scratch. [medium](https://medium.com/the-tech-bible/best-practices-a-guide-to-coding-with-ai-8e80b7714613)
- Break large features into incremental, testable steps rather than one large generation pass. [nx](https://nx.dev/blog/practical-guide-effective-ai-coding)

### 11. Code-Generation Guardrails
- The agent must read the actual Sanity schema file before writing any code that queries or renders CMS content — never assume field names exist.
- The agent must not fabricate third-party API signatures; if uncertain, it must flag the uncertainty rather than guessing.
- Any generated code that touches security-sensitive logic (auth, input validation, rate limiting) must be flagged for manual review regardless of confidence.

### 12. Human Review Checkpoints
- All AI-generated PRs are reviewed line-by-line before merge, especially around edge-case handling and security-sensitive logic. [dev](https://dev.to/ranndy360/ai-coding-best-practices-in-2025-4eel)
- Run project linters/formatters on all AI output before treating it as final. [buildfastwith](https://buildfastwith.ai/ai-coding-best-practices)
- Commit AI-generated changes in small, reviewable chunks — never one large multi-file diff. [buildfastwith](https://buildfastwith.ai/ai-coding-best-practices)

### 13. Session Handoff Notes
- At the end of a coding session, the agent (or developer) appends a short note to `docs/session-log.md`: what changed, what's incomplete, what to check next.
- This prevents context loss between sessions when no single person "remembers" the last state of the repo.

***

## Part IV — Architecture

### 14. Architecture Principles
- Prefer server components by default; use client components only when interactivity requires it.
- Keep business logic out of UI components — isolate it in `lib/` so it's testable independently.

### 15. Next.js App Router Conventions
- Route groups organize marketing pages, localized routes, and API routes separately.
- Layouts define shared UI (nav, footer); pages define content only.

### 16. TypeScript Strictness Policy
- `strict: true` in `tsconfig.json`, no `any` without an inline justification comment.
- All CMS content typed via generated or hand-maintained interfaces matching the Sanity schema.

### 17. Tailwind / Design Tokens
- All colors, spacing, and typography reference design tokens — no hard-coded hex values or magic numbers in components.

### 18. Domain Boundaries
- Separate `content/`, `search/`, `forms/`, and `analytics/` modules; a component in one domain should not directly import internals from another.

### 19. Content Portability Layer
- All CMS reads go through an adapter layer, not direct Sanity client calls scattered through components — this makes a future CMS migration possible.

### 20. Search Adapter (Algolia)
- Indexing logic lives in one module triggered by CMS webhooks; components only call a typed search function.

### 21. Forms, Email, and Rate Limiting
- Forms submit via Server Actions, validated with Zod, sent through Resend, and rate-limited via Upstash before hitting any email or CRM integration.

### 22. CSP and Nonce Architecture
- Content Security Policy generated per-request with a nonce; no inline scripts without a nonce.

### 23. Caching and Revalidation
- Static pages use Incremental Static Regeneration; content changes trigger revalidation via CMS webhook, not manual redeploys.

### 24. Architecture Decision Records
- Every consequential technical choice (e.g., "why Sanity," "why Algolia over CMS-native search") gets a short ADR: context, decision, consequences.

***

## Part V — Component and Code Standards

### 25. Route Composition
- One route = one clear purpose; shared UI extracted into layouts or shared components, not duplicated per route.

### 26. Server vs. Client Component Decision
- Default to server components. Use client components only for state, event handlers, or browser APIs.

### 27. Component Naming and Organization
- Feature-scoped components live next to their route; only truly shared UI lives in a global `components/ui/` directory.

### 28. Form Architecture and Validation
- Every form has a Zod schema shared between client validation and server validation — never validate only on one side.

### 29. Sanitization Rules
- All rich text from the CMS is sanitized before rendering; no `dangerouslySetInnerHTML` without a sanitization step immediately before it.

### 30. Server Action / API Patterns
- Server Actions handle mutations; API routes reserved for webhooks and integrations that require them.

### 31. Error Handling and Boundaries
- Every route segment that can fail has an `error.tsx` boundary; errors logged with a correlation ID, not swallowed silently.

### 32. Logging
- Structured logs with correlation IDs on every request that touches forms, search, or CMS webhooks.

### 33. Code Documentation Standard
- JSDoc required on exported functions with non-obvious behavior; skip it for trivial getters/setters.

### 34. Linting, Formatting, and Static Analysis
This section was previously missing entirely and is essential given the reliance on AI-generated code. [devtoollab](https://devtoollab.com/blog/best-static-code-analysis-tools)
- Fast linter/formatter (e.g., Biome or ESLint + Prettier) runs on every commit via pre-commit hook — catches style and syntax issues in seconds. [devtoollab](https://devtoollab.com/blog/best-static-code-analysis-tools)
- A SAST tool (e.g., Semgrep) runs on every pull request to catch security issues before merge. [devtoollab](https://devtoollab.com/blog/best-static-code-analysis-tools)
- CI blocks merge on lint or type-check failure — no exceptions, since there's no second reviewer to catch it manually.

### 35. Code Review Checklist for AI-Generated PRs
- Does the logic match existing architecture and patterns?
- Are edge cases and error states handled, not just the happy path?
- Were tests generated or updated alongside the change?
- Does it introduce any new dependency, schema change, or env variable that needs separate approval?

***

## Part VI — CMS and Content Schema

### 36. Schema Ownership
- Schema changes are proposed as a diff against `content/schemas/`, reviewed, and only then applied to Sanity — schema is never edited ad hoc inside the Sanity Studio UI alone.

### 37. Typed Content Contracts
- Every schema type has a matching Zod schema and TypeScript interface generated or maintained in lockstep.

### 38. Draft vs. Published Data
- Preview environment reads drafts; production reads published only. Never blend the two in one query path.

### 39. Slug, Redirect, and URL Rules
- Slugs are immutable once published; changing a URL requires a redirect entry in the redirect register, not a silent rename.

### 40. Rich-Text and Asset Rules
- All images require alt text at the schema level (required field, not optional); focal point set for responsive cropping.

### 41. Structured Data Mapping
- Each content type maps to a specific schema.org type; the mapping lives in one central library, not duplicated per template.

### 42. Localization Fields
- Translatable fields marked explicitly in schema; fallback locale defined for incomplete translations.

### 43. Webhook and Indexing Flow
- CMS publish triggers a webhook that revalidates the affected page and reindexes it in Algolia — both steps logged for verification.

### 44. Schema Migration Procedure
Previously missing — critical since schema changes are high-risk for a solo dev. [stackoverflow](https://stackoverflow.blog/2026/03/26/coding-guidelines-for-ai-agents-and-people-too/)
- Every schema change is additive first (new optional field) before any field is removed or renamed.
- Migrations run against a staging dataset before production; backfill scripts are logged in the technical debt or release register.

***

## Part VII — Environments, Config, and Secrets

### 45. Environment Matrix
- Local, CI, preview, and production environments each have their own env var set; no shared secrets between preview and production.

### 46. Environment Variable Classification
- Every `NEXT_PUBLIC_*` variable reviewed before merge — it's exposed to the browser and must never contain a secret.

### 47. Feature Flags
- Flags default to off in production; removed from code within one release cycle once fully rolled out.

### 48. Secrets Management
- All secrets in a password manager or Vercel's encrypted env vars; rotated immediately if ever exposed in a commit, log, or screenshot.

***

## Part VIII — Release Engineering

### 49. Branching and PR Requirements
- No direct commits to `main`; every change goes through a PR with CI passing before merge.

### 50. CI Pipeline Requirements
- Build, type-check, lint, and test must all pass before a PR is mergeable.

### 51. Preview Deployments
- Every PR gets a protected preview URL for visual and functional review before merge. [devtoollab](https://devtoollab.com/blog/best-static-code-analysis-tools)

### 52. Production Deployment Controls
- Deployments to production only from `main`, triggered automatically post-merge, with a smoke test immediately after.

### 53. Rollback Procedure
- Every release has a documented one-command or one-click rollback path (Vercel instant rollback to previous deployment).

### 54. Release Notes and Register
- Every production release logged with date, change summary, and rollback status in a release register.

***

## Part IX — Testing and QA

### 55. Test Strategy by Layer
- Unit tests for pure logic, integration tests for CMS/search/form flows, E2E tests for critical user journeys (contact form, navigation, search).

### 56. Accessibility Testing
- Automated checks (axe or similar) run in CI; manual keyboard-navigation check before major releases. Target: WCAG 2.2 AA.

### 57. Visual Regression Testing
- Screenshot diffing on key pages/components before merge to catch unintended layout shifts.

### 58. SEO and Analytics Validation
- Structured data validated against Google's testing tools; analytics events validated in a test GA4 property before shipping.

### 59. Security and Performance Testing
- Dependency scanning on every PR; Core Web Vitals checked against budget before release.

### 60. Defect Severity and Release-Blocking Criteria
- Critical (broken form, broken checkout-equivalent flow, security hole): blocks release.
- Major (broken layout, failed accessibility check): fix before release unless explicitly waived.
- Minor: logged, fixed in next cycle.

***

## Part X — Security

### 61. Threat Model
- Primary risks: form spam/abuse, CMS credential compromise, dependency vulnerabilities, XSS via rich text.

### 62. Input Validation and Output Encoding
- All user input validated server-side with Zod; all rendered rich text sanitized; no raw HTML injection without sanitization.

### 63. CSP and Security Headers
- Strict CSP with nonces; standard security headers (HSTS, X-Content-Type-Options, Referrer-Policy) set globally.

### 64. Rate Limiting and Anti-Abuse
- Upstash-backed rate limiting on all public form and search endpoints; honeypot fields on forms.

### 65. Dependency and Supply-Chain Security
- Automated dependency scanning (Dependabot/Renovate); lockfile integrity checked in CI.

### 66. Secret Scanning
- Pre-commit and CI-level secret scanning to catch accidental credential commits before they reach `main`.

### 67. Vulnerability Disclosure and Patch SLA
- Security patches for critical vulnerabilities applied within 48 hours of disclosure; documented in the release register.

***

## Part XI — Performance and Observability

### 68. Core Web Vitals Targets
- LCP under 2.5s, CLS under 0.1, INP under 200ms as the release-blocking baseline.

### 69. Optimization Rules
- Images served via Next.js image optimization; fonts subset and preloaded; third-party scripts loaded async/deferred wherever possible.

### 70. Monitoring
- Error tracking (e.g., Sentry) on all environments; uptime checks on production; CSP violation reports routed to a log for review.

***

## Part XII — SEO / GEO / Analytics (Technical Implementation)

### 71. Technical SEO Baseline
- Sitemap and robots.txt auto-generated from CMS content; canonical tags set on every indexable page.

### 72. Structured Data Library
- Central library mapping content types to schema.org markup, reused across templates rather than hand-coded per page.

### 73. AI Crawler and Robots Directives (GEO)
- Explicit robots directives for AI crawlers (GPTBot, ClaudeBot, etc.) set deliberately, not left to defaults.

### 74. Event Taxonomy and GA4 Implementation
- Custom event names follow GA4 naming rules and avoid reserved prefixes; taxonomy documented centrally before implementation, not invented ad hoc per feature.

### 75. Consent Mode Implementation
- Google Consent Mode wired in before any analytics or ad tag fires; default state is denied until consent is given.

***

## Part XIII — Maintenance and Incident Response (Technical)

### 76. Routine Maintenance
- Monthly dependency updates, quarterly full security review, backup verification on a fixed schedule.

### 77. Incident Severity and Response
- Critical (site down, data breach): immediate rollback/containment, same-day resolution target.
- Major (broken feature, degraded performance): resolution within 48 hours.
- Minor: scheduled into next maintenance cycle.

### 78. Post-Incident Review
- Every critical/major incident gets a short written root-cause note and a preventive action logged in the technical debt register.

***

## Part XIV — Reference

### 79. Technology Stack Inventory
Next.js (App Router), TypeScript, Tailwind, Sanity CMS, Algolia, Resend, Upstash, Vercel, GA4.

### 80. Data Flow Diagrams

**Content publication:**
```text
Author -> Sanity draft -> Review -> Publish -> Webhook -> Revalidate page -> Algolia reindex
```

**Lead capture:**
```text
Visitor -> Form -> Client validation -> Server Action -> Zod validation + rate limit -> Resend email -> Analytics conversion event
```

**Release:**
```text
Feature branch -> PR -> CI checks -> Preview deploy -> Review -> Merge to main -> Production deploy -> Smoke test
```

### 81. Known Technical Constraints
- Document current limitations (e.g., React Compiler memory issues, cache edge cases) here as they're discovered, so future AI sessions don't re-attempt known dead ends.

### 82. Technical Debt Register
- Running list of deferred work, each entry with a date, description, and risk level.

***

## Part XV — Templates

- Pull request template
- Architecture decision record template
- Production launch / smoke-test checklist
- Release notes template
- Incident report template
- Schema change checklist
- Accessibility audit checklist
- Redirect register
- Event taxonomy register
- Technical debt register
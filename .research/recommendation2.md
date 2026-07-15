# AI Coding Reference Guide
### Technical Standards for Website Development, Architecture, and Repository Operations

**Purpose:** This is the single technical source of truth for building, extending, and maintaining the marketing website platform. It exists primarily to give AI coding agents (Cursor, Windsurf) and the solo developer a consistent, verifiable standard to code against. This document covers software development only — no firm strategy, sales, or client-success material.

**How to use this guide:** Reference the relevant section before starting a coding session. Encode the *Agent Operating Rules* (Part III) directly into `.cursorrules` or Windsurf's rules file so every session inherits them automatically without needing to be re-explained.

**Change note on this revision:** This draft reconciles the guide with the platform decisions already made for the monorepo — Nx as the orchestrator, pnpm workspaces, Biome for lint/format, Cloudflare Workers for deployment, and Payload/Webflow for the CMS layer. Earlier drafts of this guide (and the original client repository it was based on) assumed Vercel and Sanity. Where an existing repository still runs on that older stack, treat it as a documented legacy exception (log it in the Technical Debt Register, §86) rather than a second standard — new work follows this guide.

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
2. **Small, reversible changes.** Every change should be small enough to review in one sitting and easy to roll back.
3. **Consistency over cleverness.** Match existing patterns; boring, idiomatic code is easier for both humans and AI to maintain.
4. **Typed contracts everywhere.** Content, forms, and API boundaries are validated with TypeScript and Zod, not assumed.
5. **Security and accessibility are default requirements**, not later add-ons.
6. **Every release is reversible** — no production change ships without a rollback path.
7. **Platform-native, not platform-borrowed.** Don't carry over patterns from a different hosting/CMS stack (e.g., Vercel- or Sanity-specific assumptions) without checking they still hold on Cloudflare Workers and Payload — the runtime model is genuinely different, not a drop-in swap.

### 3. System Context Diagram
```text
Visitor
  -> Next.js marketing website (App Router, deployed via OpenNext adapter)
  -> Cloudflare Workers (compute + hosting)
  -> Payload CMS (embedded in the Next.js app; D1 database + R2 asset storage)
  -> Webflow (candidate secondary CMS for visually-edited landing pages — pending decision, see §4)
  -> Algolia (search)
  -> Resend (email/forms)
  -> Upstash (rate limiting, REST-based — Workers-compatible)
  -> Consent + tag layer
  -> GA4 / advertising pixels
```

### 4. Open Architectural Decisions
These are real, currently unresolved decisions. An agent must not silently assume one of these has been settled — if a task depends on one, flag it and ask, or implement the narrowest option and record it as an ADR (§27) for confirmation rather than treating it as final.

| Decision | Status | Notes |
|---|---|---|
| CMS schema location: shared package vs. per-client | Open | Affects whether `packages/cms-schema` is shared across client apps or duplicated per app. Default to shared until a concrete case for divergence appears — duplication is easy to undo, premature sharing across genuinely different clients is not. |
| Payload vs. Webflow usage split | Open | This guide documents Payload as the primary, code-owned CMS (matches the typed-contract and schema-in-repo principles throughout this document). Webflow is a candidate only for client-facing pages that need a visual, non-engineer editing surface, consumed headlessly via Webflow's Data API/DevLink. Treat any Webflow integration as additive, not a replacement for the Payload-based core, until this is formally decided. |
| Client site generator: build now vs. after a few manual setups | Open | Until built, each new client repo is bootstrapped manually (§7). Don't invest in generator tooling speculatively — revisit after the third or fourth manual setup, when the repeated steps are well understood. |
| Legacy Sanity/Vercel repositories | If applicable | Any existing repo still on the prior stack is a documented exception, not a second standard. Migrate opportunistically or log it in the Technical Debt Register (§86); don't let new agent sessions treat Sanity/Vercel patterns as current guidance. |

***

## Part II — Repository Governance

### 5. Repository Structure and Naming
- Monorepo layout, orchestrated by Nx with pnpm workspaces:
  - `apps/` — one directory per deployable app (the firm's own site, each client site, internal tools). Each is an independently deployable Next.js app.
  - `packages/` — shared code: UI components, design tokens, CMS schema/adapter, utilities, config (Biome, TypeScript, Tailwind base).
  - `docs/` — this guide, ADRs, session logs.
  - `tests/` — cross-app/E2E test suites where they don't live next to the app.
- A component/module in one app must not directly reach into another app's internals — only into `packages/`.
- File and component naming: PascalCase for components, camelCase for functions/variables, kebab-case for route segments and package directory names.
- Nx project boundaries are enforced with tagged module boundary rules (`nx.json` / project tags) — a package tagged `scope:shared` cannot import from an app-scoped project, and apps cannot import each other directly.

### 6. Source-of-Truth Map

| Artifact | Canonical Location | Notes |
|---|---|---|
| Application code | GitHub repo, `main` branch | Production baseline |
| Published content | Payload (D1 database, per app/client) | Not the local repo |
| Landing pages (if Webflow adopted) | Webflow, consumed via Data API | Pending decision, §4 |
| Secrets | Password manager / Cloudflare encrypted secrets (`wrangler secret`) | Never committed to git |
| Schema definitions | `packages/cms-schema` (Payload Collections config, TypeScript) | Source for CMS + generated types |
| Design tokens | `packages/design-tokens` / Tailwind config | Single source for styling values |
| Nx project graph & task config | `nx.json`, per-project `project.json` | Defines build/lint/test task dependencies and caching |

### 7. Local Development Setup
- Prerequisites: Node.js (current LTS), pnpm, Wrangler CLI (`npm i -g wrangler` or via `pnpm dlx`), a Cloudflare account with Workers/D1/R2 enabled for local binding.
- Bootstrap steps for a fresh clone: `pnpm install` at the repo root (installs all workspace packages); `wrangler login` once per machine; copy `.dev.vars.example` to `.dev.vars` per app and fill in local-only values (never commit `.dev.vars`).
- Run a single app in development: `pnpm nx dev <app-name>` (standard `next dev`, fast iteration, no Workers runtime).
- Run against the actual Workers runtime locally before trusting a change that touches bindings (D1, R2, KV, rate limiting): `pnpm nx run <app-name>:preview`, which builds via the OpenNext adapter and serves it through Wrangler's local Workers simulator. Anything that only worked under `next dev` and not under this preview step is not verified.
- Run the affected test/lint/typecheck suite for only what changed: `pnpm nx affected -t lint test typecheck build` — this is the standard pre-push check, not the full monorepo suite, unless doing a release.
- A fresh AI agent session should read, in order: this guide's Part III (Agent Operating Rules), the Open Architectural Decisions (§4), and `docs/session-log.md` (§15) before making any change.

### 8. Branching, Commit, and PR Conventions
- Trunk-based: short-lived feature branches off `main`, merged via PR only.
- Commit messages: imperative mood, one logical change per commit (`fix: sanitize contact form input`).
- PR description must state what changed, why, and how it was tested.

### 9. Dependency Management
- Lockfile (`pnpm-lock.yaml`) committed and never manually edited.
- Automated dependency update PRs (Renovate is preferred over Dependabot here — it understands pnpm workspaces and Nx project boundaries natively, and can group related updates across packages instead of opening one PR per package). Configure it to group patch/minor updates and open security-relevant major updates individually for review.
- Dependency updates run through CI before merge; security patches applied within 7 days of disclosure (48 hours for critical severity — see §71).
- Avoid adding a new dependency when the standard library or an existing dependency already solves the problem. Adding a dependency to `packages/` (shared) vs. a single app is itself a decision — prefer app-local unless at least two apps need it.

***

## Part III — AI Agent Operating Rules

This is the most important part of the guide for a solo, non-technical founder relying on AI agents to write correct code.

### 10. Rules File Mapping
- `.cursorrules` (or Windsurf's equivalent rules file) should be a condensed, machine-optimized version of this guide's principles — not a duplicate of the whole document.
- Keep the rules file to a few hundred lines; link back to full sections of this guide for detail.
- **Conflict resolution:** if `.cursorrules`, a Windsurf rules file, and this guide ever disagree, this guide wins — the tool-specific rules files are condensations of it, not independent authorities. If a discrepancy is found, fix the tool-specific file to match this guide rather than treating the disagreement as a judgment call per session.

### 11. Allowed vs. Disallowed Autonomous Actions
- **Allowed without approval:** writing new components, adding tests, fixing lint errors, refactoring within a single file.
- **Requires explicit approval before execution:** schema changes, new dependencies, environment variable changes, anything touching authentication, payment, or production data, any change to Cloudflare bindings (D1, R2, KV) or `wrangler.toml`/`wrangler.jsonc` configuration.
- **Never allowed:** direct edits to production data, force-pushing to `main`, deleting migration history, disabling security headers or rate limiting to "make something work."

### 12. Prompting and Task-Breakdown Conventions
- One task per prompt. Do not ask an agent to fix a bug, add a feature, and update docs in the same request.
- Provide context first: point the agent to the relevant existing file or pattern before asking for new code, rather than describing it from scratch.
- Break large features into incremental, testable steps rather than one large generation pass.

### 13. Code-Generation Guardrails
- The agent must read the actual Payload Collection config before writing any code that queries or renders CMS content — never assume field names exist.
- The agent must not fabricate third-party API signatures (Algolia, Resend, Upstash, Payload's local API/REST/GraphQL); if uncertain, it must flag the uncertainty rather than guessing.
- Any generated code that touches security-sensitive logic (auth, input validation, rate limiting) must be flagged for manual review regardless of confidence.
- Before writing anything Cloudflare-runtime-specific, the agent must confirm whether the code path runs in `next dev` only or must survive the OpenNext/Workers build — features like `next/headers` cookies() access inside middleware, or `export const runtime = "edge"`, behave differently or are unsupported on Workers (see §85) and a plausible-looking snippet can pass locally and fail only at deploy time.

### 14. Human Review Checkpoints
- All AI-generated PRs are reviewed line-by-line before merge, especially around edge-case handling and security-sensitive logic.
- Run project linters/formatters on all AI output before treating it as final.
- Commit AI-generated changes in small, reviewable chunks — never one large multi-file diff.
- **Plain-English rationale requirement:** any change that isn't a pure bug fix or trivial addition gets 2–4 sentences, in plain non-jargon language, explaining what changed and why, attached to the PR description before the founder is asked to approve it. This is a lighter-weight sibling of the ADR (§27) — the ADR is for consequential architecture choices, this is for everyday changes a non-technical reviewer still needs to sign off on.

### 15. Session Handoff Notes
- At the end of a coding session, the agent (or developer) appends a short note to `docs/session-log.md`: what changed, what's incomplete, what to check next.
- This prevents context loss between sessions when no single person "remembers" the last state of the repo, and gives the next session's agent something concrete to read before touching code (see §7's session bootstrap order).

***

## Part IV — Architecture

### 16. Architecture Principles
- Prefer server components by default; use client components only when interactivity requires it.
- Keep business logic out of UI components — isolate it in `lib/` so it's testable independently.
- Run the OpenNext/Workers preview build (§7) before considering any change to data fetching, caching, or middleware "done" — the Node.js runtime under Workers is more complete than the old Vercel Edge Runtime constraints this guide previously assumed, but it is still not identical to a full Node.js server.

### 17. Monorepo Structure and Package Boundaries
- Nx manages the task graph: `pnpm nx build`, `lint`, `test`, `typecheck` targets are defined per project and cached; use `pnpm nx affected` for anything except a full release build.
- Shared packages (`packages/ui`, `packages/cms-schema`, `packages/design-tokens`, `packages/config`) are versioned independently only if consumed outside this monorepo; inside the monorepo, apps consume them via TypeScript path aliases against the workspace source, not published npm versions, so a change is visible to all apps immediately without a publish step.
- A package intended for exactly one app should live inside that app until a second app needs it — don't pre-emptively generalize.
- Cross-app changes (e.g., a shared component used by three client sites) should be scoped as a single PR that runs `nx affected` across all consumers, not three separate PRs that can drift.

### 18. Next.js App Router Conventions
- Route groups organize marketing pages, localized routes, and API routes separately.
- Layouts define shared UI (nav, footer); pages define content only.
- Do not use `export const runtime = "edge"` — the OpenNext Cloudflare adapter runs everything through its own Node.js-compatible Workers runtime and does not support Next.js's separate Edge Runtime. Remove this directive if it's ever introduced by a copied snippet or an agent trained on Vercel-first examples.

### 19. TypeScript Strictness Policy
- `strict: true` in `tsconfig.json`, no `any` without an inline justification comment.
- All CMS content typed via Payload's generated types (from Collection configs), kept in sync automatically rather than hand-maintained.

### 20. Tailwind / Design Tokens
- All colors, spacing, and typography reference design tokens in `packages/design-tokens` — no hard-coded hex values or magic numbers in components.

### 21. Domain Boundaries
- Separate `content/`, `search/`, `forms/`, and `analytics/` modules; a component in one domain should not directly import internals from another.

### 22. Content Portability Layer
- All CMS reads go through a single adapter module, not direct Payload client calls scattered through components. This is more important than it would be with a single settled CMS: with the Payload/Webflow split still open (§4), the adapter is what lets a future decision (or a per-client mix of both) land without touching every component that renders content.

### 23. Search Adapter (Algolia)
- Indexing logic lives in one module triggered by Payload's `afterChange`/`afterDelete` collection hooks (Payload's equivalent of a CMS webhook); components only call a typed search function.

### 24. Forms, Email, and Rate Limiting
- Forms submit via Server Actions, validated with Zod, sent through Resend, and rate-limited via Upstash before hitting any email or CRM integration.
- Upstash's REST-based Redis client is the reason this works cleanly on Cloudflare Workers — it doesn't require a persistent TCP connection, unlike a conventional Redis client. Don't swap in a TCP-based Redis client here; it will not function in the Workers runtime.

### 25. CSP and Nonce Architecture
- Content Security Policy generated per-request with a nonce; no inline scripts without a nonce.

### 26. Caching and Revalidation
- Static pages use Incremental Static Regeneration; content changes trigger revalidation via a Payload webhook/hook, not manual redeploys.
- Unlike Vercel, the OpenNext Cloudflare adapter does not provide ISR caching automatically — the incremental cache backend must be explicitly configured in `open-next.config.ts` (an R2 bucket is the standard choice). Confirm this is configured before relying on ISR behavior in any new app.
- Cloudflare's tiered edge cache (Workers Cache) sits in front of the Worker and is configured via standard HTTP `Cache-Control` headers — prefer this over hand-rolled caching logic for anything that's just "cache this response for N seconds."

### 27. Architecture Decision Records
- Every consequential technical choice (e.g., "why Payload over Sanity," "why Cloudflare D1 over Postgres for a given client," the eventual CMS schema-location and Payload/Webflow-split decisions from §4) gets a short ADR: context, decision, consequences. Store ADRs in `docs/adr/`.

***

## Part V — Component and Code Standards

### 28. Route Composition
- One route = one clear purpose; shared UI extracted into layouts or shared components, not duplicated per route.

### 29. Server vs. Client Component Decision
- Default to server components. Use client components only for state, event handlers, or browser APIs.

### 30. Component Naming and Organization
- Feature-scoped components live next to their route; only truly shared UI lives in `packages/ui`.

### 31. Form Architecture and Validation
- Every form has a Zod schema shared between client validation and server validation — never validate only on one side.

### 32. Sanitization Rules
- All rich text from the CMS is sanitized before rendering; no `dangerouslySetInnerHTML` without a sanitization step immediately before it.

### 33. Server Action / API Patterns
- Server Actions handle mutations; API routes reserved for webhooks and integrations that require them.
- `cookies()` from `next/headers` is Node.js-runtime-only and does not work inside `middleware.ts` under the OpenNext Cloudflare adapter — if auth/session logic needs to read or set cookies in middleware, do it in a route handler or Server Action instead, and verify with the Workers preview build (§7), not just `next dev`.

### 34. Error Handling and Boundaries
- Every route segment that can fail has an `error.tsx` boundary; errors logged with a correlation ID, not swallowed silently.

### 35. Logging
- Structured logs with correlation IDs on every request that touches forms, search, or CMS webhooks/hooks.

### 36. Code Documentation Standard
- JSDoc required on exported functions with non-obvious behavior; skip it for trivial getters/setters.

### 37. Linting, Formatting, and Static Analysis
- Biome is the single source of truth for linting and formatting (decided over ESLint + Prettier) — one config file (`biome.json`), one fast binary, no separate formatter to keep in sync.
- Biome's linter now includes type-aware rules via its own type-inference engine (no dependency on `tsc`), covering common cases like unhandled promises — but its coverage of type-aware rules is not a full replacement for `typescript-eslint`, and it does not (as of this writing) cover React-specific rules like `react-hooks/exhaustive-deps`. If hooks-correctness linting is needed, add a minimal ESLint config scoped to only `eslint-plugin-react-hooks`, running alongside Biome rather than replacing it — don't reintroduce a full ESLint + Prettier setup.
- Full type-checking is still `tsc --noEmit`, run in CI as its own step — Biome's type-aware lint rules are a fast supplementary signal, not a substitute for the compiler.
- Fast linter/formatter runs on every commit via a pre-commit hook — catches style and syntax issues in seconds.
- A SAST tool (e.g., Semgrep) runs on every pull request to catch security issues before merge.
- CI blocks merge on lint, type-check, or Biome failure — no exceptions, since there's no second reviewer to catch it manually.

### 38. Code Review Checklist for AI-Generated PRs
- Does the logic match existing architecture and patterns?
- Are edge cases and error states handled, not just the happy path?
- Were tests generated or updated alongside the change?
- Does it introduce any new dependency, schema change, or env variable that needs separate approval?
- Was it verified against the Workers preview build (§7), not just `next dev`, if it touches routing, middleware, caching, or bindings?

***

## Part VI — CMS and Content Schema

### 39. Schema Ownership
- Schema changes are proposed as a diff against `packages/cms-schema` (Payload Collection configs in TypeScript), reviewed, and only then applied — schema is never edited ad hoc inside the Payload admin UI alone; the admin UI reflects what's in code, not the other way around.

### 40. Typed Content Contracts
- Payload generates TypeScript types directly from Collection configs; keep generated types in sync via the standard Payload type-generation step rather than hand-maintaining a parallel interface.
- Any content also exposed through a public API or form boundary still gets its own Zod schema at that boundary — Payload's generated types describe the CMS shape, they don't replace runtime validation of external input.

### 41. Draft vs. Published Data
- Payload's built-in versioning/drafts feature handles draft vs. published state — the preview environment reads drafts, production reads published only. Never blend the two in one query path.

### 42. Slug, Redirect, and URL Rules
- Slugs are immutable once published; changing a URL requires a redirect entry in the redirect register, not a silent rename.

### 43. Rich-Text and Asset Rules
- All images require alt text at the schema level (required field, not optional); focal point set for responsive cropping.
- Asset storage is R2-backed per Payload's Cloudflare deployment pattern; don't introduce a second asset storage provider without an ADR.

### 44. Structured Data Mapping
- Each content type maps to a specific schema.org type; the mapping lives in one central library, not duplicated per template.

### 45. Localization Fields
- Translatable fields marked explicitly in schema; fallback locale defined for incomplete translations.

### 46. Webhook and Indexing Flow
- Payload's collection hooks (`afterChange`, `afterDelete`) are the equivalent of a CMS webhook: publishing an item triggers page revalidation and an Algolia reindex — both steps logged for verification.

### 47. Schema Migration Procedure
- Every schema change is additive first (new optional field) before any field is removed or renamed.
- Migrations are created and run via Payload's migration commands (`payload migrate:create`, `payload migrate`) against a staging D1 database before production; backfill scripts are logged in the technical debt or release register.

### 48. Database and Storage Adapter (Cloudflare)
- Default DB adapter for new Payload apps on this platform is Cloudflare D1 (SQLite-based) rather than Payload's MongoDB default — this is what makes Payload deployable directly to Workers.
- D1 has no traditional connection string; Wrangler binds it locally and in deployment. Read replicas are available via D1's `readReplicas` configuration for read-heavy content if needed later.
- GraphQL support for Payload on Workers is not fully reliable at present — prefer Payload's local API (server-side, in-process) or REST for anything shipping to production; treat GraphQL as experimental in this environment until upstream support matures.
- Payload on Cloudflare currently requires the paid Workers plan due to bundle-size limits (see §85) — factor this into any new client deployment, it isn't optional tooling.

***

## Part VII — Environments, Config, and Secrets

### 49. Environment Matrix
- Local, CI, preview, and production environments each have their own bindings (D1 database, R2 bucket, KV namespace) and env var set; no shared secrets between preview and production.

### 50. Environment Variable Classification
- Every `NEXT_PUBLIC_*` variable reviewed before merge — it's exposed to the browser and must never contain a secret.
- Cloudflare Workers environment variables are only available at **runtime**, not automatically at **build time** — Next.js's build step may need certain variables during the build itself. Distinguish clearly (in `.dev.vars` locally, and in CI secrets/build config in deployment) which variables must be present at build time versus which are only ever read at request time; a variable placed only in Worker runtime settings will silently fail a build that needs it earlier.

### 51. Feature Flags
- Flags default to off in production; removed from code within one release cycle once fully rolled out.

### 52. Secrets Management
- All secrets in a password manager or Cloudflare's encrypted secrets (`wrangler secret put`), never Wrangler config files in plaintext.
- Rotated immediately if ever exposed in a commit, log, or screenshot.
- If secrets have changed since a version was deployed, `wrangler rollback` will warn before proceeding — don't blindly confirm past this warning without checking which secret changed and why.

***

## Part VIII — Release Engineering

### 53. Branching and PR Requirements
- No direct commits to `main`; every change goes through a PR with CI passing before merge.

### 54. CI Pipeline Requirements
- Build (via `opennextjs-cloudflare build`), type-check, lint (Biome), and test must all pass before a PR is mergeable.

### 55. Preview Deployments
- Every PR gets a preview deployment (Cloudflare Workers/Pages preview URL) for visual and functional review before merge.
- Non-production environments (staging, client-review previews) are gated behind Cloudflare Zero Trust Access rather than left as unguessable-but-public URLs — this replaces the "protected preview URL" concept from Vercel-based setups, with the advantage of not requiring any application code changes to enforce.

### 56. Production Deployment Controls
- Deployments to production build via the OpenNext adapter (`opennextjs-cloudflare build && opennextjs-cloudflare deploy`) triggered automatically post-merge to `main`, with a smoke test immediately after.
- Watch the Workers bundle-size budget as a release gate: 3 MiB (gzip) on the free plan, 10 MiB on the paid plan. A dependency that pushes a Worker over this limit (server-side error-tracking SDKs are a common culprit) fails the deploy outright — audit bundle size before adding a heavy server-side dependency, not after a failed deploy.

### 57. Rollback Procedure
- Every release has a one-command rollback: `wrangler rollback` (defaults to the previous stable version, or pass a specific version ID from `wrangler versions list`).
- Rollback does not revert connected resources (D1, R2, KV) — if a rolled-back version expects a different data shape than what's currently in those bindings, the rollback can surface new errors rather than fixing the original ones. Treat a schema-related incident's rollback plan as "roll back code, then assess whether a data fix is separately needed," not "rollback undoes everything."
- Cloudflare also supports percentage-based gradual rollout (`wrangler versions deploy <version>@X%`) for lower-risk incremental releases where a full rollback isn't the right first move.

### 58. Release Notes and Register
- Every production release logged with date, change summary, and rollback status in a release register.

***

## Part IX — Testing and QA

### 59. Test Strategy by Layer
- Unit tests for pure logic, integration tests for CMS/search/form flows, E2E tests for critical user journeys (contact form, navigation, search).
- Integration tests that touch Cloudflare bindings run against the Workers preview build (§7), not only against `next dev` — a test suite that only exercises `next dev` will miss the class of bug described in §33.

### 60. Accessibility Testing
- Automated checks (axe or similar) run in CI; manual keyboard-navigation check before major releases. Target: WCAG 2.2 AA.

### 61. Visual Regression Testing
- Screenshot diffing on key pages/components before merge to catch unintended layout shifts.

### 62. SEO and Analytics Validation
- Structured data validated against Google's testing tools; analytics events validated in a test GA4 property before shipping.

### 63. Security and Performance Testing
- Dependency scanning on every PR; Core Web Vitals checked against budget before release.

### 64. Defect Severity and Release-Blocking Criteria
- Critical (broken form, broken checkout-equivalent flow, security hole, failed Workers build): blocks release.
- Major (broken layout, failed accessibility check): fix before release unless explicitly waived.
- Minor: logged, fixed in next cycle.

***

## Part X — Security

### 65. Threat Model
- Primary risks: form spam/abuse, CMS credential compromise, dependency vulnerabilities, XSS via rich text.
- Cloudflare Workers' isolate sandboxing provides built-in protection against server-side request forgery to private IP ranges by default — a genuine platform advantage worth relying on rather than re-implementing, but not a substitute for input validation elsewhere.

### 66. Input Validation and Output Encoding
- All user input validated server-side with Zod; all rendered rich text sanitized; no raw HTML injection without sanitization.

### 67. CSP and Security Headers
- Strict CSP with nonces; standard security headers (HSTS, X-Content-Type-Options, Referrer-Policy) set globally.

### 68. Rate Limiting and Anti-Abuse
- Upstash-backed rate limiting on all public form and search endpoints; honeypot fields on forms.

### 69. Dependency and Supply-Chain Security
- Automated dependency scanning via Renovate (§9); lockfile integrity checked in CI.

### 70. Secret Scanning
- Pre-commit and CI-level secret scanning to catch accidental credential commits before they reach `main`.

### 71. Vulnerability Disclosure and Patch SLA
- Security patches for critical vulnerabilities applied within 48 hours of disclosure; documented in the release register.

***

## Part XI — Performance and Observability

### 72. Core Web Vitals Targets
- LCP under 2.5s, CLS under 0.1, INP under 200ms as the release-blocking baseline.

### 73. Optimization Rules
- Images: Next.js's built-in image optimizer requires explicit configuration on Cloudflare (a Cloudflare Images binding) — it is not automatic the way it is on Vercel. Confirm this binding exists before assuming `next/image` is optimizing output in production.
- Fonts subset and preloaded; third-party scripts loaded async/deferred wherever possible.
- Prefer Cloudflare's Workers Cache (tiered edge cache via standard `Cache-Control` headers, §26) over custom caching layers for anything that's a straightforward TTL-based cache.

### 74. Monitoring
- Error tracking (e.g., Sentry) on all environments — audit the server-side SDK's contribution to Worker bundle size (§56) before adding it broadly, it's a common cause of hitting the size limit.
- Uptime checks on production; CSP violation reports routed to a log for review.

***

## Part XII — SEO / GEO / Analytics (Technical Implementation)

### 75. Technical SEO Baseline
- Sitemap and robots.txt auto-generated from CMS content; canonical tags set on every indexable page.

### 76. Structured Data Library
- Central library mapping content types to schema.org markup, reused across templates rather than hand-coded per page.

### 77. AI Crawler and Robots Directives (GEO)
- Set explicit, per-user-agent directives rather than relying on a single wildcard rule — AI crawlers fall into distinct categories with different implications, and a blunt block/allow-all choice usually blocks or allows the wrong thing:
  - **Training crawlers** (feed model training, not live answers): `GPTBot`, `ClaudeBot`, `CCBot`, `Bytespider`, `Meta-ExternalAgent`, `Amazonbot`. `Google-Extended` and `Applebot-Extended` are opt-out-only tokens (no crawler of their own) for excluding Gemini/Apple Intelligence training without affecting standard Google/Apple search behavior.
  - **Retrieval / search-index crawlers** (power live AI answers and citations — generally what a marketing site wants left open): `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`.
  - Deprecated/retired tokens still seen in older examples — don't rely on them as if they were current: `Claude-Web`, `anthropic-ai`.
  - Some crawlers (Bytespider, and certain undeclared Perplexity fetchers) have a documented history of not reliably honoring `robots.txt`; a hard block on those requires a server- or edge-level rule (Cloudflare's bot management), not just a `Disallow` line.
  - This list changes faster than most technical SEO config — review it quarterly rather than treating it as a one-time setup, and record the current allow/block posture as a decision (with date) rather than an assumed default.

### 78. Event Taxonomy and GA4 Implementation
- Custom event and parameter names: letters, numbers, and underscores only, must start with a letter, 40-character limit, and must avoid reserved prefixes (`ga_`, `google_`, `firebase_`, `gtag.`, or a leading underscore) and reserved/automatically-collected event names.
- Each event supports up to 25 parameters; parameter values are truncated at 100 characters (a few automatically-collected parameters like `page_location` have higher limits).
- Per-property quotas: 50 event-scoped custom dimensions, 25 user-scoped, 10 item-scoped, and 50 custom metrics — plan the taxonomy against these limits before implementation, not after hitting them.
- Custom dimensions must be registered in GA4 before the event starts firing — data sent before registration does not retroactively populate standard reports for that dimension (BigQuery export is the only path to recover pre-registration data, where enabled).
- Taxonomy documented centrally (`docs/analytics/event-taxonomy.md` or the Event Taxonomy register, §87) before implementation, not invented ad hoc per feature. Verify new events in three layers before shipping: DebugView (confirms the event was received), Realtime (confirms aggregation), BigQuery export where available (confirms structure) — skipping a layer is how "instrumented but silently broken" events happen.

### 79. Consent Mode Implementation
- Google Consent Mode wired in before any analytics or ad tag fires; default state is denied until consent is given, covering the standard consent signal categories (analytics storage, ad storage, ad user data, ad personalization).
- Region-specific default behavior (where a stricter or looser default applies by jurisdiction) is configured explicitly, not left to a single global default.

***

## Part XIII — Maintenance and Incident Response (Technical)

### 80. Routine Maintenance
- Dependency updates via Renovate reviewed on a regular cadence (not just when CI opens a PR — someone should be looking at the grouped update PRs, not letting them queue indefinitely).
- Quarterly full security review; backup verification on a fixed schedule.
- Quarterly review of the AI-crawler robots.txt posture (§77), since that list changes faster than most technical config.

### 81. Incident Severity and Response
- Critical (site down, data breach): immediate rollback/containment (§57), same-day resolution target.
- Major (broken feature, degraded performance): resolution within 48 hours.
- Minor: scheduled into next maintenance cycle.

### 82. Post-Incident Review
- Every critical/major incident gets a short written root-cause note and a preventive action logged in the technical debt register.

***

## Part XIV — Reference

### 83. Technology Stack Inventory
- **Monorepo:** Nx, pnpm workspaces
- **Framework:** Next.js (App Router), TypeScript, Tailwind
- **Lint/format:** Biome (+ a minimal scoped ESLint config for `react-hooks` rules if needed, §37)
- **CMS:** Payload (primary, Cloudflare D1 + R2), Webflow (candidate secondary — pending decision, §4)
- **Search:** Algolia
- **Email/forms:** Resend
- **Rate limiting:** Upstash (REST-based)
- **Deployment:** Cloudflare Workers via the OpenNext adapter (`@opennextjs/cloudflare`), Wrangler CLI
- **Analytics:** GA4, Google Consent Mode
- **Dependency automation:** Renovate

### 84. Data Flow Diagrams

**Content publication:**
```text
Author -> Payload draft -> Review -> Publish -> Collection hook -> Revalidate page -> Algolia reindex
```

**Lead capture:**
```text
Visitor -> Form -> Client validation -> Server Action -> Zod validation + rate limit -> Resend email -> Analytics conversion event
```

**Release:**
```text
Feature branch -> PR -> CI checks (build/lint/typecheck/test) -> Preview deploy (Zero Trust gated) -> Review -> Merge to main -> OpenNext build & deploy -> Smoke test -> (rollback path via wrangler rollback if needed)
```

### 85. Known Technical Constraints
Document current limitations here as they're discovered or confirmed, so future AI sessions don't re-attempt known dead ends:
- The OpenNext Cloudflare adapter does not support Next.js's Edge Runtime (`export const runtime = "edge"`) — everything runs through its own Node.js-compatible Workers runtime instead (§18).
- `cookies()` from `next/headers` does not work inside `middleware.ts` on this adapter (§33) — handle cookie-dependent logic in a route handler or Server Action instead.
- Workers bundle-size limits: 3 MiB gzip on the free plan, 10 MiB on paid (§56) — a real constraint on which server-side dependencies are viable, not just a cost line item.
- ISR/incremental caching is not automatic under this adapter — it requires explicit incremental-cache configuration (R2-backed, §26).
- `next/image` optimization requires an explicit Cloudflare Images binding on this platform — it is not automatic (§73).
- Payload's GraphQL API is not yet fully reliable when deployed to Workers — prefer the local API or REST in production code (§48).
- Payload on Cloudflare currently requires the paid Workers plan due to bundle-size limits (§48).
- Legacy Sanity/Vercel repositories, if any still exist, are exceptions to this guide, not a second standard (§4).

### 86. Technical Debt Register
- Running list of deferred work, each entry with a date, description, and risk level. Include any legacy-stack repositories here with a migration status.

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
- **External Service Dependency Register** — one row per third-party service the code depends on (Payload/Webflow, Algolia, Resend, Upstash, Cloudflare D1/R2/KV, GA4): what it's for, what breaks if it's unavailable, where its config/secrets live, and any known platform-specific limitation from §85.
- **Client Repository Bootstrap Checklist** — the manual steps for standing up a new client app under `apps/` until/unless a generator (§4) is built: create the app, wire up its Payload Collections and D1/R2 bindings, register DNS, confirm the Workers preview build (§7) runs clean, add it to the Nx project graph and CI matrix.
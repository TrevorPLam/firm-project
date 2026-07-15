# Elevate Digital Repository TODO

This document drives architecture and tooling work from the Jul 2026 assessments toward launch readiness and monorepo alignment (without building the monorepo yet). It uses SDD (specification-driven definitions), DDD (bounded-context ownership), TDD (test-first validation), BDD (behavior-driven acceptance), and deep-module design.

**Research basis:** Initial architecture pass plus a follow-up deep dive (App Router, CSP/nonce + next-intl composition, CMS/draft/webhook patterns from next-sanity, SEO/robots, privacy, deps, CI). Live third-party web search via `parallel-cli` was unavailable; library guidance came from Context7 (Next.js 16, next-intl, next-sanity) and in-repo docs.

## Legend

- `[ ]` Open
- `[/]` In Progress
- `[x]` Complete
- **AGENT:** Coding assistant executes end-to-end (research, code, tests, docs).
- **HUMAN:** Only when the agent cannot act (secrets, irreversible external systems, or a real preference choice).
- **BDD:** Behavior-driven acceptance criteria.
- **TDD:** Test-driven validation.
- **DDD:** Domain-driven design boundary.
- **SDD:** Specification-driven definition of done.
- **DEEP:** Deep module (small public surface, rich private implementation).

## How to Use This Document

1. Pick the lowest open priority group first (P0 before P1 before P2).
2. Read **Initial Analysis & Research** and run its verification commands before editing.
3. Mark parent **Status** `[/]` when work starts and `[x]` when **Definition of Done** is met. Mark the parent checkbox `[x]` only when Status is Complete.
4. Prefer targeted commands listed under each subtask (never full-suite by default).
5. When imports/exports or env surface change, update unit tests and the listed repo docs in the same task.
6. Keep this file emoji-free. Preserve `[ ]`, `[/]`, `[x]`, task IDs, and section headings so it stays machine-editable.

## Priority Summary

| Priority | Tasks | Focus |
|---|---|---|
| P0 | T001, T002, T003, T015, T016, T017 | Test honesty, clean installs, pins, CSP nonce wiring, zod runtime dep, analytics consent posture. |
| P1 | T004–T012, T018–T028, T032, T034, T035 | Docs, content ports, CI, images, email XSS, robots gate, SEO metadata, env schema, search/CSP, format, draft/webhook, assets, monitoring. |
| P2 | T013, T014, T029–T031, T033, T036–T038 | Rendering tradeoffs, monorepo docs, nonce provider cleanup, schema/llms polish, i18n strategy, a11y smoke, locale revalidate. |

---

## Completed Tasks Archive (T001-T012)

### T001: Fix Newsletter Action Test Failures ✅
Aligned newsletter tests with contact pattern for missing Resend credentials; tests now expect `success: false` when API keys unset; 3 subtasks completed.

### T002: Restore Clean npm Dependency Install ✅
Removed pnpm layout markers, regenerated lockfile with `npm install`, documented npm-only requirement in ENV_SETUP.md; 3 subtasks completed.

### T003: Pin Node Engine and packageManager Metadata ✅
Added `engines.node: ">=22.0.0 <23.0.0"` and `packageManager: "npm@10.9.7"` to package.json; updated README/ENV_SETUP to Node 22.x; 3 subtasks completed.

### T004: Correct README and Stack Documentation Drift ✅
Fixed Tailwind CSS version from "4" to "3.x", updated project structure to include [locale]/i18n/messages/sitemap/robots/proxy.ts; 3 subtasks completed.

### T005: Add Content Port Module with Local Blog Adapter ✅
Created BlogContentPort interface and local-blog-adapter.ts with async methods (getAllSummaries, getBySlug, getAllSlugs); 12 TDD unit tests; documented seam in cms.md; 3 subtasks completed.

### T006: Route Blog Pages Through Content Port ✅
Migrated 3 blog files (list, detail, OG image) to use content port via createLocalBlogAdapter(); async-first methods; BDD verified same slugs/titles; 3 subtasks completed.

### T007: Add Portfolio Port Adapter and Migrate Portfolio Routes ✅
Extended content port with PortfolioContentPort and local-portfolio-adapter.ts; 12 TDD tests; migrated 3 portfolio files (list, detail, OG image); 3 subtasks completed.

### T008: Migrate Sitemap and Search Aggregation to Content Ports ✅
Updated search-data.ts and sitemap.ts to use content ports instead of direct data module imports; 10 tests passing; verified no stray production imports; 2 subtasks completed.

### T009: Simplify TypeScript Path Aliases for Extractability ✅
Moved i18n/ to app/i18n/; simplified tsconfig.json paths from dual mapping to single `"@/*": ["./app/*"]`; updated 15 imports; documented single-path strategy; 3 subtasks completed.

### T010: Add npm Audit Job to CI ✅
Added audit job to CI workflow with `npm audit --audit-level=high`; updated security.md with CI integration; documented 14 moderate vulnerabilities baseline; 3 subtasks completed.

### T011: Add Chromium Playwright Job to CI ✅
Added E2E job to CI with chromium-only smoke tests (home-page.spec.ts); fixed next-intl configuration issues; documented CI vs local testing approach; 3 subtasks completed.

### T012: Define Next Image Remote Allowlist for Sanity CDN ✅
Added explicit remotePattern for cdn.sanity.io in next.config.ts; updated security.md with SSRF protection policy; updated cms.md with Image configuration; 3 subtasks completed.

---

## Task T013: Investigate Dynamic Rendering Caused by CSP Nonce headers()

**Status:** `[x]` COMPLETE

### Initial Analysis & Research

Read `app/[locale]/layout.tsx`, `app/lib/nonce.ts`, `proxy.ts`, and Next.js 16 docs on `headers()` forcing dynamic rendering. Confirm whether nonce consumption in the root locale layout marks routes dynamic. Capture build output evidence (`ƒ` vs static) for a content route before proposing options. Preserve CSP nonce goals; evaluate tradeoffs among static marketing pages, report-only CSP, and nonce wiring.

### Related File Paths

- `app/[locale]/layout.tsx`
- `app/lib/nonce.ts`
- `app/lib/nonce-provider.tsx`
- `proxy.ts`
- `next.config.ts`
- `docs/dynamic-rendering-investigation.md` (create)
- `docs/security.md`

### Definition of Done

- Investigation doc exists with root cause, options, and tradeoffs (static vs security).
- Recommended option is clear enough for a HUMAN preference choice.
- If HUMAN selects an implementable option in scope, agent implements it in follow-up subtasks and updates tests/docs.
- No silent removal of CSP without documenting acceptance.

### Out of Scope

- Full CSP enforce-mode rollout unless HUMAN selects it here.
- Rewriting all pages to client components.
- Enabling `cacheComponents` as a drive-by.

### Rules to Follow

- Prefer measuring build output over theorizing alone.
- Keep PII out of CSP violation logs (already a project rule).

### Advanced Coding Pattern

- Deep module for nonce access; isolate dynamic APIs away from static leaves when possible.

### Anti-Patterns

- Disabling security to chase green static indicators without tradeoff writeup.
- Large layout refactors without a chosen option.

### Imports/Exports

- May adjust nonce module exports after HUMAN choice; investigation phase should not churn APIs unnecessarily.

### Depends On / Blocks

- Depends on: T015 (nonce must actually reach Server Components before measuring CSP vs static tradeoffs)
- Blocks: Soft-blocks static optimization goals

### Subtasks

#### T013.1 [AGENT] Reproduce dynamic rendering evidence ✅

- **Targeted file path:** `app/[locale]/layout.tsx`
- **Description:** Trace `getNonce()` / `headers()` usage. Run a production build and record which representative routes are static vs dynamic. Quote evidence in the investigation doc draft.
- **Commands:**
  - `npm run build`

#### T013.2 [AGENT] Write investigation options doc ✅

- **Targeted file path:** `docs/dynamic-rendering-investigation.md`
- **Description:** Document root cause, at least three options (e.g., accept dynamic; restructure nonce; CSP without layout headers(); hybrid), and recommendation. Cross-link `docs/security.md`.
- **Commands:**
  - None beyond doc creation

#### T013.3 [HUMAN] Choose rendering vs CSP tradeoff ✅

- **Targeted file path:** `docs/dynamic-rendering-investigation.md`
- **Description:** Solo-dev preference choice only: pick one documented option (or defer). Reply with the option letter/name. Do not implement. If deferring, say so explicitly so Status can move to blocked/deferred note.
- **Commands:**
  - None (decision only)

#### T013.4 [AGENT] Implement approved option (if not deferred) ✅

- **Targeted file path:** files named by the chosen option (layout/nonce/proxy/config)
- **Description:** Implement only the HUMAN-selected option. Add/update unit tests if nonce helpers change. Re-run build and a small unit test set. Update security + investigation docs to "decision: ...".
- **Commands:**
  - `npm run build`
  - `npm run test:run -- app/__tests__/lib/site-config.test.ts`
  - Targeted nonce/layout tests if added

### Implementation Notes

**Decision:** Option A (Accept Dynamic Rendering)

**Changes Made:**
1. Added `export const dynamic = 'force-dynamic'` to `app/[locale]/layout.tsx` for explicitness
2. Created `docs/dynamic-rendering-investigation.md` with full analysis and options
3. Updated `docs/security.md` with CSP nonce vs static rendering decision record
4. All QA checks passed: typecheck, lint, and targeted tests

**Rationale:**
- CSP security takes priority over static generation performance
- Aligns with Next.js 16 PPR philosophy
- Nonce wiring fix (T015) required regardless of option
- Dynamic rendering performance acceptable for current scale

**Dependencies:**
- T015 must be completed to fix nonce wiring (currently broken on i18n redirect path)

---

## Task T014: Write Monorepo Alignment Conventions (No Folder Move)

**Status:** `[x]` COMPLETE

### Initial Analysis & Research

Reread architecture assessment goals: eventually monorepo, not now. Confirm Sanity docs already recommend standalone Studio. Draft conventions so future `apps/web`, `apps/studio`, and `packages/*` extraction is boring. Do not create workspace config files yet.

### Related File Paths

- `docs/monorepo-alignment.md` (create)
- `docs/cms.md`
- `README.md` (link only)
- `next.config.ts` (comment-only optional note about future `transpilePackages`)
- `TODO.md` (this file)

### Definition of Done

- `docs/monorepo-alignment.md` exists describing target layout, extraction candidates (`content` ports, `site-config`, UI), Studio-as-sibling-app rule, package manager decision gate, and explicit non-goals (no turbo.json yet).
- README Documentation section links the new doc.
- Optional one-line comment in `next.config.ts` pointing to `transpilePackages` for future internal packages — no fake package names wired.
- HUMAN answers only the long-term package manager preference recorded in the doc.

### Out of Scope

- Creating `apps/` or `packages/` directories.
- Adding Turborepo/Nx.
- Moving the Next app.

### Rules to Follow

- Alignment documentation only; zero structural monorepo scaffolding.
- Reflect current npm standardization for the single-app phase unless HUMAN selects a future switch.

### Advanced Coding Pattern

- Architecture Decision Record style: short, decisive, reversible notes.

### Anti-Patterns

- Half-creating workspaces "for later" that break current DX.
- Duplicating the entire assessment canvas into docs.

### Imports/Exports

- Docs primarily; comment-only config allowed.

### Depends On / Blocks

- Depends on: T003, T005 (so content-port language is accurate)
- Blocks: None

### Subtasks

#### T014.1 [AGENT] Draft monorepo alignment doc ✅

- **Targeted file path:** `docs/monorepo-alignment.md`
- **Description:** Write target layout, extraction order (content ports first, then UI, then Studio app), CI future notes, and "do not scaffold yet" rules. Reference `transpilePackages` from Next.js docs conceptually.
- **Commands:**
  - None required beyond file create

#### T014.2 [HUMAN] Record long-term package manager preference ✅

- **Targeted file path:** `docs/monorepo-alignment.md`
- **Description:** Preference only: for the future monorepo, choose `npm workspaces` or `pnpm workspaces` (recommended default for monorepos in the assessment). Reply with one word: `npm` or `pnpm`. Agent will write that decision into the doc; do not install the other manager now.
- **Commands:**
  - None (decision only)

#### T014.3 [AGENT] Link docs and record HUMAN decision ✅

- **Targeted file path:** `docs/monorepo-alignment.md`, `README.md`, optional `next.config.ts` comment
- **Description:** Insert HUMAN package-manager preference into the doc. Link from README. Add optional `transpilePackages` future comment in next.config without enabling unused packages.
- **Commands:**
  - `npm run typecheck` (if next.config touched)

### Implementation Notes

**Decision:** pnpm chosen for future monorepo package manager (2026-07-15)

**Changes Made:**
1. Updated `docs/monorepo-alignment.md` with pnpm decision
2. Linked monorepo alignment doc in README.md Documentation section
3. Added future transpilePackages comment in next.config.ts
4. All QA checks passed: typecheck, lint, and tests (110 tests passing)

**Rationale:**
- pnpm is recommended for monorepos (superior performance, disk efficiency, strict dependency management)
- Aligns with 2026 best practices (Turborepo + pnpm standard)
- Content port pattern (T005-T008) already enables boring extraction
- Sanity Studio as sibling app aligns with Sanity's recommended deployment

---

## Task T015: Fix CSP Nonce Request Wiring Through next-intl Proxy

**Status:** `[x]` COMPLETE

### Initial Analysis & Research

Read `proxy.ts`. Confirm `intlMiddleware(request)` always returns a response, so the early `if (intlResponse)` branch returns before `requestHeaders.set('x-nonce', nonce)`. Confirm `getNonce()` in `app/lib/nonce.ts` reads `x-nonce` and therefore often receives `''`. Research next-intl composition: set custom request headers on a `NextRequest` **before** calling `createMiddleware` handling (or merge rewrite/`NextResponse.next({ request: { headers } })` correctly). Context7 next-intl docs show altering the **response** after `handleI18nRouting`, but request-header forwarding for RSC requires mutating the request the middleware/passthrough uses.

### Related File Paths

- `proxy.ts`
- `app/lib/nonce.ts`
- `app/[locale]/layout.tsx`
- `app/lib/nonce-provider.tsx`
- `docs/security.md`
- `app/__tests__/` (add focused proxy/nonce test if feasible; otherwise document manual verification)

### Definition of Done

- Every matched request that reaches Server Components carries `x-nonce` matching the CSP nonce on the response.
- CSP Report-Only header still set on the intl response path.
- Unit or integration verification proves non-empty nonce in a representative test, or a documented build/script check exists.
- `docs/security.md` notes the next-intl composition rule (set request headers before/with passthrough, not only after early-return).

### Out of Scope

- Switching CSP from Report-Only to Enforce (later; needs T027 Algolia hosts + T013 decision).
- Full static-rendering redesign (T013).
- Rewriting i18n routing rules.

### Rules to Follow

- Do not drop locale redirects/rewrites from next-intl.
- Keep nonce cryptographically random per request.
- Prefer the composition pattern from next-intl middleware docs over forking next-intl.

### Advanced Coding Pattern

- Middleware composition: decorate request -> intl handler -> decorate response.
- Deep module: isolate CSP header builder + nonce generation from routing.

### Anti-Patterns

- Setting CSP on the response while leaving RSC without `x-nonce`.
- Hardcoding a static nonce.
- Returning a brand-new `NextResponse.next` that drops intl rewrite headers.

### Imports/Exports

- Keep `proxy` named export and `config.matcher`. May export `buildCspHeader` only if tests need it (prefer not expanding public surface).

### Depends On / Blocks

- Depends on: None
- Blocks: T013, T029, CSP enforce work, trustworthy Analytics nonce prop

### Subtasks

#### T015.1 [AGENT] Prove dead-path with minimal reproduction notes ✅

- **Targeted file path:** `proxy.ts`, `app/lib/nonce.ts`
- **Description:** Document in task research notes (and later security.md) that the early return skips `x-nonce`. Confirm layout awaits `getNonce()`. No behavioral fix yet.
- **Commands:**
  - `Select-String -Path proxy.ts -Pattern "x-nonce|intlResponse"`

#### T015.2 [AGENT] Implement request+response nonce merge ✅

- **Targeted file path:** `proxy.ts`
- **Description:** Forward `x-nonce` into the request used by intl middleware / passthrough, and set CSP Report-Only on the returned response. Preserve matcher. Add a focused test if the project can unit-test proxy helpers; otherwise add a small Node assertion script under `scripts/` used only for this verification and referenced in docs (do not add flaky e2e solely for headers unless easy).
- **Commands:**
  - `npm run typecheck`
  - Targeted test or script command documented in the subtask result

#### T015.3 [AGENT] Update security docs ✅

- **Targeted file path:** `docs/security.md`
- **Description:** Document correct next-intl + CSP nonce composition and how to verify `x-nonce` is present.
- **Commands:**
  - None beyond doc edit

### Implementation Notes

**Changes Made:**
1. Created `scripts/verify-nonce-wiring.ts` to document the dead-path issue
2. Fixed `proxy.ts` to set `x-nonce` on request headers BEFORE calling `intlMiddleware`
3. Created modified `NextRequest` with nonce header for middleware composition
4. Updated `docs/security.md` with CSP nonce composition pattern and verification instructions
5. All QA checks passed: typecheck, lint, and 110 tests

**Rationale:**
- Middleware composition requires decorating the request before calling next-intl, not after early returns
- The pattern ensures nonce is available to Server Components even on i18n redirect paths
- CSP Report-Only header is set on both redirect and passthrough responses
- Verification script documents the original issue for future reference

**Key Pattern:**
Always decorate request headers before middleware composition. The correct order is:
1. Generate nonce
2. Set `x-nonce` on request headers
3. Create modified `NextRequest` with nonce header
4. Call `intlMiddleware(requestWithNonce)`
5. Set CSP header on the response

---

## Task T016: Move zod to Production Dependencies

**Status:** `[x]` COMPLETE

### Initial Analysis & Research

Confirm `zod` is listed under `devDependencies` in `package.json` while production Server Actions and CMS schemas import it (`app/actions/contact.ts`, `newsletter.ts`, `app/lib/content-types.ts`). In production install modes that omit devDependencies, runtime validation would break. Highest standard: runtime schema libraries belong in `dependencies`.

### Related File Paths

- `package.json`
- `package-lock.json`
- `app/actions/contact.ts`
- `app/actions/newsletter.ts`
- `app/lib/content-types.ts`

### Definition of Done

- `zod` is under `dependencies` (not only `devDependencies`).
- Lockfile updated via npm.
- `npm run test:run -- app/__tests__/actions/contact.test.ts` still passes.
- No behavior change to schemas.

### Out of Scope

- Upgrading zod major.
- Adding env schema (T024).

### Rules to Follow

- Use npm only (post-T002 hygiene).
- Keep the same zod version range unless install requires a resolution.

### Advanced Coding Pattern

- Dependency classification matches runtime import graph.

### Anti-Patterns

- Leaving runtime imports in `devDependencies`.
- Bundling a duplicate zod via mistaken dual installs.

### Imports/Exports

- No source import path changes.

### Depends On / Blocks

- Depends on: T002 preferred
- Blocks: Reliable production deploys that prune devDependencies

### Subtasks

#### T016.1 [AGENT] Confirm runtime import graph ✅

- **Targeted file path:** `package.json`
- **Description:** Grep for `from "zod"` / `from 'zod'` under `app/` and list files. Confirm current package.json section.
- **Commands:**
  - `Select-String -Path app -Pattern "from ['\\\"]zod['\\\"]" -Recurse -Include *.ts,*.tsx`

#### T016.2 [AGENT] Move zod to dependencies and reinstall ✅

- **Targeted file path:** `package.json`, `package-lock.json`
- **Description:** Move `zod` to `dependencies` with npm (`npm install zod` or manual move + `npm install`). Verify placement with node.
- **Commands:**
  - `node -e "const p=require('./package.json'); console.log('deps',!!p.dependencies.zod,'dev',!!p.devDependencies?.zod)"`
  - `npm run test:run -- app/__tests__/actions/contact.test.ts`

### Implementation Notes

**Changes Made:**
1. Moved `zod` from `devDependencies` to `dependencies` in `package.json`
2. Ran `npm install` to update `package-lock.json`
3. Verified placement: zod now in dependencies, not in devDependencies
4. All QA checks passed: typecheck, lint, and contact action tests (11 tests passing)

**Rationale:**
- zod is imported at runtime in Server Actions (`contact.ts`, `newsletter.ts`) and CMS schemas (`content-types.ts`)
- Production installs that prune devDependencies would break runtime validation
- Aligns with best practice: runtime schema libraries belong in dependencies

**No Issues Discovered:**
- All tests passing
- No typecheck or lint errors
- No behavior change to schemas

---

## Task T017: Decide and Implement Analytics Consent Posture

**Status:** `[!]` BLOCKED

### Initial Analysis & Research

Read `app/components/analytics.tsx`. Confirm GA scripts load whenever `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set, with no Consent Mode / CMP / cookie banner. Read privacy page under `app/[locale]/legal/privacy/` for claimed practices. Highest standard for EU/UK/many US state regimes: do not load non-essential trackers before consent (or use Google Consent Mode defaults denied). Solo-dev must choose legal posture; agent implements the technical path.

### Related File Paths

- `app/components/analytics.tsx`
- `app/[locale]/legal/privacy/page.tsx`
- `app/[locale]/layout.tsx`
- `.env.example`
- `ENV_SETUP.md`
- `docs/` (new short privacy-analytics note or section in security/marketing docs)

### Definition of Done

- HUMAN choice recorded: (A) US-only documented, GA may load without banner, or (B) consent-gated / Consent Mode required before GA tags fire.
- Implementation matches the choice; privacy copy does not contradict behavior.
- Tests or a clear BDD checklist verify scripts do not load when consent is denied (if B).
- ENV_SETUP documents the posture.

### Out of Scope

- Hiring counsel / generating full legal privacy policy text beyond aligning existing page claims with behavior.
- Deploying a paid CMP SaaS unless HUMAN requests a specific vendor (prefer lightweight first-party consent if B).

### Rules to Follow

- Prefer technical truth over marketing claims in the privacy page.
- Keep Analytics a deep module with small public API (`Analytics`, `trackEvent`).

### Advanced Coding Pattern

- Consent gate as a deep module: `hasAnalyticsConsent()` + script children only when allowed.
- For (B): default to denied until opt-in; persist preference accessibly.

### Anti-Patterns

- Loading GA immediately then "asking" later.
- Claiming consent in privacy while shipping ungated tags.

### Imports/Exports

- May add `app/lib/analytics-consent.ts` and a small client banner component.

### Depends On / Blocks

- Depends on: T015 preferred if nonce must decorate consent scripts
- Blocks: Honest launch claims around analytics/privacy

### Subtasks

#### T017.1 [AGENT] Document current ungated GA behavior ✅

- **Targeted file path:** `app/components/analytics.tsx`
- **Description:** Summarize when scripts load and what the privacy page claims. Propose option A vs B text for HUMAN. No code change yet.
- **Commands:**
  - None required beyond reading files

#### T017.2 [HUMAN] Choose analytics posture

- **Targeted file path:** TBD based on choice
- **Description:** Reply with exactly `A` (document US-only / no banner), `B` (implement consent gate before GA), or `C` (cookieless analytics alternative). If jurisdictions matter, say them in one line; agent will not invent legal advice.
- **Commands:**
  - None (decision only)

#### T017.3 [AGENT] Implement chosen posture

- **Targeted file path:** `app/components/analytics.tsx` and related consent module/UI if B; privacy page + ENV_SETUP either way
- **Description:** Implement A (docs + code comments + privacy alignment), B (gate + tests), or C (replace GA with cookieless alternative). Add/adjust a focused unit/component test for the gate if B.
- **Commands:**
  - `npm run test:run -- app/__tests__/components/` (targeted new consent test file if added)
  - `npm run typecheck`

### Implementation Notes

**Status:** BLOCKED - Pending HUMAN research and decision on analytics consent posture.

**Research Completed:**
- Documented current ungated GA behavior (scripts load immediately when NEXT_PUBLIC_GA_MEASUREMENT_ID is set)
- Conducted online research on GDPR, CCPA, Consent Mode v2, and cookieless analytics alternatives
- Provided three options:
  - **Option A**: US-only documented, no consent banner
  - **Option B**: Consent-gated GA4 with Google Consent Mode v2
  - **Option C**: Replace GA4 with cookieless analytics (Plausible/Fathom/Matomo)

**Research Findings:**
- GDPR requires consent before GA4 loads in EU/UK
- Consent Mode v2 mandatory for EU traffic since March 2024
- Cookieless analytics alternatives eliminate consent requirements
- CCPA does not require consent for analytics (focus on data sales)

**Decision Required:** HUMAN must choose Option A, B, or C to proceed.

---

## Task T018: Escape Contact Form Fields in Outbound HTML Email

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Read `app/actions/contact.ts` email HTML construction. Confirm user-controlled fields (`name`, `email`, `company`, `message`, etc.) are interpolated into HTML without escaping. This is stored/reflected HTML injection into the inbox viewer. Highest standard: escape HTML entities or send text/safe templates.

### Related File Paths

- `app/actions/contact.ts`
- `app/__tests__/actions/contact.test.ts`
- `app/lib/content-sanitizer.ts` (optional reuse patterns; email escaping may be a smaller helper)

### Definition of Done

- HTML email body escapes user text so crafted input cannot inject tags.
- Unit test covers a payload like `<script>` / `<img` in name/message and asserts escaped output or safe absence of raw tags (via mocked Resend capture).
- No change to validation schema beyond what escaping needs.

### Out of Scope

- Switching email providers.
- Building a full React-email design system.

### Rules to Follow

- Escape at the HTML construction boundary; do not log raw PII.
- Prefer a tiny pure `escapeHtml` deep helper over pulling DOM APIs into the action.

### Advanced Coding Pattern

- Pure function `escapeHtml(value: string): string` colocated under `app/lib/` with unit tests.

### Anti-Patterns

- Relying only on Zod string length to prevent XSS.
- Using `sanitize-html` configured for document bodies when simple entity escaping suffices for text nodes.

### Imports/Exports

- New helper export; contact action imports it.

### Depends On / Blocks

- Depends on: None
- Blocks: Safer production contact form

### Subtasks

#### T018.1 [AGENT] Write failing test for HTML injection in email body

- **Targeted file path:** `app/__tests__/actions/contact.test.ts`
- **Description:** With Resend mocked and credentials set for the send path, submit fields containing HTML and assert the HTML string passed to Resend is escaped. Follow existing mock patterns.
- **Commands:**
  - `npm run test:run -- app/__tests__/actions/contact.test.ts`

#### T018.2 [AGENT] Implement escape helper and wire contact action

- **Targeted file path:** `app/lib/escape-html.ts` (or similar), `app/actions/contact.ts`
- **Description:** Implement escaping; use it for all interpolated user fields in HTML. Keep text-only alternatives if already present. Make tests green.
- **Commands:**
  - `npm run test:run -- app/__tests__/actions/contact.test.ts`
  - `npm run typecheck`

---

## Task T019: Gate Indexing on Real Production Environment

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Read `app/robots.ts`. Confirm `NODE_ENV === 'production'` allows full indexing. On Vercel, Preview deployments often also use `NODE_ENV=production`, so previews may be indexable contrary to the file's non-production comment. Highest standard: gate on `VERCEL_ENV === 'production'` and/or explicit `ALLOW_INDEXING=true`.

### Related File Paths

- `app/robots.ts`
- `.env.example`
- `ENV_SETUP.md`
- `docs/seo.md` (if present)

### Definition of Done

- Production indexing allowed only when environment is true production (or explicit allow flag).
- Preview/staging disallow all.
- Docs and `.env.example` describe `ALLOW_INDEXING` / `VERCEL_ENV` behavior.
- Add a small unit test if robots logic is extracted to a pure helper (preferred deep module).

### Out of Scope

- Changing AI crawler allow/deny policy content (GPTBot rules etc.) except the production gate.
- Search Console setup (HUMAN later).

### Rules to Follow

- Fail closed (disallow) when unsure.
- Keep crawler policy readable.

### Advanced Coding Pattern

- Pure `getRobotsPolicy(env): MetadataRoute.Robots` deep module tested without Next runtime.

### Anti-Patterns

- Using only `NODE_ENV` for indexing decisions on Vercel.
- Allowing indexing by default in ambiguous envs.

### Imports/Exports

- Optional `app/lib/robots-policy.ts` export used by `app/robots.ts`.

### Depends On / Blocks

- Depends on: None
- Blocks: Safe preview URLs

### Subtasks

#### T019.1 [AGENT] Extract and TDD robots gate helper

- **Targeted file path:** `app/lib/robots-policy.ts`, `app/__tests__/lib/robots-policy.test.ts`
- **Description:** Write tests for production vs preview vs explicit allow/deny. Implement helper. Keep AI crawler rules moved carefully without drive-by policy changes.
- **Commands:**
  - `npm run test:run -- app/__tests__/lib/robots-policy.test.ts`

#### T019.2 [AGENT] Wire robots.ts and document env

- **Targeted file path:** `app/robots.ts`, `.env.example`, `ENV_SETUP.md`, `docs/seo.md`
- **Description:** Use helper; document vars. Typecheck.
- **Commands:**
  - `npm run typecheck`

---

## Task T020: Add Locale Segment error.tsx

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Confirm there is no `app/[locale]/error.tsx` or `app/global-error.tsx`. Only class `ErrorBoundary` and `not-found` exist. Next.js App Router standard: `error.tsx` for segment recovery UI. Highest standard marketing sites provide branded recoverable errors without white screens.

### Related File Paths

- `app/[locale]/error.tsx` (create)
- `app/global-error.tsx` (create if required for root failures)
- `app/components/error-boundary.tsx`
- `messages/en.json`, `messages/es.json` (optional copy keys)
- `app/e2e/` (optional smoke)

### Definition of Done

- Locale `error.tsx` client boundary with reset and navigation home (locale-aware Link).
- Matches existing visual language without introducing card spam.
- Basic render test or e2e not mandatory if manual BDD checklist is documented; prefer a light component test.
- Docs note difference vs `ErrorBoundary` wrapper.

### Out of Scope

- Full status page product.
- Translating every error string if i18n strategy still deferred (may use minimal English with TODO for T036).

### Rules to Follow

- `error.tsx` must be a Client Component.
- Do not leak stack traces to end users in production.

### Advanced Coding Pattern

- Thin route file + shared presentational error view deep module if needed.

### Anti-Patterns

- Relying only on class ErrorBoundary inside layout for route render errors.
- Showing raw `error.message` from unknown exceptions in production UI.

### Imports/Exports

- May export `RouteErrorView` from components.

### Depends On / Blocks

- Depends on: None
- Blocks: None

### Subtasks

#### T020.1 [AGENT] Implement locale error.tsx

- **Targeted file path:** `app/[locale]/error.tsx`
- **Description:** Add reset + home link using i18n navigation. Optionally add `global-error.tsx` with minimal html/body for root failures.
- **Commands:**
  - `npm run typecheck`

#### T020.2 [AGENT] Add focused UI test or BDD checklist

- **Targeted file path:** `app/__tests__/components/` or `docs/`
- **Description:** Prefer a vitest render of the error view props; if impractical, document BDD acceptance in a short `docs/error-ui.md` checklist.
- **Commands:**
  - Targeted vitest file if created

---

## Task T021: Add Portfolio Case Study generateMetadata

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Read `app/[locale]/portfolio/[slug]/page.tsx`. Confirm `generateStaticParams` exists but `generateMetadata` does not (unlike blog slug pages). Highest standard: unique title/description/canonical/OG per case study.

### Related File Paths

- `app/[locale]/portfolio/[slug]/page.tsx`
- `app/lib/portfolio-data.ts` (or content port after T007)
- `app/[locale]/blog/[slug]/page.tsx` (reference pattern)

### Definition of Done

- `generateMetadata` sets title, description, alternates (locale-aware if helper exists), openGraph basics.
- Unknown slug still triggers notFound path consistently.
- Typecheck passes; no visual redesign.

### Out of Scope

- Pricing/search metadata (T022/T026).
- Changing case study body content.

### Rules to Follow

- Prefer absolute URLs via `site-config` helpers.
- After T007, metadata should read through portfolio port.

### Advanced Coding Pattern

- Async metadata co-located with page; shared `buildLocaleAlternates` helper if exists (create tiny helper only if reused immediately).

### Anti-Patterns

- Generic site title for all case studies.
- Canonical without locale while routes are under `[locale]`.

### Imports/Exports

- Page-local metadata export only unless helper extracted.

### Depends On / Blocks

- Depends on: T007 preferred (else use portfolio-data with note to switch)
- Blocks: Complete portfolio SEO

### Subtasks

#### T021.1 [AGENT] Mirror blog metadata pattern for portfolio

- **Targeted file path:** `app/[locale]/portfolio/[slug]/page.tsx`
- **Description:** Implement `generateMetadata` using the same structure as blog slug metadata, reading from portfolio port/data.
- **Commands:**
  - `npm run typecheck`

#### T021.2 [AGENT] Spot-check build metadata for one slug

- **Targeted file path:** `app/[locale]/portfolio/[slug]/page.tsx`
- **Description:** Run build or a lightweight assertion that metadata function returns expected title for a known slug (unit test exporting helper optional).
- **Commands:**
  - `npm run build` only if cheaper checks are insufficient; prefer a tiny unit test of a pure metadata builder if extracted

---

## Task T022: Split Pricing Page into Server Shell with Metadata

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Confirm `app/[locale]/pricing/page.tsx` begins with `"use client"` and has no `generateMetadata`. Highest standard: server page owns metadata; interactive pricing toggle lives in a child client component.

### Related File Paths

- `app/[locale]/pricing/page.tsx`
- `app/components/` (new pricing client section)
- `app/[locale]/pricing/opengraph-image.tsx`

### Definition of Done

- Server `page.tsx` exports metadata (or `generateMetadata`) and renders a client island for interactivity.
- Locale-aware title/description present.
- Existing pricing e2e/behavior preserved (BDD: monthly/yearly toggle still works if present).
- Typecheck passes.

### Out of Scope

- Redesigning pricing UX or copy.
- Implementing Stripe checkout.

### Rules to Follow

- Keep client bundle limited to interactive parts.
- Preserve i18n `Link` usage.

### Advanced Coding Pattern

- Server/client split: route = metadata + composition; widget = `"use client"`.

### Anti-Patterns

- Entire marketing page as client component solely for one toggle.
- Losing JSON-LD if currently on the page without migrating it carefully (prefer server-rendered script).

### Imports/Exports

- New client component export; page becomes server default export.

### Depends On / Blocks

- Depends on: None
- Blocks: Pricing SEO

### Subtasks

#### T022.1 [AGENT] Extract client pricing widget

- **Targeted file path:** `app/components/pricing-view.tsx` (name as appropriate), `app/[locale]/pricing/page.tsx`
- **Description:** Move interactive UI into client component; leave server page wrapper. Add metadata. Keep behavior identical.
- **Commands:**
  - `npm run typecheck`

#### T022.2 [AGENT] Smoke existing pricing interactions

- **Targeted file path:** `app/e2e/` or manual BDD
- **Description:** If an e2e covers pricing, run chromium-only; else document BDD checklist steps for toggle/CTA in task completion notes / short doc line under README testing if needed.
- **Commands:**
  - `npx playwright test --project=chromium -g pricing` (only if such tests exist; otherwise skip with note)

---

## Task T023: Locale-Aware Canonical and Alternates Helper

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Grep canonical fields: home uses `canonical: "/"`, blog uses `/blog/${slug}` without locale prefix. Layout sets some language alternates. Highest standard for localized sites: self-canonical includes locale (or consistent `localePrefix` policy) plus `languages` map.

### Related File Paths

- `app/lib/site-config.ts` or new `app/lib/seo-alternates.ts`
- `app/[locale]/page.tsx`
- `app/[locale]/blog/[slug]/page.tsx`
- `app/[locale]/layout.tsx`
- `i18n/routing.ts`
- `app/__tests__/lib/`

### Definition of Done

- Pure helper builds canonical + languages alternates for a path + locale.
- Home + blog detail (+ portfolio after T021) use the helper.
- Unit tests cover en/es outputs.
- Document intended `localePrefix` behavior.

### Out of Scope

- Translating pathnames (`/blog` vs `/blogue`).
- Changing default locale routing strategy beyond documenting it.

### Rules to Follow

- Single deep module owns URL alternate rules.
- Do not invent hreflang values outside configured locales.

### Advanced Coding Pattern

- `buildAlternates({ locale, pathname })` returns Next Metadata `alternates` object.

### Anti-Patterns

- Hand-duplicating en/es maps on every page.
- Canonical pointing at non-localized `/` while pages live under `/en`.

### Imports/Exports

- New helper exports; pages import helper only.

### Depends On / Blocks

- Depends on: None (can land before content ports)
- Blocks: Consistent SEO across T021/T022 consumers

### Subtasks

#### T023.1 [AGENT] TDD alternates helper

- **Targeted file path:** `app/lib/seo-alternates.ts`, `app/__tests__/lib/seo-alternates.test.ts`
- **Description:** Write tests for default and secondary locale; implement helper using `siteUrl` + routing locales.
- **Commands:**
  - `npm run test:run -- app/__tests__/lib/seo-alternates.test.ts`

#### T023.2 [AGENT] Apply helper to key pages

- **Targeted file path:** locale home, blog slug, layout if overlapping
- **Description:** Replace ad-hoc canonicals. Typecheck.
- **Commands:**
  - `npm run typecheck`
  - `npm run test:run -- app/__tests__/lib/seo-alternates.test.ts`

---

## Task T024: Add Zod Env Validation Module

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Env vars are read ad hoc (`process.env.*`) without a boot-time schema. Highest standard: validated env module (`app/lib/env.ts`) with Zod; public vs server split; fail fast in production when required secrets missing. Optional: `@t3-oss/env-nextjs` only if it fits existing Next 16 setup without heavy churn — prefer a small in-house deep module first.

### Related File Paths

- `app/lib/env.ts` (create)
- `.env.example`
- `ENV_SETUP.md`
- Call sites that read env (analytics, resend, upstash, sanity, algolia, site URL)

### Definition of Done

- Server and client env schemas exist with clear optional vs required rules for build vs runtime.
- Critical server actions import validated env accessors where practical (at least Resend + site URL).
- Unit tests cover schema parsing for typical `.env.example` shapes.
- Docs list required prod vars.

### Out of Scope

- Forcing all optional marketing integrations to be required in local dev.
- Secret scanning SaaS.

### Rules to Follow

- Never put secret server vars in `NEXT_PUBLIC_*`.
- Keep the module the only place that shapes env defaults.

### Advanced Coding Pattern

- Deep module `env.server` / `env.public` with Zod; lazy parse once.

### Anti-Patterns

- Throwing on missing optional Algolia during local `next dev` if search is unused.
- Duplicating default URL strings across files after env module exists.

### Imports/Exports

- Export typed getters; gradually adopt (full strangler not required in one task, but site URL + Resend must use it).

### Depends On / Blocks

- Depends on: T016
- Blocks: Safer deploys

### Subtasks

#### T024.1 [AGENT] Inventory env keys from .env.example

- **Targeted file path:** `.env.example`
- **Description:** Classify public vs server, required-in-prod vs optional. No code yet beyond notes used for schema.
- **Commands:**
  - None

#### T024.2 [AGENT] Implement env module + tests

- **Targeted file path:** `app/lib/env.ts`, `app/__tests__/lib/env.test.ts`
- **Description:** Implement schemas and tests. Wire site URL helper and contact/newsletter Resend reads through env module.
- **Commands:**
  - `npm run test:run -- app/__tests__/lib/env.test.ts`
  - `npm run test:run -- app/__tests__/actions/contact.test.ts`
  - `npm run typecheck`

#### T024.3 [AGENT] Update ENV_SETUP

- **Targeted file path:** `ENV_SETUP.md`, `.env.example`
- **Description:** Document validation behavior and required production keys.
- **Commands:**
  - None beyond docs

---

## Task T025: Remove Unused isomorphic-dompurify Dependency

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Confirm `isomorphic-dompurify` is in `package.json` dependencies but unused under `app/` (sanitizer uses `sanitize-html`). Highest standard: one sanitizer stack, no dead deps.

### Related File Paths

- `package.json`
- `package-lock.json`
- `app/lib/content-sanitizer.ts`
- `docs/security.md`

### Definition of Done

- `isomorphic-dompurify` removed from dependencies and lockfile.
- Sanitizer tests still pass.
- Security docs mention `sanitize-html` as the chosen stack.

### Out of Scope

- Rewriting sanitizer to DOMPurify.
- Changing allowlist tags.

### Rules to Follow

- Keep SSR-safe sanitization behavior unchanged.

### Advanced Coding Pattern

- Single security dependency for HTML allowlisting.

### Anti-Patterns

- Leaving unused XSS libraries "for later".

### Imports/Exports

- None in app code.

### Depends On / Blocks

- Depends on: T002 preferred
- Blocks: None

### Subtasks

#### T025.1 [AGENT] Verify zero imports then uninstall

- **Targeted file path:** `package.json`
- **Description:** Grep repo for dompurify usage; `npm uninstall isomorphic-dompurify`.
- **Commands:**
  - `Select-String -Path app,scripts,docs -Pattern "dompurify|isomorphic-dompurify" -Recurse`
  - `npm uninstall isomorphic-dompurify`

#### T025.2 [AGENT] Re-run sanitizer tests and note docs

- **Targeted file path:** `app/__tests__/lib/content-sanitizer.test.ts`, `docs/security.md`
- **Description:** Ensure tests pass; document chosen sanitizer.
- **Commands:**
  - `npm run test:run -- app/__tests__/lib/content-sanitizer.test.ts`

---

## Task T026: Fix Search Locale URLs, Types, and Metadata

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Read `app/lib/search-data.ts` URLs (`/blog/...` without locale), `app/[locale]/search/page.tsx` (client, loosely typed hits), and confirm search is omitted from sitemap. Highest standard: locale-prefixed hit URLs, typed `SearchHit`, metadata on search route, conscious index/noindex choice. Algolia indexing job is separate (subtask or follow-on) — if no indexer yet, document that UI is local/fallback only.

### Related File Paths

- `app/lib/search-data.ts`
- `app/__tests__/lib/search-data.test.ts`
- `app/[locale]/search/page.tsx`
- `app/components/search-bar.tsx`
- `app/sitemap.ts`

### Definition of Done

- Hit URLs include locale (or explicit strategy documented and tested).
- Search page uses `SearchHit` types (no `any`).
- Server shell or metadata for `/search` exists (split client if needed, like pricing).
- Sitemap includes search or privacy/docs state `noindex` deliberately.
- Tests updated.

### Out of Scope

- Full Algolia `saveObjects` pipeline (add only a stub script/README pointer if quick; otherwise T032-adjacent follow-up note). Prefer a tiny `scripts/reindex-search.ts` stub only if credentials shape is clear.

### Rules to Follow

- Async-first search aggregation remains.
- Do not ship secret write API keys to the client.

### Advanced Coding Pattern

- Typed DTO boundary for search hits; UI depends on types from `search-data`.

### Anti-Patterns

- Hardcoding English empty states forever without i18n note.
- Indexing preview content.

### Imports/Exports

- Keep `SearchHit` exported; pages import types from lib.

### Depends On / Blocks

- Depends on: T008 preferred for port-backed aggregation
- Blocks: Honest search launch

### Subtasks

#### T026.1 [AGENT] Fix search-data locale URLs + tests

- **Targeted file path:** `app/lib/search-data.ts`, `app/__tests__/lib/search-data.test.ts`
- **Description:** Include locale in URLs (function arg or per-locale generation). Update tests.
- **Commands:**
  - `npm run test:run -- app/__tests__/lib/search-data.test.ts`

#### T026.2 [AGENT] Search page metadata/types/server split

- **Targeted file path:** `app/[locale]/search/page.tsx`
- **Description:** Remove `any`, add metadata via server wrapper if page is client, decide sitemap vs noindex and implement.
- **Commands:**
  - `npm run typecheck`

---

## Task T027: Extend CSP Allowlists for Algolia (Report-Only Ready)

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Read `buildCspHeader` in `proxy.ts`. Confirm `connect-src`/`script-src` allow GA but not Algolia hosts used by InstantSearch. Before CSP enforce, allowlist required Algolia domains. Cross-check InstantSearch network hosts (`*.algolia.net`, `*.algolianet.com` as applicable).

### Related File Paths

- `proxy.ts`
- `docs/security.md`
- `app/components/search-bar.tsx`

### Definition of Done

- CSP builder includes minimal Algolia hosts needed for search.
- Security docs list host rationale.
- Still Report-Only unless HUMAN later approves enforce (not this task).
- Typecheck passes.

### Out of Scope

- CSP Enforce flip.
- Sanity CDN in CSP img-src (coordinate with T012; can add img-src for cdn.sanity.io here only if already decided).

### Rules to Follow

- Least privilege: no `*` hosts.
- Keep nonce + strict-dynamic script strategy intact.

### Advanced Coding Pattern

- CSP directives as structured data joined into header string (optional small refactor if it clarifies allowlists).

### Anti-Patterns

- `connect-src *`.
- Enforcing CSP in the same change as expanding allowlists without report data.

### Imports/Exports

- Prefer keeping builder private inside `proxy.ts` unless tests need extraction.

### Depends On / Blocks

- Depends on: T015 preferred
- Blocks: Future CSP enforce

### Subtasks

#### T027.1 [AGENT] Confirm Algolia host list from InstantSearch usage

- **Targeted file path:** `app/components/search-bar.tsx`, `package.json`
- **Description:** Determine required script/connect hosts from deps/docs; draft allowlist.
- **Commands:**
  - None beyond research

#### T027.2 [AGENT] Update CSP builder + security docs

- **Targeted file path:** `proxy.ts`, `docs/security.md`
- **Description:** Apply allowlist; document. Typecheck.
- **Commands:**
  - `npm run typecheck`

---

## Task T028: Add format and format:check Scripts

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Confirm Prettier is installed (`.prettierrc` with Tailwind plugin) but `package.json` has no `format` / `format:check` scripts and eslint-config-prettier is absent. Highest standard: reproducible format check in CI (can be a job step) without requiring husky yet.

### Related File Paths

- `package.json`
- `.prettierrc`
- `.prettierignore` (create if missing)
- `.github/workflows/ci.yml`
- `eslint.config.mjs`

### Definition of Done

- `npm run format` and `npm run format:check` exist.
- `.prettierignore` covers `.next`, `coverage`, lockfiles, build artifacts.
- CI lint job or sibling step runs `format:check` (after codebase is formatted once).
- Optional: `eslint-config-prettier` to avoid rule fights — include if quick and non-noisy.

### Out of Scope

- Mandatory husky/lint-staged (optional follow-up note only).
- Mass redesign of prettier options.

### Rules to Follow

- One formatting pass committed deliberately if check would fail everywhere.
- Do not mix format-only diffs with feature tasks later.

### Advanced Coding Pattern

- Tooling DX scripts as part of the package public surface.

### Anti-Patterns

- Format-checking without ignore rules for `.next`.
- Enabling husky without HUMAN desire for git hooks on Windows.

### Imports/Exports

- Scripts only.

### Depends On / Blocks

- Depends on: T002
- Blocks: Consistent PR hygiene

### Subtasks

#### T028.1 [AGENT] Add scripts and prettierignore

- **Targeted file path:** `package.json`, `.prettierignore`
- **Description:** Add scripts; create ignore file; run format once if needed so check passes.
- **Commands:**
  - `npm run format`
  - `npm run format:check`

#### T028.2 [AGENT] Add CI format:check step

- **Targeted file path:** `.github/workflows/ci.yml`
- **Description:** Add format check to lint job after install. Do not weaken lint rules.
- **Commands:**
  - `npm run format:check`

---

## Task T029: Wire or Remove Unused NonceProvider

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Confirm `app/lib/nonce-provider.tsx` exists but layout does not wrap with it; layout only passes nonce to Analytics. Either integrate provider for client components needing nonce or delete dead code to reduce confusion.

### Related File Paths

- `app/lib/nonce-provider.tsx`
- `app/[locale]/layout.tsx`
- `app/components/analytics.tsx`

### Definition of Done

- Either provider is used by layout and documented, or file removed and references cleaned.
- Typecheck passes; Analytics still receives nonce.

### Out of Scope

- CSP enforce.
- Reworking all inline scripts.

### Rules to Follow

- Prefer deletion over unused abstractions when only Analytics needs nonce today.

### Advanced Coding Pattern

- Avoid speculative providers; add when a second consumer appears.

### Anti-Patterns

- Keeping unused React context "for later".

### Imports/Exports

- Adjust exports accordingly.

### Depends On / Blocks

- Depends on: T015
- Blocks: None

### Subtasks

#### T029.1 [AGENT] Choose wire vs delete after consumer inventory

- **Targeted file path:** `app/lib/nonce-provider.tsx`
- **Description:** Grep for NonceProvider usage. If only Analytics needs nonce, delete provider and keep prop drilling; if multiple client consumers need it, wire provider in layout.
- **Commands:**
  - `Select-String -Path app -Pattern "NonceProvider|useNonce" -Recurse -Include *.ts,*.tsx`
  - `npm run typecheck`

---

## Task T030: Scope FAQ JSON-LD and Nonce Page Schema Scripts

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Confirm locale layout always injects FAQ JSON-LD sitewide and child pages inject schema `<script>` tags without nonce. Before CSP enforce, page scripts need nonce; FAQ schema should appear on FAQ (and maybe home) only.

### Related File Paths

- `app/[locale]/layout.tsx`
- `app/[locale]/faq/page.tsx`
- `app/lib/schema.ts`
- Pages embedding `generateSchemaJsonLd`

### Definition of Done

- FAQ schema not globally injected on unrelated routes.
- Schema script tags that remain use the request nonce when available.
- Security/seo docs note the pattern.
- Typecheck passes.

### Out of Scope

- Full structured-data audit of every page.
- CSP enforce.

### Rules to Follow

- Valid JSON-LD; do not break existing rich results intentionally.
- Keep schema builders pure in `schema.ts`.

### Advanced Coding Pattern

- `JsonLd` tiny server component accepting `nonce` + data.

### Anti-Patterns

- Sitewide FAQ entities on non-FAQ URLs.
- Un-nonced inline scripts under a nonce CSP.

### Imports/Exports

- Optional `JsonLd` component export.

### Depends On / Blocks

- Depends on: T015
- Blocks: Safer CSP enforce later

### Subtasks

#### T030.1 [AGENT] Move FAQ schema to FAQ page

- **Targeted file path:** `app/[locale]/layout.tsx`, `app/[locale]/faq/page.tsx`
- **Description:** Remove sitewide FAQ JSON-LD from layout; ensure FAQ page still emits it.
- **Commands:**
  - `npm run typecheck`

#### T030.2 [AGENT] Add nonce to remaining JSON-LD scripts

- **Targeted file path:** pages with schema scripts; optional JsonLd helper
- **Description:** Pass nonce from layout/getNonce or helper. Document in security.md.
- **Commands:**
  - `npm run typecheck`

---

## Task T031: Correct public/llms.txt Paths

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Read `public/llms.txt`. Confirm links omit locale prefixes and reference public `/docs/*.md` URLs that are not App Router pages. Highest standard: llms.txt only advertises real public URLs.

### Related File Paths

- `public/llms.txt`
- `docs/seo.md` or marketing research doc (optional note)

### Definition of Done

- Links point at real localized routes (or host-relative paths that resolve).
- Remove or replace invented `/docs/...` public links.
- Short comment at top of file describing update policy.

### Out of Scope

- Publishing internal markdown docs as public routes.
- Full GEO strategy rewrite.

### Rules to Follow

- Accuracy over completeness.
- Keep file emoji-free and plain text.

### Advanced Coding Pattern

- Treat llms.txt as a curated public API surface for AI crawlers.

### Anti-Patterns

- Listing private docs paths that 404.
- Forgetting locale prefixes while the site requires them.

### Imports/Exports

- Static file only.

### Depends On / Blocks

- Depends on: None
- Blocks: None

### Subtasks

#### T031.1 [AGENT] Rewrite llms.txt against real routes

- **Targeted file path:** `public/llms.txt`
- **Description:** Align links with `app/[locale]` routes and sitemap awareness. Prefer `/en/...` examples plus note about locales.
- **Commands:**
  - Compare against sitemap route list manually

---

## Task T032: Add Sanity Draft Mode Enable and Signed Revalidate Route

**Status:** `[ ]` OPEN

### Initial Analysis & Research

`docs/cms.md` describes draft mode and `/api/revalidate`, but repo lacks `draftMode` enable route and webhook revalidation. next-sanity recommends `defineEnableDraftMode` and signed tag revalidation (`revalidateTag` with secrets). Only implement when content ports exist or as scaffolding behind env flags — still valuable before Studio go-live.

### Related File Paths

- `app/api/...` or route handlers under app (create)
- `app/lib/cms-client.ts`
- `docs/cms.md`
- `.env.example`
- next-sanity draft-mode helpers

### Definition of Done

- Enable-draft route validates preview secret and enables Next draft mode.
- Revalidate route verifies secret (timing-safe) and revalidates tags/paths.
- Docs match implementation; env examples updated.
- Tests for secret failure paths (unit on helpers) preferred.
- No unauthenticated revalidate.

### Out of Scope

- Building the Studio app.
- Full Live Content visual editing UI polish.
- Enabling `cacheComponents` solely for Sanity (document note only).

### Rules to Follow

- Timing-safe secret compare.
- Server tokens never exposed to client bundles.

### Advanced Coding Pattern

- Follow next-sanity `defineEnableDraftMode` + webhook tag revalidation patterns from current docs.

### Anti-Patterns

- Open revalidate endpoint with only a query path param and no secret.
- Enabling draft mode without secret validation.

### Imports/Exports

- Route handlers export GET/POST as required; keep helpers private.

### Depends On / Blocks

- Depends on: T005–T008, T016, T024 preferred
- Blocks: Safe Sanity go-live

### Subtasks

#### T032.1 [AGENT] Research and scaffold enable-draft route

- **Targeted file path:** draft enable route file
- **Description:** Implement enable-draft using next-sanity helper patterns; wire env secrets. Document local test steps without requiring live Sanity project (skip integration if credentials absent).
- **Commands:**
  - `npm run typecheck`

#### T032.2 [AGENT] Implement signed revalidate route + tests

- **Targeted file path:** revalidate route + helper tests
- **Description:** Secret validation + revalidateTag/path. Unit test unauthorized cases with mocked env.
- **Commands:**
  - Targeted vitest file for secret helper
  - `npm run typecheck`

#### T032.3 [AGENT] Sync docs/cms.md to real routes

- **Targeted file path:** `docs/cms.md`, `.env.example`, `ENV_SETUP.md`
- **Description:** Replace aspirational snippets with actual paths and env names.
- **Commands:**
  - None beyond docs

---

## Task T033: Remove Placeholder Organization Phone from Schema

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Confirm `app/lib/schema.ts` organization schema includes placeholder phone `+1-234-567-890`. Highest standard: accurate NAP or omit field until real data exists.

### Related File Paths

- `app/lib/schema.ts`
- `app/__tests__/` if schema tested

### Definition of Done

- Placeholder phone removed or replaced only after HUMAN provides the real number.
- Schema remains valid JSON-LD.
- Docs/TODO note that NAP fields require HUMAN-provided facts.

### Out of Scope

- Writing real business address without HUMAN input.
- Local SEO campaign setup.

### Rules to Follow

- Prefer omit over fake data.

### Advanced Coding Pattern

- Schema builders accept optional NAP fields; omit undefined keys.

### Anti-Patterns

- Shipping obviously fake telephone in Organization schema.

### Imports/Exports

- Adjust `organizationSchema` builder signature if needed.

### Depends On / Blocks

- Depends on: None
- Blocks: Trustworthy local SEO markup

### Subtasks

#### T033.1 [AGENT] Omit placeholder phone from organization schema

- **Targeted file path:** `app/lib/schema.ts`
- **Description:** Remove fake phone; make telephone optional. Update any tests snapshots/assertions.
- **Commands:**
  - `npm run typecheck`
  - Targeted schema tests if present

#### T033.2 [HUMAN] Provide real NAP fields when ready

- **Targeted file path:** `app/lib/schema.ts`
- **Description:** Optional later: supply real telephone/address for agent to add. Until then leave omitted. Reply with fields only when accurate.
- **Commands:**
  - None

---

## Task T034: Supply Portfolio Client Image Allowlist and Assets Policy

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Portfolio data references `/clients/*.png` but `public/` lacks those assets; `images.localPatterns` is empty so Next Image optimization is blocked by policy. Highest standard: real assets or no broken Image; explicit localPatterns for allowed public paths.

### Related File Paths

- `app/lib/portfolio-data.ts`
- `public/clients/` (create when assets exist)
- `next.config.ts`
- `docs/cms.md` / security notes for image policy

### Definition of Done

- Either placeholder-safe UI without missing images, or real assets committed under `public/clients/` with `localPatterns` allowlisting them.
- Next config documents why patterns are narrow.
- Portfolio page does not 404 images in chromium smoke.

### Out of Scope

- Purchasing stock art (HUMAN provides assets or approves SVG placeholders generated by agent).
- Sanity CDN (T012).

### Rules to Follow

- Do not leave Image `src` pointing at missing files.
- Keep allowlists least-privilege.

### Advanced Coding Pattern

- Content module references only assets that exist; config allowlists those paths.

### Anti-Patterns

- Broad `localPatterns: [{ pathname: '/**' }]` without need.
- Broken Image icons on case studies at launch.

### Imports/Exports

- Config + static assets; possible portfolio field adjustments.

### Depends On / Blocks

- Depends on: T012 can land hosts in parallel; coordinate localPatterns here
- Blocks: Polished portfolio launch

### Subtasks

#### T034.1 [AGENT] Inventory missing client image paths

- **Targeted file path:** `app/lib/portfolio-data.ts`, `public/`
- **Description:** List referenced logos vs files on disk. Propose placeholder SVGs vs omit logos.
- **Commands:**
  - List `public` and grepped logo paths

#### T034.2 [HUMAN] Approve asset strategy

- **Targeted file path:** `public/clients/`
- **Description:** Reply `placeholders` (agent may add simple geometric SVG logos) or `omit` (remove Image logos until real brand assets provided) or supply real files into `public/clients/`.
- **Commands:**
  - None (decision or file drop)

#### T034.3 [AGENT] Implement strategy + localPatterns

- **Targeted file path:** `next.config.ts`, portfolio UI/data, `public/clients/` if placeholders
- **Description:** Apply choice; add narrow `localPatterns`; run portfolio chromium smoke if feasible.
- **Commands:**
  - `npm run typecheck`
  - `npx playwright test app/e2e/portfolio-detail.spec.ts --project=chromium`

---

## Task T035: Add Production Error Monitoring Scaffold

**Status:** `[ ]` OPEN

### Initial Analysis & Research

`.env.example` comments `NEXT_PUBLIC_SENTRY_DSN` but no Sentry SDK is installed; errors/CSP reports go to console only. Highest standard: error monitoring before launch traffic. Agent can scaffold integration; HUMAN creates the Sentry project/DSN (external).

### Related File Paths

- `package.json`
- Sentry config files (create per current Next 16 guidance)
- `app/csp-violation-report-endpoint/route.ts`
- `.env.example`, `ENV_SETUP.md`
- `docs/security.md`

### Definition of Done

- Sentry (or chosen OSS alternative if HUMAN prefers — default Sentry) scaffolded for App Router without breaking builds when DSN absent.
- CSP report endpoint forwards summarized violations when DSN present (rate-limited).
- Docs explain enabling via env.
- No secrets committed.

### Out of Scope

- Paid plan selection.
- Full performance tracing sampling tuning beyond sane defaults.

### Rules to Follow

- Disabled/no-op without DSN.
- Do not send PII from forms to error monitoring.

### Advanced Coding Pattern

- Soft-dependency monitoring: init only when env valid.

### Anti-Patterns

- Requiring DSN for local `next dev`.
- Logging full CSP report bodies containing URLs with secrets.

### Imports/Exports

- Sentry config modules per Next tooling.

### Depends On / Blocks

- Depends on: T003 preferred
- Blocks: Production observability

### Subtasks

#### T035.1 [HUMAN] Create Sentry project and provide DSN

- **Targeted file path:** `.env.local` (untracked)
- **Description:** Create a Sentry Next.js project in the Sentry UI and paste the DSN into local env (and later Vercel). Reply `DSN_READY` when `.env.local` has it, or `SKIP_SENTRY` to scaffold offline-only.
- **Commands:**
  - None (external dashboard)

#### T035.2 [AGENT] Scaffold Sentry for Next 16 App Router

- **Targeted file path:** package + sentry config files + instrumentation as required by current Sentry Next docs
- **Description:** Install/configure with Context7/current vendor docs for Next 16. Ensure build works without DSN. Add ENV_SETUP notes.
- **Commands:**
  - `npm run typecheck`
  - `npm run build` (confirm no hard fail without DSN)

#### T035.3 [AGENT] Optionally forward CSP reports

- **Targeted file path:** `app/csp-violation-report-endpoint/route.ts`
- **Description:** When DSN present, capture a sanitized CSP violation event; keep console fallback. Update security.md.
- **Commands:**
  - `npm run typecheck`

---

## Task T036: Choose i18n Completeness Strategy for Spanish

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Message catalogs (`messages/en.json`, `es.json`) cover home/nav/footer only (~104 lines) while most page copy is English-hardcoded. Shipping `/es` with English body content is incomplete i18n. Highest standard: either translate surfaces or do not advertise incomplete locales.

### Related File Paths

- `messages/en.json`, `messages/es.json`
- `i18n/routing.ts`
- `app/components/language-switcher.tsx`
- Marketing pages under `app/[locale]/`

### Definition of Done

- HUMAN chooses: (A) defer `es` (remove from routing until ready), (B) keep `es` with explicit " partial translation" UX, or (C) authorize a phased message extraction project (separate future tasks).
- Agent implements A or B fully; for C, agent only creates a follow-up task list section and extracts one pilot page messages as a template.

### Out of Scope

- Professional translation vendor management unless HUMAN provides strings.
- Translating blog MD content in this task for option C beyond one pilot.

### Rules to Follow

- Do not invent Spanish marketing claims.
- Prefer honesty in language switcher.

### Advanced Coding Pattern

- next-intl message catalogs as the only UI string source for translated surfaces.

### Anti-Patterns

- Locale switcher that implies full translation when bodies are English.

### Imports/Exports

- Routing and message files; possible switcher copy changes.

### Depends On / Blocks

- Depends on: None
- Blocks: Honest international launch

### Subtasks

#### T036.1 [AGENT] Summarize coverage gap

- **Targeted file path:** `messages/`, `i18n/routing.ts`
- **Description:** Brief written options A/B/C for HUMAN based on file evidence.
- **Commands:**
  - None

#### T036.2 [HUMAN] Choose A, B, or C

- **Targeted file path:** `i18n/routing.ts` / messages
- **Description:** Reply `A`, `B`, or `C` as defined in Definition of Done.
- **Commands:**
  - None

#### T036.3 [AGENT] Implement choice

- **Targeted file path:** routing, switcher, messages, optional pilot page
- **Description:** Execute A/B fully or C pilot + append future translation tasks to TODO.md.
- **Commands:**
  - `npm run typecheck`
  - `npx playwright test app/e2e/home-page.spec.ts --project=chromium`

---

## Task T037: Add Chromium Axe Accessibility Smoke

**Status:** `[ ]` OPEN

### Initial Analysis & Research

No axe/playwright-axe dependency or a11y CI checks found. Highest standard: automated axe smoke on critical routes in Chromium CI alongside T011.

### Related File Paths

- `app/e2e/` (new a11y spec)
- `package.json` (devDependency)
- `.github/workflows/ci.yml`
- `playwright.config.ts`

### Definition of Done

- Playwright axe smoke covers home + one content page with zero serious/critical violations (or documented exclusions).
- CI chromium e2e job runs the a11y spec (after T011 exists).
- README testing section mentions a11y smoke.

### Out of Scope

- Full WCAG audit certification.
- Visual regression.

### Rules to Follow

- Fail CI on serious/critical; allowlist sparingly with comments.
- Keep run chromium-only.

### Advanced Coding Pattern

- Accessibility as regression tests, not one-off audits.

### Anti-Patterns

- Ignoring contrast issues without recording them.
- Running axe on every browser matrix.

### Imports/Exports

- DevDependency + e2e spec only.

### Depends On / Blocks

- Depends on: T011
- Blocks: None

### Subtasks

#### T037.1 [AGENT] Add playwright axe smoke spec

- **Targeted file path:** `app/e2e/a11y-smoke.spec.ts`
- **Description:** Install needed devDependency; write smoke for `/en` and `/en/blog` (or stable routes). Fix only actionable violations introduced by structure, or document known backlog items with task IDs if pre-existing and large.
- **Commands:**
  - `npx playwright test app/e2e/a11y-smoke.spec.ts --project=chromium`

#### T037.2 [AGENT] Attach to CI e2e job

- **Targeted file path:** `.github/workflows/ci.yml`, `README.md`
- **Description:** Include a11y spec in CI playwright command list; document locally.
- **Commands:**
  - Same playwright command as CI

---

## Task T038: Locale-Aware revalidatePath in Server Actions

**Status:** `[ ]` OPEN

### Initial Analysis & Research

Contact/newsletter actions call `revalidatePath("/contact")` and `revalidatePath("/blog")` without locale prefixes. With `[locale]` routing, cache invalidation may miss localized paths. Highest standard: revalidate all locales or use tags.

### Related File Paths

- `app/actions/contact.ts`
- `app/actions/newsletter.ts`
- `i18n/routing.ts`
- `app/__tests__/actions/`

### Definition of Done

- Revalidation covers configured locales (helper loops `routing.locales`) or uses cache tags.
- Tests assert revalidate called with locale paths (mocked).
- Typecheck passes.

### Out of Scope

- Tag-based CMS revalidation (T032).
- On-demand ISR strategy redesign beyond path correctness.

### Rules to Follow

- Keep PII out of logs.
- Prefer small helper `revalidateLocalizedPath(path)` deep module.

### Advanced Coding Pattern

- Shared revalidate helper used by actions.

### Anti-Patterns

- Hardcoding only `/en/...`.
- Ignoring locale when the app is localized.

### Imports/Exports

- New helper export; actions import it.

### Depends On / Blocks

- Depends on: T001 preferred for trustworthy action tests
- Blocks: None

### Subtasks

#### T038.1 [AGENT] TDD localized revalidate helper

- **Targeted file path:** `app/lib/revalidate-localized.ts`, action tests
- **Description:** Implement helper; update contact/newsletter tests expectations for locale paths; wire actions.
- **Commands:**
  - `npm run test:run -- app/__tests__/actions/contact.test.ts`
  - `npm run test:run -- app/__tests__/actions/newsletter.test.ts`
  - `npm run typecheck`

---

## Repository Management Notes

- New or moved modules under `app/lib` should keep deep-module boundaries and update targeted Vitest files in the same task.
- New e2e coverage belongs under `app/e2e/` and should be runnable with `--project=chromium` for CI cost control.
- When a task changes env surface, update `.env.example` and `ENV_SETUP.md` in that same task.
- When a task changes security posture, update `docs/security.md` in that same task.
- Prefer commits that reference the parent task ID, e.g., `T002: restore clean npm install`.
- Do not invent HUMAN steps for agent-solvable work. HUMAN appears only for secrets, irreversible external actions, or true preference forks (see T013.3, T014.2, T017.2, T034.2, T035.1, T036.2, T033.2).
- When fixing CSP, always verify next-intl composition so `x-nonce` reaches Server Components (T015).
- Prefer targeted commands listed in each subtask; do not run full Vitest or full Playwright matrices by default.
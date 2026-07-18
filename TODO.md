# Elevate Digital Repository TODO

This document defines the first ten prioritized tasks to align the repository for launch readiness. It follows SDD, DDD, TDD, BDD, and deep-module design. All tasks assume an AI agent executes end‑to‑end unless marked HUMAN.

**Legend**  
`[ ]` Open  
`[/]` In Progress  
`[x]` Complete  
`[!]` Blocked  
**AGENT:** Coding assistant performs research, code, tests, and docs.  
**HUMAN:** Only when the agent cannot act (external action, irreversible external system, or a real preference choice).

---

## Task T001: Analytics Consent Posture

**Status:** `[!]` BLOCKED

### Initial Analysis & Research
Agent must read `app/components/analytics.tsx`, `app/[locale]/legal/privacy/page.tsx`, and `app/[locale]/layout.tsx` to confirm current behaviour: GA gtag loads with no consent check, no cookie banner exists, privacy policy mentions cookies but is vague. Then present the HUMAN with three clearly described options. The agent does not implement anything until a choice is made.

### Related File Paths
- `app/components/analytics.tsx`
- `app/[locale]/layout.tsx`
- `app/[locale]/legal/privacy/page.tsx`
- `docs/security.md` (update after implementation)
- `ENV_SETUP.md` (update after implementation)

### Definition of Done
- HUMAN choice recorded in `docs/analytics-consent-decision.md`.
- Implementation matches the chosen option, and privacy page text is aligned.
- For option B: a consent banner component exists, GA tags are gated behind consent, unit tests verify no script load before consent.
- For option C: GA is removed and a cookieless alternative (e.g., Plausible) is integrated.
- `ENV_SETUP.md` documents the new posture.

### Out of Scope
- Full legal advice or multi‑vendor CMP evaluation.
- Changing privacy policy beyond alignment with technical behaviour.

### Rules to Follow
- Keep analytics a deep module with a minimal public API (`Analytics` component).
- For consent‑gated options, default to denied.
- Prefer technical truth over aspirational privacy claims.

### Advanced Coding Pattern
- Consent gate as a deep module: `hasAnalyticsConsent()` + script children only when allowed.

### Anti-Patterns
- Loading GA immediately then “asking” later.
- Claiming consent in privacy policy while shipping ungated tags.

### Imports/Exports
- May add `app/lib/analytics-consent.ts` and a client banner component.

### Depends On / Blocks
- Depends on: T015 (CSP nonce wiring) – complete.
- Blocks: Honest launch claims about analytics and privacy.

### Subtasks

#### T001.1 [AGENT] Verify current analytics and privacy setup
- **Targeted file path:** `app/components/analytics.tsx`, `app/[locale]/legal/privacy/page.tsx`
- **Description:** Read both files and produce a short summary of: which scripts load, whether consent is implemented, and what the privacy policy claims about cookies. No code changes.
- **Commands:** none (file read only)

#### T001.2 [HUMAN] Choose analytics posture
- **Targeted file path:** none
- **Description:** Based on the agent’s summary, reply with exactly `A`, `B`, or `C` (as defined in the initial analysis). Provide any additional context (jurisdictions) if relevant.
- **Commands:** none

#### T001.3 [AGENT] Implement chosen option
- **Targeted file path:** `app/components/analytics.tsx`, new consent module if needed, privacy page, `ENV_SETUP.md`
- **Description:** Implement option A, B, or C. Add/adjust unit tests for the consent gate (if B). Update privacy page text to match new behaviour. Document the decision in `docs/analytics-consent-decision.md`.
- **Commands:**
  - `npm run typecheck`
  - `npm run test:run -- app/__tests__/components/` (targeted consent test file if added)

---

## Task T002: Fix Search Hit URLs to Include Locale Prefix

**Status:** `[x]` COMPLETE

### Initial Analysis & Research
Agent must read `app/lib/search-data.ts` and `app/__tests__/lib/search-data.test.ts` to confirm that all generated URLs lack the locale prefix (e.g., `/blog/...` instead of `/en/blog/...`). The task is to introduce a locale parameter and update URLs accordingly.

### Related File Paths
- `app/lib/search-data.ts`
- `app/__tests__/lib/search-data.test.ts`
- `app/i18n/routing.ts` (for locale list)

### Definition of Done
- `SearchHit` type includes a `locale` field, and all exported aggregation functions accept a `locale` argument.
- Constructed URLs follow the pattern `/${locale}/...`.
- Unit tests updated and passing for both `en` and `es` locales.
- Typecheck passes.

### Out of Scope
- Changing the search UI to use local data instead of Algolia (separate task).
- Adding metadata or server shell to the search page.

### Rules to Follow
- Use the existing `routing.locales` from `app/i18n/routing.ts` for valid locale values.
- Keep the `search-data` module pure (no side effects).

### Advanced Coding Pattern
- Deep module: `getAllSearchableContent(locale: string): SearchHit[]` with locale‑aware URL builders.

### Anti-Patterns
- Hardcoding only `en` prefix; must support all configured locales.

### Imports/Exports
- Exported functions gain a `locale` parameter; types remain exported as before.

### Depends On / Blocks
- Depends on: T008 (content ports) – already complete.
- Blocks: Search UI fixes and indexing pipeline.

### Subtasks

#### T002.1 [AGENT] Verify current URL construction
- **Targeted file path:** `app/lib/search-data.ts`
- **Description:** Locate all URL string templates and document which paths lack locale prefixes. Check if any tests exist.
- **Commands:** none

#### T002.2 [AGENT] Implement locale-aware URLs and update tests
- **Targeted file path:** `app/lib/search-data.ts`, `app/__tests__/lib/search-data.test.ts`
- **Description:** Add a `locale` parameter to `getAllSearchableContent` and all internal helpers. Update URL strings to `/${locale}/...`. Write/update unit tests to cover `en` and `es` paths. Run tests and typecheck.
- **Commands:**
  - `npm run test:run -- app/__tests__/lib/search-data.test.ts`
  - `npm run typecheck`

### Implementation Notes
- Added `locale` field to `SearchHit` interface
- Added locale validation using `routing.locales` from `app/i18n/routing.ts`
- Updated all URL constructions to use `/${locale}/...` pattern
- Updated `getAllSearchableContent(locale: string)` and `getSearchByType(locale: string, type)` signatures
- All 11 unit tests passing with coverage for both `en` and `es` locales
- Added test for invalid locale error handling

---

## Task T003: Add Server Shell and Metadata to Search Page

**Status:** `[x]` COMPLETE

### Initial Analysis & Research
Agent must read `app/[locale]/search/page.tsx` to confirm it is a client component (`"use client"`) with no `generateMetadata`. The task is to split into a server wrapper that exports metadata and renders a client island, similar to the pricing page refactor (T022, already complete).

### Related File Paths
- `app/[locale]/search/page.tsx`
- `app/components/` (new client component for search widget, e.g., `search-content.tsx`)
- `app/lib/seo-alternates.ts` (existing helper)

### Definition of Done
- Server page at `app/[locale]/search/page.tsx` exports `generateMetadata` (locale‑aware title, description, openGraph, alternates).
- Interactive search UI moved to a client component that receives locale and other needed props.
- Existing Algolia widget behaviour unchanged; fallback “not configured” message still works.
- Typecheck passes.

### Out of Scope
- Fixing Algolia indexing or switching to local search.
- Redesigning the search UI.

### Rules to Follow
- Keep client bundle limited to interactive parts.
- Use the shared `generateLocaleAlternates` helper for canonical and alternates.

### Advanced Coding Pattern
- Server/client split: route = metadata + composition; widget = `"use client"`.

### Anti-Patterns
- Entire search page remaining a client component with no metadata.
- Losing the Algolia fallback message when credentials are missing.

### Imports/Exports
- New client component export (e.g., `SearchContent`); page becomes server default export.

### Depends On / Blocks
- Depends on: T023 (locale alternates helper) already complete.
- Blocks: Consistent search SEO.

### Subtasks

#### T003.1 [AGENT] Verify current search page structure
- **Targeted file path:** `app/[locale]/search/page.tsx`
- **Description:** Confirm it begins with `"use client"`, has no metadata export, and imports Algolia widgets. Document any hardcoded strings that would become metadata.
- **Commands:** none

#### T003.2 [AGENT] Extract client widget and add server metadata
- **Targeted file path:** `app/[locale]/search/page.tsx`, new `app/components/search-content.tsx`
- **Description:** Create `SearchContent` client component moving all current UI. In the page file, add `generateMetadata` with title, description, openGraph, alternates (using `generateLocaleAlternates`), and render `<SearchContent>`. Run typecheck.
- **Commands:**
  - `npm run typecheck`

### Implementation Notes
- Created `app/components/search-content.tsx` as client component with all Algolia UI logic
- Converted `app/[locale]/search/page.tsx` to server component with `generateMetadata`
- Added locale-aware metadata: title, description, keywords, openGraph, and alternates
- Used `generateLocaleAlternates` helper for canonical and language alternates
- Followed same pattern as pricing page refactor (server shell + client island)
- Preserved Algolia fallback message when credentials are missing

---

## Task T004: Decide and Implement Search Indexing Strategy

**Status:** `[x]` COMPLETE

### Initial Analysis & Research
Agent must read `app/lib/search-data.ts` (transforms search hits for Algolia), `app/components/search-bar.tsx`, and `app/[locale]/search/page.tsx`. Confirm that Algolia credentials are commented out, the search UI uses Algolia widgets, but no indexing pipeline exists. The task requires a HUMAN decision between: (A) switching the search page to use local search data (removing Algolia dependency for search), or (B) building an indexing script to push data to Algolia.

### Related File Paths
- `app/lib/search-data.ts`
- `app/[locale]/search/page.tsx`
- `app/components/search-bar.tsx`
- `scripts/reindex-search.ts` (if option B)
- `ENV_SETUP.md` (update)

### Definition of Done
- HUMAN choice recorded.
- If option A: `search/page.tsx` uses local search data from `search-data.ts` and no longer depends on Algolia widgets. Algolia packages may remain for the search bar only, or removed if unused.
- If option B: A `scripts/reindex-search.ts` exists that reads content ports, transforms data, and pushes to Algolia using a write API key. Documentation explains how to run it and required env vars.
- Search results are functional and URLs are locale‑prefixed (after T002).

### Out of Scope
- Redesigning the search UI beyond the data source swap.
- Automating reindex on content change (future webhook).

### Rules to Follow
- Keep secret write keys out of client bundles.
- Prefer a working local search over a broken external one.

### Advanced Coding Pattern
- Search data fetching as a deep module behind a unified interface, allowing the data source to change with minimal UI impact.

### Anti-Patterns
- Leaving search broken indefinitely while waiting for Algolia credentials.
- Exposing Algolia admin key in client.

### Imports/Exports
- May add a new `app/lib/search-engine.ts` adapter or simplify search page imports.

### Depends On / Blocks
- Depends on: T002 (locale URLs) preferred; T005 (CSP allowlist if Algolia kept) preferred.
- Blocks: Functional search at launch.

### Subtasks

#### T004.1 [AGENT] Document current broken state and propose options
- **Targeted file path:** none (research note)
- **Description:** Read the search page, search bar, search-data, and `.env.example`. Write a short summary showing that Algolia is enabled but no data exists, and that the local search-data module already builds a full index. Outline options A and B with pros/cons.
- **Commands:** none
- **Status:** ✅ Complete

#### T004.2 [HUMAN] Choose search strategy
- **Targeted file path:** none
- **Description:** Reply with `A` (local search) or `B` (Algolia indexing script). If B, confirm you will provide the Algolia write API key.
- **Commands:** none
- **Status:** ✅ Complete (User chose Option A)

#### T004.3 [AGENT] Implement chosen strategy
- **Targeted file path:** `app/[locale]/search/page.tsx`, `scripts/reindex-search.ts` (if B), `.env.example`, `ENV_SETUP.md`
- **Description:**
  - Option A: Update search page to consume `getAllSearchableContent` locally, replacing Algolia widgets with a simple client-side filterable list. Remove unused Algolia imports from the search page.
  - Option B: Write `scripts/reindex-search.ts` that uses content ports, `transformForAlgolia`, and the Algolia client to upload data. Add required env vars to `.env.example` and document usage.
- **Commands:**
  - `npm run typecheck`
  - If option B, verify script runs with `npx tsx scripts/reindex-search.ts` (dry‑run if no keys)
- **Status:** ✅ Complete

### Implementation Notes
- **Option A (Local Search) Implemented:**
  - Replaced Algolia widgets in `app/components/search-content.tsx` with local search using `getAllSearchableContent()`
  - Added client-side filtering by type and query string
  - Preserved UI layout (sidebar filters, search input, results display)
  - Updated `app/components/search-bar.tsx` to use local search data instead of Algolia
  - Added `locale` prop to both search components for locale-aware search
  - Updated `app/components/navigation.tsx` to pass `locale` to SearchBar using `useLocale()` hook
  - Added next-intl mocks to test setup to support `useLocale()` in tests
  - Fixed lint error in `search-data.ts` (replaced `any` with proper type)
  - Lint passes, navigation tests pass
  - Search is now functional without external dependencies

---

## Task T005: Add Algolia Hosts to CSP Allowlist

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `proxy.ts`’s CSP builder and confirm that only Google domains are allowlisted. Then check `app/components/search-bar.tsx` to identify the exact Algolia hosts used (standard: `*.algolia.net`, `*.algolianet.com`). This task adds those domains to the report‑only CSP so that when search is enabled, no violations occur.

### Related File Paths
- `proxy.ts`
- `docs/security.md`
- `app/components/search-bar.tsx` (for reference)

### Definition of Done
- `script-src` and `connect-src` directives include the minimal Algolia hosts needed for search.
- `docs/security.md` updated with rationale for each host.
- Typecheck passes; CSP remains report‑only.

### Out of Scope
- Enforcing CSP or adding other third‑party domains.
- Removing Google Analytics from CSP.

### Rules to Follow
- Least privilege: no `*` hosts.
- Keep nonce + strict-dynamic strategy intact.

### Advanced Coding Pattern
- CSP directives stored as a structured data object that is joined into the header string, making allowlist management clear.

### Anti-Patterns
- `connect-src *` or blanket `*.algolia.io` without specific subdomains.

### Imports/Exports
- `buildCspHeader` remains private inside `proxy.ts`.

### Depends On / Blocks
- Depends on: T015 (CSP nonce wiring) – complete.
- Blocks: Future CSP enforce and functional search when Algolia is used.

### Subtasks

#### T005.1 [AGENT] Confirm required Algolia hosts
- **Targeted file path:** `app/components/search-bar.tsx`, `package.json`
- **Description:** From imports (`react-instantsearch`, `algoliasearch`) and documentation, list the exact domains required for script and connect sources.
- **Commands:** none

#### T005.2 [AGENT] Update CSP builder and security docs
- **Targeted file path:** `proxy.ts`, `docs/security.md`
- **Description:** Add the identified hosts to `script-src` and `connect-src`. In `docs/security.md`, document the added allowlist entries and the principle used. Run typecheck.
- **Commands:**
  - `npm run typecheck`

---

## Task T006: Add Format Scripts, prettierignore, and CI Check

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must confirm that Prettier is installed but no `format`/`format:check` scripts exist, and that `eslint-config-prettier` is missing. Also verify the extent of unformatted files (114 files reported). The task will add the scripts, create `.prettierignore`, run a one‑time format pass, install `eslint-config-prettier`, and add a CI step.

### Related File Paths
- `package.json`
- `.prettierrc`
- `.prettierignore` (create)
- `.github/workflows/ci.yml`
- `eslint.config.mjs` (add prettier rule)

### Definition of Done
- `npm run format` and `npm run format:check` scripts work.
- `.prettierignore` excludes `.next`, `coverage`, lockfiles, and build artifacts.
- `eslint-config-prettier` installed and configured in ESLint to avoid rule conflicts.
- Entire codebase formatted and CI lint job includes `format:check`.
- Typecheck and tests still pass after formatting.

### Out of Scope
- Setting up husky or lint‑staged.
- Changing Prettier options beyond the existing `.prettierrc`.

### Rules to Follow
- One dedicated formatting commit; do not mix formatting with feature work.
- Do not alter logic during formatting – only whitespace/quote changes.

### Advanced Coding Pattern
- Scripts as part of the package’s public DX surface.

### Anti-Patterns
- Format‑checking without a proper `.prettierignore`.
- Enabling eslint‑plugin‑prettier (use eslint‑config‑prettier to avoid fights).

### Imports/Exports
- Scripts only; no source imports changed.

### Depends On / Blocks
- Depends on: T002 (clean npm install) – complete.
- Blocks: Consistent PR hygiene and future CI checks.

### Subtasks

#### T006.1 [AGENT] Verify current state and plan ignore file
- **Targeted file path:** `package.json`, `.prettierrc`
- **Description:** Read scripts, check for existing `format` scripts, and list top‑level directories that should be ignored. Create `.prettierignore` with `.next`, `coverage`, `node_modules`, `*.lock`, and build artifacts.
- **Commands:** none

#### T006.2 [AGENT] Add format scripts and eslint-config-prettier
- **Targeted file path:** `package.json`, `eslint.config.mjs`
- **Description:** Add `"format": "prettier --write ."` and `"format:check": "prettier --check ."` to scripts. Install `eslint-config-prettier` as devDependency and add to ESLint configuration to disable formatting rules. Run `npm run format` to fix all files, then `npm run format:check` to verify. Run typecheck and a quick test suite to ensure nothing broke.
- **Commands:**
  - `npm install --save-dev eslint-config-prettier`
  - `npm run format`
  - `npm run format:check`
  - `npm run typecheck`
  - `npm run test:run -- app/__tests__/lib/site-config.test.ts` (representative fast test)

#### T006.3 [AGENT] Add CI format check step
- **Targeted file path:** `.github/workflows/ci.yml`
- **Description:** In the lint job (or a new step after install), add `npm run format:check`. Keep existing lint step unchanged.
- **Commands:** none (CI file edit)

---

## Task T007: Remove Unused NonceProvider

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must confirm that `app/lib/nonce-provider.tsx` exports are not imported anywhere in `app/`. The investigation found zero imports. The task is to delete the file and any associated tests, then clean up references.

### Related File Paths
- `app/lib/nonce-provider.tsx`
- `app/__tests__/` (any test file referencing NonceProvider/useNonce)
- `app/[locale]/layout.tsx` (should not be touched)

### Definition of Done
- `app/lib/nonce-provider.tsx` deleted.
- Any unit tests for NonceProvider removed (if exist).
- Typecheck and all tests pass.
- No stale imports remain.

### Out of Scope
- Changing how nonce is provided to components (prop‑drilling remains).

### Rules to Follow
- Delete dead code; do not refactor the nonce delivery pattern.
- Keep existing nonce prop on Analytics unchanged.

### Advanced Coding Pattern
- Remove unused React context to reduce bundle and mental overhead.

### Anti-Patterns
- Keeping speculative providers “for later”.

### Imports/Exports
- Remove exports from `app/lib/nonce-provider.tsx`.

### Depends On / Blocks
- Depends on: T015 (nonce wiring) – complete.
- Blocks: None.

### Subtasks

#### T007.1 [AGENT] Verify no imports and delete
- **Targeted file path:** `app/lib/nonce-provider.tsx`
- **Description:** Search entire `app/` directory for `NonceProvider` and `useNonce` (excluding the definition file). If none, delete the file. Also remove any related test file. Run typecheck and a quick test.
- **Commands:**
  - `Select-String -Path app -Pattern "NonceProvider|useNonce" -Recurse -Include *.ts,*.tsx` (to confirm)
  - `rm app/lib/nonce-provider.tsx` (if confirmed)
  - `npm run typecheck`
  - `npm run test:run -- app/__tests__/lib/` (if any test deleted, else just existing fast test)

---

## Task T008: Fix FAQ JSON-LD Placement and Nonce

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `app/[locale]/layout.tsx` and confirm that the FAQ schema `<script>` is currently rendered unconditionally in the `<head>` with a nonce. The task is to make it appear only on the FAQ page (and optionally home page) while retaining the nonce. The cleanest approach that preserves nonce access is to conditionally render the FAQ schema in the layout based on the current route, using Next.js `headers()` to get the pathname. This avoids having to pass nonce to a page component.

### Related File Paths
- `app/[locale]/layout.tsx`
- `app/lib/schema.ts` (faqSchema)
- `docs/seo.md` (update)

### Definition of Done
- FAQ JSON-LD appears only on paths `/faq` (and `/` if desired; agent will implement `/faq` only by default).
- The script tag retains the nonce attribute.
- Layout code uses `headers()` to determine if the current route matches `/faq` and conditionally includes the script.
- `docs/seo.md` notes the change and the reasoning.
- Typecheck passes.

### Out of Scope
- Adding nonce to other page schemas (future task).
- Moving other schemas out of layout.

### Rules to Follow
- Do not break the breadcrumb schema in layout.
- Use `next/headers` to read the pathname server‑side.
- Keep the existing nonce generation unchanged.

### Advanced Coding Pattern
- Route‑conditioned rendering inside layout using server‑only APIs.

### Anti-Patterns
- Hardcoding the FAQ path without locale; handle both `en/faq` and `es/faq`.
- Site‑wide FAQ schema risking SEO spam.

### Imports/Exports
- Layout already imports `faqSchema`; no new exports.

### Depends On / Blocks
- Depends on: None.
- Blocks: Clean structured data and CSP readiness.

### Subtasks

#### T008.1 [AGENT] Verify current layout injection and path detection
- **Targeted file path:** `app/[locale]/layout.tsx`
- **Description:** Locate the FAQ schema script block. Write a short snippet that demonstrates how to get the current pathname using `headers()` in a server component. Confirm it works for both locales.
- **Commands:** none

#### T008.2 [AGENT] Conditionally render FAQ schema
- **Targeted file path:** `app/[locale]/layout.tsx`
- **Description:** Modify the layout so that the FAQ schema is only rendered when the pathname ends with `/faq` (handle both `/en/faq` and `/es/faq`). Keep the nonce attribute. Update `docs/seo.md`. Run typecheck.
- **Commands:**
  - `npm run typecheck`

---

## Task T009: Create Reusable JsonLd Component

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must identify all files that currently construct `<script type="application/ld+json">` with `dangerouslySetInnerHTML`. A reusable `JsonLd` component will accept `data` (object) and `nonce` (optional string) and render the script tag. This makes it easy to add nonce support later and reduces duplication. At least one existing page will be refactored as a proof of concept.

### Related File Paths
- `app/components/json-ld.tsx` (create)
- One simple page (e.g., `app/[locale]/contact/page.tsx`) to refactor
- All pages listed in investigation that inject schema (for verification)

### Definition of Done
- `JsonLd` component exists, exports `{ data, nonce? }`, and renders `<script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />`.
- The contact page (or another simple page) uses `JsonLd` instead of inline script.
- Unit test for `JsonLd` verifies correct serialization and nonce attribute.
- Typecheck passes.

### Out of Scope
- Converting all pages to `JsonLd` in this task (future task).
- Adding nonce support to pages that do not currently receive nonce.

### Rules to Follow
- The component can be a simple server component; nonce is passed as prop.
- Keep the component minimal; do not add schema‑building logic.

### Advanced Coding Pattern
- Single deep module for JSON‑LD rendering, used everywhere.

### Anti-Patterns
- Duplicating script tag construction across many files.
- Forcing nonce as required when not all pages have access to it yet.

### Imports/Exports
- Export `JsonLd` from `app/components/json-ld.tsx`.

### Depends On / Blocks
- Depends on: None.
- Blocks: Mass nonce addition to all page schemas.

### Subtasks

#### T009.1 [AGENT] Inventory schema injection locations
- **Targeted file path:** Multiple pages
- **Description:** List every file and line number where `<script type="application/ld+json"` is used. Note which ones already have a nonce prop.
- **Commands:** none

#### T009.2 [AGENT] Create JsonLd component and refactor one page
- **Targeted file path:** `app/components/json-ld.tsx`, one selected page (e.g., contact)
- **Description:** Create `JsonLd` component as described. Refactor the contact page to use it. Write a small unit test for `JsonLd` (render and check output). Run typecheck and the test.
- **Commands:**
  - `npm run typecheck`
  - `npm run test:run -- app/__tests__/components/json-ld.test.ts` (create and run)

---

## Task T010: Add Nonce Support to All Page JSON‑LD Scripts

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must use the inventory from T009. The goal is to make every JSON‑LD script receive a valid nonce where feasible. Most pages do not have direct access to the nonce. The approach: use the new `JsonLd` component and thread nonce from the layout only to the breadcrumb schema (already done) and any schema remaining in the layout. For page‑specific schemas, because they are server components without access to `headers()`, the agent will document that they currently cannot receive a nonce without a larger refactor, and open a follow‑up task. This task is small: it updates the breadcrumb schema to use `JsonLd` (if not already), ensures the conditional FAQ schema uses it, and documents the gap for other pages.

### Related File Paths
- `app/[locale]/layout.tsx` (breadcrumb and FAQ schemas)
- `app/components/json-ld.tsx`
- `docs/security.md`

### Definition of Done
- All JSON‑LD scripts inside the layout (breadcrumb, conditionally FAQ) are rendered using `JsonLd` with a nonce.
- A new section in `docs/security.md` lists which page schemas currently lack nonce and references a future task ID.
- Typecheck passes.

### Out of Scope
- Refactoring all page components to accept nonce.
- Modifying the nonce delivery architecture.

### Rules to Follow
- Do not delete any existing schema data; only change the rendering method.
- Keep the nonce generation unchanged.

### Advanced Coding Pattern
- Gradual adoption: layout‑level schemas are fully nonce‑compliant; page‑level schemas remain as‑is with documented debt.

### Anti-Patterns
- Ignoring the nonce gap without documentation.
- Breaking the breadcrumb schema while refactoring.

### Imports/Exports
- Layout imports `JsonLd`; no new exports.

### Depends On / Blocks
- Depends on: T008 (FAQ nonce placement), T009 (JsonLd component).
- Blocks: None (documents remaining work).

### Subtasks

#### T010.1 [AGENT] Verify current nonce usage in layout schemas
- **Targeted file path:** `app/[locale]/layout.tsx`
- **Description:** Check that the breadcrumb schema already has a nonce. Note any other schemas in the layout and whether they use nonce.
- **Commands:** none

#### T010.2 [AGENT] Refactor layout schemas to use JsonLd and document gaps
- **Targeted file path:** `app/[locale]/layout.tsx`, `docs/security.md`
- **Description:** Replace the breadcrumb and conditional FAQ script blocks with `<JsonLd data={...} nonce={nonce} />`. In `docs/security.md`, add a section “Nonce coverage for structured data” listing which page schemas lack nonce and creating a placeholder for a future task. Run typecheck.
- **Commands:**
  - `npm run typecheck`

---

Here is the second batch of ten tasks (T011–T020), continuing the numbering from the previous set.

---

## Task T011: Correct public/llms.txt Paths

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `public/llms.txt` and confirm all links lack locale prefixes (e.g., `/services` instead of `/en/services`) and that some point to non‑existent `/docs/*.md` routes. The agent will rewrite the file to point at real, locale‑aware routes using the `en` locale as the canonical example, with a comment noting that other locales exist.

### Related File Paths
- `public/llms.txt`
- `app/sitemap.ts` (reference for valid routes)

### Definition of Done
- All URLs in `llms.txt` include locale prefix (`/en/...`) and match actual routes from the sitemap.
- Broken `/docs/*.md` links are removed.
- A comment at the top of the file explains the update policy (e.g., “This file is manually curated. Include only stable public pages.”).
- File remains plain text, emoji‑free.

### Out of Scope
- Creating new `/docs` routes.
- Full GEO strategy or AI‑crawler policy changes beyond fixing broken links.

### Rules to Follow
- Accuracy over completeness; only list real, indexable pages.
- Use `en` as the example locale; mention that `/es/...` equivalents also exist.

### Advanced Coding Pattern
- Treat `llms.txt` as a curated public API surface for AI crawlers.

### Anti-Patterns
- Listing private docs paths that 404.
- Forgetting locale prefixes while the site requires them.

### Imports/Exports
- Static file only; no source code changes.

### Depends On / Blocks
- Depends on: None.
- Blocks: None.

### Subtasks

#### T011.1 [AGENT] Verify current llms.txt contents and broken links
- **Targeted file path:** `public/llms.txt`
- **Description:** Read the file and list each link that is missing a locale prefix or points to a non‑existent route. Compare against the sitemap’s static routes.
- **Commands:** none

#### T011.2 [AGENT] Rewrite llms.txt with correct paths
- **Targeted file path:** `public/llms.txt`
- **Description:** Write a new version of the file where all links follow the pattern `https://elevatedigital.com/en/...` and cover the core pages (home, services, portfolio, about, pricing, blog, contact, faq, legal/privacy, legal/terms). Remove documentation links. Add a comment explaining the file’s purpose and update policy.
- **Commands:** none (file edit)

---

## Task T012: Remove Unused Environment Variables from .env.example

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must check `.env.example` for variables that are never read in the codebase. The investigation identified `NEXT_PUBLIC_HOTJAR_ID` and `NEXT_PUBLIC_SENTRY_DSN` as unused. The agent will verify that they indeed have no consumers (search for the variable names in `app/`, `lib/`, etc.) and then remove them from `.env.example` and any related documentation references. If they are planned for later, they may be moved to a commented‑out “# Future” section.

### Related File Paths
- `.env.example`
- `ENV_SETUP.md` (if they are mentioned)

### Definition of Done
- Unused variables are removed from `.env.example` (or moved to a clearly labeled `# Planned` section if desired, but default is removal).
- No remaining references to the removed variables in `ENV_SETUP.md`.
- The file still contains all variables actually in use.

### Out of Scope
- Installing Sentry or Hotjar.
- Reviewing all env vars beyond the two known unused ones (though agent may note any other suspicious ones).

### Rules to Follow
- Keep `.env.example` as the single source of truth for required configuration.
- Do not remove variables that are used anywhere in the source tree.

### Advanced Coding Pattern
- Environment configuration as a curated list of necessary keys.

### Anti-Patterns
- Keeping dead env vars that mislead future developers.

### Imports/Exports
- Documentation files only.

### Depends On / Blocks
- Depends on: None.
- Blocks: Cleaner onboarding for new developers.

### Subtasks

#### T012.1 [AGENT] Confirm unused status and remove
- **Targeted file path:** `.env.example`, codebase search
- **Description:** Grep for `NEXT_PUBLIC_HOTJAR_ID` and `NEXT_PUBLIC_SENTRY_DSN` across the entire project (excluding `package-lock.json` and `node_modules`). If no usage found, delete those lines from `.env.example`. Update `ENV_SETUP.md` if it mentions them.
- **Commands:**
  - `Select-String -Path . -Pattern "NEXT_PUBLIC_HOTJAR_ID|NEXT_PUBLIC_SENTRY_DSN" -Recurse -Include *.ts,*.tsx,*.js,*.mjs,*.md,*.json` (confirm no usage)
  - Then manually edit `.env.example` to remove them.
  - Optionally run `npm run typecheck` to ensure nothing broke.

---

## Task T013: Sanity Draft Mode Enable and Signed Revalidate Route

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `docs/cms.md` for the desired patterns, then inspect `app/lib/cms-client.ts` and `next-sanity` version (13.1.1). Confirm that no `/api/draft` or `/api/revalidate` routes exist. The task will create these routes following next-sanity best practices, using the already‑defined `SANITY_API_READ_TOKEN` and a new `SANITY_REVALIDATE_SECRET`. The agent must adapt to current next-sanity API (defineEnableDraftMode, etc.) and test locally.

### Related File Paths
- `app/api/draft/route.ts` (create)
- `app/api/revalidate/route.ts` (create)
- `app/lib/cms-client.ts`
- `docs/cms.md`
- `.env.example`, `ENV_SETUP.md`

### Definition of Done
- Enable‑draft route (`/api/draft`) validates a preview secret, enables Next.js draft mode, and redirects.
- Revalidate route (`/api/revalidate`) performs timing‑safe secret comparison and calls `revalidateTag` / `revalidatePath` as appropriate.
- Both routes are protected; no unauthenticated access.
- Unit tests verify that invalid secrets are rejected (mocked env, mock request).
- `ENV_SETUP.md` lists required secrets (`SANITY_REVALIDATE_SECRET`, etc.).
- `docs/cms.md` updated to reflect the real routes.

### Out of Scope
- Building the Sanity Studio app.
- Full Live Content visual editing polish.
- Automating reindex on content publish (future).

### Rules to Follow
- Timing‑safe secret compare (use `crypto.timingSafeEqual`).
- Never expose server tokens to client bundles.
- Follow current next-sanity patterns (use `defineEnableDraftMode` if available).

### Advanced Coding Pattern
- Route handlers as deep modules; helper for secret validation.

### Anti-Patterns
- Open revalidate endpoint with only a query parameter.
- Enabling draft mode without secret validation.

### Imports/Exports
- Route handlers export `GET` / `POST`; helpers kept private.

### Depends On / Blocks
- Depends on: T005–T008 (content ports) – complete; T016 (zod in deps) – complete; T024 (env module) – complete.
- Blocks: Sanity go‑live and preview workflows.

### Subtasks

#### T013.1 [AGENT] Verify current cms-client and next-sanity API
- **Targeted file path:** `app/lib/cms-client.ts`, `node_modules/next-sanity` (check exports)
- **Description:** Examine the `next-sanity` package to locate `defineEnableDraftMode` and any other relevant helpers. Confirm the shape of the configured client. Note which tokens are already referenced.
- **Commands:** none

#### T013.2 [AGENT] Implement draft enable route
- **Targeted file path:** `app/api/draft/route.ts`
- **Description:** Create a route handler that reads a `secret` search param, compares it against `SANITY_API_READ_TOKEN`, enables draft mode, and redirects to the given `redirect` path (or `/`). Follow next-sanity examples.
- **Commands:**
  - `npm run typecheck`

#### T013.3 [AGENT] Implement revalidate route with tests
- **Targeted file path:** `app/api/revalidate/route.ts`, `app/__tests__/api/revalidate.test.ts`
- **Description:** Create a POST route handler that verifies a shared secret (from `SANITY_REVALIDATE_SECRET`), then revalidates tags or paths. Write unit tests that mock `NextRequest` and verify 401 for wrong secret and 200 for correct secret with mocked `revalidateTag`.
- **Commands:**
  - `npm run test:run -- app/__tests__/api/revalidate.test.ts`
  - `npm run typecheck`

#### T013.4 [AGENT] Update docs and env files
- **Targeted file path:** `docs/cms.md`, `.env.example`, `ENV_SETUP.md`
- **Description:** Add `SANITY_REVALIDATE_SECRET` to `.env.example`. Update `docs/cms.md` to replace aspirational snippets with actual paths and env names. Update `ENV_SETUP.md` to explain these secrets.
- **Commands:** none

---

## Task T014: Remove Placeholder Phone from Organization Schema

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `app/lib/schema.ts` and confirm that `organizationSchema` contains `telephone: "+1-234-567-890"`. All other NAP fields appear to be real (email, area, social links). The task is to remove the fake phone number by making `telephone` optional and omitting it when not provided. No data changes beyond making the field optional.

### Related File Paths
- `app/lib/schema.ts`
- `app/__tests__/` (any schema tests)

### Definition of Done
- `organizationSchema` no longer contains the placeholder phone number.
- The `telephone` property is optional; schema remains valid JSON‑LD.
- Existing tests still pass (update any snapshot/assertion that expected the fake number).
- Typecheck passes.

### Out of Scope
- Adding real NAP fields without HUMAN input.
- Changing any other schema data.

### Rules to Follow
- Omit fake data; prefer honest omission.
- Keep the `contactPoint` object; it can exist without telephone if email is still present (or omit contactPoint entirely if no real data, but email appears real, so keep it).

### Advanced Coding Pattern
- Schema builders accept optional NAP fields; undefined keys are excluded from output.

### Anti-Patterns
- Shipping obviously fake telephone in Organization schema.

### Imports/Exports
- `organizationSchema` builder may change signature, but it’s internal.

### Depends On / Blocks
- Depends on: None.
- Blocks: Trustworthy local SEO markup.

### Subtasks

#### T014.1 [AGENT] Verify placeholder phone and any test dependencies
- **Targeted file path:** `app/lib/schema.ts`, `app/__tests__/lib/schema.test.ts` (if exists)
- **Description:** Locate the `telephone` field and note its value. Check if any test files reference `"+1-234-567-890"`.
- **Commands:** none

#### T014.2 [AGENT] Remove placeholder phone and update tests
- **Targeted file path:** `app/lib/schema.ts`, any impacted tests
- **Description:** Modify the `organizationSchema` function to make `telephone` optional. If the current value is exactly the placeholder, omit the property. Update any test that expects the old value. Run tests and typecheck.
- **Commands:**
  - `npm run test:run -- app/__tests__/lib/schema.test.ts` (if exists)
  - `npm run typecheck`

---

## Task T015: Portfolio Client Images – Strategy and Implementation

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `app/lib/portfolio-data.ts` and list the missing `/clients/*.png` paths. Then check `next.config.ts` to confirm `images.localPatterns` is empty and `remotePatterns` only contains Sanity CDN. The task will present the HUMAN with two strategies: (A) add simple geometric placeholder SVGs for each client logo, or (B) omit logo images and show only client names. Once chosen, the agent implements the strategy and updates `images.localPatterns` to allow the new static paths. This task involves a HUMAN decision; the agent prepares options and then implements.

### Related File Paths
- `app/lib/portfolio-data.ts`
- `public/clients/` (create if option A)
- `next.config.ts`
- `app/components/` (portfolio UI that renders client logos)

### Definition of Done
- HUMAN choice recorded in `docs/portfolio-assets-decision.md`.
- If option A: six simple SVG placeholder logos are committed to `public/clients/`, and `images.localPatterns` in `next.config.ts` allows `/clients/*.png` (or SVGs if changed to .svg – agent should check file extensions used in code; data references `.png`, but placeholders would be SVG, so either update data references to `.svg` or create PNG placeholders). Agent will determine best approach: generate simple PNG placeholders via a small script or choose SVG and update portfolio data accordingly.
- If option B: portfolio UI is adjusted to not render `<Image>` for missing logos, showing only text client names.
- No broken image icons.
- Typecheck passes.

### Out of Scope
- Purchasing real brand assets.
- Redesigning the portfolio layout.

### Rules to Follow
- Keep `images.localPatterns` least‑privilege; only allow the specific client directory.
- Do not leave `<Image>` src pointing at missing files.

### Advanced Coding Pattern
- Content module references only assets that exist; config allowlists those paths.

### Anti-Patterns
- Broad `localPatterns: [{ pathname: '/**' }]` without need.
- Broken Image icons at launch.

### Imports/Exports
- Config and static assets; possible portfolio data field adjustments.

### Depends On / Blocks
- Depends on: T012 (image remote patterns) – complete.
- Blocks: Polished portfolio launch.

### Subtasks

#### T015.1 [AGENT] Inventory missing images and propose strategies
- **Targeted file path:** `app/lib/portfolio-data.ts`, `public/`
- **Description:** List all referenced logo paths and confirm none exist. Check whether portfolio UI uses `<Image>` and what `src` is passed. Write a brief report with the two options (placeholder SVGs/PNGs or text-only fallback).
- **Commands:** none

#### T015.2 [HUMAN] Choose asset strategy
- **Targeted file path:** none
- **Description:** Reply `A` (placeholders) or `B` (omit logos). If A, the agent will generate simple placeholder PNGs or SVGs (specify preference if any). The agent will default to generating small square SVGs and updating data references to `.svg` if portfolio data currently points to `.png`, to avoid having to create binary PNGs.
- **Commands:** none

#### T015.3 [AGENT] Implement chosen strategy and allowlist
- **Targeted file path:** `next.config.ts`, portfolio data/UI files, `public/clients/` (if A)
- **Description:** 
  - Option A: Create six simple placeholder SVG files under `public/clients/` named to match the data (or rename data to `.svg`). Add `localPatterns` allowing `/clients/*.svg` (or .png). 
  - Option B: Modify the portfolio case study UI to check for `clientLogo` existence and fall back to text-only rendering.
  - Run typecheck and a quick e2e smoke if possible (or manual BDD).
- **Commands:**
  - `npm run typecheck`
  - If e2e exists: `npx playwright test app/e2e/portfolio-detail.spec.ts --project=chromium`

---

## Task T016: Locale‑Aware revalidatePath in Server Actions

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `app/actions/contact.ts` and `app/actions/newsletter.ts` and confirm that they call `revalidatePath("/blog")` and `revalidatePath("/contact")` without locale prefix. The app uses `[locale]` routing, so these calls do not invalidate the actual user‑facing paths. The fix: create a helper `revalidateLocalizedPath(path)` that uses `routing.locales` from `app/i18n/routing.ts` to call `revalidatePath` for each locale variant.

### Related File Paths
- `app/actions/contact.ts`
- `app/actions/newsletter.ts`
- `app/lib/revalidate-localized.ts` (create)
- `app/__tests__/actions/contact.test.ts`
- `app/__tests__/actions/newsletter.test.ts`
- `app/i18n/routing.ts`

### Definition of Done
- `revalidateLocalizedPath` helper exported from `app/lib/revalidate-localized.ts` that takes a path (e.g., `"/contact"`) and calls `revalidatePath` for `/en/contact` and `/es/contact`.
- Contact and newsletter actions use this helper instead of raw `revalidatePath`.
- Unit tests for the actions verify the mocked `revalidatePath` is called with correct locale paths.
- Typecheck passes.

### Out of Scope
- Tag‑based revalidation (T013 handles Sanity).
- Changing the revalidation strategy beyond path correction.

### Rules to Follow
- Use the existing `routing.locales` array; do not hardcode locale list.
- Keep the helper pure and testable (mock `next/cache` revalidatePath).

### Advanced Coding Pattern
- Deep module for localized cache invalidation.

### Anti-Patterns
- Hardcoding only `/en/...` paths.
- Ignoring locale when the app is localized.

### Imports/Exports
- New helper export; actions import it.

### Depends On / Blocks
- Depends on: T001 (newsletter/contact tests) – already complete.
- Blocks: Correct cache invalidation for localized routes.

### Subtasks

#### T016.1 [AGENT] Verify current revalidatePath calls
- **Targeted file path:** `app/actions/contact.ts`, `app/actions/newsletter.ts`
- **Description:** Locate the exact lines with `revalidatePath` and note the argument. Confirm that the app uses `[locale]` routing.
- **Commands:** none

#### T016.2 [AGENT] Implement localized revalidate helper and update actions
- **Targeted file path:** `app/lib/revalidate-localized.ts`, action files, action test files
- **Description:** Create `revalidateLocalizedPath(path)` that imports `routing.locales` and calls `revalidatePath` for each locale. Update the two actions to use it. Update the existing action tests to expect calls with locale prefixes (mock `revalidatePath`). Run the action tests.
- **Commands:**
  - `npm run test:run -- app/__tests__/actions/contact.test.ts`
  - `npm run test:run -- app/__tests__/actions/newsletter.test.ts`
  - `npm run typecheck`

---

## Task T016: Fix site-config.test Default URL Mismatch

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `app/__tests__/lib/site-config.test.ts` and `app/lib/site-config.ts` to understand why the default site URL tests are failing. The tests expect `https://elevatedigital.com` but the implementation returns `https://example.com`. This is a pre-existing issue discovered during T004 QA.

### Related File Paths
- `app/__tests__/lib/site-config.test.ts`
- `app/lib/site-config.ts`

### Definition of Done
- Tests pass with correct default URL (`https://elevatedigital.com`)
- Implementation matches test expectations
- Typecheck passes

### Out of Scope
- Changing the default URL to a different value
- Modifying other site-config functionality

### Rules to Follow
- Fix the implementation to match the test expectations, not vice versa
- Ensure the default URL is consistent across the codebase

### Advanced Coding Pattern
- Consistent default values across configuration modules

### Anti-Patterns
- Changing tests to match broken implementation

### Imports/Exports
- No new imports/exports expected

### Depends On / Blocks
- Depends on: None.
- Blocks: Accurate site configuration testing.

### Subtasks

#### T016.1 [AGENT] Investigate default URL mismatch
- **Targeted file path:** `app/lib/site-config.ts`, `app/__tests__/lib/site-config.test.ts`
- **Description:** Read both files to understand why the default URL differs. Check if there's a configuration issue or if the implementation needs to be updated.
- **Commands:** none

#### T016.2 [AGENT] Fix implementation to match test expectations
- **Targeted file path:** `app/lib/site-config.ts`
- **Description:** Update the default site URL in the implementation to return `https://elevatedigital.com` when the environment variable is not set or is empty. Run tests to verify.
- **Commands:**
  - `npm run test:run -- app/__tests__/lib/site-config.test.ts`
  - `npm run typecheck`

---

## Task T017: Fix Unused @ts-expect-error Directives in env.test.ts

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `app/__tests__/lib/env.test.ts` and list all 16 `@ts-expect-error` directives. For each, the agent will temporarily remove the directive and run `npx tsc --noEmit` to see if TypeScript still reports an error on that line. Directives that no longer suppress a real error must be removed. Those that still suppress a legitimate error (e.g., mutating `process.env`) are kept. The goal is to eliminate unused error‑suppression comments without breaking the build.

### Related File Paths
- `app/__tests__/lib/env.test.ts`

### Definition of Done
- All `@ts-expect-error` directives that are no longer needed are removed.
- The remaining directives still correspond to actual TypeScript errors.
- `npm run typecheck` passes with zero errors.
- Test behaviour unchanged.

### Out of Scope
- Rewriting the env test logic.
- Changing the env module structure.

### Rules to Follow
- Only remove directives; do not alter the test logic unless necessary to fix a real type error.
- Use `npx tsc --noEmit` to verify error presence, not just assumption.

### Advanced Coding Pattern
- Clean test code without unnecessary suppressions that could mask future issues.

### Anti-Patterns
- Leaving unused suppressors that hide real type errors later.
- Bulk‑deleting without checking each line.

### Imports/Exports
- Test file only.

### Depends On / Blocks
- Depends on: T024 (env module) – complete.
- Blocks: Clean typecheck pipeline.

### Subtasks

#### T017.1 [AGENT] Inventory and test each directive
- **Targeted file path:** `app/__tests__/lib/env.test.ts`
- **Description:** Produce a list of the 16 directive line numbers. For each, remove the directive, run `npx tsc --noEmit`, and record whether an error appears. Restore the directive if an error is still present; permanently remove if no error.
- **Commands:**
  - `npx tsc --noEmit` (run after each removal or use a script to test all)

#### T017.2 [AGENT] Apply cleanups and verify
- **Targeted file path:** `app/__tests__/lib/env.test.ts`
- **Description:** After removing the unnecessary directives, run the full typecheck and the env test suite to ensure no regressions.
- **Commands:**
  - `npm run typecheck`
  - `npm run test:run -- app/__tests__/lib/env.test.ts`

---

## Task T018: Scaffold Sentry Error Monitoring

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must confirm that no Sentry SDK is installed and no configuration exists (investigation confirmed). The `.env.example` had an unused `NEXT_PUBLIC_SENTRY_DSN`. This task will scaffold Sentry for the Next.js 16 App Router using the official `@sentry/nextjs` wizard or manual setup (as per current docs). The setup must work without a DSN during local dev (graceful no‑op). The HUMAN must create a Sentry project and provide the DSN before full production monitoring is active, but the agent can do the entire code scaffolding without it.

### Related File Paths
- `package.json` (add dependencies)
- `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts` (create)
- `next.config.ts` (Sentry plugin)
- `instrumentation.ts` (if needed)
- `.env.example`, `ENV_SETUP.md`
- `app/csp-violation-report-endpoint/route.ts` (optional forwarding later)

### Definition of Done
- Sentry SDK installed and configured per current Next.js 16 guide.
- Build and dev startup work without a DSN set (no errors).
- When `NEXT_PUBLIC_SENTRY_DSN` is provided, errors are captured; when absent, Sentry is a no‑op.
- `ENV_SETUP.md` explains how to enable Sentry.
- Typecheck and build pass.

### Out of Scope
- Setting up Sentry organization/project in the Sentry UI (HUMAN).
- Enabling performance monitoring or source maps upload (beyond defaults).
- Forwarding CSP reports to Sentry (can be done as a follow‑up).

### Rules to Follow
- Use the official `@sentry/nextjs` setup flow (npx @sentry/wizard -i nextjs may be used).
- Ensure the instrumentation hook does not break local dev.
- Do not commit real DSNs.

### Advanced Coding Pattern
- Soft‑dependency monitoring: init only when env valid.

### Anti-Patterns
- Requiring DSN for `next dev`.
- Logging PII to Sentry by default.

### Imports/Exports
- New config files and instrumentation export.

### Depends On / Blocks
- Depends on: T003 (Node version) – complete.
- Blocks: Production observability.

### Subtasks

#### T018.1 [HUMAN] Create Sentry project and provide DSN
- **Targeted file path:** none
- **Description:** Create a Sentry project for Next.js in the Sentry dashboard and add `NEXT_PUBLIC_SENTRY_DSN` to `.env.local`. Reply `DSN_READY` when done, or `SKIP_SENTRY` to scaffold only the code without the env var (agent will keep DSN commented out).
- **Commands:** none

#### T018.2 [AGENT] Scaffold Sentry integration
- **Targeted file path:** Project root, `package.json`, config files
- **Description:** Install `@sentry/nextjs` and follow the current Next.js 16 integration steps (create config files, add Sentry plugin to `next.config.ts`, create `instrumentation.ts` if needed). Ensure the build succeeds without a DSN.
- **Commands:**
  - `npx @sentry/wizard -i nextjs` (if available) or manual steps
  - `npm run build` (verify no hard fail)
  - `npm run typecheck`

#### T018.3 [AGENT] Document Sentry setup
- **Targeted file path:** `ENV_SETUP.md`, `.env.example`
- **Description:** Add `NEXT_PUBLIC_SENTRY_DSN` back to `.env.example` (commented) with a note that it’s optional. Update `ENV_SETUP.md` to explain how to enable Sentry. Record the scaffolded files in the docs.
- **Commands:** none

---

## Task T019: i18n Completeness Strategy for Spanish

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `messages/en.json`, `messages/es.json` and confirm they are fully translated (all keys present). Then survey the hardcoded English strings across all major pages (pricing, faq, contact, services, about, blog, portfolio). This will be summarized into a report for the HUMAN, who must choose one of three options: (A) remove Spanish locale and routing until translations are ready, (B) keep Spanish but add a banner indicating partial translation, or (C) launch a phased extraction of all hardcoded strings into message catalogs (the agent can then start with one pilot page). This task is small: it only involves research, presenting options, and implementing the chosen minimal path (e.g., removing the locale or adding a banner). The heavy translation work is deferred.

### Related File Paths
- `messages/en.json`, `messages/es.json`
- `i18n/routing.ts`
- `app/components/language-switcher.tsx`
- All pages with hardcoded English (list to be generated)

### Definition of Done
- HUMAN choice recorded in `docs/i18n-strategy.md`.
- If option A: Spanish locale removed from `routing.locales`, switcher updated (only English), and `.es` routes return 404 or redirect.
- If option B: A dismissible banner added (English) that informs users “Some content is only available in English.” placed on all pages.
- If option C: Agent extracts all strings from one pilot page (e.g., `contact`) into the message catalogs and creates a follow‑up task list for the remaining pages.
- Typecheck passes; existing behaviour otherwise unchanged.

### Out of Scope
- Translating the entire site in this task.
- Hiring professional translators.

### Rules to Follow
- Do not delete the Spanish message file; just remove from routing if A.
- Keep the language switcher honest about what is offered.

### Advanced Coding Pattern
- next-intl message catalogs as the only UI string source for translated surfaces.

### Anti-Patterns
- Locale switcher that implies full translation when most content is English.

### Imports/Exports
- Routing configuration and switcher component.

### Depends On / Blocks
- Depends on: None.
- Blocks: Honest international launch.

### Subtasks

#### T019.1 [AGENT] Survey hardcoded English strings
- **Targeted file path:** All pages under `app/[locale]/`
- **Description:** Compile a list of every hardcoded English string in page components and sections (not metadata). Produce a summary count and a few examples. This will be presented to the HUMAN to illustrate the gap.
- **Commands:** none

#### T019.2 [HUMAN] Choose i18n strategy
- **Targeted file path:** none
- **Description:** Reply `A` (remove Spanish), `B` (partial translation banner), or `C` (start extracting strings with pilot page).
- **Commands:** none

#### T019.3 [AGENT] Implement choice
- **Targeted file path:** `i18n/routing.ts`, `app/components/language-switcher.tsx`, selected pilot page (if C)
- **Description:** Execute the chosen option. For A: remove `es` from `routing.locales`, simplify language switcher (only English). For B: add a client component banner that reads locale and shows a warning if not English. For C: pick the contact page, move all its hardcoded strings into `messages/en.json` and `es.json` (with placeholder translations in Spanish), and replace the page text with `useTranslations` hooks. Update `TODO.md` with follow‑up tasks for remaining pages. Run typecheck and any affected tests.
- **Commands:**
  - `npm run typecheck`
  - `npx playwright test app/e2e/home-page.spec.ts --project=chromium` (if home page affected)

---

## Task T020: Add Chromium Axe Accessibility Smoke

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must confirm that `@axe-core/playwright` is not installed. The task will install it and create an axe smoke test that runs against the home page and one content page (e.g., `/en/blog`) in the existing Playwright Chromium project. The test will fail on any critical or serious violations, with a minimal allowlist for known issues. The CI e2e job will be updated to include the a11y spec.

### Related File Paths
- `package.json`
- `app/e2e/a11y-smoke.spec.ts` (create)
- `.github/workflows/ci.yml`
- `playwright.config.ts` (no changes expected)

### Definition of Done
- `@axe-core/playwright` installed as devDependency.
- New spec `app/e2e/a11y-smoke.spec.ts` scans `/en` and `/en/blog` (or `/en/faq` if blog is dynamic) and asserts no serious/critical violations.
- CI chromium e2e job runs the a11y spec (after existing T011 e2e).
- README testing section mentions the a11y smoke.
- Any known, documented violations are recorded with comments.

### Out of Scope
- Full WCAG audit.
- Running axe on every page.

### Rules to Follow
- Fail CI only on serious/critical; allowlist minor issues with inline comments.
- Run only in Chromium (as per CI cost control).

### Advanced Coding Pattern
- Accessibility as regression tests, not one‑off audits.

### Anti-Patterns
- Ignoring contrast issues without recording them.
- Running axe on every browser matrix.

### Imports/Exports
- DevDependency and e2e spec only.

### Depends On / Blocks
- Depends on: T011 (Playwright e2e in CI) – complete.
- Blocks: None.

### Subtasks

#### T020.1 [AGENT] Install axe and create smoke spec
- **Targeted file path:** `package.json`, `app/e2e/a11y-smoke.spec.ts`
- **Description:** Install `@axe-core/playwright`. Write a Playwright test that visits the home page and one static page, runs `axe` analysis, and asserts no critical/serious violations. Include inline comments for any necessary exclusions.
- **Commands:**
  - `npm install --save-dev @axe-core/playwright`
  - `npx playwright test app/e2e/a11y-smoke.spec.ts --project=chromium`

#### T020.2 [AGENT] Integrate into CI and update docs
- **Targeted file path:** `.github/workflows/ci.yml`, `README.md`
- **Description:** Add the a11y spec to the CI Playwright command list (e.g., `npx playwright test --project=chromium` already runs all specs; if the CI runs a specific file list, add the new spec). Update `README.md` testing section to mention a11y smoke.
- **Commands:** none (CI file edit)

---

Here is the third batch of ten tasks (T021–T030), continuing from the previous set.

---

## Task T021: Configure eslint-plugin-jsx-a11y

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must confirm that `eslint-plugin-jsx-a11y` is a transitive dependency but not configured in `eslint.config.mjs`. This plugin catches accessibility issues at lint time, complementing the axe e2e smoke test (T020). The task will enable the recommended rules, fix any newly reported violations, and ensure the CI lint job passes.

### Related File Paths
- `eslint.config.mjs`
- `package.json` (check devDependencies)
- Any files that fail lint after plugin activation

### Definition of Done
- `eslint-plugin-jsx-a11y` added to ESLint configuration with the recommended ruleset.
- All existing code passes `npm run lint` without errors (fix any minor violations found).
- CI lint job remains green.

### Out of Scope
- Enabling all possible a11y rules; stick to the recommended set.
- Adding custom component linting beyond standard jsx-a11y rules.

### Rules to Follow
- Use the plugin’s `recommended` configuration to avoid overwhelming noise.
- Only fix violations introduced by structure, not content.

### Advanced Coding Pattern
- Linting as part of the development feedback loop, not just CI.

### Anti-Patterns
- Disabling a11y rules globally; use file-level overrides only where necessary with comments.

### Imports/Exports
- ESLint config only; no source imports changed.

### Depends On / Blocks
- Depends on: None.
- Blocks: Consistent a11y enforcement.

### Subtasks

#### T021.1 [AGENT] Verify plugin availability and add configuration
- **Targeted file path:** `eslint.config.mjs`
- **Description:** Check that `eslint-plugin-jsx-a11y` is installed (may be transitive). Add the plugin and its recommended rules to the ESLint configuration. Run `npm run lint` and note any new errors.
- **Commands:**
  - `npm run lint` (record violations)

#### T021.2 [AGENT] Fix lint violations and verify
- **Targeted file path:** Any flagged files
- **Description:** Fix all reported a11y violations (e.g., missing alt text, role issues). Run lint again to confirm zero errors. No logic changes.
- **Commands:**
  - `npm run lint`

---

## Task T022: Forward CSP Violation Reports to Sentry

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `app/csp-violation-report-endpoint/route.ts` and confirm it currently only logs violations to console. After Sentry scaffolding (T018) and if a DSN is provided, the agent will add logic to capture a sanitized CSP violation as a Sentry event (using `@sentry/nextjs` server‑side). The endpoint will remain functional without a DSN (graceful fallback to console logging). The task also updates `docs/security.md` to note the integration.

### Related File Paths
- `app/csp-violation-report-endpoint/route.ts`
- `docs/security.md`
- `ENV_SETUP.md` (if DSN required)

### Definition of Done
- When `NEXT_PUBLIC_SENTRY_DSN` is set, the endpoint forwards a sanitized CSP violation to Sentry (no PII, only directive and blocked URI).
- When DSN is absent, console logging continues unchanged.
- Security docs document the CSP report handling.
- Typecheck passes.

### Out of Scope
- Setting up alerting rules in Sentry (HUMAN).
- Full‑fidelity report capture (keep it minimal).

### Rules to Follow
- Never send full CSP report bodies containing sensitive URLs.
- Keep the endpoint functional without Sentry.

### Advanced Coding Pattern
- Conditional monitoring: deep module inside route that either calls Sentry or falls back.

### Anti-Patterns
- Hardcoding DSN in the source; always read from env.
- Sending raw `document-uri` that may contain PII; prefer only violation type.

### Imports/Exports
- Route handler only; may import `* as Sentry` from `@sentry/nextjs`.

### Depends On / Blocks
- Depends on: T018 (Sentry scaffold) and HUMAN DSN ready.
- Blocks: Complete CSP monitoring.

### Subtasks

#### T022.1 [AGENT] Verify current endpoint and add Sentry forwarding
- **Targeted file path:** `app/csp-violation-report-endpoint/route.ts`
- **Description:** Read the endpoint. Add a conditional block: if `NEXT_PUBLIC_SENTRY_DSN` exists, capture a Sentry event with a sanitized message (e.g., `CSP Violation: ${directive}`). Keep the console fallback. Ensure no PII is sent.
- **Commands:** none (code change)

#### T022.2 [AGENT] Update security documentation
- **Targeted file path:** `docs/security.md`
- **Description:** Add a note under CSP monitoring that violations are forwarded to Sentry when configured. Mention the fields that are captured.
- **Commands:** none

---

## Task T023: Add Unit Tests for Sitemap Generation

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `app/sitemap.ts` and confirm there are no unit tests for the sitemap function. The sitemap aggregates static routes and dynamic blog/portfolio slugs. The task is to extract the route‑building logic into a pure helper (if not already) and write unit tests that verify the correct URLs are returned for each locale, and that the search route is excluded (or included with a deliberate choice). This ensures the sitemap remains accurate as the site changes.

### Related File Paths
- `app/sitemap.ts`
- `app/lib/sitemap-builder.ts` (create if needed)
- `app/__tests__/lib/sitemap-builder.test.ts` (create)
- `app/lib/seo-alternates.ts` (already used)

### Definition of Done
- Sitemap generation logic is testable: either the existing function is pure enough, or a helper is extracted.
- Unit tests cover both English and Spanish locales, verify static routes are present, and verify dynamic routes (blog, portfolio) are included with correct locale‑prefixed paths.
- Test passes and typecheck passes.
- No functional change to the sitemap output.

### Out of Scope
- Testing the sitemap in an integration test with Next.js server.
- Changing which routes are included.

### Rules to Follow
- Keep the sitemap deep module pure; no side effects.
- Use `routing.locales` for locale iteration.

### Advanced Coding Pattern
- Testable pure function that returns the sitemap entries.

### Anti-Patterns
- Testing by making real network calls to fetch content (mocking content ports is fine).

### Imports/Exports
- May export a `buildSitemapEntries` function; the route file calls it.

### Depends On / Blocks
- Depends on: T005–T008 (content ports) – complete.
- Blocks: Confidence in sitemap correctness.

### Subtasks

#### T023.1 [AGENT] Assess testability and refactor if needed
- **Targeted file path:** `app/sitemap.ts`
- **Description:** Examine the sitemap function. If it directly calls `getAllBlogSlugs` and `getAllCaseStudySlugs` from content ports, it may already be testable by mocking those imports. Decide if extraction is needed; if so, create a pure `buildSitemapEntries(locales, contentPort)` helper.
- **Commands:** none

#### T023.2 [AGENT] Write unit tests for sitemap entries
- **Targeted file path:** `app/__tests__/lib/sitemap.test.ts` (or similar)
- **Description:** Write tests that mock the content port functions and verify that for a given locale, the returned entries include the static routes and the dynamic slugs with locale prefixes. Verify the search route is excluded. Run tests.
- **Commands:**
  - `npm run test:run -- app/__tests__/lib/sitemap.test.ts`
  - `npm run typecheck`

---

## Task T024: Add CSP Enforce Mode Environment Variable

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `proxy.ts`’s CSP builder and confirm it only sets `Content-Security-Policy-Report-Only`. After the nonce wiring fix (T015) and Algolia allowlisting (T005), the CSP is ready to be optionally enforced. The task is to introduce an environment variable (e.g., `CSP_ENFORCE=true`) that switches the header to `Content-Security-Policy`. When absent, it remains report‑only. This allows a safe rollout without code changes per environment. The agent will also update documentation to explain how to enable enforcement.

### Related File Paths
- `proxy.ts`
- `.env.example`
- `ENV_SETUP.md`
- `docs/security.md`

### Definition of Done
- When `CSP_ENFORCE` is set to `true`, the response header becomes `Content-Security-Policy`; otherwise `Content-Security-Policy-Report-Only`.
- The CSP value itself is unchanged.
- `.env.example` includes `CSP_ENFORCE` with a comment.
- `docs/security.md` describes the roll‑out process.
- Typecheck passes.

### Out of Scope
- Changing the CSP directives.
- Adding any new violation reporting endpoint.

### Rules to Follow
- Fail safe: if the variable is missing or any value other than `true`, use report‑only.
- Do not hardcode enforcement in the code.

### Advanced Coding Pattern
- Environment‑driven policy toggle inside the deep CSP module.

### Anti-Patterns
- Enforcing CSP before verifying all allowlists are correct; this task only adds the toggle, the HUMAN decides when to set it.

### Imports/Exports
- No new exports; internal to `proxy.ts`.

### Depends On / Blocks
- Depends on: T005 (Algolia CSP), T015 (nonce wiring) – both complete.
- Blocks: Safe production CSP enforcement.

### Subtasks

#### T024.1 [AGENT] Verify current CSP header and implement toggle
- **Targeted file path:** `proxy.ts`
- **Description:** Locate the line setting the CSP header. Introduce a condition: read `process.env.CSP_ENFORCE`, if exactly `"true"`, set header to `Content-Security-Policy`; else `Content-Security-Policy-Report-Only`. Keep everything else identical.
- **Commands:** none

#### T024.2 [AGENT] Update docs and env example
- **Targeted file path:** `.env.example`, `docs/security.md`
- **Description:** Add `CSP_ENFORCE` to `.env.example` (commented out, default false). In `docs/security.md`, document the roll‑out strategy: keep report‑only until all violation reports are clean, then enable enforce with this variable.
- **Commands:** none

---

## Task T025: Remove Unused Algolia transformForAlgolia Function

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `app/lib/search-data.ts` and confirm that the `transformForAlgolia` function exists but is never called (search uses local data or Algolia indexing script not yet built). If T004 (search strategy) already removed or repurposed it, this task may be unnecessary. The agent will verify its usage and, if dead, remove it along with any related exports. This reduces dead code.

### Related File Paths
- `app/lib/search-data.ts`
- Any files that import `transformForAlgolia` (search for it)

### Definition of Done
- If `transformForAlgolia` is unused, it and any related types are deleted from `search-data.ts`.
- Typecheck and tests pass (search-data tests should still pass for the remaining functions).
- No other module is affected.

### Out of Scope
- Changing the search strategy again.
- Removing Algolia packages themselves (they may be used elsewhere).

### Rules to Follow
- Verify zero imports before removing.
- Keep the module clean and focused.

### Advanced Coding Pattern
- Dead code elimination keeps public surface minimal.

### Anti-Patterns
- Leaving unused data transformation functions that confuse future readers.

### Imports/Exports
- Remove export from `search-data.ts`.

### Depends On / Blocks
- Depends on: T004 (search indexing decision) – once strategy is implemented, this can be done. If strategy used local search, Algolia transforms are dead. If strategy used Algolia indexing script, the function might be used there. So this task depends on T004 completion.
- Blocks: Clean codebase.

### Subtasks

#### T025.1 [AGENT] Verify usage of transformForAlgolia
- **Targeted file path:** Entire project
- **Description:** Search for `transformForAlgolia` in all source files. If it is only defined and never called, proceed to remove it. If it is used in a script, do nothing.
- **Commands:**
  - `Select-String -Path . -Pattern "transformForAlgolia" -Recurse -Include *.ts,*.tsx`

#### T025.2 [AGENT] Remove dead code
- **Targeted file path:** `app/lib/search-data.ts`
- **Description:** Delete the `transformForAlgolia` function and any related types that are only used by it. Run typecheck and search-data tests.
- **Commands:**
  - `npm run test:run -- app/__tests__/lib/search-data.test.ts`
  - `npm run typecheck`

---

## Task T026: Update README Project Structure and Documentation Links

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `README.md` and compare the documented project structure with the current state. The investigation noted drift: Tailwind version, missing directories, etc. The task is to update the structure tree, correct any version numbers (Tailwind 3.x), ensure all documentation links work (including new docs added by previous tasks), and mention the new scripts (`format`, `format:check`). This is a routine documentation maintenance task.

### Related File Paths
- `README.md`
- `docs/` (list of existing docs)
- `package.json` (for scripts)

### Definition of Done
- Project structure tree in README matches actual `app/` layout (including `i18n/`, `messages/`, `components/`, etc.).
- Stack version numbers are accurate (Node 22, npm 10, Tailwind 3.x).
- All links to documentation files (`docs/*.md`) are valid.
- New scripts are listed.
- README remains emoji‑free and machine‑editable.

### Out of Scope
- Rewriting the entire README.
- Adding new getting‑started guides.

### Rules to Follow
- Verify each linked file exists.
- Keep structure changes minimal; just correct what’s wrong.

### Advanced Coding Pattern
- README as a curated public entry point.

### Anti-Patterns
- Outdated file trees that mislead new contributors.

### Imports/Exports
- Documentation only.

### Depends On / Blocks
- Depends on: None (can run anytime).
- Blocks: Onboarding clarity.

### Subtasks

#### T026.1 [AGENT] Audit README against reality
- **Targeted file path:** `README.md`
- **Description:** Walk through the file. Note every directory path listed in the structure tree and verify it exists. Check version numbers against `package.json` and `engines`. List all broken internal links.
- **Commands:** none

#### T026.2 [AGENT] Update README
- **Targeted file path:** `README.md`
- **Description:** Correct the structure tree. Update version numbers. Fix broken links. Add `format` and `format:check` to the script list. Ensure consistency.
- **Commands:** none (manual edit)

---

## Task T027: Add Node Engine Check to CI

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `.github/workflows/ci.yml` and confirm there is no step that verifies the Node.js version matches the `engines` field in `package.json` (Node >=22.0.0 <23.0.0). The task is to add a simple check that reads the `engines` requirement and fails the build if the CI runner’s Node version does not satisfy it. This prevents accidental use of a wrong version.

### Related File Paths
- `.github/workflows/ci.yml`
- `package.json` (engines field)

### Definition of Done
- CI workflow includes a step after checkout that verifies the active Node version against `engines` (using a tool like `node -e` with semver logic, or a small script). If version mismatches, the job fails.
- The step is fast and adds minimal overhead.

### Out of Scope
- Enforcing npm version (npm 10.9.7) – although it could be added similarly.

### Rules to Follow
- Use a simple script that compares `process.version` against the `engines.node` range; exit 1 if not satisfied.

### Advanced Coding Pattern
- Environment validation as part of CI gate.

### Anti-Patterns
- Assuming CI will always match without verification.

### Imports/Exports
- CI workflow file only.

### Depends On / Blocks
- Depends on: T003 (engine pinning) – complete.
- Blocks: Reliable CI.

### Subtasks

#### T027.1 [AGENT] Add Node version check to CI
- **Targeted file path:** `.github/workflows/ci.yml`
- **Description:** Insert a new step in the lint or install job that runs a small inline script: `node -e "const {engines} = require('./package.json'); const semver = require('semver'); if (!semver.satisfies(process.version, engines.node)) { console.error('Node version mismatch'); process.exit(1); }"`. Ensure `semver` is available (either install it in CI step or use a simpler check: parse the range manually with a regex). For simplicity, use a hardcoded check against >=22.0.0 since we know the exact range. But better to read from package.json. Implement with a short script.
- **Commands:** none (CI edit)

---

## Task T028: Add Rate Limiter Integration Test

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must read `app/lib/rate-limiter.ts` and its tests (if any). Rate limiting uses Upstash Redis and is critical for contact/newsletter forms. The task is to add a small integration test that mocks the Redis client and verifies that the rate limiter correctly allows requests under the limit and blocks after exceeding it. This ensures the limiter works without requiring a real Redis instance.

### Related File Paths
- `app/lib/rate-limiter.ts`
- `app/__tests__/lib/rate-limiter.test.ts` (update or create)
- `package.json` (may need `ioredis-mock` or manual mock)

### Definition of Done
- Unit tests for the rate limiter exist that mock the Upstash Redis client (or its underlying `@upstash/redis`).
- Tests cover: first request allowed, nth request allowed under limit, exceeding limit returns blocked, and reset after window.
- Typecheck passes and tests pass.

### Out of Scope
- Testing actual Redis connectivity.
- Changing the rate limiter algorithm.

### Rules to Follow
- Mock the network layer; do not require real credentials.
- Keep tests deterministic.

### Advanced Coding Pattern
- Deep module testing with dependency injection or mocking.

### Anti-Patterns
- Skipping rate limiter tests because they require external service.

### Imports/Exports
- Test file only.

### Depends On / Blocks
- Depends on: None.
- Blocks: Confidence in abuse protection.

### Subtasks

#### T028.1 [AGENT] Assess current test coverage and mocking strategy
- **Targeted file path:** `app/__tests__/lib/rate-limiter.test.ts`
- **Description:** Check if any tests exist. If not, decide on mocking approach: either mock `@upstash/redis` module entirely, or use an in‑memory map to simulate Redis. Implement the mock and write tests for basic rate limiting.
- **Commands:** none

#### T028.2 [AGENT] Implement integration tests
- **Targeted file path:** `app/__tests__/lib/rate-limiter.test.ts`
- **Description:** Write test cases: allow first request, allow up to limit, block exceeding request, allow after time window resets. Use `vi.useFakeTimers` to control time. Run tests.
- **Commands:**
  - `npm run test:run -- app/__tests__/lib/rate-limiter.test.ts`
  - `npm run typecheck`

---

## Task T029: Add Clean Script for Build Artifacts

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must check `package.json` scripts for a `clean` command. The repository would benefit from a script that removes `.next`, `coverage`, and `playwright-report` directories. This makes it easy to reset the environment between builds. The task is to add a simple `clean` script and document it.

### Related File Paths
- `package.json`
- `README.md` (update scripts section)

### Definition of Done
- `"clean": "rm -rf .next coverage playwright-report"` (cross‑platform? Use `shx` or `rimraf`? The project uses npm on Windows? The user's platform might be Windows, but `rm -rf` won't work. The script should be cross‑platform. Use `npx rimraf` or `npx shx rm -rf`. I'll use `npx rimraf` as it's a common dev dependency that can be installed or used with npx. To avoid installing a dependency, we can use Node.js: `node -e "require('fs').rmSync('.next', {recursive:true, force:true}); ..."` but that's verbose. Better to use `shx` which is a portable shell. We can add `shx` as devDependency if not present. However, to keep it minimal, we can use `npx rimraf .next coverage playwright-report` – npx will download rimraf if not installed. That works cross-platform. So the script will be `"clean": "npx rimraf .next coverage playwright-report"`.
- `README.md` mentions the clean script.
- No typecheck or test needed.

### Out of Scope
- Removing `node_modules` or lockfile (dangerous).
- Adding pre‑build clean step.

### Rules to Follow
- The script must be safe and only remove generated directories.
- Use a cross‑platform tool via npx to avoid adding new dependencies.

### Advanced Coding Pattern
- DX utility script as part of package public interface.

### Anti-Patterns
- Using `rm -rf` that fails on Windows.

### Imports/Exports
- Scripts only.

### Depends On / Blocks
- Depends on: None.
- Blocks: Cleaner developer experience.

### Subtasks

#### T029.1 [AGENT] Add clean script
- **Targeted file path:** `package.json`
- **Description:** Add `"clean": "npx rimraf .next coverage playwright-report"` to scripts. Test by running `npm run clean` after a build to ensure it deletes the directories. Update `README.md` script list.
- **Commands:**
  - `npm run clean` (verify directories are removed)
  - None else

---

## Task T030: Configure Dependabot or Renovate for Dependency Updates

**Status:** `[ ]` OPEN

### Initial Analysis & Research
Agent must check if `.github/dependabot.yml` or `renovate.json` exists. The project has many dependencies and `npm audit` reports vulnerabilities. Automated dependency updates would help keep things current. This task will configure Dependabot (GitHub native, free) to open PRs for npm dependencies on a weekly schedule. This is a small, one‑file addition.

### Related File Paths
- `.github/dependabot.yml` (create)

### Definition of Done
- `.github/dependabot.yml` exists with configuration for npm ecosystem, weekly interval, and labels.
- The file is committed; no further action until Dependabot opens PRs.
- Optionally, update `docs/security.md` to mention automated updates.

### Out of Scope
- Configuring Renovate (more complex).
- Auto‑merging PRs (requires HUMAN review).

### Rules to Follow
- Keep the interval reasonable (weekly) to avoid noise.
- Set open-pull-requests-limit to 5.

### Advanced Coding Pattern
- Automated maintenance via CI/CD configuration.

### Anti-Patterns
- Neglecting dependency hygiene until vulnerabilities become critical.

### Imports/Exports
- Config file only.

### Depends On / Blocks
- Depends on: None.
- Blocks: Sustainable dependency management.

### Subtasks

#### T030.1 [AGENT] Create Dependabot configuration
- **Targeted file path:** `.github/dependabot.yml`
- **Description:** Create a Dependabot config for `package-ecosystem: "npm"`, directory: "/", schedule: interval: "weekly", open-pull-requests-limit: 5, labels: ["dependencies"]. Commit the file.
- **Commands:** none

---

## Task T031: Fix ESLint Error in search-data.ts

**Status:** `[ ]` OPEN

### Initial Analysis & Research
During T003 quality assurance, an ESLint error was discovered in `app/lib/search-data.ts` at line 42:43 - `Unexpected any. Specify a different type` (@typescript-eslint/no-explicit-any). This is unrelated to T003 changes and represents a pre-existing code quality issue that should be resolved.

### Related File Paths
- `app/lib/search-data.ts`

### Definition of Done
- The `@typescript-eslint/no-explicit-any` error at line 42:43 is resolved by replacing `any` with a proper type
- ESLint passes without errors
- Typecheck still passes (after T017 is resolved)

### Out of Scope
- Fixing other ESLint errors in the codebase (unless discovered during this fix)

### Rules to Follow
- Replace `any` with a specific type that accurately represents the data structure
- If the type is truly unknown, use `unknown` instead of `any` with proper type guards

### Advanced Coding Pattern
- Type-safe data transformation with explicit interfaces

### Anti-Patterns
- Using `any` to avoid type definition work
- Suppressing the error with eslint-disable comments

### Imports/Exports
- No new imports/exports expected

### Depends On / Blocks
- Depends on: None
- Blocks: Clean lint status

### Subtasks

#### T031.1 [AGENT] Identify and fix the any type usage
- **Targeted file path:** `app/lib/search-data.ts`
- **Description:** Read line 42 and identify what the `any` type represents. Replace it with a proper interface or type. Run lint to verify the fix.
- **Commands:**
  - `npm run lint`

---


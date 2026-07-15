# Monorepo Alignment Conventions

This document defines conventions for a future monorepo migration. The current repository is a single Next.js application; these conventions ensure that when extraction to `apps/` and `packages/` occurs, the process is boring and reversible.

**Status:** Planning phase only. No structural changes yet.

## Target Layout

```
firm/
├── apps/
│   ├── web/              # Next.js marketing site (current app/ moved here)
│   └── studio/           # Sanity Studio (standalone, sibling app)
├── packages/
│   ├── content/          # Content ports and adapters (BlogContentPort, PortfolioContentPort)
│   ├── ui/               # Shared React components
│   ├── site-config/      # Site configuration and metadata helpers
│   └── types/            # Shared TypeScript types
├── package.json          # Root package.json with workspaces config
├── pnpm-workspace.yaml   # Workspace configuration (if using pnpm)
└── turbo.json            # Turborepo configuration (future, not now)
```

## Extraction Order

When migrating to monorepo structure, extract in this order:

1. **Content ports** (`packages/content`)
   - Move `app/lib/content-port.ts` and `app/lib/content/` adapters
   - Already implements port pattern (T005-T008)
   - Zero coupling to Next.js runtime
   - Can be extracted immediately

2. **Site configuration** (`packages/site-config`)
   - Move `app/lib/site-config.ts`
   - Pure configuration, no Next.js dependencies
   - Used by multiple apps (web, future studio)

3. **UI components** (`packages/ui`)
   - Extract reusable components from `app/components/`
   - Components must be framework-agnostic or Next.js-aware
   - Test in isolation before extraction

4. **Next.js app** (`apps/web`)
   - Move current `app/` directory
   - Update imports to use workspace packages
   - Configure `transpilePackages` if needed

5. **Sanity Studio** (`apps/studio`)
   - Create as standalone sibling app
   - Follow Sanity's standalone Studio recommendation
   - Separate deployment pipeline

## Sanity Studio as Sibling App

Sanity CMS documentation recommends standalone Studio deployment. In monorepo context:

- **Location:** `apps/studio/` as sibling to `apps/web/`
- **Deployment:** Independent from Next.js frontend
- **Benefits:**
  - Faster builds (Vite vs Next.js compilation)
  - Auto-updates without redeploy
  - TypeGen watch mode
  - Content model independence

**Reference:** `docs/cms.md` - Standalone Studio section

## Package Manager Decision

**Current state:** npm (packageManager: "npm@10.9.7" in package.json)

**Future monorepo package manager:** pnpm (chosen 2026-07-15)

### Options

- **npm workspaces:** Native npm support, simpler for teams already using npm
- **pnpm workspaces:** Recommended for monorepos (superior performance, disk efficiency, strict dependency management)

### Decision Gate

Before creating workspace config files, the package manager must be chosen. This decision affects:
- Lockfile format (package-lock.json vs pnpm-lock.yaml)
- Workspace configuration syntax
- CI/CD dependency caching
- Developer onboarding

**Human decision:** pnpm (chosen 2026-07-15 for future monorepo migration)

## Next.js transpilePackages

When extracting packages, Next.js may need `transpilePackages` configuration:

```typescript
// next.config.ts (future apps/web/next.config.ts)
const nextConfig: NextConfig = {
  transpilePackages: ['@firm/content', '@firm/ui', '@firm/site-config'],
  // ... other config
};
```

**When transpilePackages is required:**
- Local workspace packages export raw TS/TSX source (no build step)
- Packages contain CSS imports
- Packages use path aliases
- Packages need specific JSX/runtime transforms

**When NOT required:**
- Packages pre-compile to JavaScript
- Packages export standard ESM/CJS modules
- Bundler resolves packages as local relative directories

**Reference:** Next.js docs on transpilePackages

## CI/CD Considerations

Future monorepo CI should:

1. **Run type checking** across all packages
2. **Run tests** for affected packages only (Turborepo can detect)
3. **Build apps** in dependency order
4. **Deploy Studio** independently from web app
5. **Cache dependencies** at workspace root

Current CI (`.github/workflows/ci.yml`) is single-app; will need expansion.

## Explicit Non-Goals

**Do NOT create yet:**
- `apps/` or `packages/` directories
- Turborepo or Nx configuration
- Workspace configuration files (pnpm-workspace.yaml, package.json workspaces)
- Root package.json changes for workspaces
- Any structural monorepo scaffolding

**Do NOT move yet:**
- Current `app/` directory
- Any source files

**Focus:** Documentation and conventions only. Structural changes will be a separate task when the team is ready.

## Dependencies

- **Depends on:** T003 (npm standardization), T005-T008 (content port implementation)
- **Blocks:** None (documentation only)

## Related Documentation

- `docs/cms.md` - Sanity CMS integration and standalone Studio
- `README.md` - Project structure and current setup
- `TODO.md` - T005-T008 content port tasks

## Migration Checklist (Future)

When ready to execute monorepo migration:

- [ ] Package manager decision recorded (npm or pnpm)
- [ ] Create `apps/` and `packages/` directories
- [ ] Configure workspace file (pnpm-workspace.yaml or package.json workspaces)
- [ ] Extract `packages/content` (content ports)
- [ ] Extract `packages/site-config`
- [ ] Extract `packages/ui` (if reusable components exist)
- [ ] Move `app/` to `apps/web/`
- [ ] Create `apps/studio` (Sanity Studio)
- [ ] Update `apps/web/next.config.ts` with transpilePackages
- [ ] Update import paths to use workspace packages
- [ ] Update CI/CD for monorepo
- [ ] Update deployment configuration
- [ ] Test all apps locally
- [ ] Deploy and verify

## Notes

- Content port pattern (T005-T008) makes extraction boring by design
- Sanity Studio as sibling app aligns with Sanity's recommended deployment
- Package manager choice is a one-way decision; choose carefully
- transpilePackages may not be needed if packages pre-compile; test before adding

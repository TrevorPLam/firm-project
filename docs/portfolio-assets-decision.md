# Portfolio Client Logo Assets Decision

**Date:** 2026-07-17
**Task:** T015: Portfolio Client Images – Strategy and Implementation
**Decision:** Option A - Create placeholder SVG logos

## Context

The portfolio case studies reference 6 client logo images that did not exist:
- `/clients/techstyle.png`
- `/clients/metro-dental.png`
- `/clients/fitness-first.png`
- `/clients/cloudsync.png`
- `/clients/greenhome.png`
- `/clients/newsportal.png`

The portfolio detail page already had conditional rendering to handle missing logos gracefully.

## Options Considered

**Option A: Create placeholder SVGs**
- Generate simple geometric SVG placeholder logos
- Update `next.config.ts` to allow `/clients/*.svg` in `localPatterns`
- Pros: Visual polish, maintains design intent, professional appearance
- Cons: Requires creating/maintaining placeholder assets

**Option B: Omit logos, show only client names**
- No action needed on assets (UI already handles missing logos gracefully)
- Pros: No asset maintenance, honest presentation, immediate fix
- Cons: Less visual polish, no brand visual cues

## Decision

**Chosen: Option A** - Create placeholder SVG logos

The human decision prioritized visual polish and professional appearance for the portfolio section. Simple geometric SVG placeholders provide a clean, modern look while maintaining the design intent of showing client logos.

## Implementation

1. Created 6 simple geometric SVG placeholder logos in `public/clients/`:
   - `techstyle.svg` - Blue checkmark (design/validation theme)
   - `metro-dental.svg` - Green cross/circle (healthcare theme)
   - `fitness-first.svg` - Red zigzag lines (energy/activity theme)
   - `cloudsync.svg` - Purple cloud/sync icon (SaaS theme)
   - `greenhome.svg` - Green house icon (sustainability theme)
   - `newsportal.svg` - Amber text lines (media/content theme)

2. Updated `app/lib/portfolio-data.ts` to reference `.svg` instead of `.png` files

3. Updated `next.config.ts` to allow `/clients/*.svg` in `localPatterns` for Next.js Image optimization

4. All logos are 64x64px with rounded corners and white icons on colored backgrounds

## Security

- `localPatterns` uses least-privilege: only `/clients/*.svg` is allowed
- No wildcard or broad patterns that could enable SSRF abuse
- Follows existing security pattern for image optimization

## Future Considerations

- Replace placeholder SVGs with real client brand assets when available
- Consider adding alt text or accessibility improvements if needed
- Maintain consistency with brand guidelines when real assets are added

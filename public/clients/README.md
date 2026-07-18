# Client Logos

Client logo assets for portfolio and testimonials.

## Purpose

Contains SVG logo files for clients featured in case studies, testimonials, and portfolio sections.

## Files

- `cloudsync.svg` - CloudSync client logo
- `fitness-first.svg` - Fitness First client logo
- `greenhome.svg` - GreenHome client logo
- `metro-dental.svg` - Metro Dental Group client logo
- `newsportal.svg` - NewsPortal client logo
- `techstyle.svg` - TechStyle Boutique client logo

## Usage

Logos are referenced in:
- Portfolio case study detail pages (`app/[locale]/portfolio/[slug]/page.tsx`)
- Portfolio data module (`app/lib/portfolio-data.ts`) via the `clientLogo` field

## Format

All logos are in SVG format for:
- Scalability without quality loss
- Small file size
- Easy color customization
- Accessibility (alt text provided in usage)

## Adding New Logos

1. Add new SVG files to this directory
2. Use descriptive, kebab-case filenames
3. Ensure logos are optimized for web (remove unnecessary metadata)
4. Update references in portfolio data (`app/lib/portfolio-data.ts`)

## Notes

These logos represent fictional clients for demonstration purposes. Replace with actual client logos when deploying to production.

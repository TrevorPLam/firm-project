# public

Static assets directory for the Elevate Digital Next.js marketing website.

## Table of Contents

- [Directory Structure](#directory-structure)
- [Asset Guidelines](#asset-guidelines)
- [File Descriptions](#file-descriptions)
- [Adding New Assets](#adding-new-assets)
- [Contributing](#contributing)
- [License](#license)

## Directory Structure

```
public/
├── clients/           # Client logo SVGs
├── file.svg          # File icon
├── globe.svg         # Globe icon
├── llms.txt          # AI agent navigation guide
├── next.svg          # Next.js logo
├── vercel.svg        # Vercel logo
└── window.svg        # Window icon
```

## Asset Guidelines

- **Format**: Prefer SVG for icons and logos (scalable, lightweight)
- **Optimization**: Minimize file size; use `svgo` for SVG optimization
- **Naming**: Use kebab-case (e.g., `client-name.svg`)
- **Alt Text**: Ensure all images have descriptive alt text when used in components
- **Clients**: Place client logos in the `clients/` subdirectory

## File Descriptions

### clients/

Client logo SVGs used in the portfolio detail pages:

- `cloudsync.svg` - CloudSync client logo
- `fitness-first.svg` - Fitness First client logo
- `greenhome.svg` - GreenHome client logo
- `metro-dental.svg` - Metro Dental client logo
- `newsportal.svg` - NewsPortal client logo
- `techstyle.svg` - TechStyle client logo

### Root Files

- `file.svg` - Default Next.js template icon (unused)
- `globe.svg` - Default Next.js template icon (unused)
- `llms.txt` - AI agent navigation guide following llmstxt.org specification
- `next.svg` - Next.js framework logo (unused, template asset)
- `vercel.svg` - Vercel deployment platform logo (unused, template asset)
- `window.svg` - Default Next.js template icon (unused)

## Adding New Assets

### Client Logos

1. Place SVG files in the `clients/` directory
2. Use kebab-case naming convention
3. Optimize with `svgo`:
   ```bash
   npx svgo input.svg --output clients/client-name.svg
   ```
4. Reference in components using `/clients/client-name.svg`

### General Assets

1. Place files in the root `public/` directory
2. Reference in components using `/filename.ext`
3. For images, ensure appropriate dimensions and format for web use

### AI Navigation Guide

Update `llms.txt` when adding new public pages to ensure AI agents can discover and navigate the site effectively.

## Contributing

When adding or modifying assets:

1. Optimize images and SVGs before committing
2. Use descriptive filenames
3. Update this README if adding new asset categories
4. Test asset loading in development before committing
5. Ensure all assets have appropriate alt text in their usage contexts

## License

UNLICENSED - Private project. All rights reserved.

# Content Adapters

Content port adapter implementations for CMS integration.

## Purpose

Implements the content port pattern to provide a clean abstraction layer between the application and content sources. This enables easy swapping of CMS backends without affecting application code.

## Architecture

Follows Domain-Driven Design (DDD) principles with a port/adapter pattern:

- **Port Interface** - Defined in `../content-port.ts` (BlogContentPort, PortfolioContentPort)
- **Adapter Implementations** - Concrete implementations in this directory
- **Deep Modules** - Implementation details hidden behind factory functions

## Adapters

- `local-blog-adapter.ts` - Local data adapter for blog content
- `local-portfolio-adapter.ts` - Local data adapter for portfolio/case studies

## Usage

```typescript
import { createLocalBlogAdapter } from "@/lib/content/local-blog-adapter";

const blogPort = createLocalBlogAdapter();
const posts = await blogPort.getAllSummaries();
```

## Design Principles

- **Portability Layer** - All CMS reads go through adapters, not direct client calls
- **Dependency Injection** - Factory functions return port interfaces for easy testing
- **Type Safety** - Strongly typed DTOs separate from internal data structures
- **Async-First** - All methods return Promises for future API compatibility

## Future Extensions

Additional adapters can be added for:
- Sanity CMS adapter
- Payload CMS adapter
- Webflow adapter
- Any other CMS backend

## Notes

This pattern enables future CMS migration without touching application components. The port interface remains stable while adapters change.

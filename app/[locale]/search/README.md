# Search Page

Site search functionality page.

## Purpose

Provides search interface for finding blog posts, portfolio case studies, and other content across the site.

## Route

- **Path**: `/search` (localized: `/en/search`, `/es/search`)
- **Type**: Server component with static rendering

## Content

Uses the `SearchContent` component from `app/components/search-content.tsx` which provides:
- Search input field
- Search results display
- Filtering by content type
- No results state

## Features

- Internationalization support
- SEO metadata with locale alternates
- Real-time search (client-side)
- Content type filtering

## Search Implementation

Search is currently implemented as client-side search using local data. Future versions may integrate with Algolia for more advanced search capabilities.

## Notes

Search component handles the search UI and results display. Search data is provided by the search-data module.

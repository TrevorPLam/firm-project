# Draft Mode API

Sanity CMS draft mode enablement endpoint.

## Purpose

Next.js API route that enables draft mode for Sanity CMS, allowing preview of unpublished content.

## Endpoint

- **Method**: GET
- **Path**: `/api/draft`
- **Authentication**: Sanity Studio session validation

## Implementation

Uses `next-sanity`'s `defineEnableDraftMode` which:
- Validates Sanity Studio sessions
- Configures draft mode with read token
- Handles session-based authentication

## Security

- Requires valid Sanity Studio session
- Uses read token for preview access (not write access)
- Session validation handled by next-sanity
- Draft mode only enabled for authenticated preview users

## Environment Variables

- `SANITY_API_READ_TOKEN` - Sanity API read token for preview access

## Usage

Sanity Studio automatically calls this endpoint when enabling preview mode. No manual invocation required.

## Notes

This route is part of the Sanity CMS integration for content preview functionality.

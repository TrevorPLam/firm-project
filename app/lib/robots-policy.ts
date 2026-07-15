/**
 * Determines whether search engine indexing should be allowed.
 * This function gates indexing on true production environments to prevent
 * preview/staging deployments from being indexed.
 *
 * @returns true if indexing should be allowed, false otherwise
 */
export function shouldAllowIndexing(): boolean {
  // Explicit allow flag overrides everything
  if (process.env.ALLOW_INDEXING === 'true') {
    return true;
  }

  // Explicit deny flag overrides everything
  if (process.env.ALLOW_INDEXING === 'false') {
    return false;
  }

  // On Vercel, only allow indexing in production environment
  // Preview deployments have VERCEL_ENV=preview but NODE_ENV=production
  if (process.env.VERCEL_ENV !== undefined) {
    return process.env.VERCEL_ENV === 'production';
  }

  // Fallback to NODE_ENV for non-Vercel environments
  if (process.env.NODE_ENV === 'production') {
    return true;
  }

  // Default: deny indexing (fail-closed)
  return false;
}

/**
 * Site Configuration Deep Module
 *
 * Single source of truth for site-wide configuration values.
 * Provides a small public API surface with rich private implementation.
 */

import { getSiteUrl as getEnvSiteUrl } from "./env";

const SITE_NAME = "Elevate Digital";
const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES = ["en", "es"] as const;

/**
 * Get the base site URL from environment or fallback
 * @returns The site URL as a string
 */
export function siteUrl(): string {
  return getEnvSiteUrl();
}

/**
 * Get the site name
 * @returns The site name
 */
export function siteName(): string {
  return SITE_NAME;
}

/**
 * Get the default locale
 * @returns The default locale code
 */
export function defaultLocale(): string {
  return DEFAULT_LOCALE;
}

/**
 * Get all supported locales
 * @returns Array of supported locale codes
 */
export function supportedLocales(): readonly string[] {
  return SUPPORTED_LOCALES;
}

/**
 * Construct an absolute URL safely using the site URL
 * @param path - The path to append to the site URL
 * @returns A complete absolute URL
 */
export function absoluteUrl(path: string): string {
  const base = siteUrl();
  return new URL(path, base).toString();
}

import { routing } from "@/i18n/routing";

/**
 * Generates locale-aware canonical URL and alternates for SEO.
 * This helper ensures consistent canonical URLs with locale prefixes
 * and proper language alternates for multilingual SEO.
 *
 * @param locale - The current locale (e.g., 'en', 'es')
 * @param path - The path without locale prefix (e.g., '/about', '/blog/post')
 * @returns Metadata alternates object with canonical and languages
 */
export function generateLocaleAlternates(
  locale: string,
  path: string,
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const canonical = `/${locale}${path}`;

  // Build languages map for all available locales
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `/${loc}${path}`;
  }

  return {
    canonical,
    languages,
  };
}

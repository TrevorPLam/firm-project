// Localized cache invalidation helper
// DDD: Cache invalidation is a cross-cutting concern handled by a deep module
// Deep module: Simple interface, hides locale complexity from callers

import { revalidatePath } from "next/cache";
import { routing } from "@/i18n/routing";

/**
 * Revalidates a path for all configured locales.
 * This ensures cache invalidation works correctly with [locale] routing.
 *
 * @param path - The base path without locale prefix (e.g., "/contact", "/blog")
 *
 * @example
 * revalidateLocalizedPath("/contact") // Invalidates /en/contact and /es/contact
 */
export function revalidateLocalizedPath(path: string): void {
  for (const locale of routing.locales) {
    revalidatePath(`/${locale}${path}`);
  }
}

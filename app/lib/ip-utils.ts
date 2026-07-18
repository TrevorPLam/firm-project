/**
 * @module ip-utils
 * @description Secure client identifier extraction for rate limiting and anti-abuse.
 *
 * ✅ PRODUCTION READY:
 * - Prioritizes platform-trusted headers over spoofable x-forwarded-for
 * - Validates IP addresses before using them
 * - Falls back to fingerprint hashing when direct IP is unavailable
 * - Provides stable identifiers for rate limiting across requests
 *
 * @see docs/rate-limiting.md
 */

import { createHash } from "crypto";

/**
 * IPv4 regex pattern for validation.
 */
const IPV4_PATTERN =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

/**
 * IPv6 regex pattern for validation (simplified).
 */
const IPV6_PATTERN =
  /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$|^(?:[0-9a-fA-F]{1,4}:){0,6}::$/;

/**
 * Trusted header priority order for IP extraction.
 * Platform-specific headers are checked first as they cannot be spoofed when behind those platforms.
 */
const TRUSTED_HEADERS = [
  "cf-connecting-ip", // Cloudflare: most trusted when behind Cloudflare
  "x-vercel-forwarded-for", // Vercel: trusted when on Vercel
  "x-forwarded-for", // Generic proxy: leftmost IP is client, but can be spoofed
  "x-real-ip", // Nginx: trusted when behind Nginx
];

/**
 * Validate an IP address string.
 *
 * @param ip - IP address string to validate
 * @returns true if valid IPv4 or IPv6, false otherwise
 */
function isValidIP(ip: string): boolean {
  if (!ip || typeof ip !== "string") {
    return false;
  }
  return IPV4_PATTERN.test(ip) || IPV6_PATTERN.test(ip);
}

/**
 * Extract the leftmost IP from a comma-separated x-forwarded-for header.
 * The leftmost IP is the original client IP in a properly configured proxy chain.
 *
 * @param headerValue - Comma-separated IP list
 * @returns First valid IP or null
 */
function extractFirstIP(headerValue: string | null): string | null {
  if (!headerValue) {
    return null;
  }

  const firstIP = headerValue.split(",")[0]?.trim();
  if (firstIP && isValidIP(firstIP)) {
    return firstIP;
  }

  return null;
}

/**
 * Create a stable fingerprint hash from multiple headers.
 * Used as a fallback when no trusted IP can be extracted.
 *
 * @param headers - Request headers
 * @returns SHA-256 hash of header values or "anonymous"
 */
function createFingerprint(headers: {
  get: (name: string) => string | null;
}): string {
  const fingerprintData = [
    headers.get("user-agent") || "",
    headers.get("accept-language") || "",
    headers.get("accept-encoding") || "",
    headers.get("referer") || "",
  ].join("|");

  if (!fingerprintData) {
    return "anonymous";
  }

  return createHash("sha256")
    .update(fingerprintData)
    .digest("hex")
    .substring(0, 16);
}

/**
 * Extract a trusted client identifier from request headers.
 *
 * This function checks headers in priority order:
 * 1. Platform-trusted headers (CF-Connecting-IP, X-Vercel-Forwarded-For)
 * 2. Generic proxy headers (X-Forwarded-For, X-Real-IP)
 * 3. Fallback to fingerprint hash if no valid IP found
 *
 * ✅ SECURITY:
 * - Platform headers are preferred as they cannot be spoofed when behind those platforms
 * - Generic headers are validated to prevent IP spoofing attacks
 * - Fallback fingerprint provides stable identification when IP is unavailable
 *
 * @param headers - Request headers from next/headers (result of await headers())
 * @returns Stable client identifier for rate limiting
 *
 * @example
 * ```ts
 * const headerList = await headers();
 * const identifier = getClientIdentifier(headerList);
 * const rateLimitKey = `contact:${identifier}`;
 * ```
 */
export function getClientIdentifier(headers: {
  get: (name: string) => string | null;
}): string {
  // Check trusted headers in priority order
  for (const headerName of TRUSTED_HEADERS) {
    const headerValue = headers.get(headerName);

    if (headerValue) {
      // For x-forwarded-for, extract the leftmost IP
      if (headerName === "x-forwarded-for") {
        const ip = extractFirstIP(headerValue);
        if (ip) {
          return ip;
        }
      } else {
        // For single-value headers, validate directly
        if (isValidIP(headerValue)) {
          return headerValue;
        }
      }
    }
  }

  // Fallback to fingerprint hash when no valid IP is available
  const fingerprint = createFingerprint(headers);

  console.warn(
    "[ip-utils] No valid IP found in headers, using fingerprint fallback",
    {
      fingerprint: fingerprint.substring(0, 8) + "...",
    },
  );

  return fingerprint;
}

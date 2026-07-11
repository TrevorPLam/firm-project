import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const intlMiddleware = createMiddleware(routing);

function buildCspHeader(nonce: string): string {
  const isDev = process.env.NODE_ENV === 'development';
  
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data: blob: https://www.google-analytics.com",
    "font-src 'self'",
    "connect-src 'self' https://www.google-analytics.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "report-uri /csp-violation-report-endpoint",
  ];

  return directives.join('; ').replace(/\s{2,}/g, ' ').trim();
}

export function proxy(request: NextRequest) {
  // Generate a cryptographic nonce for this request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  
  // Build the CSP header with the nonce
  const cspHeader = buildCspHeader(nonce);

  // Apply i18n middleware
  const intlResponse = intlMiddleware(request);
  
  // If i18n middleware returns a response (e.g., redirect), use it
  if (intlResponse) {
    intlResponse.headers.set('Content-Security-Policy-Report-Only', cspHeader);
    return intlResponse;
  }

  // Create response with nonce header for Server Components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set CSP header in report-only mode as per task requirements
  response.headers.set('Content-Security-Policy-Report-Only', cspHeader);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};

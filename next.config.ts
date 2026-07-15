import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Only allow explicit, trusted hostnames to avoid SSRF abuse via /_next/image.
    // Sanity CDN is explicitly allowed for CMS image optimization.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    // Block optimization of local files by default; opt-in when assets are ready.
    localPatterns: [],
  },
  // Next.js 16: opt-in component/function-level caching with "use cache".
  // Temporarily disabled due to about route params access issue (separate from T027)
  cacheComponents: false,
  // Stable in Next.js 16; auto-memoizes components and reduces manual memo.
  // Environment-aware toggle: set ENABLE_REACT_COMPILER=true to enable.
  // Defaults to false in production until build performance is measured.
  reactCompiler: process.env.ENABLE_REACT_COMPILER === 'true',
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

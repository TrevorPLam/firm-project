import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./app/i18n/request.ts");

const nextConfig: NextConfig = {
  // Future monorepo: When extracting packages to packages/, may need transpilePackages
  // See docs/monorepo-alignment.md for migration plan
  images: {
    formats: ["image/avif", "image/webp"],
    // Only allow explicit, trusted hostnames to avoid SSRF abuse via /_next/image.
    // Sanity CDN is explicitly allowed for CMS image optimization.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Block optimization of local files by default; opt-in when assets are ready.
    // Allow client logo SVGs for portfolio case studies
    localPatterns: [{ pathname: "/clients/*.svg" }],
  },
  // Next.js 16: opt-in component/function-level caching with "use cache".
  // Temporarily disabled due to about route params access issue (separate from T027)
  cacheComponents: false,
  // Stable in Next.js 16; auto-memoizes components and reduces manual memo.
  // Environment-aware toggle: set ENABLE_REACT_COMPILER=true to enable.
  // Defaults to false in production until build performance is measured.
  reactCompiler: process.env.ENABLE_REACT_COMPILER === "true",
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

export default withSentryConfig(withNextIntl(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "trevor-lam",

  project: "project",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});

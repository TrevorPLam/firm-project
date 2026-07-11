import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Remote patterns are intentionally empty. Only allow explicit, trusted
    // hostnames (e.g. your CDN) to avoid SSRF abuse via /_next/image.
    remotePatterns: [],
    // Block optimization of local files by default; opt-in when assets are ready.
    localPatterns: [],
  },
  // Next.js 16: opt-in component/function-level caching with "use cache".
  cacheComponents: true,
  // Stable in Next.js 16; auto-memoizes components and reduces manual memo.
  reactCompiler: true,
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
        ],
      },
    ];
  },
};

export default nextConfig;

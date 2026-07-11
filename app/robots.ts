import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === 'production';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevatedigital.com';

  if (isProduction) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next/'],
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  // Non-production environments (staging, preview, development)
  // Disallow all crawling to prevent indexing of staging/preview content
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}

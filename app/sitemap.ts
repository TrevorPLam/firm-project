import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog-data';
import { getAllSlugs as getAllPortfolioSlugs } from '@/lib/portfolio-data';
import { siteUrl, supportedLocales } from '@/lib/site-config';

const locales = supportedLocales();
const baseUrl = siteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes with fixed lastModified date
  const staticRoutes = [
    '',
    '/services',
    '/about',
    '/portfolio',
    '/pricing',
    '/blog',
    '/contact',
    '/faq',
    '/legal/privacy',
    '/legal/terms',
  ];

  const staticSitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  for (const locale of locales) {
    for (const route of staticRoutes) {
      staticSitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}${route}`])
          ),
        },
      });
    }
  }

  // Blog routes with actual content dates
  const blogPosts = getAllPosts();
  const blogSitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const post of blogPosts) {
      blogSitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}/blog/${post.slug}`])
          ),
        },
      });
    }
  }

  // Portfolio routes with fixed date
  const portfolioSlugs = getAllPortfolioSlugs();
  const portfolioSitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const slug of portfolioSlugs) {
      portfolioSitemapEntries.push({
        url: `${baseUrl}/${locale}/portfolio/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}/portfolio/${slug}`])
          ),
        },
      });
    }
  }

  return [...staticSitemapEntries, ...blogSitemapEntries, ...portfolioSitemapEntries];
}

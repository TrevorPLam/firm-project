import type { MetadataRoute } from 'next';
import { getAllPosts, getAllSlugs } from '@/lib/blog-data';
import { getAllSlugs as getAllPortfolioSlugs } from '@/lib/portfolio-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elevatedigital.com';

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
    '/team',
    '/legal/privacy',
    '/legal/terms',
  ];

  const staticSitemapEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2025-01-15'),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.7,
  }));

  // Blog routes with actual content dates
  const blogPosts = getAllPosts();
  const blogSitemapEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Portfolio routes with fixed date (no date field in portfolio data)
  const portfolioSlugs = getAllPortfolioSlugs();
  const portfolioSitemapEntries = portfolioSlugs.map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: new Date('2025-01-10'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticSitemapEntries, ...blogSitemapEntries, ...portfolioSitemapEntries];
}

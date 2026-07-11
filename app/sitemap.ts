import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elevatedigital.com';

  const routes = [
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

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.7,
  }));
}

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === 'production';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevatedigital.com';

  if (isProduction) {
    return {
      rules: [
        // AI Crawler Permissions for GEO (Generative Engine Optimization)
        // These rules allow AI crawlers to index content for AI search answers
        // while maintaining control over training vs search crawlers
        
        // OpenAI Crawlers
        // GPTBot: Training crawler - allows content in future GPT model training
        {
          userAgent: 'GPTBot',
          allow: '/',
          disallow: ['/_next/'],
        },
        // OAI-SearchBot: ChatGPT Search crawler - enables citations in ChatGPT Search
        {
          userAgent: 'OAI-SearchBot',
          allow: '/',
          disallow: ['/_next/'],
        },
        // ChatGPT-User: User-initiated fetcher - allows users to fetch specific pages
        {
          userAgent: 'ChatGPT-User',
          allow: '/',
          disallow: ['/_next/'],
        },
        
        // Anthropic Crawlers
        // ClaudeBot: Training crawler - allows content in Claude model training
        {
          userAgent: 'ClaudeBot',
          allow: '/',
          disallow: ['/_next/'],
        },
        // Claude-SearchBot: Claude web search crawler - enables citations in Claude search
        {
          userAgent: 'Claude-SearchBot',
          allow: '/',
          disallow: ['/_next/'],
        },
        // Claude-User: User-initiated fetcher - allows users to fetch specific pages
        {
          userAgent: 'Claude-User',
          allow: '/',
          disallow: ['/_next/'],
        },
        
        // Perplexity Crawlers
        // PerplexityBot: Search index crawler - enables citations in Perplexity answers
        {
          userAgent: 'PerplexityBot',
          allow: '/',
          disallow: ['/_next/'],
        },
        
        // Google AI Training
        // Google-Extended: Training-only crawler - allows Gemini training
        // Note: Blocking this does NOT affect Google Search rankings
        {
          userAgent: 'Google-Extended',
          allow: '/',
          disallow: ['/_next/'],
        },
        
        // Common Crawl
        // CCBot: Common Crawl crawler - allows content in public web archive
        // This indirectly allows training for many open-source models
        {
          userAgent: 'CCBot',
          allow: '/',
          disallow: ['/_next/'],
        },
        
        // Block Non-Compliant Crawlers
        // Bytespider: ByteDance crawler with history of robots.txt non-compliance
        {
          userAgent: 'Bytespider',
          disallow: '/',
        },
        
        // Default rule for all other crawlers
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/_next/'],
        },
      ],
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

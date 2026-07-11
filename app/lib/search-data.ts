// Search data module - single source of truth for search content
// DDD: Search is a bounded context; combines content from multiple domains
// Deep module: exports typed functions, internal data is private

import { getAllPosts } from './blog-data';
import { getAllCaseStudies } from './portfolio-data';

export interface SearchHit {
  objectID: string;
  type: 'blog' | 'portfolio' | 'page';
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  url: string;
  author?: string;
  client?: string;
  date?: string;
  readTime?: string;
}

/**
 * Get all searchable content combined from blog, portfolio, and pages
 */
export function getAllSearchableContent(): SearchHit[] {
  const searchHits: SearchHit[] = [];

  // Add blog posts
  const blogPosts = getAllPosts();
  for (const post of blogPosts) {
    searchHits.push({
      objectID: `blog-${post.id}`,
      type: 'blog',
      title: post.title,
      description: post.excerpt,
      category: post.category,
      tags: [], // Tags not available in summary view
      url: `/blog/${post.slug}`,
      author: '', // Author not available in summary view
      date: post.date,
      readTime: post.readTime,
    });
  }

  // Add portfolio case studies
  const caseStudies = getAllCaseStudies();
  for (const study of caseStudies) {
    searchHits.push({
      objectID: `portfolio-${study.id}`,
      type: 'portfolio',
      title: study.title,
      description: study.description,
      category: study.category,
      tags: study.tags,
      url: `/portfolio/${study.slug}`,
      client: study.client,
    });
  }

  // Add static pages
  const staticPages: SearchHit[] = [
    {
      objectID: 'page-services',
      type: 'page',
      title: 'Services',
      description: 'Digital marketing services including SEO, web design, analytics, and content strategy to help your business grow.',
      category: 'Services',
      url: '/services',
    },
    {
      objectID: 'page-about',
      type: 'page',
      title: 'About',
      description: 'Learn about Elevate Digital, our team, and our mission to help businesses succeed in the digital landscape.',
      category: 'About',
      url: '/about',
    },
    {
      objectID: 'page-pricing',
      type: 'page',
      title: 'Pricing',
      description: 'Transparent pricing for our digital marketing services with flexible packages to fit your budget.',
      category: 'Pricing',
      url: '/pricing',
    },
    {
      objectID: 'page-contact',
      type: 'page',
      title: 'Contact',
      description: 'Get in touch with Elevate Digital to discuss your digital marketing needs and how we can help your business grow.',
      category: 'Contact',
      url: '/contact',
    },
  ];

  searchHits.push(...staticPages);

  return searchHits;
}

/**
 * Transform search hits for Algolia indexing
 */
export function transformForAlgolia(searchHits: SearchHit[]): Record<string, string | string[]>[] {
  return searchHits.map((hit) => ({
    objectID: hit.objectID,
    type: hit.type,
    title: hit.title,
    description: hit.description,
    category: hit.category || '',
    tags: hit.tags || [],
    url: hit.url,
    author: hit.author || '',
    client: hit.client || '',
    date: hit.date || '',
    readTime: hit.readTime || '',
  }));
}

/**
 * Get search data by type filter
 */
export function getSearchByType(type: 'blog' | 'portfolio' | 'page'): SearchHit[] {
  return getAllSearchableContent().filter((hit) => hit.type === type);
}

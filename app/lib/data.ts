/**
 * Data fetching utilities with caching strategies for Next.js 15+
 * 
 * Next.js 15+ changed fetch defaults to no-store (no caching by default)
 * This file provides utilities for implementing proper caching strategies
 */

/**
 * Fetch static data with long-term revalidation (24 hours)
 * Use for content that changes infrequently: team members, services, etc.
 */
export async function fetchStaticData<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 86400 }, // Revalidate every 24 hours
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch static data: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch dynamic data with short-term revalidation (5 minutes)
 * Use for content that changes regularly: blog posts, portfolio items, etc.
 */
export async function fetchDynamicData<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 300 }, // Revalidate every 5 minutes
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dynamic data: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch real-time data with no caching
 * Use for user-specific data, sessions, real-time analytics, etc.
 */
export async function fetchRealtimeData<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch realtime data: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch data with on-demand revalidation
 * Use this pattern when you need to manually trigger cache invalidation
 * Combine with revalidateTag() in Server Actions
 */
export async function fetchWithTag<T>(url: string, tag: string): Promise<T> {
  const response = await fetch(url, {
    next: { tags: [tag] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data with tag: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Example usage patterns:
 * 
 * // Static data (team members, services)
 * const team = await fetchStaticData<TeamMember[]>('/api/team');
 * 
 * // Dynamic data (blog posts, portfolio)
 * const posts = await fetchDynamicData<BlogPost[]>('/api/posts');
 * 
 * // Real-time data (user session, analytics)
 * const session = await fetchRealtimeData<Session>('/api/session');
 * 
 * // Tag-based caching with manual revalidation
 * const products = await fetchWithTag<Product[]>('/api/products', 'products');
 * // Then in a Server Action:
 * // import { revalidateTag } from 'next/cache';
 * // revalidateTag('products');
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { siteUrl, siteName, defaultLocale, supportedLocales, absoluteUrl } from '@/lib/site-config';

describe('site-config', () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    // Restore original environment variable after each test
    process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
  });

  describe('siteUrl', () => {
    it('returns environment variable when set', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
      expect(siteUrl()).toBe('https://example.com');
    });

    it('returns default when environment variable is not set', () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      expect(siteUrl()).toBe('https://elevatedigital.com');
    });

    it('returns default when environment variable is empty string', () => {
      process.env.NEXT_PUBLIC_SITE_URL = '';
      expect(siteUrl()).toBe('https://elevatedigital.com');
    });
  });

  describe('siteName', () => {
    it('returns the site name', () => {
      expect(siteName()).toBe('Elevate Digital');
    });
  });

  describe('defaultLocale', () => {
    it('returns the default locale', () => {
      expect(defaultLocale()).toBe('en');
    });
  });

  describe('supportedLocales', () => {
    it('returns array of supported locales', () => {
      expect(supportedLocales()).toEqual(['en', 'es']);
    });
  });

  describe('absoluteUrl', () => {
    it('constructs absolute URL with path', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
      expect(absoluteUrl('/blog/test')).toBe('https://example.com/blog/test');
    });

    it('handles paths without leading slash', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
      expect(absoluteUrl('blog/test')).toBe('https://example.com/blog/test');
    });

    it('uses default site URL when env not set', () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      expect(absoluteUrl('/blog/test')).toBe('https://elevatedigital.com/blog/test');
    });

    it('handles root path', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
      expect(absoluteUrl('/')).toBe('https://example.com/');
    });

    it('handles empty path', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
      expect(absoluteUrl('')).toBe('https://example.com/');
    });
  });
});

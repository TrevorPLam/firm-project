import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';

// Mock next-intl navigation to avoid module resolution issues in Vitest
// See: https://github.com/amannn/next-intl/issues/2121
vi.mock('../i18n/navigation', () => ({
  Link: ({ children, href, ...props }: { children?: React.ReactNode; href?: string; [key: string]: unknown }) => React.createElement('a', { href, ...props }, children),
  redirect: vi.fn(),
  usePathname: vi.fn(() => '/'),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  getPathname: vi.fn(() => '/'),
}));

// Mock next-intl hooks to avoid intl context requirement
vi.mock('next-intl', () => ({
  useLocale: vi.fn(() => 'en'),
  useTranslations: vi.fn(() => (key: string) => key),
}));

// Mock LanguageSwitcher to avoid intl context requirement
vi.mock('../components/language-switcher', () => ({
  LanguageSwitcher: () => React.createElement('div', null, 'Language Switcher'),
}));

// Mock SearchBar to avoid complexity in navigation tests
vi.mock('../components/search-bar', () => ({
  SearchBar: ({ locale }: { locale?: string }) => React.createElement('div', null, `Search (${locale || 'en'})`),
}));

// Cleanup after each test
afterEach(() => {
  cleanup();
});

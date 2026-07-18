# Internationalization Messages

Translation files for next-intl internationalization.

## Purpose

Contains JSON translation files for supported locales, enabling multilingual content throughout the application.

## Structure

- `en.json` - English translations (primary locale)
- `es.json` - Spanish translations

## Content Structure

Messages are organized by feature/page:

- `HomePage` - Homepage content (hero, services, testimonials, about, contact)
- `Navigation` - Navigation menu items
- `Footer` - Footer content and links
- `Common` - Common UI text (loading, errors, etc.)

## Usage

Server components access translations via `getTranslations` from `next-intl/server`. Client components access translations via the `useTranslations` hook from `next-intl`, with messages provided through `NextIntlClientProvider` in `app/[locale]/layout.tsx`.

## Adding Translations

1. Add new keys to both `en.json` and `es.json`
2. Maintain consistent structure across all locale files
3. Use descriptive key names that reflect the content hierarchy

## Notes

English is the primary/fallback locale. All new features should include translations for all supported locales.

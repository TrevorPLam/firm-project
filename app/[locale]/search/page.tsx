import type { Metadata } from "next";
import { SearchContent } from "../../components/search-content";
import { generateLocaleAlternates } from "../../lib/seo-alternates";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const alternates = generateLocaleAlternates(locale, "/search");

  return {
    alternates,
    title: "Search | Elevate Digital",
    description:
      "Search our blog posts, portfolio case studies, and pages to find the content you need.",
    keywords: ["search", "find content", "blog search", "portfolio search"],
    openGraph: {
      title: "Search | Elevate Digital",
      description:
        "Search our blog posts, portfolio case studies, and pages to find the content you need.",
      type: "website",
    },
  };
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  if (!hasLocale(routing.locales, locale)) {
    return null;
  }
  setRequestLocale(locale);

  return <SearchContent locale={locale} />;
}

import type { Metadata } from "next";
import { PricingContent } from "../../components/pricing-content";
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: {
      canonical: `/${locale}/pricing`,
    },
    title: "Transparent Pricing | Elevate Digital",
    description: "Choose the package that fits your business needs. No hidden fees, no surprises — just clear, straightforward pricing for web design and digital marketing services.",
    keywords: ["pricing", "web design pricing", "digital marketing cost", "SEO pricing", "website packages"],
    openGraph: {
      title: "Transparent Pricing | Elevate Digital",
      description: "Choose the package that fits your business needs. No hidden fees, no surprises — just clear, straightforward pricing.",
      type: "website",
    },
  };
}

export default async function PricingPage({
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

  return <PricingContent locale={locale} />;
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { hasLocale } from 'next-intl';
import "../globals.css";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { Loading } from "../components/loading";
import { ErrorBoundary } from "../components/error-boundary";
import { Analytics } from "../components/analytics";
import { PageTransition } from "../components/page-transition";
import {
  organizationSchema,
  faqSchema,
  generateSchemaJsonLd,
  generateBreadcrumbSchema,
} from "../lib/schema";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://elevatedigital.com",
    ),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        es: '/es',
      },
    },
    title: "Elevate Digital | Web Design, SEO & Analytics Agency",
    description:
      "Transform your digital presence with expert web design, SEO, and analytics services. We create experiences that convert visitors into customers.",
    keywords: [
      "web design",
      "SEO",
      "analytics",
      "digital marketing",
      "website development",
      "conversion optimization",
    ],
    authors: [{ name: "Elevate Digital" }],
    openGraph: {
      title: "Elevate Digital | Web Design, SEO & Analytics Agency",
      description:
        "Transform your digital presence with expert web design, SEO, and analytics services.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Elevate Digital | Web Design, SEO & Analytics Agency",
      description:
        "Transform your digital presence with expert web design, SEO, and analytics services.",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(1 0 0)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(0.15 0 0)" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateSchemaJsonLd(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateSchemaJsonLd(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateSchemaJsonLd(
              generateBreadcrumbSchema([
                { name: "Home", url: `/${locale}` },
              ])
            ),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="focus:bg-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Navigation />
            </Suspense>
            <main id="main-content" tabIndex={-1} className="flex-1">
              <Suspense fallback={<Loading />}>
                <PageTransition>{children}</PageTransition>
              </Suspense>
            </main>
            <Suspense fallback={<Loading />}>
              <Footer />
            </Suspense>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

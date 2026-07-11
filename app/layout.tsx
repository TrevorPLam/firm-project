import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/navigation";
import { Footer } from "./components/footer";
import { Loading } from "./components/loading";
import { ErrorBoundary } from "./components/error-boundary";
import { Analytics } from "./components/analytics";
import { organizationSchema, faqSchema, generateSchemaJsonLd } from "./lib/schema";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://elevatedigital.com"),
  title: "Elevate Digital | Web Design, SEO & Analytics Agency",
  description: "Transform your digital presence with expert web design, SEO, and analytics services. We create experiences that convert visitors into customers.",
  keywords: ["web design", "SEO", "analytics", "digital marketing", "website development", "conversion optimization"],
  authors: [{ name: "Elevate Digital" }],
  openGraph: {
    title: "Elevate Digital | Web Design, SEO & Analytics Agency",
    description: "Transform your digital presence with expert web design, SEO, and analytics services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevate Digital | Web Design, SEO & Analytics Agency",
    description: "Transform your digital presence with expert web design, SEO, and analytics services.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(1 0 0)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(0.15 0 0)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
      </head>
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Navigation />
          </Suspense>
          <main className="flex-1">
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </main>
          <Suspense fallback={<Loading />}>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}

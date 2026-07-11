import type { Metadata } from "next";
import { Link } from '../../../i18n/navigation';
import { ScrollReveal } from "../../components/scroll-reveal";
import { generateBreadcrumbSchema, generateSchemaJsonLd } from "../../lib/schema";
import { setRequestLocale } from 'next-intl/server';
import { routing } from '../../../i18n/routing';
import { hasLocale } from 'next-intl';

export const metadata: Metadata = {
  alternates: {
    canonical: "/services",
  },
  title: "Services | Elevate Digital - Web Design, SEO & Analytics",
  description:
    "Comprehensive digital services including web design, SEO optimization, and analytics. Transform your digital presence with data-driven strategies.",
  keywords: [
    "web design services",
    "SEO services",
    "analytics services",
    "digital marketing",
    "website development",
  ],
  openGraph: {
    title: "Services | Elevate Digital",
    description:
      "Comprehensive digital services including web design, SEO optimization, and analytics.",
    type: "website",
  },
};

export default async function ServicesPage({
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

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `/${locale}` },
    { name: "Services", url: `/${locale}/services` },
  ]);

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateSchemaJsonLd(breadcrumbSchema),
        }}
      />
      {/* Hero Section */}
      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight md:text-7xl">
                Our Services
              </h1>
              <p className="text-foreground/70 mb-8 text-xl leading-relaxed md:text-2xl">
                Comprehensive digital solutions tailored to your business goals.
                We combine creativity with data-driven strategies to deliver
                measurable results.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Web Design Service */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                  <svg
                    className="text-primary h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="mb-4 text-4xl font-bold tracking-tight">
                  Web Design & Development
                </h2>
                <p className="text-foreground/70 mb-6 text-lg leading-relaxed">
                  Custom, responsive websites built with modern frameworks. We
                  create fast, accessible, and conversion-optimized designs that
                  perfectly represent your brand and drive business results.
                </p>
                <h3 className="mb-4 text-xl font-semibold">What's Included:</h3>
                <ul className="space-y-3">
                  {[
                    "Custom UI/UX Design tailored to your brand",
                    "Responsive development for all devices",
                    "Performance optimization (Core Web Vitals)",
                    "Accessibility compliance (WCAG 2.2)",
                    "CMS integration for easy content management",
                    "E-commerce solutions when needed",
                    "Ongoing maintenance and support",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></span>
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="from-primary/10 to-primary/5 border-primary/20 rounded-2xl border bg-gradient-to-br p-8">
                <h3 className="mb-6 text-2xl font-bold">Our Process</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: "01",
                      title: "Discovery",
                      desc: "Understanding your goals, audience, and requirements",
                    },
                    {
                      step: "02",
                      title: "Design",
                      desc: "Creating wireframes and visual designs",
                    },
                    {
                      step: "03",
                      title: "Development",
                      desc: "Building with modern frameworks and best practices",
                    },
                    {
                      step: "04",
                      title: "Launch",
                      desc: "Deployment, testing, and optimization",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="text-primary/50 text-2xl font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">{item.title}</h4>
                        <p className="text-foreground/60 text-sm">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SEO Service */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="from-primary/10 to-primary/5 border-primary/20 order-2 rounded-2xl border bg-gradient-to-br p-8 md:order-1">
                <h3 className="mb-6 text-2xl font-bold">SEO Strategy</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: "01",
                      title: "Audit",
                      desc: "Comprehensive technical and content SEO audit",
                    },
                    {
                      step: "02",
                      title: "Research",
                      desc: "Keyword research and competitor analysis",
                    },
                    {
                      step: "03",
                      title: "Optimize",
                      desc: "On-page and technical SEO implementation",
                    },
                    {
                      step: "04",
                      title: "Grow",
                      desc: "Content strategy and link building",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="text-primary/50 text-2xl font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">{item.title}</h4>
                        <p className="text-foreground/60 text-sm">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                  <svg
                    className="text-primary h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h2 className="mb-4 text-4xl font-bold tracking-tight">
                  SEO Optimization
                </h2>
                <p className="text-foreground/70 mb-6 text-lg leading-relaxed">
                  Data-driven search engine optimization to improve your
                  visibility and drive organic traffic. We help you rank higher
                  and reach more customers with proven strategies.
                </p>
                <h3 className="mb-4 text-xl font-semibold">What's Included:</h3>
                <ul className="space-y-3">
                  {[
                    "Comprehensive SEO audit and strategy",
                    "Keyword research and competitor analysis",
                    "On-page optimization (meta tags, content, structure)",
                    "Technical SEO (site speed, mobile, schema markup)",
                    "Content strategy and optimization",
                    "Local SEO for regional businesses",
                    "Performance tracking and reporting",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></span>
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Analytics Service */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                  <svg
                    className="text-primary h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h2 className="mb-4 text-4xl font-bold tracking-tight">
                  Analytics & Insights
                </h2>
                <p className="text-foreground/70 mb-6 text-lg leading-relaxed">
                  Comprehensive analytics setup and reporting to track
                  performance, understand user behavior, and make data-driven
                  decisions for sustainable growth.
                </p>
                <h3 className="mb-4 text-xl font-semibold">What's Included:</h3>
                <ul className="space-y-3">
                  {[
                    "GA4 and Google Tag Manager setup",
                    "Custom dashboard creation and configuration",
                    "Conversion tracking and goal setup",
                    "User behavior analysis and heatmaps",
                    "Regular performance reports and insights",
                    "A/B testing recommendations",
                    "ROI measurement and optimization",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></span>
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="from-primary/10 to-primary/5 border-primary/20 rounded-2xl border bg-gradient-to-br p-8">
                <h3 className="mb-6 text-2xl font-bold">
                  Key Metrics We Track
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      metric: "Traffic Sources",
                      desc: "Where your visitors come from",
                    },
                    {
                      metric: "User Behavior",
                      desc: "How users interact with your site",
                    },
                    {
                      metric: "Conversion Rates",
                      desc: "Percentage of visitors who convert",
                    },
                    {
                      metric: "Bounce Rate",
                      desc: "Single-page session percentage",
                    },
                    {
                      metric: "Page Performance",
                      desc: "Which pages perform best",
                    },
                    {
                      metric: "ROI Analysis",
                      desc: "Return on marketing investment",
                    },
                  ].map((item) => (
                    <div key={item.metric} className="flex items-start gap-3">
                      <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                        <svg
                          className="text-primary h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.metric}</h4>
                        <p className="text-foreground/60 text-sm">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="text-foreground/70 mb-8 text-xl">
              Let's discuss how our services can help transform your digital
              presence and drive business growth.
            </p>
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark inline-block rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
            >
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

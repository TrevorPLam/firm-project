import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "../../components/scroll-reveal";
import { createLocalPortfolioAdapter } from "../../lib/content/local-portfolio-adapter";
import {
  generateBreadcrumbSchema,
  generateSchemaJsonLd,
} from "../../lib/schema";
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
  const alternates = generateLocaleAlternates(locale, "/portfolio");

  return {
    alternates,
    title: "Portfolio",
    description:
      "Explore our portfolio of successful projects. See how we've helped businesses transform their digital presence with web design, SEO, and analytics.",
    keywords: [
      "portfolio",
      "case studies",
      "our work",
      "web design projects",
      "SEO success stories",
    ],
    openGraph: {
      title: "Portfolio",
      description:
        "Explore our portfolio of successful projects and case studies.",
      type: "website",
    },
  };
}

export default async function PortfolioPage({
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

  const portfolioAdapter = createLocalPortfolioAdapter();
  const caseStudies = await portfolioAdapter.getAllSummaries();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `/${locale}` },
    { name: "Portfolio", url: `/${locale}/portfolio` },
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
      <section className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
                Our Work
              </h1>
              <p className="text-foreground/70 mb-8 text-xl leading-relaxed md:text-2xl">
                Explore our portfolio of successful projects. See how we've
                helped businesses transform their digital presence and achieve
                measurable results.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <ScrollReveal key={study.id} delay={index * 100}>
                <div className="border-foreground/10 hover:border-primary/50 overflow-hidden rounded-2xl border bg-background transition-all hover:shadow-xl">
                  <div className="p-8">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="bg-primary/10 rounded-full px-3 py-1 text-sm font-medium text-primary">
                        {study.category}
                      </span>
                    </div>
                    <h3 className="mb-2 text-2xl font-bold">{study.title}</h3>
                    <p className="text-foreground/60 mb-4">{study.client}</p>
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      {study.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="mb-3 text-sm font-semibold">
                        Key Results:
                      </h4>
                      <ul className="space-y-2">
                        {study.results.map((result, i) => (
                          <li
                            key={i}
                            className="text-foreground/70 flex items-start gap-2 text-sm"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-foreground/5 text-foreground/60 rounded px-2 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                Our Approach
              </h2>
              <p className="text-foreground/70 text-xl leading-relaxed">
                Every project starts with understanding your goals and ends with
                delivering measurable results.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "Deep dive into your business, audience, and objectives.",
              },
              {
                step: "02",
                title: "Strategy",
                description: "Custom roadmap tailored to your specific needs.",
              },
              {
                step: "03",
                title: "Execution",
                description: "Expert implementation with attention to detail.",
              },
              {
                step: "04",
                title: "Results",
                description: "Measurable outcomes and ongoing optimization.",
              },
            ].map((item) => (
              <ScrollReveal key={item.step}>
                <div className="text-center">
                  <div className="text-primary/20 mb-4 text-5xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Ready to Start Your Project?
            </h2>
            <p className="text-foreground/70 mb-8 text-xl">
              Let's discuss how we can help you achieve similar results for your
              business.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-primary-dark"
            >
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { Link } from '../../../../i18n/navigation';
import Image from "next/image";
import { ScrollReveal } from "../../../components/scroll-reveal";
import { SocialShare } from "../../../components/social-share";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getAllSlugs } from "../../../lib/portfolio-data";
import { generateBreadcrumbSchema, generateSchemaJsonLd } from "../../../lib/schema";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
    title: `${study.title} | Elevate Digital Case Study`,
    description: study.description,
    keywords: [...study.tags, "case study", study.client],
    openGraph: {
      title: `${study.title} | Elevate Digital`,
      description: study.description,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `/${locale}` },
    { name: "Portfolio", url: `/${locale}/portfolio` },
    { name: study.title, url: `/${locale}/portfolio/${slug}` },
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
              <div className="mb-4 flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
                  {study.category}
                </span>
              </div>
              <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight md:text-7xl">
                {study.title}
              </h1>
              <p className="text-foreground/70 mb-8 text-xl leading-relaxed md:text-2xl">
                {study.description}
              </p>
              <div className="text-foreground/60 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    {study.clientLogo ? (
                      <Image
                        src={study.clientLogo}
                        alt={`${study.client} logo`}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded object-contain"
                      />
                    ) : null}
                    <div>
                      <span className="font-semibold">Client:</span>{" "}
                      {study.client}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">Timeline:</span>{" "}
                    {study.timeline}
                  </div>
                </div>
                <SocialShare
                  url={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/portfolio/${slug}`}
                  title={study.title}
                  description={study.description}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="grid gap-8 md:grid-cols-4">
              {study.results.map((result, index) => (
                <div key={index} className="text-center">
                  <div className="text-primary mb-2 text-5xl font-bold">
                    {result.metric}
                  </div>
                  <div className="text-foreground/60">{result.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Overview */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-8 text-4xl font-bold tracking-tight">
              Project Overview
            </h2>
            <p className="text-foreground/70 mb-8 text-lg leading-relaxed">
              {study.overview}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Challenge */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-8 text-4xl font-bold tracking-tight">
              The Challenge
            </h2>
            <p className="text-foreground/70 text-lg leading-relaxed">
              {study.challenge}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Solution */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-8 text-4xl font-bold tracking-tight">
              Our Solution
            </h2>
            <p className="text-foreground/70 text-lg leading-relaxed">
              {study.solution}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-8 text-4xl font-bold tracking-tight">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {study.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-background border-foreground/20 text-foreground/70 rounded-lg border px-4 py-2"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="from-primary/10 to-primary/5 border-primary/20 rounded-2xl border bg-gradient-to-br p-8 md:p-12">
              <svg
                className="text-primary/30 mb-6 h-12 w-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-foreground/90 mb-6 text-2xl leading-relaxed">
                "{study.testimonial.quote}"
              </p>
              <div>
                <div className="text-lg font-semibold">
                  {study.testimonial.author}
                </div>
                <div className="text-foreground/60">
                  {study.testimonial.role}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tags */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-8 text-4xl font-bold tracking-tight">Services</h2>
            <div className="flex flex-wrap gap-3">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-background border-foreground/20 text-foreground/70 rounded-lg border px-4 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-foreground/70 mb-8 text-xl">
              Let's discuss how we can help you achieve your digital marketing
              goals.
            </p>
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark inline-block rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
            >
              Start Your Project
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

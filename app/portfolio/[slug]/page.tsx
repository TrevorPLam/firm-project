import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "../../components/scroll-reveal";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getAllSlugs } from "../../lib/portfolio-data";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {study.category}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                {study.title}
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed">
                {study.description}
              </p>
              <div className="flex items-center gap-6 text-foreground/60">
                <div className="flex items-center gap-3">
                  {study.clientLogo ? (
                    <Image
                      src={study.clientLogo}
                      alt={`${study.client} logo`}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded object-contain"
                    />
                  ) : null}
                  <div>
                    <span className="font-semibold">Client:</span> {study.client}
                  </div>
                </div>
                <div>
                  <span className="font-semibold">Timeline:</span> {study.timeline}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-4 gap-8">
              {study.results.map((result, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">{result.metric}</div>
                  <div className="text-foreground/60">{result.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold tracking-tight mb-8">Project Overview</h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-8">
              {study.overview}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold tracking-tight mb-8">The Challenge</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              {study.challenge}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold tracking-tight mb-8">Our Solution</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              {study.solution}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold tracking-tight mb-8">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {study.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
              <svg className="w-12 h-12 text-primary/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-2xl text-foreground/90 mb-6 leading-relaxed">
                "{study.testimonial.quote}"
              </p>
              <div>
                <div className="font-semibold text-lg">{study.testimonial.author}</div>
                <div className="text-foreground/60">{study.testimonial.role}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tags */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold tracking-tight mb-8">Services</h2>
            <div className="flex flex-wrap gap-3">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Let's discuss how we can help you achieve your digital marketing goals.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-all hover:scale-105"
            >
              Start Your Project
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

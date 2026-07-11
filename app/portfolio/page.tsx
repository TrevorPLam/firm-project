"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "../components/scroll-reveal";

export const metadata: Metadata = {
  title: "Portfolio | Elevate Digital - Our Case Studies",
  description: "Explore our portfolio of successful projects. See how we've helped businesses transform their digital presence with web design, SEO, and analytics.",
  keywords: ["portfolio", "case studies", "our work", "web design projects", "SEO success stories"],
  openGraph: {
    title: "Portfolio | Elevate Digital",
    description: "Explore our portfolio of successful projects and case studies.",
    type: "website",
  },
};

const caseStudies = [
  {
    id: 1,
    title: "E-Commerce Redesign",
    category: "Web Design",
    client: "TechStyle Boutique",
    description: "Complete e-commerce website redesign resulting in 150% increase in conversions and improved user experience.",
    results: ["150% increase in conversions", "40% improvement in page load speed", "60% reduction in bounce rate"],
    tags: ["Web Design", "E-commerce", "UX/UI"],
  },
  {
    id: 2,
    title: "Local SEO Campaign",
    category: "SEO",
    client: "Metro Dental Group",
    description: "Comprehensive local SEO strategy that increased organic traffic by 300% and improved Google Business Profile visibility.",
    results: ["300% increase in organic traffic", "Top 3 rankings for 15+ local keywords", "200% increase in appointment requests"],
    tags: ["SEO", "Local SEO", "Analytics"],
  },
  {
    id: 3,
    title: "Analytics Implementation",
    category: "Analytics",
    client: "Fitness First Chain",
    description: "Full analytics setup with custom dashboards and conversion tracking, enabling data-driven marketing decisions.",
    results: ["Improved marketing ROI by 45%", "Real-time performance insights", "Automated reporting system"],
    tags: ["Analytics", "GA4", "Data Strategy"],
  },
  {
    id: 4,
    title: "SaaS Website Development",
    category: "Web Design",
    client: "CloudSync Solutions",
    description: "Modern SaaS website with interactive product demos and optimized conversion funnels for B2B audience.",
    results: ["85% increase in trial signups", "Improved lead quality score", "Enhanced brand perception"],
    tags: ["Web Design", "SaaS", "B2B"],
  },
  {
    id: 5,
    title: "Content Strategy & SEO",
    category: "SEO",
    client: "GreenHome Products",
    description: "Content-first SEO strategy with blog optimization and pillar pages, establishing topical authority in sustainable home products.",
    results: ["250% increase in blog traffic", "Featured in 50+ industry publications", "Established thought leadership"],
    tags: ["SEO", "Content Strategy", "Blog"],
  },
  {
    id: 6,
    title: "Performance Optimization",
    category: "Web Design",
    client: "NewsPortal Media",
    description: "Complete performance optimization for high-traffic news website, improving Core Web Vitals and user experience.",
    results: ["90+ Lighthouse performance score", "50% improvement in load times", "Improved ad revenue"],
    tags: ["Web Design", "Performance", "Optimization"],
  },
];

export default async function PortfolioPage() {
  cacheLife("days");
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Our Work
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed">
                Explore our portfolio of successful projects. See how we've helped businesses transform their digital presence and achieve measurable results.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <ScrollReveal key={study.id} delay={index * 100}>
                <div className="bg-background rounded-2xl border border-foreground/10 hover:border-primary/50 transition-all hover:shadow-xl overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {study.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                    <p className="text-foreground/60 mb-4">{study.client}</p>
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      {study.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-sm">Key Results:</h4>
                      <ul className="space-y-2">
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-foreground/5 text-foreground/60 text-xs rounded"
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Our Approach
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Every project starts with understanding your goals and ends with delivering measurable results.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Deep dive into your business, audience, and objectives.",
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
                  <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-all hover:scale-105"
            >
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

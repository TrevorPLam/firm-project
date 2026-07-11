"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "../components/scroll-reveal";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services",
  },
  title: "Services | Elevate Digital - Web Design, SEO & Analytics",
  description: "Comprehensive digital services including web design, SEO optimization, and analytics. Transform your digital presence with data-driven strategies.",
  keywords: ["web design services", "SEO services", "analytics services", "digital marketing", "website development"],
  openGraph: {
    title: "Services | Elevate Digital",
    description: "Comprehensive digital services including web design, SEO optimization, and analytics.",
    type: "website",
  },
};

export default async function ServicesPage() {
  cacheLife("days");
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Our Services
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed">
                Comprehensive digital solutions tailored to your business goals. We combine creativity with data-driven strategies to deliver measurable results.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Web Design Service */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold tracking-tight mb-4">
                  Web Design & Development
                </h2>
                <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                  Custom, responsive websites built with modern frameworks. We create fast, accessible, and conversion-optimized designs that perfectly represent your brand and drive business results.
                </p>
                <h3 className="text-xl font-semibold mb-4">What's Included:</h3>
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
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                <h3 className="text-2xl font-bold mb-6">Our Process</h3>
                <div className="space-y-6">
                  {[
                    { step: "01", title: "Discovery", desc: "Understanding your goals, audience, and requirements" },
                    { step: "02", title: "Design", desc: "Creating wireframes and visual designs" },
                    { step: "03", title: "Development", desc: "Building with modern frameworks and best practices" },
                    { step: "04", title: "Launch", desc: "Deployment, testing, and optimization" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="text-2xl font-bold text-primary/50">{item.step}</div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-foreground/60 text-sm">{item.desc}</p>
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                <h3 className="text-2xl font-bold mb-6">SEO Strategy</h3>
                <div className="space-y-6">
                  {[
                    { step: "01", title: "Audit", desc: "Comprehensive technical and content SEO audit" },
                    { step: "02", title: "Research", desc: "Keyword research and competitor analysis" },
                    { step: "03", title: "Optimize", desc: "On-page and technical SEO implementation" },
                    { step: "04", title: "Grow", desc: "Content strategy and link building" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="text-2xl font-bold text-primary/50">{item.step}</div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-foreground/60 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold tracking-tight mb-4">
                  SEO Optimization
                </h2>
                <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                  Data-driven search engine optimization to improve your visibility and drive organic traffic. We help you rank higher and reach more customers with proven strategies.
                </p>
                <h3 className="text-xl font-semibold mb-4">What's Included:</h3>
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
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
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
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold tracking-tight mb-4">
                  Analytics & Insights
                </h2>
                <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                  Comprehensive analytics setup and reporting to track performance, understand user behavior, and make data-driven decisions for sustainable growth.
                </p>
                <h3 className="text-xl font-semibold mb-4">What's Included:</h3>
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
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                <h3 className="text-2xl font-bold mb-6">Key Metrics We Track</h3>
                <div className="space-y-4">
                  {[
                    { metric: "Traffic Sources", desc: "Where your visitors come from" },
                    { metric: "User Behavior", desc: "How users interact with your site" },
                    { metric: "Conversion Rates", desc: "Percentage of visitors who convert" },
                    { metric: "Bounce Rate", desc: "Single-page session percentage" },
                    { metric: "Page Performance", desc: "Which pages perform best" },
                    { metric: "ROI Analysis", desc: "Return on marketing investment" },
                  ].map((item) => (
                    <div key={item.metric} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.metric}</h4>
                        <p className="text-foreground/60 text-sm">{item.desc}</p>
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Let's discuss how our services can help transform your digital presence and drive business growth.
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

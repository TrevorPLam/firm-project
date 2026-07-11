import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "../../components/scroll-reveal";
import { notFound } from "next/navigation";

const caseStudies = {
  "ecommerce-redesign": {
    id: 1,
    slug: "ecommerce-redesign",
    title: "E-Commerce Redesign",
    category: "Web Design",
    client: "TechStyle Boutique",
    clientLogo: "/clients/techstyle.png",
    description: "Complete e-commerce website redesign resulting in 150% increase in conversions and improved user experience.",
    overview: "TechStyle Boutique, a fashion retailer, came to us with an outdated e-commerce platform that was struggling to convert visitors. Their website had poor mobile performance, confusing navigation, and a checkout process that caused significant cart abandonment.",
    challenge: "The client needed a complete overhaul of their e-commerce presence. Key challenges included: migrating to a modern platform, improving mobile experience, streamlining the checkout process, integrating with their inventory management system, and maintaining SEO rankings during the transition.",
    solution: "We built a custom e-commerce solution using Next.js and Shopify, focusing on conversion optimization and user experience. Key improvements included: responsive design with mobile-first approach, streamlined 3-step checkout process, advanced product filtering and search, integrated inventory management, and performance optimization achieving 90+ Lighthouse scores.",
    results: [
      { metric: "150%", label: "Increase in conversions" },
      { metric: "40%", label: "Improvement in page load speed" },
      { metric: "60%", label: "Reduction in bounce rate" },
      { metric: "85%", label: "Increase in mobile traffic" },
    ],
    testimonial: {
      quote: "Elevate Digital transformed our online presence completely. Our conversion rate increased by 150% within three months. The team's attention to detail and focus on user experience made all the difference.",
      author: "Sarah Johnson",
      role: "CEO, TechStyle Boutique",
    },
    tags: ["Web Design", "E-commerce", "UX/UI", "Shopify", "Next.js"],
    timeline: "8 weeks",
    technologies: ["Next.js", "Shopify", "Tailwind CSS", "GA4", "Hotjar"],
  },
  "local-seo-campaign": {
    id: 2,
    slug: "local-seo-campaign",
    title: "Local SEO Campaign",
    category: "SEO",
    client: "Metro Dental Group",
    clientLogo: "/clients/metro-dental.png",
    description: "Comprehensive local SEO strategy that increased organic traffic by 300% and improved Google Business Profile visibility.",
    overview: "Metro Dental Group, a multi-location dental practice, was struggling to appear in local search results despite having excellent reviews and services. Their competitors were dominating local search, and they were missing out on valuable patient inquiries.",
    challenge: "The practice needed to improve their local search visibility across all locations. Challenges included: inconsistent NAP (Name, Address, Phone) data across the web, lack of local citations, minimal Google Business Profile optimization, and no local content strategy.",
    solution: "We implemented a comprehensive local SEO strategy including: Google Business Profile optimization for all locations, consistent NAP data across 100+ directories, local landing pages for each location, review generation campaign, local content strategy, and schema markup implementation.",
    results: [
      { metric: "300%", label: "Increase in organic traffic" },
      { metric: "Top 3", label: "Rankings for 15+ local keywords" },
      { metric: "200%", label: "Increase in appointment requests" },
      { metric: "4.8", label: "Average Google rating (up from 4.2)" },
    ],
    testimonial: {
      quote: "The SEO results have been phenomenal. We went from page 5 to top 3 rankings for our main keywords. The team's data-driven approach and regular reporting keep us informed every step of the way.",
      author: "Michael Chen",
      role: "Marketing Director, Metro Dental Group",
    },
    tags: ["SEO", "Local SEO", "Google Business Profile", "Content Strategy"],
    timeline: "6 months ongoing",
    technologies: ["Google Search Console", "GA4", "SEMrush", "BrightLocal"],
  },
  "analytics-implementation": {
    id: 3,
    slug: "analytics-implementation",
    title: "Analytics Implementation",
    category: "Analytics",
    client: "Fitness First Chain",
    clientLogo: "/clients/fitness-first.png",
    description: "Full analytics setup with custom dashboards and conversion tracking, enabling data-driven marketing decisions.",
    overview: "Fitness First Chain, a regional fitness center with 10 locations, had no unified analytics setup. Each location had different tracking methods, making it impossible to measure overall marketing performance or make data-driven decisions.",
    challenge: "The client needed a unified analytics solution across all locations. Challenges included: fragmented tracking across locations, no conversion tracking, inability to measure ROI on marketing spend, and lack of real-time performance insights.",
    solution: "We implemented a comprehensive analytics solution including: GA4 setup with custom events for all locations, unified Google Tag Manager container, conversion tracking for memberships and trials, custom Data Studio dashboards, real-time reporting setup, and staff training on analytics interpretation.",
    results: [
      { metric: "45%", label: "Improved marketing ROI" },
      { metric: "Real-time", label: "Performance insights" },
      { metric: "Automated", label: "Reporting system" },
      { metric: "10+", label: "Locations unified in one dashboard" },
    ],
    testimonial: {
      quote: "We finally have visibility into what's working across all our locations. The custom dashboards and automated reporting have transformed how we make marketing decisions.",
      author: "Emily Rodriguez",
      role: "Founder, GreenHome Products",
    },
    tags: ["Analytics", "GA4", "Data Studio", "Conversion Tracking"],
    timeline: "4 weeks",
    technologies: ["GA4", "Google Tag Manager", "Looker Studio", "BigQuery"],
  },
  "saas-website-development": {
    id: 4,
    slug: "saas-website-development",
    title: "SaaS Website Development",
    category: "Web Design",
    client: "CloudSync Solutions",
    clientLogo: "/clients/cloudsync.png",
    description: "Modern SaaS website with interactive product demos and optimized conversion funnels for B2B audience.",
    overview: "CloudSync Solutions, a B2B SaaS startup, needed a website that could effectively communicate their complex product offering and convert enterprise leads. Their existing site was technical, confusing, and failing to capture qualified leads.",
    challenge: "The client needed a website that could: clearly explain complex technical products, capture enterprise leads, integrate with their CRM, provide interactive product demos, and establish trust with enterprise buyers.",
    solution: "We built a modern SaaS website with: interactive product walkthroughs, enterprise-focused messaging and design, CRM integration for lead capture, interactive pricing calculator, customer testimonial videos, and trust signals (security badges, case studies).",
    results: [
      { metric: "85%", label: "Increase in trial signups" },
      { metric: "Higher", label: "Lead quality score" },
      { metric: "Enhanced", label: "Brand perception" },
      { metric: "40%", label: "Reduction in support inquiries" },
    ],
    testimonial: {
      quote: "The new website has completely transformed our lead generation. We're attracting more qualified enterprise leads and our conversion rate has never been better.",
      author: "David Park",
      role: "CTO, CloudSync Solutions",
    },
    tags: ["Web Design", "SaaS", "B2B", "Lead Generation"],
    timeline: "10 weeks",
    technologies: ["Next.js", "HubSpot", "Calendly", "Wistia"],
  },
  "content-strategy-seo": {
    id: 5,
    slug: "content-strategy-seo",
    title: "Content Strategy & SEO",
    category: "SEO",
    client: "GreenHome Products",
    clientLogo: "/clients/greenhome.png",
    description: "Content-first SEO strategy with blog optimization and pillar pages, establishing topical authority in sustainable home products.",
    overview: "GreenHome Products, an e-commerce retailer of sustainable home goods, had a blog but no content strategy. They were producing content inconsistently and not seeing SEO results from their efforts.",
    challenge: "The client needed a content strategy that could: establish topical authority in sustainable living, drive organic traffic, support e-commerce sales, and position them as thought leaders in their niche.",
    solution: "We developed a comprehensive content strategy including: keyword research and topic mapping, content calendar creation, pillar page development, blog post optimization, internal linking strategy, and promotion and distribution plan.",
    results: [
      { metric: "250%", label: "Increase in blog traffic" },
      { metric: "50+", label: "Industry publication features" },
      { metric: "Established", label: "Thought leadership" },
      { metric: "35%", label: "Increase in organic revenue" },
    ],
    testimonial: {
      quote: "Working with Elevate Digital has been a game-changer for our content strategy. Our blog traffic increased by 250% and we're now recognized as thought leaders in our industry.",
      author: "Emily Rodriguez",
      role: "Founder, GreenHome Products",
    },
    tags: ["SEO", "Content Strategy", "Blog", "Thought Leadership"],
    timeline: "12 months ongoing",
    technologies: ["WordPress", "SEMrush", "Ahrefs", "BuzzStream"],
  },
  "performance-optimization": {
    id: 6,
    slug: "performance-optimization",
    title: "Performance Optimization",
    category: "Web Design",
    client: "NewsPortal Media",
    clientLogo: "/clients/newsportal.png",
    description: "Complete performance optimization for high-traffic news website, improving Core Web Vitals and user experience.",
    overview: "NewsPortal Media, a high-traffic news website, was experiencing performance issues that affected user experience and ad revenue. Their page load times were slow, and they were failing Core Web Vitals assessments.",
    challenge: "The client needed to improve performance while maintaining: their complex ad setup, high content volume, real-time publishing requirements, and existing functionality.",
    solution: "We implemented comprehensive performance optimizations including: image optimization and lazy loading, code splitting and lazy loading, CDN implementation, database query optimization, caching strategy, and Core Web Vitals improvements.",
    results: [
      { metric: "90+", label: "Lighthouse performance score" },
      { metric: "50%", label: "Improvement in load times" },
      { metric: "Improved", label: "Ad revenue" },
      { metric: "Better", label: "User engagement metrics" },
    ],
    testimonial: {
      quote: "The performance improvements have been incredible. Our site is now blazing fast, and we've seen improvements in both user engagement and ad revenue.",
      author: "Alex Thompson",
      role: "CTO, NewsPortal Media",
    },
    tags: ["Web Design", "Performance", "Optimization", "Core Web Vitals"],
    timeline: "6 weeks",
    technologies: ["Next.js", "Vercel", "Cloudflare", "ImageKit"],
  },
};

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug as keyof typeof caseStudies];
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
  const study = caseStudies[slug as keyof typeof caseStudies];

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

// Portfolio data module - single source of truth for portfolio content
// DDD: Portfolio is a bounded context; defined once in domain module
// Deep module: exports typed functions, internal data is private

export interface CaseStudyResult {
  metric: string;
  label: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  category: string;
  client: string;
  clientLogo: string;
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  testimonial: CaseStudyTestimonial;
  tags: string[];
  timeline: string;
  technologies: string[];
}

export interface CaseStudySummary {
  id: number;
  slug: string;
  title: string;
  category: string;
  client: string;
  description: string;
  results: string[];
  tags: string[];
}

// Private internal data - not exported
const caseStudies: Record<string, CaseStudy> = {
  "ecommerce-redesign": {
    id: 1,
    slug: "ecommerce-redesign",
    title: "E-Commerce Redesign",
    category: "Web Design",
    client: "TechStyle Boutique",
    clientLogo: "/clients/techstyle.svg",
    description:
      "Complete e-commerce website redesign resulting in 150% increase in conversions and improved user experience.",
    overview:
      "TechStyle Boutique, a fashion retailer, came to us with an outdated e-commerce platform that was struggling to convert visitors. Their website had poor mobile performance, confusing navigation, and a checkout process that caused significant cart abandonment.",
    challenge:
      "The client needed a complete overhaul of their e-commerce presence. Key challenges included: migrating to a modern platform, improving mobile experience, streamlining the checkout process, integrating with their inventory management system, and maintaining SEO rankings during the transition.",
    solution:
      "We built a custom e-commerce solution using Next.js and Shopify, focusing on conversion optimization and user experience. Key improvements included: responsive design with mobile-first approach, streamlined 3-step checkout process, advanced product filtering and search, integrated inventory management, and performance optimization achieving 90+ Lighthouse scores.",
    results: [
      { metric: "150%", label: "Increase in conversions" },
      { metric: "40%", label: "Improvement in page load speed" },
      { metric: "60%", label: "Reduction in bounce rate" },
      { metric: "85%", label: "Increase in mobile traffic" },
    ],
    testimonial: {
      quote:
        "Elevate Digital transformed our online presence completely. Our conversion rate increased by 150% within three months. The team's attention to detail and focus on user experience made all the difference.",
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
    clientLogo: "/clients/metro-dental.svg",
    description:
      "Comprehensive local SEO strategy that increased organic traffic by 300% and improved Google Business Profile visibility.",
    overview:
      "Metro Dental Group, a multi-location dental practice, was struggling to appear in local search results despite having excellent reviews and services. Their competitors were dominating local search, and they were missing out on valuable patient inquiries.",
    challenge:
      "The practice needed to improve their local search visibility across all locations. Challenges included: inconsistent NAP (Name, Address, Phone) data across the web, lack of local citations, minimal Google Business Profile optimization, and no local content strategy.",
    solution:
      "We implemented a comprehensive local SEO strategy including: Google Business Profile optimization for all locations, consistent NAP data across 100+ directories, local landing pages for each location, review generation campaign, local content strategy, and schema markup implementation.",
    results: [
      { metric: "300%", label: "Increase in organic traffic" },
      { metric: "Top 3", label: "Rankings for 15+ local keywords" },
      { metric: "200%", label: "Increase in appointment requests" },
      { metric: "4.8", label: "Average Google rating (up from 4.2)" },
    ],
    testimonial: {
      quote:
        "The SEO results have been phenomenal. We went from page 5 to top 3 rankings for our main keywords. The team's data-driven approach and regular reporting keep us informed every step of the way.",
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
    clientLogo: "/clients/fitness-first.svg",
    description:
      "Full analytics setup with custom dashboards and conversion tracking, enabling data-driven marketing decisions.",
    overview:
      "Fitness First Chain, a regional fitness center with 10 locations, had no unified analytics setup. Each location had different tracking methods, making it impossible to measure overall marketing performance or make data-driven decisions.",
    challenge:
      "The client needed a unified analytics solution across all locations. Challenges included: fragmented tracking across locations, no conversion tracking, inability to measure ROI on marketing spend, and lack of real-time performance insights.",
    solution:
      "We implemented a comprehensive analytics solution including: GA4 setup with custom events for all locations, unified Google Tag Manager container, conversion tracking for memberships and trials, custom Data Studio dashboards, real-time reporting setup, and staff training on analytics interpretation.",
    results: [
      { metric: "45%", label: "Improved marketing ROI" },
      { metric: "Real-time", label: "Performance insights" },
      { metric: "Automated", label: "Reporting system" },
      { metric: "10+", label: "Locations unified in one dashboard" },
    ],
    testimonial: {
      quote:
        "We finally have visibility into what's working across all our locations. The custom dashboards and automated reporting have transformed how we make marketing decisions.",
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
    clientLogo: "/clients/cloudsync.svg",
    description:
      "Modern SaaS website with interactive product demos and optimized conversion funnels for B2B audience.",
    overview:
      "CloudSync Solutions, a B2B SaaS startup, needed a website that could effectively communicate their complex product offering and convert enterprise leads. Their existing site was technical, confusing, and failing to capture qualified leads.",
    challenge:
      "The client needed a website that could: clearly explain complex technical products, capture enterprise leads, integrate with their CRM, provide interactive product demos, and establish trust with enterprise buyers.",
    solution:
      "We built a modern SaaS website with: interactive product walkthroughs, enterprise-focused messaging and design, CRM integration for lead capture, interactive pricing calculator, customer testimonial videos, and trust signals (security badges, case studies).",
    results: [
      { metric: "85%", label: "Increase in trial signups" },
      { metric: "Higher", label: "Lead quality score" },
      { metric: "Enhanced", label: "Brand perception" },
      { metric: "40%", label: "Reduction in support inquiries" },
    ],
    testimonial: {
      quote:
        "The new website has completely transformed our lead generation. We're attracting more qualified enterprise leads and our conversion rate has never been better.",
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
    clientLogo: "/clients/greenhome.svg",
    description:
      "Content-first SEO strategy with blog optimization and pillar pages, establishing topical authority in sustainable home products.",
    overview:
      "GreenHome Products, an e-commerce retailer of sustainable home goods, had a blog but no content strategy. They were producing content inconsistently and not seeing SEO results from their efforts.",
    challenge:
      "The client needed a content strategy that could: establish topical authority in sustainable living, drive organic traffic, support e-commerce sales, and position them as thought leaders in their niche.",
    solution:
      "We developed a comprehensive content strategy including: keyword research and topic mapping, content calendar creation, pillar page development, blog post optimization, internal linking strategy, and promotion and distribution plan.",
    results: [
      { metric: "250%", label: "Increase in blog traffic" },
      { metric: "50+", label: "Industry publication features" },
      { metric: "Established", label: "Thought leadership" },
      { metric: "35%", label: "Increase in organic revenue" },
    ],
    testimonial: {
      quote:
        "Working with Elevate Digital has been a game-changer for our content strategy. Our blog traffic increased by 250% and we're now recognized as thought leaders in our industry.",
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
    clientLogo: "/clients/newsportal.svg",
    description:
      "Complete performance optimization for high-traffic news website, improving Core Web Vitals and user experience.",
    overview:
      "NewsPortal Media, a high-traffic news website, was experiencing performance issues that affected user experience and ad revenue. Their page load times were slow, and they were failing Core Web Vitals assessments.",
    challenge:
      "The client needed to improve performance while maintaining: their complex ad setup, high content volume, real-time publishing requirements, and existing functionality.",
    solution:
      "We implemented comprehensive performance optimizations including: image optimization and lazy loading, code splitting and lazy loading, CDN implementation, database query optimization, caching strategy, and Core Web Vitals improvements.",
    results: [
      { metric: "90+", label: "Lighthouse performance score" },
      { metric: "50%", label: "Improvement in load times" },
      { metric: "Improved", label: "Ad revenue" },
      { metric: "Better", label: "User engagement metrics" },
    ],
    testimonial: {
      quote:
        "The performance improvements have been incredible. Our site is now blazing fast, and we've seen improvements in both user engagement and ad revenue.",
      author: "Alex Thompson",
      role: "CTO, NewsPortal Media",
    },
    tags: ["Web Design", "Performance", "Optimization", "Core Web Vitals"],
    timeline: "6 weeks",
    technologies: ["Next.js", "Vercel", "Cloudflare", "ImageKit"],
  },
};

/**
 * Get all case studies as summary view (for list page)
 */
export function getAllCaseStudies(): CaseStudySummary[] {
  return Object.values(caseStudies).map((study) => ({
    id: study.id,
    slug: study.slug,
    title: study.title,
    category: study.category,
    client: study.client,
    description: study.description,
    results: study.results.map((r) => `${r.metric} ${r.label}`),
    tags: study.tags,
  }));
}

/**
 * Get a single case study by slug (for detail page)
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

/**
 * Get all available slugs (for generateStaticParams)
 */
export function getAllSlugs(): string[] {
  return Object.keys(caseStudies);
}

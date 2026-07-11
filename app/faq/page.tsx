"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "../components/scroll-reveal";

export const metadata: Metadata = {
  alternates: {
    canonical: "/faq",
  },
  title: "FAQ | Elevate Digital - Frequently Asked Questions",
  description:
    "Find answers to common questions about our web design, SEO, and analytics services. Get the information you need to make informed decisions.",
  keywords: [
    "FAQ",
    "frequently asked questions",
    "web design questions",
    "SEO questions",
    "analytics questions",
  ],
  openGraph: {
    title: "FAQ | Elevate Digital",
    description: "Find answers to common questions about our services.",
    type: "website",
  },
};

const faqCategories = [
  {
    category: "General",
    questions: [
      {
        question: "What services do you offer?",
        answer:
          "We offer comprehensive digital marketing services including web design and development, SEO optimization, analytics and insights, content strategy, and full digital marketing campaigns. Our services are tailored to help businesses establish and grow their online presence.",
      },
      {
        question: "How long have you been in business?",
        answer:
          "We have over 5 years of experience helping businesses succeed in the digital landscape. Our team has worked with startups, small businesses, and enterprises across various industries, delivering over 150 successful projects.",
      },
      {
        question: "Do you work with businesses of all sizes?",
        answer:
          "Yes! We work with businesses of all sizes, from startups to established enterprises. Our flexible packages and custom solutions allow us to scale our services to meet your specific needs and budget.",
      },
      {
        question: "What industries do you specialize in?",
        answer:
          "While we have experience across many industries, we particularly specialize in technology, e-commerce, healthcare, professional services, and B2B companies. However, our expertise in digital marketing applies to virtually any industry looking to grow online.",
      },
    ],
  },
  {
    category: "Web Design & Development",
    questions: [
      {
        question: "What technologies do you use for web development?",
        answer:
          "We use modern, industry-standard technologies including Next.js, React, TypeScript, and Tailwind CSS. This ensures your website is fast, secure, scalable, and built with best practices that will stand the test of time.",
      },
      {
        question: "Do you create custom designs or use templates?",
        answer:
          "We create custom designs tailored to your brand and business goals. While we may use design systems and components for efficiency, every website we build is unique and designed specifically for your needs.",
      },
      {
        question: "Will my website be mobile-friendly?",
        answer:
          "Absolutely! All our websites are fully responsive and optimized for all devices — desktop, tablet, and mobile. Mobile-first design is a core part of our development process.",
      },
      {
        question: "Can you help with website maintenance after launch?",
        answer:
          "Yes, we offer ongoing maintenance packages that include security updates, performance monitoring, content updates, and technical support. We ensure your website remains secure, fast, and up-to-date.",
      },
      {
        question: "How long does it take to build a website?",
        answer:
          "Timeline varies based on complexity. A simple 5-page website typically takes 2-4 weeks, while more complex projects with custom features can take 8-12 weeks or more. We provide detailed timelines during our planning phase.",
      },
    ],
  },
  {
    category: "SEO Services",
    questions: [
      {
        question: "How long does it take to see SEO results?",
        answer:
          "SEO is a long-term strategy. Typically, you'll start seeing initial improvements in 3-6 months, with significant results becoming apparent after 6-12 months. The timeline depends on your industry, competition, and current website state.",
      },
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "No reputable SEO agency can guarantee specific rankings, as search algorithms are complex and constantly changing. However, we guarantee using proven strategies that have consistently helped our clients achieve significant ranking improvements and increased organic traffic.",
      },
      {
        question: "What's included in your SEO services?",
        answer:
          "Our SEO services include comprehensive audits, keyword research, on-page optimization, technical SEO improvements, content strategy, link building, and regular performance reporting. We provide a holistic approach to improving your search visibility.",
      },
      {
        question: "Do you offer local SEO services?",
        answer:
          "Yes, we specialize in local SEO for businesses targeting specific geographic areas. This includes Google Business Profile optimization, local citation building, and location-specific keyword targeting.",
      },
    ],
  },
  {
    category: "Analytics & Reporting",
    questions: [
      {
        question: "What analytics tools do you use?",
        answer:
          "We primarily use Google Analytics 4 (GA4) and Google Tag Manager, along with complementary tools like Google Search Console, Hotjar for user behavior analysis, and various data visualization platforms for custom reporting.",
      },
      {
        question: "How often will I receive reports?",
        answer:
          "We provide monthly performance reports as standard, with more frequent reporting available for active campaigns. Reports include key metrics, insights, and actionable recommendations for improvement.",
      },
      {
        question: "Can you help me understand my analytics data?",
        answer:
          "Absolutely! We don't just send reports — we explain what the data means, highlight important trends, and provide strategic recommendations. We also offer training sessions to help your team understand analytics.",
      },
      {
        question: "Do you set up conversion tracking?",
        answer:
          "Yes, conversion tracking is a core part of our analytics setup. We track form submissions, phone calls, purchases, and other key actions that matter to your business, helping you understand ROI.",
      },
    ],
  },
  {
    category: "Pricing & Process",
    questions: [
      {
        question: "How do you structure your pricing?",
        answer:
          "We offer transparent, package-based pricing with clear deliverables. We also provide custom quotes for projects with unique requirements. Our pricing is always discussed upfront with no hidden fees.",
      },
      {
        question: "What payment terms do you offer?",
        answer:
          "For projects under $5,000, we typically require 50% upfront and 50% upon completion. For larger projects, we offer milestone-based payment schedules. We also offer monthly payment options for ongoing services.",
      },
      {
        question: "What's your project process?",
        answer:
          "Our process includes: 1) Discovery — understanding your goals and requirements, 2) Strategy — developing a comprehensive plan, 3) Execution — building and implementing, 4) Launch — deploying your project, 5) Optimization — ongoing improvement and support.",
      },
      {
        question: "Will I own my website and content?",
        answer:
          "Yes! You own 100% of your website, content, and all assets we create. We build on platforms you control, and we provide all source files and documentation upon project completion.",
      },
    ],
  },
];

export default async function FAQPage() {
  cacheLife("days");
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight md:text-7xl">
                Frequently Asked Questions
              </h1>
              <p className="text-foreground/70 mb-8 text-xl leading-relaxed md:text-2xl">
                Find answers to common questions about our services, process,
                and how we can help your business grow online.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          {faqCategories.map((category, categoryIndex) => (
            <ScrollReveal key={category.category} delay={categoryIndex * 100}>
              <div className="mb-16">
                <h2 className="mb-8 text-3xl font-bold tracking-tight">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <div
                      key={faqIndex}
                      className="bg-background border-foreground/10 hover:border-primary/50 rounded-xl border p-6 transition-all"
                    >
                      <h3 className="mb-3 text-lg font-semibold">
                        {faq.question}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Still Have Questions?
            </h2>
            <p className="text-foreground/70 mb-8 text-xl">
              Can't find the answer you're looking for? We're here to help.
              Reach out to us and we'll get back to you within 24 hours.
            </p>
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark inline-block rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
            >
              Contact Us
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

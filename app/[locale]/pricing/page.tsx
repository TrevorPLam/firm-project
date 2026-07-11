"use client";

import { useState, useEffect } from "react";
import { Link } from '../../../i18n/navigation';
import { ScrollReveal } from "../../components/scroll-reveal";


const packages = [
  {
    name: "Starter",
    monthlyPrice: 2500,
    yearlyPrice: 2400,
    period: "starting at",
    description:
      "Perfect for small businesses looking to establish their digital presence.",
    features: [
      "5-page responsive website",
      "Basic SEO setup",
      "Google Analytics integration",
      "Contact form setup",
      "Mobile optimization",
      "1 month of support",
      "Basic performance optimization",
    ],
    excluded: [
      "Custom design",
      "Advanced SEO",
      "Content creation",
      "E-commerce",
    ],
    popular: false,
  },
  {
    name: "Growth",
    monthlyPrice: 5000,
    yearlyPrice: 4800,
    period: "starting at",
    description:
      "Ideal for growing businesses ready to scale their digital marketing efforts.",
    features: [
      "10-page custom website",
      "Advanced SEO optimization",
      "GA4 & Tag Manager setup",
      "Conversion tracking",
      "Content strategy (5 pages)",
      "3 months of support",
      "Performance optimization",
      "Blog integration",
      "Social media setup",
    ],
    excluded: ["E-commerce", "Custom integrations", "Advanced analytics"],
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    period: "pricing",
    description:
      "Comprehensive solutions for established businesses with complex needs.",
    features: [
      "Unlimited pages",
      "Full SEO campaign",
      "Advanced analytics dashboard",
      "Custom integrations",
      "E-commerce solutions",
      "Content marketing strategy",
      "6 months of support",
      "Priority support",
      "Dedicated account manager",
      "Custom reporting",
    ],
    excluded: [],
    popular: false,
  },
];

const addOns = [
  {
    name: "Content Marketing Package",
    price: "$1,500/month",
    description: "4 blog posts, social media content, and email newsletter",
  },
  {
    name: "Advanced SEO Campaign",
    price: "$2,000/month",
    description: "Link building, technical SEO, and competitor analysis",
  },
  {
    name: "Analytics & Reporting",
    price: "$800/month",
    description: "Custom dashboards, weekly reports, and consultation",
  },
  {
    name: "Website Maintenance",
    price: "$500/month",
    description: "Security updates, backups, and minor changes",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(() => {
    // Load saved preference from localStorage on mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('billing-preference');
      return saved === 'yearly' ? true : saved === 'monthly' ? false : true;
    }
    return true;
  });

  // Save preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('billing-preference', isYearly ? 'yearly' : 'monthly');
  }, [isYearly]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight md:text-7xl">
                Transparent Pricing
              </h1>
              <p className="text-foreground/70 mb-8 text-xl leading-relaxed md:text-2xl">
                Choose the package that fits your business needs. No hidden
                fees, no surprises — just clear, straightforward pricing.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Billing Toggle */}
          <div className="mb-12 flex justify-center">
            <div className="flex items-center gap-4 rounded-full bg-background border border-foreground/10 p-1">
              <button
                onClick={() => setIsYearly(false)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  !isYearly
                    ? 'bg-primary text-white'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
                aria-pressed={!isYearly}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  isYearly
                    ? 'bg-primary text-white'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
                aria-pressed={isYearly}
              >
                Yearly
                <span className="ml-2 rounded-full bg-primary-dark px-2 py-0.5 text-xs">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <ScrollReveal key={pkg.name} delay={index * 100}>
                <div
                  className={`bg-background overflow-hidden rounded-2xl border-2 transition-all hover:shadow-xl ${
                    pkg.popular
                      ? "border-primary relative shadow-xl"
                      : "border-foreground/10 hover:border-primary/50"
                  }`}
                >
                  {pkg.popular && (
                    <div className="bg-primary absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-bold text-white">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="mb-2 text-2xl font-bold">{pkg.name}</h3>
                    <div className="mb-4">
                      {pkg.monthlyPrice === null ? (
                        <span className="text-4xl font-bold">Custom</span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold transition-all duration-300">
                            ${isYearly ? pkg.yearlyPrice : pkg.monthlyPrice.toLocaleString()}
                          </span>
                          <span className="text-foreground/60 ml-2">
                            {pkg.period}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-foreground/70 mb-6">{pkg.description}</p>
                    <ul className="mb-8 space-y-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <svg
                            className="text-primary mt-0.5 h-5 w-5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-foreground/70">{feature}</span>
                        </li>
                      ))}
                      {pkg.excluded.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 opacity-50"
                        >
                          <svg
                            className="text-foreground/40 mt-0.5 h-5 w-5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span className="text-foreground/40 line-through">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`block w-full rounded-lg py-3 text-center font-medium transition-colors ${
                        pkg.popular
                          ? "bg-primary hover:bg-primary-dark text-white"
                          : "bg-foreground/10 text-foreground hover:bg-foreground/20"
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                Add-On Services
              </h2>
              <p className="text-foreground/70 text-xl leading-relaxed">
                Enhance your package with additional services to meet your
                specific needs.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {addOns.map((addon, index) => (
              <ScrollReveal key={addon.name} delay={index * 100}>
                <div className="bg-background border-foreground/10 hover:border-primary/50 rounded-xl border p-6 transition-all">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-xl font-bold">{addon.name}</h3>
                    <span className="text-primary font-semibold">
                      {addon.price}
                    </span>
                  </div>
                  <p className="text-foreground/70">{addon.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              {
                question: "What's included in the starting price?",
                answer:
                  "Our starting prices include the core features listed in each package. Additional requirements may affect the final price, which we'll discuss during our initial consultation.",
              },
              {
                question: "Do you offer payment plans?",
                answer:
                  "Yes, we offer flexible payment plans for projects over $5,000. Typically, we require a 50% deposit upfront with the remaining balance split across project milestones.",
              },
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary based on scope. Starter packages typically take 2-4 weeks, Growth packages 4-8 weeks, and Enterprise projects are customized based on requirements.",
              },
              {
                question: "What happens after the project is complete?",
                answer:
                  "All packages include post-launch support. We also offer ongoing maintenance packages to keep your site secure, updated, and performing optimally.",
              },
              {
                question: "Can I upgrade my package later?",
                answer:
                  "Absolutely! We can start with a package that fits your current needs and scale up as your business grows. Many of our clients begin with Starter and upgrade to Growth or Enterprise.",
              },
            ].map((faq, index) => (
              <ScrollReveal key={index} delay={index * 50}>
                <div className="bg-background border-foreground/10 rounded-xl border p-6">
                  <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                  <p className="text-foreground/70">{faq.answer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Not Sure Which Package is Right for You?
            </h2>
            <p className="text-foreground/70 mb-8 text-xl">
              Let's discuss your specific needs and create a custom solution
              that fits your budget and goals.
            </p>
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark inline-block rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
            >
              Schedule a Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

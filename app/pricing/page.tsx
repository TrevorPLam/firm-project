import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "../components/scroll-reveal";

export const metadata: Metadata = {
  title: "Pricing | Elevate Digital - Service Packages",
  description: "Transparent pricing for our web design, SEO, and analytics services. Choose the package that fits your business needs and budget.",
  keywords: ["pricing", "service packages", "web design pricing", "SEO pricing", "analytics pricing"],
  openGraph: {
    title: "Pricing | Elevate Digital",
    description: "Transparent pricing for our web design, SEO, and analytics services.",
    type: "website",
  },
};

const packages = [
  {
    name: "Starter",
    price: "$2,500",
    period: "starting at",
    description: "Perfect for small businesses looking to establish their digital presence.",
    features: [
      "5-page responsive website",
      "Basic SEO setup",
      "Google Analytics integration",
      "Contact form setup",
      "Mobile optimization",
      "1 month of support",
      "Basic performance optimization",
    ],
    excluded: ["Custom design", "Advanced SEO", "Content creation", "E-commerce"],
    popular: false,
  },
  {
    name: "Growth",
    price: "$5,000",
    period: "starting at",
    description: "Ideal for growing businesses ready to scale their digital marketing efforts.",
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
    price: "Custom",
    period: "pricing",
    description: "Comprehensive solutions for established businesses with complex needs.",
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
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Transparent Pricing
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed">
                Choose the package that fits your business needs. No hidden fees, no surprises — just clear, straightforward pricing.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <ScrollReveal key={pkg.name} delay={index * 100}>
                <div
                  className={`bg-background rounded-2xl border-2 transition-all hover:shadow-xl overflow-hidden ${
                    pkg.popular
                      ? "border-primary shadow-xl relative"
                      : "border-foreground/10 hover:border-primary/50"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      <span className="text-foreground/60 ml-2">{pkg.period}</span>
                    </div>
                    <p className="text-foreground/70 mb-6">{pkg.description}</p>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
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
                        <li key={feature} className="flex items-start gap-3 opacity-50">
                          <svg
                            className="w-5 h-5 text-foreground/40 mt-0.5 flex-shrink-0"
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
                          <span className="text-foreground/40 line-through">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`block w-full py-3 text-center rounded-lg font-medium transition-colors ${
                        pkg.popular
                          ? "bg-primary text-white hover:bg-primary-dark"
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Add-On Services
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Enhance your package with additional services to meet your specific needs.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {addOns.map((addon, index) => (
              <ScrollReveal key={addon.name} delay={index * 100}>
                <div className="bg-background p-6 rounded-xl border border-foreground/10 hover:border-primary/50 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{addon.name}</h3>
                    <span className="text-primary font-semibold">{addon.price}</span>
                  </div>
                  <p className="text-foreground/70">{addon.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Frequently Asked Questions
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              {
                question: "What's included in the starting price?",
                answer: "Our starting prices include the core features listed in each package. Additional requirements may affect the final price, which we'll discuss during our initial consultation.",
              },
              {
                question: "Do you offer payment plans?",
                answer: "Yes, we offer flexible payment plans for projects over $5,000. Typically, we require a 50% deposit upfront with the remaining balance split across project milestones.",
              },
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary based on scope. Starter packages typically take 2-4 weeks, Growth packages 4-8 weeks, and Enterprise projects are customized based on requirements.",
              },
              {
                question: "What happens after the project is complete?",
                answer: "All packages include post-launch support. We also offer ongoing maintenance packages to keep your site secure, updated, and performing optimally.",
              },
              {
                question: "Can I upgrade my package later?",
                answer: "Absolutely! We can start with a package that fits your current needs and scale up as your business grows. Many of our clients begin with Starter and upgrade to Growth or Enterprise.",
              },
            ].map((faq, index) => (
              <ScrollReveal key={index} delay={index * 50}>
                <div className="bg-background p-6 rounded-xl border border-foreground/10">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-foreground/70">{faq.answer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Not Sure Which Package is Right for You?
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Let's discuss your specific needs and create a custom solution that fits your budget and goals.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-all hover:scale-105"
            >
              Schedule a Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

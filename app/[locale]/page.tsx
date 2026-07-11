import { Link } from '../../i18n/navigation';
import { ScrollReveal } from "../components/scroll-reveal";
import { ContactForm } from "../components/contact-form";
import type { Metadata } from "next";
import { generateBreadcrumbSchema, generateSchemaJsonLd } from "../lib/schema";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `/${locale}` },
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
              <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight md:text-7xl">
                Transform Your
                <span className="text-primary"> Digital Presence</span>
              </h1>
              <p className="text-foreground/70 mb-8 text-xl leading-relaxed md:text-2xl">
                We craft stunning websites and data-driven marketing strategies
                that convert visitors into customers. Experience the power of
                modern digital marketing.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="bg-primary hover:bg-primary-dark rounded-full px-8 py-4 text-center text-lg font-semibold text-white transition-all hover:scale-105"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/services"
                  className="border-foreground/20 hover:border-primary hover:text-primary rounded-full border-2 px-8 py-4 text-center text-lg font-semibold transition-all"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Our Services
              </h2>
              <p className="text-foreground/70 mx-auto max-w-2xl text-xl">
                Comprehensive digital solutions tailored to your business goals
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Web Design */}
            <ScrollReveal delay={100}>
              <div className="bg-background border-foreground/10 hover:border-primary/50 rounded-2xl border p-8 transition-all hover:shadow-xl">
                <div className="bg-primary/10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
                  <svg
                    className="text-primary h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold">
                  Web Design & Development
                </h3>
                <p className="text-foreground/70 mb-4">
                  Custom, responsive websites built with modern frameworks.
                  Fast, accessible, and conversion-optimized designs that
                  represent your brand perfectly.
                </p>
                <ul className="text-foreground/60 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    Custom UI/UX Design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    Responsive Development
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    Performance Optimization
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* SEO */}
            <ScrollReveal delay={200}>
              <div className="bg-background border-foreground/10 hover:border-primary/50 rounded-2xl border p-8 transition-all hover:shadow-xl">
                <div className="bg-primary/10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
                  <svg
                    className="text-primary h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold">SEO Optimization</h3>
                <p className="text-foreground/70 mb-4">
                  Data-driven search engine optimization to improve your
                  visibility and drive organic traffic. We help you rank higher
                  and reach more customers.
                </p>
                <ul className="text-foreground/60 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    Keyword Research
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    On-Page Optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    Technical SEO Audits
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Analytics */}
            <ScrollReveal delay={300}>
              <div className="bg-background border-foreground/10 hover:border-primary/50 rounded-2xl border p-8 transition-all hover:shadow-xl">
                <div className="bg-primary/10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
                  <svg
                    className="text-primary h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold">
                  Analytics & Insights
                </h3>
                <p className="text-foreground/70 mb-4">
                  Comprehensive analytics setup and reporting to track
                  performance, understand user behavior, and make data-driven
                  decisions for growth.
                </p>
                <ul className="text-foreground/60 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    GA4 & Tag Manager
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    Custom Dashboards
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    Conversion Tracking
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                What Our Clients Say
              </h2>
              <p className="text-foreground/70 mx-auto max-w-2xl text-xl">
                Don't just take our word for it. Here's what our clients have to
                say about working with us.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStyle Boutique",
                content:
                  "Elevate Digital transformed our online presence completely. Our conversion rate increased by 150% within three months. Their team is professional, responsive, and truly understands our business needs.",
              },
              {
                name: "Michael Chen",
                role: "Marketing Director, Metro Dental Group",
                content:
                  "The SEO results have been phenomenal. We went from page 5 to top 3 rankings for our main keywords. The team's data-driven approach and regular reporting keep us informed every step of the way.",
              },
              {
                name: "Emily Rodriguez",
                role: "Founder, GreenHome Products",
                content:
                  "Working with Elevate Digital has been a game-changer for our content strategy. Our blog traffic increased by 250% and we're now recognized as thought leaders in our industry.",
              },
            ].map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} delay={index * 100}>
                <div className="bg-background border-foreground/10 hover:border-primary/50 rounded-2xl border p-8 transition-all hover:shadow-xl">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="text-primary h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-foreground/60 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                  Why Choose Us?
                </h2>
                <p className="text-foreground/70 mb-8 text-xl leading-relaxed">
                  We combine creativity with data-driven strategies to deliver
                  results that matter. Our team is dedicated to helping your
                  business succeed in the digital landscape.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                      <svg
                        className="text-primary h-5 w-5"
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
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">
                        Results-Driven Approach
                      </h4>
                      <p className="text-foreground/60">
                        Every decision is backed by data and focused on your
                        business goals.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                      <svg
                        className="text-primary h-5 w-5"
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
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">Modern Technology</h4>
                      <p className="text-foreground/60">
                        We use the latest frameworks and best practices for
                        optimal performance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                      <svg
                        className="text-primary h-5 w-5"
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
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">
                        Dedicated Partnership
                      </h4>
                      <p className="text-foreground/60">
                        We work as an extension of your team, committed to your
                        success.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="from-primary/10 to-primary/5 border-primary/20 rounded-2xl border bg-gradient-to-br p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-primary mb-2 text-4xl font-bold">
                      150+
                    </div>
                    <div className="text-foreground/60">Projects Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary mb-2 text-4xl font-bold">
                      98%
                    </div>
                    <div className="text-foreground/60">
                      Client Satisfaction
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary mb-2 text-4xl font-bold">
                      5+
                    </div>
                    <div className="text-foreground/60">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary mb-2 text-4xl font-bold">
                      24/7
                    </div>
                    <div className="text-foreground/60">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Let's Work Together
              </h2>
              <p className="text-foreground/70 text-xl">
                Ready to transform your digital presence? Get in touch with us
                today.
              </p>
            </div>

            <ContactForm showTitle={false} />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { ScrollReveal } from "../../components/scroll-reveal";
import { ContactForm } from "../../components/contact-form";
import { generateBreadcrumbSchema, generateSchemaJsonLd } from "../../lib/schema";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },
  title: "Contact | Elevate Digital - Get in Touch",
  description:
    "Get in touch with Elevate Digital. We'd love to discuss your project and how we can help transform your digital presence.",
  keywords: [
    "contact",
    "get in touch",
    "start project",
    "consultation",
    "digital marketing services",
  ],
  openGraph: {
    title: "Contact | Elevate Digital",
    description: "Get in touch with Elevate Digital to discuss your project.",
    type: "website",
  },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `/${locale}` },
    { name: "Contact", url: `/${locale}/contact` },
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
                Get in Touch
              </h1>
              <p className="text-foreground/70 mb-8 text-xl leading-relaxed md:text-2xl">
                Ready to transform your digital presence? We'd love to hear
                about your project and discuss how we can help you achieve your
                goals.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Form */}
            <ScrollReveal>
              <ContactForm />
            </ScrollReveal>

            {/* Contact Information */}
            <ScrollReveal delay={200}>
              <div className="space-y-8">
                <div>
                  <h2 className="mb-6 text-3xl font-bold tracking-tight">
                    Contact Information
                  </h2>
                  <p className="text-foreground/70 mb-8">
                    Have questions? Reach out to us directly through any of
                    these channels.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Email</h3>
                      <a
                        href="mailto:hello@elevatedigital.com"
                        className="text-foreground/70 hover:text-primary transition-colors"
                      >
                        hello@elevatedigital.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Phone</h3>
                      <a
                        href="tel:+1234567890"
                        className="text-foreground/70 hover:text-primary transition-colors"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Location</h3>
                      <p className="text-foreground/70">
                        Available worldwide for remote projects
                        <br />
                        San Francisco, CA
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Response Time</h3>
                      <p className="text-foreground/70">
                        We typically respond within 24 hours
                        <br />
                        For urgent matters, please call us directly
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

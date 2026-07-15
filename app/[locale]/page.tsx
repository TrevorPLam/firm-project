import { Link } from '@/i18n/navigation';
import { ScrollReveal } from "../components/scroll-reveal";
import { ContactForm } from "../components/contact-form";
import type { Metadata } from "next";
import { generateBreadcrumbSchema, generateSchemaJsonLd } from "../lib/schema";
import { generateLocaleAlternates } from "../lib/seo-alternates";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const alternates = generateLocaleAlternates(locale, '');

  return {
    alternates,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  if (!hasLocale(routing.locales, locale)) {
    return null;
  }
  setRequestLocale(locale);

  const t = await getTranslations('HomePage');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t('hero.titleHighlight'), url: `/${locale}` },
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
                {t('hero.title')}
                <span className="text-primary"> {t('hero.titleHighlight')}</span>
              </h1>
              <p className="text-foreground/70 mb-8 text-xl leading-relaxed md:text-2xl">
                {t('hero.description')}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="bg-primary hover:bg-primary-dark rounded-full px-8 py-4 text-center text-lg font-semibold text-white transition-all hover:scale-105"
                >
                  {t('hero.startProject')}
                </Link>
                <Link
                  href="/services"
                  className="border-foreground/20 hover:border-primary hover:text-primary rounded-full border-2 px-8 py-4 text-center text-lg font-semibold transition-all"
                >
                  {t('hero.exploreServices')}
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
                {t('services.title')}
              </h2>
              <p className="text-foreground/70 mx-auto max-w-2xl text-xl">
                {t('services.description')}
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
                  {t('services.webDesign.title')}
                </h3>
                <p className="text-foreground/70 mb-4">
                  {t('services.webDesign.description')}
                </p>
                <ul className="text-foreground/60 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    {t('services.webDesign.feature1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    {t('services.webDesign.feature2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    {t('services.webDesign.feature3')}
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
                <h3 className="mb-3 text-2xl font-bold">{t('services.seo.title')}</h3>
                <p className="text-foreground/70 mb-4">
                  {t('services.seo.description')}
                </p>
                <ul className="text-foreground/60 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    {t('services.seo.feature1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    {t('services.seo.feature2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    {t('services.seo.feature3')}
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
                  {t('services.analytics.title')}
                </h3>
                <p className="text-foreground/70 mb-4">
                  {t('services.analytics.description')}
                </p>
                <ul className="text-foreground/60 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    {t('services.analytics.feature1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    {t('services.analytics.feature2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    {t('services.analytics.feature3')}
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
                {t('testimonials.title')}
              </h2>
              <p className="text-foreground/70 mx-auto max-w-2xl text-xl">
                {t('testimonials.description')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: t('testimonials.sarah.name'),
                role: t('testimonials.sarah.role'),
                content: t('testimonials.sarah.content'),
              },
              {
                name: t('testimonials.michael.name'),
                role: t('testimonials.michael.role'),
                content: t('testimonials.michael.content'),
              },
              {
                name: t('testimonials.emily.name'),
                role: t('testimonials.emily.role'),
                content: t('testimonials.emily.content'),
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
                  {t('about.title')}
                </h2>
                <p className="text-foreground/70 mb-8 text-xl leading-relaxed">
                  {t('about.description')}
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
                        {t('about.resultDriven.title')}
                      </h4>
                      <p className="text-foreground/60">
                        {t('about.resultDriven.description')}
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
                      <h4 className="mb-1 font-semibold">{t('about.modernTech.title')}</h4>
                      <p className="text-foreground/60">
                        {t('about.modernTech.description')}
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
                        {t('about.dedicatedPartnership.title')}
                      </h4>
                      <p className="text-foreground/60">
                        {t('about.dedicatedPartnership.description')}
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
                    <div className="text-foreground/60">{t('about.projectsDelivered')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary mb-2 text-4xl font-bold">
                      98%
                    </div>
                    <div className="text-foreground/60">
                      {t('about.clientSatisfaction')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary mb-2 text-4xl font-bold">
                      5+
                    </div>
                    <div className="text-foreground/60">{t('about.yearsExperience')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary mb-2 text-4xl font-bold">
                      24/7
                    </div>
                    <div className="text-foreground/60">{t('about.supportAvailable')}</div>
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
                {t('contact.title')}
              </h2>
              <p className="text-foreground/70 text-xl">
                {t('contact.description')}
              </p>
            </div>

            <ContactForm showTitle={false} />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

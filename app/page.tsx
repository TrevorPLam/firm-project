import Link from "next/link";
import { ScrollReveal } from "./components/scroll-reveal";
import { ContactForm } from "./components/contact-form";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Transform Your
                <span className="text-primary"> Digital Presence</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed">
                We craft stunning websites and data-driven marketing strategies that convert visitors into customers. Experience the power of modern digital marketing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-all hover:scale-105 text-center"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-4 border-2 border-foreground/20 rounded-full font-semibold text-lg hover:border-primary hover:text-primary transition-all text-center"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Our Services
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Comprehensive digital solutions tailored to your business goals
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Web Design */}
            <ScrollReveal delay={100}>
              <div className="bg-background p-8 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-all hover:shadow-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Web Design & Development</h3>
                <p className="text-foreground/70 mb-4">
                  Custom, responsive websites built with modern frameworks. Fast, accessible, and conversion-optimized designs that represent your brand perfectly.
                </p>
                <ul className="space-y-2 text-foreground/60">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Custom UI/UX Design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Responsive Development
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Performance Optimization
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* SEO */}
            <ScrollReveal delay={200}>
              <div className="bg-background p-8 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-all hover:shadow-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">SEO Optimization</h3>
                <p className="text-foreground/70 mb-4">
                  Data-driven search engine optimization to improve your visibility and drive organic traffic. We help you rank higher and reach more customers.
                </p>
                <ul className="space-y-2 text-foreground/60">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Keyword Research
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    On-Page Optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Technical SEO Audits
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Analytics */}
            <ScrollReveal delay={300}>
              <div className="bg-background p-8 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-all hover:shadow-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Analytics & Insights</h3>
                <p className="text-foreground/70 mb-4">
                  Comprehensive analytics setup and reporting to track performance, understand user behavior, and make data-driven decisions for growth.
                </p>
                <ul className="space-y-2 text-foreground/60">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    GA4 & Tag Manager
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Custom Dashboards
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Conversion Tracking
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our clients have to say about working with us.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStyle Boutique",
                content: "Elevate Digital transformed our online presence completely. Our conversion rate increased by 150% within three months. Their team is professional, responsive, and truly understands our business needs.",
              },
              {
                name: "Michael Chen",
                role: "Marketing Director, Metro Dental Group",
                content: "The SEO results have been phenomenal. We went from page 5 to top 3 rankings for our main keywords. The team's data-driven approach and regular reporting keep us informed every step of the way.",
              },
              {
                name: "Emily Rodriguez",
                role: "Founder, GreenHome Products",
                content: "Working with Elevate Digital has been a game-changer for our content strategy. Our blog traffic increased by 250% and we're now recognized as thought leaders in our industry.",
              },
            ].map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} delay={index * 100}>
                <div className="bg-background p-8 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-all hover:shadow-xl">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-primary"
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
                    <div className="text-foreground/60 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Why Choose Us?
                </h2>
                <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                  We combine creativity with data-driven strategies to deliver results that matter. Our team is dedicated to helping your business succeed in the digital landscape.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Results-Driven Approach</h4>
                      <p className="text-foreground/60">Every decision is backed by data and focused on your business goals.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Modern Technology</h4>
                      <p className="text-foreground/60">We use the latest frameworks and best practices for optimal performance.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Dedicated Partnership</h4>
                      <p className="text-foreground/60">We work as an extension of your team, committed to your success.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">150+</div>
                    <div className="text-foreground/60">Projects Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">98%</div>
                    <div className="text-foreground/60">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">5+</div>
                    <div className="text-foreground/60">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-foreground/60">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Let's Work Together
              </h2>
              <p className="text-xl text-foreground/70">
                Ready to transform your digital presence? Get in touch with us today.
              </p>
            </div>

            <ContactForm showTitle={false} />
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}

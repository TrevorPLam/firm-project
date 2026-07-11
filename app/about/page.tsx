import type { Metadata } from "next";
import { ScrollReveal } from "../components/scroll-reveal";

export const metadata: Metadata = {
  title: "About Us | Elevate Digital - Our Story & Team",
  description: "Learn about Elevate Digital's mission, values, and team. We're passionate about helping businesses succeed in the digital landscape.",
  keywords: ["about us", "our team", "company story", "digital agency", "our mission"],
  openGraph: {
    title: "About Us | Elevate Digital",
    description: "Learn about Elevate Digital's mission, values, and team.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                About Us
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed">
                We're a team of digital strategists, designers, and developers passionate about helping businesses succeed in the digital landscape.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold tracking-tight mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                  Elevate Digital was founded with a simple mission: to help businesses of all sizes leverage the power of digital marketing to achieve their goals. We believe that every business deserves access to high-quality digital services that drive real results.
                </p>
                <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                  Over the years, we've worked with startups, small businesses, and enterprises across various industries. Our approach combines creativity with data-driven strategies, ensuring that every project we undertake is both visually stunning and performance-optimized.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  We're not just service providers – we're your partners in digital growth. We take the time to understand your business, your audience, and your goals, crafting customized solutions that deliver measurable outcomes.
                </p>
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

      {/* Our Mission */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed">
                To empower businesses with innovative digital solutions that drive growth, build lasting relationships, and create meaningful impact in the digital world.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "We deliver exceptional quality in every project, ensuring our clients receive the best possible results.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ),
              },
              {
                title: "Innovation",
                description: "We stay ahead of industry trends, leveraging cutting-edge technologies and strategies for our clients.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: "Partnership",
                description: "We work as an extension of your team, building long-term relationships based on trust and mutual success.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 100}>
                <div className="bg-background p-8 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-all hover:shadow-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-foreground/70">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Our Process
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed">
                A proven methodology that ensures success at every stage of your project.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We learn about your business, goals, audience, and challenges to create a solid foundation.",
              },
              {
                step: "02",
                title: "Strategy",
                description: "We develop a comprehensive strategy tailored to your specific needs and objectives.",
              },
              {
                step: "03",
                title: "Execution",
                description: "Our team brings the strategy to life with expert design, development, and implementation.",
              },
              {
                step: "04",
                title: "Optimization",
                description: "We continuously monitor, analyze, and optimize to ensure ongoing success and growth.",
              },
            ].map((item) => (
              <ScrollReveal key={item.step}>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
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
              Let's Work Together
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Ready to transform your digital presence? We'd love to hear about your project.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-all hover:scale-105"
            >
              Get in Touch
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

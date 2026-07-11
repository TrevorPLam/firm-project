import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "../components/scroll-reveal";

export const metadata: Metadata = {
  title: "Our Team | Elevate Digital - Meet the Experts",
  description: "Meet the talented team at Elevate Digital. Our experts specialize in web design, SEO, analytics, and digital marketing strategies.",
  keywords: ["our team", "meet the team", "digital agency team", "web design experts", "SEO specialists"],
  openGraph: {
    title: "Our Team | Elevate Digital",
    description: "Meet the talented team at Elevate Digital.",
    type: "website",
  },
};

const teamMembers = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    bio: "With over 10 years of experience in digital marketing, Sarah leads our strategic vision and ensures every project delivers exceptional results.",
    expertise: ["Strategy", "Business Development", "Team Leadership"],
    image: "/team/sarah.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Lead Developer",
    bio: "Michael specializes in modern web development with expertise in React, Next.js, and performance optimization. He turns complex designs into fast, scalable applications.",
    expertise: ["Web Development", "React/Next.js", "Performance Optimization"],
    image: "/team/michael.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "SEO Strategist",
    bio: "Emily is our SEO expert with a deep understanding of search algorithms and content strategy. She helps clients achieve top rankings and sustainable organic growth.",
    expertise: ["SEO", "Content Strategy", "Analytics"],
    image: "/team/emily.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 4,
    name: "David Park",
    role: "UI/UX Designer",
    bio: "David creates beautiful, intuitive interfaces that delight users and drive conversions. His designs blend aesthetics with functionality for optimal user experiences.",
    expertise: ["UI Design", "UX Research", "Prototyping"],
    image: "/team/david.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 5,
    name: "Jessica Taylor",
    role: "Analytics Lead",
    bio: "Jessica transforms complex data into actionable insights. She specializes in GA4, conversion tracking, and helping clients make data-driven decisions.",
    expertise: ["Analytics", "Data Visualization", "ROI Analysis"],
    image: "/team/jessica.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 6,
    name: "Alex Thompson",
    role: "Content Strategist",
    bio: "Alex crafts compelling content that engages audiences and drives conversions. With a background in journalism and marketing, he tells stories that resonate.",
    expertise: ["Content Marketing", "Copywriting", "Brand Storytelling"],
    image: "/team/alex.jpg",
    linkedin: "#",
    twitter: "#",
  },
];

export default function TeamPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Meet Our Team
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed">
                A diverse group of strategists, designers, and developers passionate about helping businesses succeed in the digital landscape.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 100}>
                <div className="bg-background rounded-2xl border border-foreground/10 hover:border-primary/50 transition-all hover:shadow-xl overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/50">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-sm">Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-foreground/5 text-foreground/60 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <a
                        href={member.linkedin}
                        className="text-foreground/60 hover:text-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href={member.twitter}
                        className="text-foreground/60 hover:text-primary transition-colors"
                        aria-label="Twitter"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Our Culture
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed">
                We believe in continuous learning, collaboration, and pushing the boundaries of what's possible in digital marketing.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Continuous Learning",
                description: "We stay ahead of industry trends through regular training, conferences, and knowledge sharing sessions.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
              {
                title: "Collaboration",
                description: "We work together across disciplines to deliver integrated solutions that exceed client expectations.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                title: "Innovation",
                description: "We experiment with new technologies and approaches to find better solutions for our clients.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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

      {/* CTA Section */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Join Our Team
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              We're always looking for talented individuals who are passionate about digital marketing. Check out our open positions.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-all hover:scale-105"
            >
              View Open Positions
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

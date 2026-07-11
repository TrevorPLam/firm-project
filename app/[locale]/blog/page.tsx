"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { ScrollReveal } from "../../components/scroll-reveal";
import { Link } from '../../../i18n/navigation';
import { getAllPosts } from "../../lib/blog-data";
import { NewsletterForm } from "../../components/newsletter-form";

export const metadata: Metadata = {
  alternates: {
    canonical: "/blog",
  },
  title: "Blog | Elevate Digital - Digital Marketing Insights",
  description:
    "Expert insights on web design, SEO, analytics, and digital marketing strategies. Stay updated with the latest trends and best practices.",
  keywords: [
    "digital marketing blog",
    "SEO tips",
    "web design insights",
    "analytics guides",
    "marketing strategies",
  ],
  openGraph: {
    title: "Blog | Elevate Digital",
    description:
      "Expert insights on web design, SEO, analytics, and digital marketing strategies.",
    type: "website",
  },
};

export default async function BlogPage() {
  cacheLife("days");
  const posts = getAllPosts();
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight md:text-7xl">
                Blog & Insights
              </h1>
              <p className="text-foreground/70 mb-8 text-xl leading-relaxed md:text-2xl">
                Expert insights on web design, SEO, analytics, and digital
                marketing strategies. Stay updated with the latest trends and
                best practices.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 100}>
                <Link href={`/blog/${post.slug}`} className="group">
                  <article className="bg-background border-foreground/10 group-hover:border-primary/50 overflow-hidden rounded-2xl border transition-all group-hover:shadow-xl">
                    <div className="p-8">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-foreground/70 mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="text-foreground/60 flex items-center justify-between text-sm">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Clusters */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                Explore by Topic
              </h2>
              <p className="text-foreground/70 text-xl leading-relaxed">
                Dive deeper into specific areas of digital marketing with our
                curated topic clusters.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Web Design", slug: "web-design", count: 2, icon: "🎨" },
              { name: "SEO", slug: "seo", count: 1, icon: "🔍" },
              { name: "Analytics", slug: "analytics", count: 1, icon: "📊" },
              {
                name: "Digital Marketing",
                slug: "digital-marketing",
                count: 1,
                icon: "🚀",
              },
              {
                name: "Content Strategy",
                slug: "content-strategy",
                count: 1,
                icon: "✍️",
              },
            ].map((topic, index) => (
              <ScrollReveal key={topic.slug} delay={index * 50}>
                <Link
                  href={`/blog?topic=${topic.slug}`}
                  className="bg-background border-foreground/10 hover:border-primary/50 group rounded-xl border p-6 transition-all hover:shadow-lg"
                >
                  <div className="mb-3 text-3xl">{topic.icon}</div>
                  <h3 className="group-hover:text-primary mb-2 text-lg font-bold transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-foreground/60 text-sm">
                    {topic.count} articles
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="from-primary/10 to-primary/5 border-primary/20 rounded-2xl border bg-gradient-to-br p-8 text-center md:p-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Stay Updated
              </h2>
              <p className="text-foreground/70 mb-8 text-xl">
                Subscribe to our newsletter for the latest insights on digital
                marketing, web design, and SEO.
              </p>
              <NewsletterForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

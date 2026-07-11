"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { ScrollReveal } from "../components/scroll-reveal";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/blog",
  },
  title: "Blog | Elevate Digital - Digital Marketing Insights",
  description: "Expert insights on web design, SEO, analytics, and digital marketing strategies. Stay updated with the latest trends and best practices.",
  keywords: ["digital marketing blog", "SEO tips", "web design insights", "analytics guides", "marketing strategies"],
  openGraph: {
    title: "Blog | Elevate Digital",
    description: "Expert insights on web design, SEO, analytics, and digital marketing strategies.",
    type: "website",
  },
};

export default async function BlogPage() {
  cacheLife("days");
  const posts = getAllPosts();
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Blog & Insights
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed">
                Expert insights on web design, SEO, analytics, and digital marketing strategies. Stay updated with the latest trends and best practices.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 100}>
                <Link href={`/blog/${post.slug}`} className="group">
                  <article className="bg-background rounded-2xl border border-foreground/10 group-hover:border-primary/50 transition-all group-hover:shadow-xl overflow-hidden">
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-foreground/70 mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-foreground/60">
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Explore by Topic
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Dive deeper into specific areas of digital marketing with our curated topic clusters.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Web Design", slug: "web-design", count: 2, icon: "🎨" },
              { name: "SEO", slug: "seo", count: 1, icon: "🔍" },
              { name: "Analytics", slug: "analytics", count: 1, icon: "📊" },
              { name: "Digital Marketing", slug: "digital-marketing", count: 1, icon: "🚀" },
              { name: "Content Strategy", slug: "content-strategy", count: 1, icon: "✍️" },
            ].map((topic, index) => (
              <ScrollReveal key={topic.slug} delay={index * 50}>
                <Link
                  href={`/blog?topic=${topic.slug}`}
                  className="bg-background p-6 rounded-xl border border-foreground/10 hover:border-primary/50 transition-all hover:shadow-lg group"
                >
                  <div className="text-3xl mb-3">{topic.icon}</div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-foreground/60 text-sm">{topic.count} articles</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-foreground/70 mb-8">
                Subscribe to our newsletter for the latest insights on digital marketing, web design, and SEO.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-foreground/20 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

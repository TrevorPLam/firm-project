import type { Metadata } from "next";
import { ScrollReveal } from "../../components/scroll-reveal";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SanitizedContent } from "../../components/sanitized-content";
import { getPostBySlug, getAllSlugs, getAllPosts } from "@/lib/blog-data";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    alternates: {
      canonical: `/blog/${slug}`,
    },
    title: `${post.title} | Elevate Digital Blog`,
    description: post.excerpt,
    keywords: [...post.tags, "blog", post.category],
    openGraph: {
      title: `${post.title} | Elevate Digital`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Article Header */}
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-6 text-foreground/60">
                <div className="flex items-center gap-3">
                  {post.author.image ? (
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {post.author.name.split(' ').map(n => n[0]).filter(Boolean).join('')}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-foreground">{post.author.name}</div>
                    <div className="text-sm">{post.author.role}</div>
                  </div>
                </div>
                <div>•</div>
                <div>{post.date}</div>
                <div>•</div>
                <div>{post.readTime}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </article>

      {/* Article Content */}
      <article className="py-20 px-6 bg-foreground/5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <SanitizedContent html={post.content} />
          </ScrollReveal>
        </div>
      </article>

      {/* Tags */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg text-foreground/70 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-background p-8 rounded-2xl border border-foreground/10">
              <div className="flex items-start gap-6">
                {post.author.image ? (
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">
                      {post.author.name.split(' ').map(n => n[0]).filter(Boolean).join('')}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold mb-1">{post.author.name}</h3>
                  <p className="text-primary font-medium mb-3">{post.author.role}</p>
                  <p className="text-foreground/70 mb-4">
                    {post.author.name} is part of the Elevate Digital team, bringing expertise and insights to help businesses succeed in the digital landscape.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <span className="font-semibold">Expertise:</span>
                    <span>Digital Marketing Strategy</span>
                    <span>•</span>
                    <span>Content Creation</span>
                    <span>•</span>
                    <span>Industry Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {getAllPosts()
                .filter((p) => p.slug !== post.slug && p.category === post.category)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="bg-background p-6 rounded-xl border border-foreground/10 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {relatedPost.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-foreground/60 text-sm">{relatedPost.excerpt}</p>
                  </Link>
                ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 bg-foreground/5">
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

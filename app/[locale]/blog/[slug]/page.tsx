import type { Metadata } from "next";
import { ScrollReveal } from "../../../components/scroll-reveal";
import { notFound } from "next/navigation";
import { Link } from '../../../../i18n/navigation';
import Image from "next/image";
import { SanitizedContent } from "../../../components/sanitized-content";
import { NewsletterForm } from "../../../components/newsletter-form";
import { SocialShare } from "../../../components/social-share";
import { getPostBySlug, getAllPosts } from "../../../lib/blog-data";
import { generateBreadcrumbSchema, generateSchemaJsonLd } from "../../../lib/schema";

// Temporarily disabled due to Windows build worker issue
// export async function generateStaticParams() {
//   return getAllSlugs().map((slug) => ({
//     slug,
//   }));
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `/${locale}` },
    { name: "Blog", url: `/${locale}/blog` },
    { name: post.title, url: `/${locale}/blog/${slug}` },
  ]);

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateSchemaJsonLd(breadcrumbSchema),
        }}
      />
      {/* Article Header */}
      <article className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="mb-8">
              <Link
                href="/blog"
                className="text-foreground/60 hover:text-foreground mb-8 inline-flex items-center gap-2 transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Blog
              </Link>
              <div className="mb-4 flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight md:text-6xl">
                {post.title}
              </h1>
              <p className="text-foreground/70 mb-8 text-xl leading-relaxed">
                {post.excerpt}
              </p>
              <div className="text-foreground/60 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    {post.author.image ? (
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                        <span className="text-primary font-semibold">
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .filter(Boolean)
                            .join("")}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="text-foreground font-semibold">
                        {post.author.name}
                      </div>
                      <div className="text-sm">{post.author.role}</div>
                    </div>
                  </div>
                  <div>•</div>
                  <div>{post.date}</div>
                  <div>•</div>
                  <div>{post.readTime}</div>
                </div>
                <SocialShare
                  url={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${slug}`}
                  title={post.title}
                  description={post.excerpt}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </article>

      {/* Article Content */}
      <article className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <SanitizedContent html={post.content} />
          </ScrollReveal>
        </div>
      </article>

      {/* Tags */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-foreground/5 border-foreground/10 text-foreground/70 rounded-lg border px-4 py-2 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Author Bio */}
      <section className="bg-foreground/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="bg-background border-foreground/10 rounded-2xl border p-8">
              <div className="flex items-start gap-6">
                {post.author.image ? (
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-primary/10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary text-2xl font-bold">
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .filter(Boolean)
                        .join("")}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="mb-1 text-xl font-bold">{post.author.name}</h3>
                  <p className="text-primary mb-3 font-medium">
                    {post.author.role}
                  </p>
                  <p className="text-foreground/70 mb-4">
                    {post.author.name} is part of the Elevate Digital team,
                    bringing expertise and insights to help businesses succeed
                    in the digital landscape.
                  </p>
                  <div className="text-foreground/60 flex items-center gap-2 text-sm">
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
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-8 text-3xl font-bold tracking-tight">
              Related Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {getAllPosts()
                .filter(
                  (p) => p.slug !== post.slug && p.category === post.category,
                )
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="bg-background border-foreground/10 hover:border-primary/50 group rounded-xl border p-6 transition-all"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                        {relatedPost.category}
                      </span>
                    </div>
                    <h3 className="group-hover:text-primary mb-2 text-lg font-bold transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-foreground/60 text-sm">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-foreground/5 px-6 py-20">
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

import type { Metadata } from "next";
import { ScrollReveal } from "../../components/scroll-reveal";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sanitizeHtml } from "@/lib/sanitize";

const blogPosts = {
  "web-design-trends-2025": {
    id: 1,
    slug: "web-design-trends-2025",
    title: "10 Web Design Trends to Watch in 2025",
    excerpt: "Explore the latest web design trends that will shape the digital landscape in 2025, from minimalism to advanced interactivity.",
    category: "Web Design",
    date: "January 15, 2025",
    readTime: "5 min read",
    author: {
      name: "David Park",
      role: "UI/UX Designer",
      image: "/team/david.jpg",
    },
    content: `
      <p>As we move into 2025, web design continues to evolve at a rapid pace. Staying ahead of these trends is crucial for businesses looking to maintain a competitive edge in the digital landscape.</p>
      
      <h2>1. Beyond Flat Design</h2>
      <p>Minimalism isn't just about clean lines and white space anymore—it's evolving to feel more dynamic and engaging. Designers are layering in subtle, intentional details to make interfaces feel more alive through microinteractions, strategic color pops, and immersive 3D elements.</p>
      
      <h2>2. Post-Neumorphism</h2>
      <p>Neumorphism is making a subtle comeback—not as full interfaces but in small details like app icons, certain UI components, and marketing websites. The key now is balance: using shadows and bevels thoughtfully to create depth while maintaining clarity.</p>
      
      <h2>3. Motion as Feedback</h2>
      <p>Micro-interactions and motion design are becoming more purposeful. Instead of flashy animations, movement should be about guiding users, improving usability, and providing instant feedback. Subtle hover states, smooth transitions, and responsive gestures make interfaces feel intuitive.</p>
      
      <h2>4. Enhanced Dark Mode</h2>
      <p>Dark mode isn't just a nice-to-have anymore—it's becoming the default in many apps. The focus now is on adaptive contrast, improved readability, and lighting adjustments based on time of day or system settings.</p>
      
      <h2>5. Text-First Interfaces</h2>
      <p>With AI-generated summaries, chat-based interactions, and voice interfaces, text-first design is making a comeback. More products are prioritizing clear, digestible content over heavy visuals.</p>
      
      <h2>6. Expressive Typography</h2>
      <p>Custom typefaces are becoming a bigger investment, with brands embracing more playful fonts that reflect their personality. Expressive typography helps brands stand out and communicate their unique voice.</p>
      
      <h2>7. Sustainable Design</h2>
      <p>As environmental concerns grow, designers are considering the carbon footprint of their digital products. This includes optimizing images, reducing JavaScript, and choosing green hosting providers.</p>
      
      <h2>8. AI-Powered Personalization</h2>
      <p>Artificial intelligence is enabling more personalized user experiences. From dynamic content to adaptive interfaces, AI helps deliver the right content to the right user at the right time.</p>
      
      <h2>9. Accessibility-First Design</h2>
      <p>Accessibility is no longer an afterthought—it's being integrated into the design process from the start. This includes proper color contrast, keyboard navigation, and screen reader compatibility.</p>
      
      <h2>10. Micro-Interactions</h2>
      <p>Small but meaningful animations on components add personality and feedback. From button hover states to loading animations, micro-interactions enhance the user experience without overwhelming the interface.</p>
      
      <h2>Conclusion</h2>
      <p>These trends reflect a broader shift toward more thoughtful, user-centered design. The focus is on creating experiences that are not just visually appealing but also functional, accessible, and sustainable.</p>
    `,
    tags: ["Web Design", "UI/UX", "Trends", "2025"],
  },
  "local-seo-guide": {
    id: 2,
    slug: "local-seo-guide",
    title: "The Complete Guide to SEO for Local Businesses",
    excerpt: "Learn how to optimize your online presence for local search and attract more customers in your area with proven SEO strategies.",
    category: "SEO",
    date: "January 10, 2025",
    readTime: "8 min read",
    author: {
      name: "Emily Rodriguez",
      role: "SEO Strategist",
      image: "/team/emily.jpg",
    },
    content: `
      <p>Local SEO is essential for businesses that serve specific geographic areas. When potential customers search for products or services near them, you want your business to appear at the top of the results.</p>
      
      <h2>Why Local SEO Matters</h2>
      <p>46% of all Google searches are seeking local information. When users search for businesses "near me," they're ready to make a purchase. If your business doesn't appear in these local search results, you're missing out on valuable customers.</p>
      
      <h2>Optimize Your Google Business Profile</h2>
      <p>Your Google Business Profile is the foundation of local SEO. Ensure your profile is complete and accurate:</p>
      <ul>
        <li>Verify your business ownership</li>
        <li>Add accurate NAP (Name, Address, Phone) information</li>
        <li>Choose the right business categories</li>
        <li>Add high-quality photos</li>
        <li>Write a compelling business description</li>
        <li>Set your correct business hours</li>
      </ul>
      
      <h2>Build Local Citations</h2>
      <p>Local citations are mentions of your business on other websites, typically in business directories. Consistent NAP information across the web helps search engines verify your business's legitimacy and location.</p>
      
      <h2>Encourage Customer Reviews</h2>
      <p>Reviews are a critical ranking factor for local SEO. They also influence customer decisions. Encourage satisfied customers to leave reviews and respond to all reviews—both positive and negative.</p>
      
      <h2>Create Local Content</h2>
      <p>Develop content that's relevant to your local audience. This could include blog posts about local events, news, or topics specific to your area. Local content helps establish your relevance to the geographic area you serve.</p>
      
      <h2>Optimize for Mobile</h2>
      <p>Local searches often happen on mobile devices. Ensure your website is mobile-friendly, loads quickly, and provides a seamless experience for users on the go.</p>
      
      <h2>Use Local Schema Markup</h2>
      <p>Schema markup helps search engines understand your business information. Use LocalBusiness schema to provide search engines with structured data about your business, including your location, hours, and contact information.</p>
      
      <h2>Monitor Your Performance</h2>
      <p>Use tools like Google Search Console and Google Business Profile insights to track your local SEO performance. Monitor your rankings, traffic, and customer actions to identify areas for improvement.</p>
      
      <h2>Conclusion</h2>
      <p>Local SEO is an ongoing process, not a one-time setup. By consistently optimizing your online presence for local search, you can attract more customers in your area and grow your business.</p>
    `,
    tags: ["SEO", "Local SEO", "Google Business Profile", "Marketing"],
  },
  "core-web-vitals": {
    id: 3,
    slug: "core-web-vitals",
    title: "Understanding Core Web Vitals and Their Impact",
    excerpt: "Discover why Core Web Vitals matter for SEO and user experience, and how to optimize your website for better performance.",
    category: "Analytics",
    date: "January 5, 2025",
    readTime: "6 min read",
    author: {
      name: "Jessica Taylor",
      role: "Analytics Lead",
      image: "/team/jessica.jpg",
    },
    content: `
      <p>Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience. They're part of Google's page experience signals and directly impact your search rankings.</p>
      
      <h2>What Are Core Web Vitals?</h2>
      <p>Core Web Vitals consist of three specific metrics:</p>
      <ul>
        <li><strong>Largest Contentful Paint (LCP)</strong> - Measures loading performance</li>
        <li><strong>First Input Delay (FID)</strong> - Measures interactivity</li>
        <li><strong>Cumulative Layout Shift (CLS)</strong> - Measures visual stability</li>
      </ul>
      
      <h2>Largest Contentful Paint (LCP)</h2>
      <p>LCP measures the time it takes for the main content of a page to load. A good LCP score is 2.5 seconds or faster. To improve LCP:</p>
      <ul>
        <li>Optimize your images and videos</li>
        <li>Remove unused JavaScript</li>
        <li>Use a CDN</li>
        <li>Implement server-side rendering</li>
        <li>Preload important resources</li>
      </ul>
      
      <h2>First Input Delay (FID)</h2>
      <p>FID measures the time from when a user first interacts with your page to when the browser responds. A good FID score is less than 100 milliseconds. To improve FID:</p>
      <ul>
        <li>Minimize JavaScript execution time</li>
        <li>Break up long tasks</li>
        <li>Use web workers</li>
        <li>Reduce the impact of third-party code</li>
      </ul>
      
      <h2>Cumulative Layout Shift (CLS)</h2>
      <p>CLS measures the visual stability of a page. A good CLS score is less than 0.1. To improve CLS:</p>
      <ul>
        <li>Always include size attributes on images and videos</li>
        <li>Reserve space for dynamic content</li>
        <li>Avoid inserting content above existing content</li>
        <li>Use CSS transforms for animations</li>
      </ul>
      
      <h2>Why Core Web Vitals Matter</h2>
      <p>Core Web Vitals directly impact your search rankings. Google uses them as ranking factors because they reflect the actual user experience. Good Core Web Vitals lead to better user engagement, lower bounce rates, and higher conversion rates.</p>
      
      <h2>How to Measure Core Web Vitals</h2>
      <p>Use tools like Google PageSpeed Insights, Lighthouse, and Search Console to measure your Core Web Vitals. These tools provide detailed reports and recommendations for improvement.</p>
      
      <h2>Conclusion</h2>
      <p>Optimizing for Core Web Vitals is essential for both SEO and user experience. By focusing on these metrics, you can create a faster, more stable, and more engaging website that ranks better in search results.</p>
    `,
    tags: ["Analytics", "Performance", "Core Web Vitals", "SEO"],
  },
  "conversion-landing-pages": {
    id: 4,
    slug: "conversion-landing-pages",
    title: "How to Build a Conversion-Optimized Landing Page",
    excerpt: "Master the art of creating landing pages that convert with our comprehensive guide covering design, copy, and optimization.",
    category: "Web Design",
    date: "December 28, 2024",
    readTime: "7 min read",
    author: {
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      image: "/team/sarah.jpg",
    },
    content: `
      <p>A landing page is often the first interaction a potential customer has with your business. Making a strong first impression and guiding visitors toward conversion is crucial for your marketing success.</p>
      
      <h2>What Makes a Landing Page Convert?</h2>
      <p>High-converting landing pages share several key characteristics:</p>
      <ul>
        <li>Clear value proposition</li>
        <li>Compelling headline and subheadline</li>
        <li>Strong call-to-action (CTA)</li>
        <li>Social proof and trust signals</li>
        <li>Minimal distractions</li>
        <li>Mobile optimization</li>
        <li>Fast loading speed</li>
      </ul>
      
      <h2>Craft a Compelling Headline</h2>
      <p>Your headline is the first thing visitors see. It should clearly communicate your value proposition and capture attention. Keep it concise, benefit-focused, and aligned with your ad or source that brought the visitor to the page.</p>
      
      <h2>Write Persuasive Copy</h2>
      <p>Your copy should focus on benefits, not features. Address your audience's pain points and show how your solution solves them. Use clear, simple language and break up text with subheadings and bullet points for readability.</p>
      
      <h2>Design an Effective CTA</h2>
      <p>Your call-to-action should be prominent, clear, and action-oriented. Use contrasting colors to make it stand out, and place it strategically throughout the page. Test different CTA copy and designs to find what works best.</p>
      
      <h2>Add Social Proof</h2>
      <p>Build trust by including testimonials, reviews, case studies, and client logos. Social proof helps overcome objections and gives visitors confidence in your offering.</p>
      
      <h2>Optimize for Mobile</h2>
      <p>More than half of web traffic comes from mobile devices. Ensure your landing page is fully responsive, with touch-friendly buttons and easy-to-read text on small screens.</p>
      
      <h2>Test and Iterate</h2>
      <p>Use A/B testing to continuously improve your landing page. Test different headlines, copy, designs, and CTAs to find what resonates best with your audience.</p>
      
      <h2>Conclusion</h2>
      <p>Creating a high-converting landing page requires careful planning, compelling copy, and continuous optimization. By focusing on the user experience and testing your assumptions, you can create landing pages that consistently convert visitors into customers.</p>
    `,
    tags: ["Web Design", "Conversion Optimization", "Landing Pages", "Copywriting"],
  },
  "ai-digital-marketing": {
    id: 5,
    slug: "ai-digital-marketing",
    title: "The Future of AI in Digital Marketing",
    excerpt: "Explore how artificial intelligence is transforming digital marketing and what it means for businesses in the coming years.",
    category: "Digital Marketing",
    date: "December 20, 2024",
    readTime: "6 min read",
    author: {
      name: "Alex Thompson",
      role: "Content Strategist",
      image: "/team/alex.jpg",
    },
    content: `
      <p>Artificial intelligence is revolutionizing digital marketing. From personalized content to predictive analytics, AI is enabling marketers to work smarter and deliver better results.</p>
      
      <h2>AI-Powered Personalization</h2>
      <p>AI enables hyper-personalization at scale. By analyzing user behavior, preferences, and demographics, AI can deliver personalized content, product recommendations, and experiences that resonate with individual users.</p>
      
      <h2>Predictive Analytics</h2>
      <p>AI can analyze vast amounts of data to predict future trends and customer behavior. This helps marketers make data-driven decisions, optimize campaigns, and allocate resources more effectively.</p>
      
      <h2>Chatbots and Conversational Marketing</h2>
      <p>AI-powered chatbots provide instant customer support and qualification. They can handle routine inquiries, guide users through the sales funnel, and provide personalized recommendations 24/7.</p>
      
      <h2>Content Creation and Optimization</h2>
      <p>AI tools can assist with content creation, from generating ideas to optimizing copy for SEO. While AI shouldn't replace human creativity, it can significantly streamline the content creation process.</p>
      
      <h2>Programmatic Advertising</h2>
      <p>AI automates the buying and placement of ads, optimizing campaigns in real-time based on performance data. This leads to more efficient ad spend and better targeting.</p>
      
      <h2>Email Marketing Automation</h2>
      <p>AI can optimize email marketing by determining the best send times, personalizing subject lines and content, and segmenting audiences based on behavior and preferences.</p>
      
      <h2>The Human Element</h2>
      <p>While AI offers powerful capabilities, the human element remains crucial. Creativity, empathy, and strategic thinking are areas where humans excel. The best marketing strategies combine AI efficiency with human insight.</p>
      
      <h2>Conclusion</h2>
      <p>AI is transforming digital marketing, but it's a tool to enhance human capabilities, not replace them. By embracing AI while maintaining focus on creativity and customer relationships, businesses can achieve remarkable results.</p>
    `,
    tags: ["AI", "Digital Marketing", "Technology", "Future Trends"],
  },
  "content-strategy-2025": {
    id: 6,
    slug: "content-strategy-2025",
    title: "Content Strategy: Quality vs Quantity in 2025",
    excerpt: "Learn why creating high-quality, valuable content is more important than ever for SEO and audience engagement.",
    category: "Content Strategy",
    date: "December 15, 2024",
    readTime: "5 min read",
    author: {
      name: "Alex Thompson",
      role: "Content Strategist",
      image: "/team/alex.jpg",
    },
    content: `
      <p>In the early days of content marketing, quantity often trumped quality. But as search engines have evolved and audience expectations have risen, the focus has shifted toward creating valuable, high-quality content.</p>
      
      <h2>Why Quality Matters More Than Ever</h2>
      <p>Google's helpful content update prioritizes content that provides genuine value to users. Content that's created primarily for search engines rather than humans is less likely to rank well.</p>
      
      <h2>Characteristics of High-Quality Content</h2>
      <p>High-quality content:</p>
      <ul>
        <li>Addresses the user's search intent</li>
        <li>Provides unique insights or perspectives</li>
        <li>Is well-researched and accurate</li>
        <li>Is easy to read and understand</li>
        <li>Includes original data or examples</li>
        <li>Is comprehensive without being fluff</li>
        <li>Is kept up-to-date</li>
      </ul>
      
      <h2>The Role of Content Length</h2>
      <p>While there's no ideal word count, comprehensive content tends to perform better. Focus on covering the topic thoroughly rather than hitting a specific word count. Short, concise content can be high-quality if it fully addresses the user's needs.</p>
      
      <h2>Content Formats and Variety</h2>
      <p>Diversify your content formats to reach different audience segments. Consider blog posts, videos, infographics, podcasts, and interactive content. Different formats appeal to different learning styles and preferences.</p>
      
      <h2>Content Promotion and Distribution</h2>
      <p>Creating great content is only half the battle. You need a strategy for promoting and distributing your content. Share it on social media, include it in email newsletters, and reach out to influencers and industry publications.</p>
      
      <h2>Measuring Content Success</h2>
      <p>Track metrics that align with your goals: organic traffic, engagement, conversions, and backlinks. Use these insights to refine your content strategy and focus on what works.</p>
      
      <h2>Conclusion</h2>
      <p>In 2025, quality content is more important than ever. By focusing on creating valuable, insightful content that genuinely helps your audience, you'll build trust, authority, and sustainable organic traffic.</p>
    `,
    tags: ["Content Strategy", "SEO", "Quality Content", "Marketing"],
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
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
  const post = blogPosts[slug as keyof typeof blogPosts];

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
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {post.author.name.split(' ').map(n => n[0]).filter(Boolean).join('')}
                    </span>
                  </div>
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
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />
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
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">
                    {post.author.name.split(' ').map(n => n[0]).filter(Boolean).join('')}
                  </span>
                </div>
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
              {Object.values(blogPosts)
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

# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog.spec.ts >> Blog List Page >> should display topic clusters section
- Location: app\e2e\blog.spec.ts:48:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('a[href^="/blog?topic="]')
Expected: 5
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('a[href^="/blog?topic="]')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - link "Elevate Digital" [ref=e6] [cursor=pointer]:
        - /url: /en
      - button "Toggle menu" [ref=e7] [cursor=pointer]:
        - img [ref=e8]
  - main [ref=e10]:
    - generic [ref=e12]:
      - generic [ref=e16]:
        - heading "Blog & Insights" [level=1] [ref=e17]
        - paragraph [ref=e18]: Expert insights on web design, SEO, analytics, and digital marketing strategies. Stay updated with the latest trends and best practices.
      - generic [ref=e21]:
        - link [ref=e23] [cursor=pointer]:
          - /url: /en/blog/web-design-trends-2025
          - article [ref=e24]:
            - generic [ref=e25]:
              - generic [ref=e27]: Web Design
              - heading "10 Web Design Trends to Watch in 2025" [level=3] [ref=e28]
              - paragraph [ref=e29]: Explore the latest web design trends that will shape the digital landscape in 2025, from minimalism to advanced interactivity.
              - generic [ref=e30]:
                - generic [ref=e31]: July 10, 2026
                - generic [ref=e32]: 5 min read
        - link [ref=e34] [cursor=pointer]:
          - /url: /en/blog/local-seo-guide
          - article [ref=e35]:
            - generic [ref=e36]:
              - generic [ref=e38]: SEO
              - heading "The Complete Guide to SEO for Local Businesses" [level=3] [ref=e39]
              - paragraph [ref=e40]: Learn how to optimize your online presence for local search and attract more customers in your area with proven SEO strategies.
              - generic [ref=e41]:
                - generic [ref=e42]: June 15, 2026
                - generic [ref=e43]: 8 min read
        - link [ref=e45] [cursor=pointer]:
          - /url: /en/blog/core-web-vitals
          - article [ref=e46]:
            - generic [ref=e47]:
              - generic [ref=e49]: Analytics
              - heading "Understanding Core Web Vitals and Their Impact" [level=3] [ref=e50]
              - paragraph [ref=e51]: Discover why Core Web Vitals matter for SEO and user experience, and how to optimize your website for better performance.
              - generic [ref=e52]:
                - generic [ref=e53]: May 20, 2026
                - generic [ref=e54]: 6 min read
        - link [ref=e56] [cursor=pointer]:
          - /url: /en/blog/conversion-landing-pages
          - article [ref=e57]:
            - generic [ref=e58]:
              - generic [ref=e60]: Web Design
              - heading "How to Build a Conversion-Optimized Landing Page" [level=3] [ref=e61]
              - paragraph [ref=e62]: Master the art of creating landing pages that convert with our comprehensive guide covering design, copy, and optimization.
              - generic [ref=e63]:
                - generic [ref=e64]: April 28, 2026
                - generic [ref=e65]: 7 min read
        - link [ref=e67] [cursor=pointer]:
          - /url: /en/blog/ai-digital-marketing
          - article [ref=e68]:
            - generic [ref=e69]:
              - generic [ref=e71]: Digital Marketing
              - heading "The Future of AI in Digital Marketing" [level=3] [ref=e72]
              - paragraph [ref=e73]: Explore how artificial intelligence is transforming digital marketing and what it means for businesses in the coming years.
              - generic [ref=e74]:
                - generic [ref=e75]: March 15, 2026
                - generic [ref=e76]: 6 min read
        - link [ref=e78] [cursor=pointer]:
          - /url: /en/blog/content-strategy-2025
          - article [ref=e79]:
            - generic [ref=e80]:
              - generic [ref=e82]: Content Strategy
              - 'heading "Content Strategy: Quality vs Quantity in 2025" [level=3] [ref=e83]'
              - paragraph [ref=e84]: Learn why creating high-quality, valuable content is more important than ever for SEO and audience engagement.
              - generic [ref=e85]:
                - generic [ref=e86]: February 10, 2026
                - generic [ref=e87]: 5 min read
      - generic [ref=e89]:
        - generic [ref=e91]:
          - heading "Explore by Topic" [level=2] [ref=e92]
          - paragraph [ref=e93]: Dive deeper into specific areas of digital marketing with our curated topic clusters.
        - generic [ref=e94]:
          - link "🎨 Web Design 2 articles" [ref=e96] [cursor=pointer]:
            - /url: /en/blog?topic=web-design
            - generic [ref=e97]: 🎨
            - heading "Web Design" [level=3] [ref=e98]
            - paragraph [ref=e99]: 2 articles
          - link "🔍 SEO 1 articles" [ref=e101] [cursor=pointer]:
            - /url: /en/blog?topic=seo
            - generic [ref=e102]: 🔍
            - heading "SEO" [level=3] [ref=e103]
            - paragraph [ref=e104]: 1 articles
          - link "📊 Analytics 1 articles" [ref=e106] [cursor=pointer]:
            - /url: /en/blog?topic=analytics
            - generic [ref=e107]: 📊
            - heading "Analytics" [level=3] [ref=e108]
            - paragraph [ref=e109]: 1 articles
          - link "🚀 Digital Marketing 1 articles" [ref=e111] [cursor=pointer]:
            - /url: /en/blog?topic=digital-marketing
            - generic [ref=e112]: 🚀
            - heading "Digital Marketing" [level=3] [ref=e113]
            - paragraph [ref=e114]: 1 articles
          - link "✍️ Content Strategy 1 articles" [ref=e116] [cursor=pointer]:
            - /url: /en/blog?topic=content-strategy
            - generic [ref=e117]: ✍️
            - heading "Content Strategy" [level=3] [ref=e118]
            - paragraph [ref=e119]: 1 articles
      - generic [ref=e123]:
        - heading "Stay Updated" [level=2] [ref=e124]
        - paragraph [ref=e125]: Subscribe to our newsletter for the latest insights on digital marketing, web design, and SEO.
        - generic [ref=e127]:
          - textbox "Enter your email" [ref=e128]
          - button "Subscribe" [ref=e129] [cursor=pointer]
          - generic [ref=e130]:
            - text: Leave this blank
            - textbox [ref=e131]
  - contentinfo [ref=e132]:
    - generic [ref=e133]:
      - generic [ref=e134]:
        - generic [ref=e135]:
          - generic [ref=e136]: Elevate Digital
          - paragraph [ref=e137]: Transform your digital presence with expert web design, SEO, and analytics services. We create experiences that convert visitors into customers.
        - generic [ref=e138]:
          - heading "Quick Links" [level=4] [ref=e139]
          - list [ref=e140]:
            - listitem [ref=e141]:
              - link "Services" [ref=e142] [cursor=pointer]:
                - /url: /en/services
            - listitem [ref=e143]:
              - link "About" [ref=e144] [cursor=pointer]:
                - /url: /en/about
            - listitem [ref=e145]:
              - link "Portfolio" [ref=e146] [cursor=pointer]:
                - /url: /en/portfolio
            - listitem [ref=e147]:
              - link "Pricing" [ref=e148] [cursor=pointer]:
                - /url: /en/pricing
            - listitem [ref=e149]:
              - link "Blog" [ref=e150] [cursor=pointer]:
                - /url: /en/blog
            - listitem [ref=e151]:
              - link "Contact" [ref=e152] [cursor=pointer]:
                - /url: /en/contact
        - generic [ref=e153]:
          - heading "Legal" [level=4] [ref=e154]
          - list [ref=e155]:
            - listitem [ref=e156]:
              - link "Privacy Policy" [ref=e157] [cursor=pointer]:
                - /url: /en/legal/privacy
            - listitem [ref=e158]:
              - link "Terms of Service" [ref=e159] [cursor=pointer]:
                - /url: /en/legal/terms
        - generic [ref=e160]:
          - heading "Follow Us" [level=4] [ref=e161]
          - generic [ref=e162]:
            - link "Follow us on Twitter/X" [ref=e163] [cursor=pointer]:
              - /url: https://twitter.com/elevatedigital
              - img [ref=e164]
            - link "Follow us on LinkedIn" [ref=e166] [cursor=pointer]:
              - /url: https://linkedin.com/company/elevatedigital
              - img [ref=e167]
            - link "Follow us on Instagram" [ref=e169] [cursor=pointer]:
              - /url: https://instagram.com/elevatedigital
              - img [ref=e170]
      - generic [ref=e173]: © 2026 Elevate Digital. All rights reserved.
  - alert [ref=e174]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Blog List Page', () => {
  4  |   test('should render blog list with post titles and categories', async ({ page }) => {
  5  |     await page.goto('/en/blog');
  6  |     
  7  |     // Verify page title
  8  |     await expect(page).toHaveTitle(/Blog/);
  9  |     
  10 |     // Verify hero section
  11 |     const hero = page.locator('h1');
  12 |     await expect(hero).toContainText('Blog & Insights');
  13 |     
  14 |     // Verify blog cards are rendered
  15 |     const blogCards = page.locator('article');
  16 |     await expect(blogCards).toHaveCount(6);
  17 |     
  18 |     // Verify first post has title and category
  19 |     const firstCard = blogCards.first();
  20 |     const title = firstCard.locator('h3');
  21 |     await expect(title).toBeVisible();
  22 |     
  23 |     const category = firstCard.locator('span').first();
  24 |     await expect(category).toBeVisible();
  25 |   });
  26 | 
  27 |   test('should display post metadata (date and read time)', async ({ page }) => {
  28 |     await page.goto('/en/blog');
  29 |     
  30 |     const firstCard = page.locator('article').first();
  31 |     
  32 |     // Verify date and read time are displayed
  33 |     const metadata = firstCard.locator('.text-foreground\\/60');
  34 |     await expect(metadata).toBeVisible();
  35 |   });
  36 | 
  37 |   test('should have working links to blog posts', async ({ page }) => {
  38 |     await page.goto('/en/blog');
  39 |     
  40 |     // Click first blog post link
  41 |     const firstLink = page.locator('a[href^="/blog/"]').first();
  42 |     await firstLink.click();
  43 |     
  44 |     // Verify navigation to detail page
  45 |     await expect(page).toHaveURL(/\/blog\/[\w-]+$/);
  46 |   });
  47 | 
  48 |   test('should display topic clusters section', async ({ page }) => {
  49 |     await page.goto('/en/blog');
  50 |     
  51 |     // Verify topic clusters heading
  52 |     const topicHeading = page.getByRole('heading', { name: 'Explore by Topic' });
  53 |     await expect(topicHeading).toBeVisible();
  54 |     
  55 |     // Verify topic cards are present
  56 |     const topicCards = page.locator('a[href^="/blog?topic="]');
> 57 |     await expect(topicCards).toHaveCount(5);
     |                              ^ Error: expect(locator).toHaveCount(expected) failed
  58 |   });
  59 | });
  60 | 
```
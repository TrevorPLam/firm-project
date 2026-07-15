# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog-detail.spec.ts >> Blog Detail Page >> should display category badge
- Location: app\e2e\blog-detail.spec.ts:44:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('span.bg-primary\\/10')
Expected substring: "Web Design"
Error: strict mode violation: locator('span.bg-primary\\/10') resolved to 2 elements:
    1) <span class="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">Web Design</span> aka getByText('Web Design').first()
    2) <span class="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">Web Design</span> aka getByRole('link', { name: 'Web Design How to Build a' })

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('span.bg-primary\\/10')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2]:
    - /url: "#main-content"
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - link "Elevate Digital" [ref=e6]:
        - /url: /en
      - button "Toggle menu" [ref=e7] [cursor=pointer]:
        - img [ref=e8]
  - main [ref=e10]:
    - generic [ref=e12]:
      - article [ref=e13]:
        - generic [ref=e16]:
          - link "Back to Blog" [ref=e17]:
            - /url: /en/blog
            - img [ref=e18]
            - text: Back to Blog
          - generic [ref=e21]: Web Design
          - heading "10 Web Design Trends to Watch in 2025" [level=1] [ref=e22]
          - paragraph [ref=e23]: Explore the latest web design trends that will shape the digital landscape in 2025, from minimalism to advanced interactivity.
          - generic [ref=e24]:
            - generic [ref=e25]:
              - generic [ref=e26]:
                - generic [ref=e28]: DP
                - generic [ref=e29]:
                  - generic [ref=e30]: David Park
                  - generic [ref=e31]: UI/UX Designer
              - generic [ref=e32]: •
              - generic [ref=e33]: July 10, 2026
              - generic [ref=e34]: •
              - generic [ref=e35]: 5 min read
            - generic [ref=e36]:
              - generic [ref=e37]: "Share:"
              - button "Share on Twitter/X" [ref=e38] [cursor=pointer]:
                - img [ref=e39]
              - button "Share on Facebook" [ref=e41] [cursor=pointer]:
                - img [ref=e42]
              - button "Share on LinkedIn" [ref=e44] [cursor=pointer]:
                - img [ref=e45]
              - button "Share via email" [ref=e47] [cursor=pointer]:
                - img [ref=e48]
      - article [ref=e50]:
        - generic [ref=e53]:
          - paragraph [ref=e54]: As we move into 2025, web design continues to evolve at a rapid pace. Staying ahead of these trends is crucial for businesses looking to maintain a competitive edge in the digital landscape.
          - heading "1. Beyond Flat Design" [level=2] [ref=e55]
          - paragraph [ref=e56]: Minimalism isn't just about clean lines and white space anymore—it's evolving to feel more dynamic and engaging. Designers are layering in subtle, intentional details to make interfaces feel more alive through microinteractions, strategic color pops, and immersive 3D elements.
          - heading "2. Post-Neumorphism" [level=2] [ref=e57]
          - paragraph [ref=e58]: "Neumorphism is making a subtle comeback—not as full interfaces but in small details like app icons, certain UI components, and marketing websites. The key now is balance: using shadows and bevels thoughtfully to create depth while maintaining clarity."
          - heading "3. Motion as Feedback" [level=2] [ref=e59]
          - paragraph [ref=e60]: Micro-interactions and motion design are becoming more purposeful. Instead of flashy animations, movement should be about guiding users, improving usability, and providing instant feedback. Subtle hover states, smooth transitions, and responsive gestures make interfaces feel intuitive.
          - heading "4. Enhanced Dark Mode" [level=2] [ref=e61]
          - paragraph [ref=e62]: Dark mode isn't just a nice-to-have anymore—it's becoming the default in many apps. The focus now is on adaptive contrast, improved readability, and lighting adjustments based on time of day or system settings.
          - heading "5. Text-First Interfaces" [level=2] [ref=e63]
          - paragraph [ref=e64]: With AI-generated summaries, chat-based interactions, and voice interfaces, text-first design is making a comeback. More products are prioritizing clear, digestible content over heavy visuals.
          - heading "6. Expressive Typography" [level=2] [ref=e65]
          - paragraph [ref=e66]: Custom typefaces are becoming a bigger investment, with brands embracing more playful fonts that reflect their personality. Expressive typography helps brands stand out and communicate their unique voice.
          - heading "7. Sustainable Design" [level=2] [ref=e67]
          - paragraph [ref=e68]: As environmental concerns grow, designers are considering the carbon footprint of their digital products. This includes optimizing images, reducing JavaScript, and choosing green hosting providers.
          - heading "8. AI-Powered Personalization" [level=2] [ref=e69]
          - paragraph [ref=e70]: Artificial intelligence is enabling more personalized user experiences. From dynamic content to adaptive interfaces, AI helps deliver the right content to the right user at the right time.
          - heading "9. Accessibility-First Design" [level=2] [ref=e71]
          - paragraph [ref=e72]: Accessibility is no longer an afterthought—it's being integrated into the design process from the start. This includes proper color contrast, keyboard navigation, and screen reader compatibility.
          - heading "10. Micro-Interactions" [level=2] [ref=e73]
          - paragraph [ref=e74]: Small but meaningful animations on components add personality and feedback. From button hover states to loading animations, micro-interactions enhance the user experience without overwhelming the interface.
          - heading "Conclusion" [level=2] [ref=e75]
          - paragraph [ref=e76]: These trends reflect a broader shift toward more thoughtful, user-centered design. The focus is on creating experiences that are not just visually appealing but also functional, accessible, and sustainable.
      - generic [ref=e80]:
        - generic [ref=e81]: Web Design
        - generic [ref=e82]: UI/UX
        - generic [ref=e83]: Trends
        - generic [ref=e84]: "2025"
      - generic [ref=e89]:
        - generic [ref=e91]: DP
        - generic [ref=e92]:
          - heading "David Park" [level=3] [ref=e93]
          - paragraph [ref=e94]: UI/UX Designer
          - paragraph [ref=e95]: David Park is part of the Elevate Digital team, bringing expertise and insights to help businesses succeed in the digital landscape.
          - generic [ref=e96]:
            - generic [ref=e97]: "Expertise:"
            - generic [ref=e98]: Digital Marketing Strategy
            - generic [ref=e99]: •
            - generic [ref=e100]: Content Creation
            - generic [ref=e101]: •
            - generic [ref=e102]: Industry Analysis
      - generic [ref=e105]:
        - heading "Related Articles" [level=2] [ref=e106]
        - link "Web Design How to Build a Conversion-Optimized Landing Page Master the art of creating landing pages that convert with our comprehensive guide covering design, copy, and optimization." [ref=e108]:
          - /url: /en/blog/conversion-landing-pages
          - generic [ref=e110]: Web Design
          - heading "How to Build a Conversion-Optimized Landing Page" [level=3] [ref=e111]
          - paragraph [ref=e112]: Master the art of creating landing pages that convert with our comprehensive guide covering design, copy, and optimization.
      - generic [ref=e116]:
        - heading "Stay Updated" [level=2] [ref=e117]
        - paragraph [ref=e118]: Subscribe to our newsletter for the latest insights on digital marketing, web design, and SEO.
        - generic [ref=e120]:
          - textbox "Enter your email" [ref=e121]
          - button "Subscribe" [ref=e122] [cursor=pointer]
          - generic [ref=e123]:
            - text: Leave this blank
            - textbox [ref=e124]
  - contentinfo [ref=e125]:
    - generic [ref=e126]:
      - generic [ref=e127]:
        - generic [ref=e128]:
          - generic [ref=e129]: Elevate Digital
          - paragraph [ref=e130]: Transform your digital presence with expert web design, SEO, and analytics services. We create experiences that convert visitors into customers.
        - generic [ref=e131]:
          - heading "Quick Links" [level=4] [ref=e132]
          - list [ref=e133]:
            - listitem [ref=e134]:
              - link "Services" [ref=e135]:
                - /url: /en/services
            - listitem [ref=e136]:
              - link "About" [ref=e137]:
                - /url: /en/about
            - listitem [ref=e138]:
              - link "Portfolio" [ref=e139]:
                - /url: /en/portfolio
            - listitem [ref=e140]:
              - link "Pricing" [ref=e141]:
                - /url: /en/pricing
            - listitem [ref=e142]:
              - link "Blog" [ref=e143]:
                - /url: /en/blog
            - listitem [ref=e144]:
              - link "Contact" [ref=e145]:
                - /url: /en/contact
        - generic [ref=e146]:
          - heading "Legal" [level=4] [ref=e147]
          - list [ref=e148]:
            - listitem [ref=e149]:
              - link "Privacy Policy" [ref=e150]:
                - /url: /en/legal/privacy
            - listitem [ref=e151]:
              - link "Terms of Service" [ref=e152]:
                - /url: /en/legal/terms
        - generic [ref=e153]:
          - heading "Follow Us" [level=4] [ref=e154]
          - generic [ref=e155]:
            - link "Follow us on Twitter/X" [ref=e156]:
              - /url: https://twitter.com/elevatedigital
              - img [ref=e157]
            - link "Follow us on LinkedIn" [ref=e159]:
              - /url: https://linkedin.com/company/elevatedigital
              - img [ref=e160]
            - link "Follow us on Instagram" [ref=e162]:
              - /url: https://instagram.com/elevatedigital
              - img [ref=e163]
      - generic [ref=e166]: © 2026 Elevate Digital. All rights reserved.
  - alert [ref=e167]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Blog Detail Page', () => {
  4  |   test('should render blog post title and content', async ({ page }) => {
  5  |     // Navigate to a specific blog post
  6  |     await page.goto('/en/blog/web-design-trends-2025');
  7  |     
  8  |     // Verify page title includes post title
  9  |     await expect(page).toHaveTitle(/Web Design Trends/);
  10 |     
  11 |     // Verify post title is visible
  12 |     const postTitle = page.locator('h1');
  13 |     await expect(postTitle).toContainText('Web Design Trends');
  14 |     await expect(postTitle).toBeVisible();
  15 |     
  16 |     // Verify post content is rendered
  17 |     const content = page.locator('article');
  18 |     await expect(content).toBeVisible();
  19 |   });
  20 | 
  21 |   test('should display author information', async ({ page }) => {
  22 |     await page.goto('/en/blog/web-design-trends-2025');
  23 |     
  24 |     // Verify author name is visible
  25 |     const authorName = page.getByText('David Park');
  26 |     await expect(authorName).toBeVisible();
  27 |     
  28 |     // Verify author role is visible
  29 |     const authorRole = page.getByText('UI/UX Designer');
  30 |     await expect(authorRole).toBeVisible();
  31 |   });
  32 | 
  33 |   test('should display post metadata (date and read time)', async ({ page }) => {
  34 |     await page.goto('/en/blog/web-design-trends-2025');
  35 |     
  36 |     // Verify date is displayed
  37 |     const metadata = page.locator('.text-foreground\\/60');
  38 |     await expect(metadata).toContainText('July 10, 2026');
  39 |     
  40 |     // Verify read time is displayed
  41 |     await expect(metadata).toContainText('5 min read');
  42 |   });
  43 | 
  44 |   test('should display category badge', async ({ page }) => {
  45 |     await page.goto('/en/blog/web-design-trends-2025');
  46 |     
  47 |     // Verify category badge is visible
  48 |     const category = page.locator('span.bg-primary\\/10');
> 49 |     await expect(category).toContainText('Web Design');
     |                            ^ Error: expect(locator).toContainText(expected) failed
  50 |     await expect(category).toBeVisible();
  51 |   });
  52 | 
  53 |   test('should display tags', async ({ page }) => {
  54 |     await page.goto('/en/blog/web-design-trends-2025');
  55 |     
  56 |     // Verify tags section exists
  57 |     const tagsSection = page.getByRole('heading', { name: 'Services' });
  58 |     await expect(tagsSection).toBeVisible();
  59 |     
  60 |     // Verify tags are displayed
  61 |     const tags = page.locator('.bg-foreground\\/5 span');
  62 |     await expect(tags.first()).toBeVisible();
  63 |   });
  64 | 
  65 |   test('should have back to blog link', async ({ page }) => {
  66 |     await page.goto('/en/blog/web-design-trends-2025');
  67 |     
  68 |     // Verify back link exists
  69 |     const backLink = page.getByRole('link', { name: 'Back to Blog' });
  70 |     await expect(backLink).toBeVisible();
  71 |     
  72 |     // Click back link and verify navigation
  73 |     await backLink.click();
  74 |     await expect(page).toHaveURL('/en/blog');
  75 |   });
  76 | 
  77 |   test('should render HTML content correctly', async ({ page }) => {
  78 |     await page.goto('/en/blog/web-design-trends-2025');
  79 |     
  80 |     // Verify content contains headings
  81 |     const headings = page.locator('article h2');
  82 |     await expect(headings.first()).toBeVisible();
  83 |     
  84 |     // Verify content contains paragraphs
  85 |     const paragraphs = page.locator('article p');
  86 |     await expect(paragraphs.first()).toBeVisible();
  87 |   });
  88 | });
  89 | 
```
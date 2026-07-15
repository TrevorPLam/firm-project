# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home-page.spec.ts >> Home Page >> should navigate to services page
- Location: app\e2e\home-page.spec.ts:15:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:3000/services"
Received: "http://localhost:3000/en/services"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    - unexpected value "http://localhost:3000/en"
    12 × unexpected value "http://localhost:3000/en/services"

```

```yaml
- link "Skip to main content":
  - /url: "#main-content"
- navigation:
  - link "Elevate Digital":
    - /url: /en
  - button "Toggle menu":
    - img
- main:
  - heading "Our Services" [level=1]
  - paragraph: Comprehensive digital solutions tailored to your business goals. We combine creativity with data-driven strategies to deliver measurable results.
  - img
  - heading "Web Design & Development" [level=2]
  - paragraph: Custom, responsive websites built with modern frameworks. We create fast, accessible, and conversion-optimized designs that perfectly represent your brand and drive business results.
  - heading "What's Included:" [level=3]
  - list:
    - listitem: Custom UI/UX Design tailored to your brand
    - listitem: Responsive development for all devices
    - listitem: Performance optimization (Core Web Vitals)
    - listitem: Accessibility compliance (WCAG 2.2)
    - listitem: CMS integration for easy content management
    - listitem: E-commerce solutions when needed
    - listitem: Ongoing maintenance and support
  - heading "Our Process" [level=3]
  - text: "01"
  - heading "Discovery" [level=4]
  - paragraph: Understanding your goals, audience, and requirements
  - text: "02"
  - heading "Design" [level=4]
  - paragraph: Creating wireframes and visual designs
  - text: "03"
  - heading "Development" [level=4]
  - paragraph: Building with modern frameworks and best practices
  - text: "04"
  - heading "Launch" [level=4]
  - paragraph: Deployment, testing, and optimization
  - heading "SEO Strategy" [level=3]
  - text: "01"
  - heading "Audit" [level=4]
  - paragraph: Comprehensive technical and content SEO audit
  - text: "02"
  - heading "Research" [level=4]
  - paragraph: Keyword research and competitor analysis
  - text: "03"
  - heading "Optimize" [level=4]
  - paragraph: On-page and technical SEO implementation
  - text: "04"
  - heading "Grow" [level=4]
  - paragraph: Content strategy and link building
  - img
  - heading "SEO Optimization" [level=2]
  - paragraph: Data-driven search engine optimization to improve your visibility and drive organic traffic. We help you rank higher and reach more customers with proven strategies.
  - heading "What's Included:" [level=3]
  - list:
    - listitem: Comprehensive SEO audit and strategy
    - listitem: Keyword research and competitor analysis
    - listitem: On-page optimization (meta tags, content, structure)
    - listitem: Technical SEO (site speed, mobile, schema markup)
    - listitem: Content strategy and optimization
    - listitem: Local SEO for regional businesses
    - listitem: Performance tracking and reporting
  - img
  - heading "Analytics & Insights" [level=2]
  - paragraph: Comprehensive analytics setup and reporting to track performance, understand user behavior, and make data-driven decisions for sustainable growth.
  - heading "What's Included:" [level=3]
  - list:
    - listitem: GA4 and Google Tag Manager setup
    - listitem: Custom dashboard creation and configuration
    - listitem: Conversion tracking and goal setup
    - listitem: User behavior analysis and heatmaps
    - listitem: Regular performance reports and insights
    - listitem: A/B testing recommendations
    - listitem: ROI measurement and optimization
  - heading "Key Metrics We Track" [level=3]
  - img
  - heading "Traffic Sources" [level=4]
  - paragraph: Where your visitors come from
  - img
  - heading "User Behavior" [level=4]
  - paragraph: How users interact with your site
  - img
  - heading "Conversion Rates" [level=4]
  - paragraph: Percentage of visitors who convert
  - img
  - heading "Bounce Rate" [level=4]
  - paragraph: Single-page session percentage
  - img
  - heading "Page Performance" [level=4]
  - paragraph: Which pages perform best
  - img
  - heading "ROI Analysis" [level=4]
  - paragraph: Return on marketing investment
  - heading "Ready to Get Started?" [level=2]
  - paragraph: Let's discuss how our services can help transform your digital presence and drive business growth.
  - link "Get in Touch":
    - /url: /en/contact
- contentinfo:
  - text: Elevate Digital
  - paragraph: Transform your digital presence with expert web design, SEO, and analytics services. We create experiences that convert visitors into customers.
  - heading "Quick Links" [level=4]
  - list:
    - listitem:
      - link "Services":
        - /url: /en/services
    - listitem:
      - link "About":
        - /url: /en/about
    - listitem:
      - link "Portfolio":
        - /url: /en/portfolio
    - listitem:
      - link "Pricing":
        - /url: /en/pricing
    - listitem:
      - link "Blog":
        - /url: /en/blog
    - listitem:
      - link "Contact":
        - /url: /en/contact
  - heading "Legal" [level=4]
  - list:
    - listitem:
      - link "Privacy Policy":
        - /url: /en/legal/privacy
    - listitem:
      - link "Terms of Service":
        - /url: /en/legal/terms
  - heading "Follow Us" [level=4]
  - link "Follow us on Twitter/X":
    - /url: https://twitter.com/elevatedigital
    - img
  - link "Follow us on LinkedIn":
    - /url: https://linkedin.com/company/elevatedigital
    - img
  - link "Follow us on Instagram":
    - /url: https://instagram.com/elevatedigital
    - img
  - text: © 2026 Elevate Digital. All rights reserved.
- alert: Services | Elevate Digital
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Home Page', () => {
  4  |   test('should load successfully', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     await expect(page).toHaveTitle(/Elevate Digital/);
  7  |   });
  8  | 
  9  |   test('should display hero section', async ({ page }) => {
  10 |     await page.goto('/');
  11 |     const hero = page.locator('h1');
  12 |     await expect(hero).toContainText('Transform Your Digital Presence');
  13 |   });
  14 | 
  15 |   test('should navigate to services page', async ({ page }) => {
  16 |     await page.goto('/');
  17 |     const servicesLink = page.getByRole('link', { name: 'Services' });
  18 |     await servicesLink.click();
> 19 |     await expect(page).toHaveURL('/services');
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  20 |   });
  21 | 
  22 |   test('should navigate to contact page', async ({ page }) => {
  23 |     await page.goto('/');
  24 |     const contactLink = page.getByRole('link', { name: 'Contact' });
  25 |     await contactLink.click();
  26 |     await expect(page).toHaveURL('/contact');
  27 |   });
  28 | 
  29 |   test('should display contact form', async ({ page }) => {
  30 |     await page.goto('/');
  31 |     const contactButton = page.getByRole('button', { name: 'Start Your Project' });
  32 |     await contactButton.click();
  33 |     await expect(page).toHaveURL('/contact');
  34 |     
  35 |     const form = page.locator('form');
  36 |     await expect(form).toBeVisible();
  37 |   });
  38 | });
  39 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home-page.spec.ts >> Home Page >> should display contact form
- Location: app\e2e\home-page.spec.ts:29:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Start Your Project' })

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
      - generic [ref=e16]:
        - heading "Transform Your Digital Presence" [level=1] [ref=e17]:
          - text: Transform Your
          - generic [ref=e18]: Digital Presence
        - paragraph [ref=e19]: We craft stunning websites and data-driven marketing strategies that convert visitors into customers. Experience the power of modern digital marketing.
        - generic [ref=e20]:
          - link "Start Your Project" [ref=e21]:
            - /url: /en/contact
          - link "Explore Services" [ref=e22]:
            - /url: /en/services
      - generic [ref=e24]:
        - generic [ref=e26]:
          - heading "Our Services" [level=2] [ref=e27]
          - paragraph [ref=e28]: Comprehensive digital solutions tailored to your business goals
        - generic [ref=e29]:
          - generic [ref=e31]:
            - img [ref=e33]
            - heading "Web Design & Development" [level=3] [ref=e35]
            - paragraph [ref=e36]: Custom, responsive websites built with modern frameworks. Fast, accessible, and conversion-optimized designs that represent your brand perfectly.
            - list [ref=e37]:
              - listitem [ref=e38]: Custom UI/UX Design
              - listitem [ref=e40]: Responsive Development
              - listitem [ref=e42]: Performance Optimization
          - generic [ref=e45]:
            - img [ref=e47]
            - heading "SEO Optimization" [level=3] [ref=e49]
            - paragraph [ref=e50]: Data-driven search engine optimization to improve your visibility and drive organic traffic. We help you rank higher and reach more customers.
            - list [ref=e51]:
              - listitem [ref=e52]: Keyword Research
              - listitem [ref=e54]: On-Page Optimization
              - listitem [ref=e56]: Technical SEO Audits
          - generic [ref=e59]:
            - img [ref=e61]
            - heading "Analytics & Insights" [level=3] [ref=e63]
            - paragraph [ref=e64]: Comprehensive analytics setup and reporting to track performance, understand user behavior, and make data-driven decisions for growth.
            - list [ref=e65]:
              - listitem [ref=e66]: GA4 & Tag Manager
              - listitem [ref=e68]: Custom Dashboards
              - listitem [ref=e70]: Conversion Tracking
      - generic [ref=e73]:
        - generic [ref=e75]:
          - heading "What Our Clients Say" [level=2] [ref=e76]
          - paragraph [ref=e77]: Don't just take our word for it. Here's what our clients have to say about working with us.
        - generic [ref=e78]:
          - generic [ref=e80]:
            - generic [ref=e81]:
              - img [ref=e82]
              - img [ref=e84]
              - img [ref=e86]
              - img [ref=e88]
              - img [ref=e90]
            - paragraph [ref=e92]: "\"Elevate Digital transformed our online presence completely. Our conversion rate increased by 150% within three months. Their team is professional, responsive, and truly understands our business needs.\""
            - generic [ref=e93]:
              - generic [ref=e94]: Sarah Johnson
              - generic [ref=e95]: CEO, TechStyle Boutique
          - generic [ref=e97]:
            - generic [ref=e98]:
              - img [ref=e99]
              - img [ref=e101]
              - img [ref=e103]
              - img [ref=e105]
              - img [ref=e107]
            - paragraph [ref=e109]: "\"The SEO results have been phenomenal. We went from page 5 to top 3 rankings for our main keywords. The team's data-driven approach and regular reporting keep us informed every step of the way.\""
            - generic [ref=e110]:
              - generic [ref=e111]: Michael Chen
              - generic [ref=e112]: Marketing Director, Metro Dental Group
          - generic [ref=e114]:
            - generic [ref=e115]:
              - img [ref=e116]
              - img [ref=e118]
              - img [ref=e120]
              - img [ref=e122]
              - img [ref=e124]
            - paragraph [ref=e126]: "\"Working with Elevate Digital has been a game-changer for our content strategy. Our blog traffic increased by 250% and we're now recognized as thought leaders in our industry.\""
            - generic [ref=e127]:
              - generic [ref=e128]: Emily Rodriguez
              - generic [ref=e129]: Founder, GreenHome Products
      - generic [ref=e133]:
        - generic [ref=e134]:
          - heading "Why Choose Us?" [level=2] [ref=e135]
          - paragraph [ref=e136]: We combine creativity with data-driven strategies to deliver results that matter. Our team is dedicated to helping your business succeed in the digital landscape.
          - generic [ref=e137]:
            - generic [ref=e138]:
              - img [ref=e140]
              - generic [ref=e142]:
                - heading "Results-Driven Approach" [level=4] [ref=e143]
                - paragraph [ref=e144]: Every decision is backed by data and focused on your business goals.
            - generic [ref=e145]:
              - img [ref=e147]
              - generic [ref=e149]:
                - heading "Modern Technology" [level=4] [ref=e150]
                - paragraph [ref=e151]: We use the latest frameworks and best practices for optimal performance.
            - generic [ref=e152]:
              - img [ref=e154]
              - generic [ref=e156]:
                - heading "Dedicated Partnership" [level=4] [ref=e157]
                - paragraph [ref=e158]: We work as an extension of your team, committed to your success.
        - generic [ref=e160]:
          - generic [ref=e161]:
            - generic [ref=e162]: 150+
            - generic [ref=e163]: Projects Delivered
          - generic [ref=e164]:
            - generic [ref=e165]: 98%
            - generic [ref=e166]: Client Satisfaction
          - generic [ref=e167]:
            - generic [ref=e168]: 5+
            - generic [ref=e169]: Years Experience
          - generic [ref=e170]:
            - generic [ref=e171]: 24/7
            - generic [ref=e172]: Support Available
      - generic [ref=e175]:
        - generic [ref=e176]:
          - heading "Let's Work Together" [level=2] [ref=e177]
          - paragraph [ref=e178]: Ready to transform your digital presence? Get in touch with us today.
        - generic [ref=e180]:
          - generic [ref=e181]:
            - generic [ref=e182]: Name *
            - textbox "Name *" [ref=e183]:
              - /placeholder: Your name
          - generic [ref=e184]:
            - generic [ref=e185]: Email *
            - textbox "Email *" [ref=e186]:
              - /placeholder: your@email.com
          - generic [ref=e187]:
            - generic [ref=e188]: Company
            - textbox "Company" [ref=e189]:
              - /placeholder: Your company name
          - generic [ref=e190]:
            - generic [ref=e191]: Service Interested In *
            - combobox "Service Interested In *" [ref=e192]:
              - option "Select a service" [selected]
              - option "Web Design & Development"
              - option "SEO Optimization"
              - option "Analytics & Insights"
              - option "Full Digital Strategy"
              - option "Other"
          - generic [ref=e193]:
            - generic [ref=e194]: Project Budget
            - combobox "Project Budget" [ref=e195]:
              - option "Select budget range" [selected]
              - option "$5,000 - $10,000"
              - option "$10,000 - $25,000"
              - option "$25,000 - $50,000"
              - option "$50,000+"
          - generic [ref=e196]:
            - generic [ref=e197]: Message *
            - textbox "Message *" [ref=e198]:
              - /placeholder: Tell us about your project...
          - button "Send Message" [ref=e199] [cursor=pointer]
          - generic [ref=e200]:
            - text: Leave this blank
            - textbox [ref=e201]
  - contentinfo [ref=e202]:
    - generic [ref=e203]:
      - generic [ref=e204]:
        - generic [ref=e205]:
          - generic [ref=e206]: Elevate Digital
          - paragraph [ref=e207]: Transform your digital presence with expert web design, SEO, and analytics services. We create experiences that convert visitors into customers.
        - generic [ref=e208]:
          - heading "Quick Links" [level=4] [ref=e209]
          - list [ref=e210]:
            - listitem [ref=e211]:
              - link "Services" [ref=e212]:
                - /url: /en/services
            - listitem [ref=e213]:
              - link "About" [ref=e214]:
                - /url: /en/about
            - listitem [ref=e215]:
              - link "Portfolio" [ref=e216]:
                - /url: /en/portfolio
            - listitem [ref=e217]:
              - link "Pricing" [ref=e218]:
                - /url: /en/pricing
            - listitem [ref=e219]:
              - link "Blog" [ref=e220]:
                - /url: /en/blog
            - listitem [ref=e221]:
              - link "Contact" [ref=e222]:
                - /url: /en/contact
        - generic [ref=e223]:
          - heading "Legal" [level=4] [ref=e224]
          - list [ref=e225]:
            - listitem [ref=e226]:
              - link "Privacy Policy" [ref=e227]:
                - /url: /en/legal/privacy
            - listitem [ref=e228]:
              - link "Terms of Service" [ref=e229]:
                - /url: /en/legal/terms
        - generic [ref=e230]:
          - heading "Follow Us" [level=4] [ref=e231]
          - generic [ref=e232]:
            - link "Follow us on Twitter/X" [ref=e233]:
              - /url: https://twitter.com/elevatedigital
              - img [ref=e234]
            - link "Follow us on LinkedIn" [ref=e236]:
              - /url: https://linkedin.com/company/elevatedigital
              - img [ref=e237]
            - link "Follow us on Instagram" [ref=e239]:
              - /url: https://instagram.com/elevatedigital
              - img [ref=e240]
      - generic [ref=e243]: © 2026 Elevate Digital. All rights reserved.
  - alert [ref=e244]
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
  19 |     await expect(page).toHaveURL('/services');
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
> 32 |     await contactButton.click();
     |                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  33 |     await expect(page).toHaveURL('/contact');
  34 |     
  35 |     const form = page.locator('form');
  36 |     await expect(form).toBeVisible();
  37 |   });
  38 | });
  39 | 
```
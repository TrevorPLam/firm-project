# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home-page.spec.ts >> Home Page >> should navigate to services page
- Location: app\e2e\home-page.spec.ts:15:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'Services' }) resolved to 2 elements:
    1) <a href="/services" class="px-8 py-4 border-2 border-foreground/20 rounded-full font-semibold text-lg hover:border-primary hover:text-primary transition-all text-center">Explore Services</a> aka getByRole('link', { name: 'Explore Services' })
    2) <a href="/services" class="text-foreground/60 hover:text-foreground transition-colors">Services</a> aka getByRole('link', { name: 'Services', exact: true })

Call log:
  - waiting for getByRole('link', { name: 'Services' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "Elevate Digital" [ref=e4]:
        - /url: /
      - button "Toggle menu" [ref=e5]:
        - img [ref=e6]
  - main [ref=e8]:
    - generic [ref=e9]:
      - generic [ref=e13]:
        - heading "Transform Your Digital Presence" [level=1] [ref=e14]
        - paragraph [ref=e15]: We craft stunning websites and data-driven marketing strategies that convert visitors into customers. Experience the power of modern digital marketing.
        - generic [ref=e16]:
          - link "Start Your Project" [ref=e17]:
            - /url: /contact
          - link "Explore Services" [ref=e18]:
            - /url: /services
      - generic [ref=e20]:
        - generic [ref=e22]:
          - heading "Our Services" [level=2] [ref=e23]
          - paragraph [ref=e24]: Comprehensive digital solutions tailored to your business goals
        - generic [ref=e25]:
          - generic [ref=e27]:
            - img [ref=e29]
            - heading "Web Design & Development" [level=3] [ref=e31]
            - paragraph [ref=e32]: Custom, responsive websites built with modern frameworks. Fast, accessible, and conversion-optimized designs that represent your brand perfectly.
            - list [ref=e33]:
              - listitem [ref=e34]: Custom UI/UX Design
              - listitem [ref=e36]: Responsive Development
              - listitem [ref=e38]: Performance Optimization
          - generic [ref=e41]:
            - img [ref=e43]
            - heading "SEO Optimization" [level=3] [ref=e45]
            - paragraph [ref=e46]: Data-driven search engine optimization to improve your visibility and drive organic traffic. We help you rank higher and reach more customers.
            - list [ref=e47]:
              - listitem [ref=e48]: Keyword Research
              - listitem [ref=e50]: On-Page Optimization
              - listitem [ref=e52]: Technical SEO Audits
          - generic [ref=e55]:
            - img [ref=e57]
            - heading "Analytics & Insights" [level=3] [ref=e59]
            - paragraph [ref=e60]: Comprehensive analytics setup and reporting to track performance, understand user behavior, and make data-driven decisions for growth.
            - list [ref=e61]:
              - listitem [ref=e62]: GA4 & Tag Manager
              - listitem [ref=e64]: Custom Dashboards
              - listitem [ref=e66]: Conversion Tracking
      - generic [ref=e69]:
        - generic [ref=e71]:
          - heading "What Our Clients Say" [level=2] [ref=e72]
          - paragraph [ref=e73]: Don't just take our word for it. Here's what our clients have to say about working with us.
        - generic [ref=e74]:
          - generic [ref=e76]:
            - generic [ref=e77]:
              - img [ref=e78]
              - img [ref=e80]
              - img [ref=e82]
              - img [ref=e84]
              - img [ref=e86]
            - paragraph [ref=e88]: "\"Elevate Digital transformed our online presence completely. Our conversion rate increased by 150% within three months. Their team is professional, responsive, and truly understands our business needs.\""
            - generic [ref=e89]:
              - generic [ref=e90]: Sarah Johnson
              - generic [ref=e91]: CEO, TechStyle Boutique
          - generic [ref=e93]:
            - generic [ref=e94]:
              - img [ref=e95]
              - img [ref=e97]
              - img [ref=e99]
              - img [ref=e101]
              - img [ref=e103]
            - paragraph [ref=e105]: "\"The SEO results have been phenomenal. We went from page 5 to top 3 rankings for our main keywords. The team's data-driven approach and regular reporting keep us informed every step of the way.\""
            - generic [ref=e106]:
              - generic [ref=e107]: Michael Chen
              - generic [ref=e108]: Marketing Director, Metro Dental Group
          - generic [ref=e110]:
            - generic [ref=e111]:
              - img [ref=e112]
              - img [ref=e114]
              - img [ref=e116]
              - img [ref=e118]
              - img [ref=e120]
            - paragraph [ref=e122]: "\"Working with Elevate Digital has been a game-changer for our content strategy. Our blog traffic increased by 250% and we're now recognized as thought leaders in our industry.\""
            - generic [ref=e123]:
              - generic [ref=e124]: Emily Rodriguez
              - generic [ref=e125]: Founder, GreenHome Products
      - generic [ref=e129]:
        - generic [ref=e130]:
          - heading "Why Choose Us?" [level=2] [ref=e131]
          - paragraph [ref=e132]: We combine creativity with data-driven strategies to deliver results that matter. Our team is dedicated to helping your business succeed in the digital landscape.
          - generic [ref=e133]:
            - generic [ref=e134]:
              - img [ref=e136]
              - generic [ref=e138]:
                - heading "Results-Driven Approach" [level=4] [ref=e139]
                - paragraph [ref=e140]: Every decision is backed by data and focused on your business goals.
            - generic [ref=e141]:
              - img [ref=e143]
              - generic [ref=e145]:
                - heading "Modern Technology" [level=4] [ref=e146]
                - paragraph [ref=e147]: We use the latest frameworks and best practices for optimal performance.
            - generic [ref=e148]:
              - img [ref=e150]
              - generic [ref=e152]:
                - heading "Dedicated Partnership" [level=4] [ref=e153]
                - paragraph [ref=e154]: We work as an extension of your team, committed to your success.
        - generic [ref=e156]:
          - generic [ref=e157]:
            - generic [ref=e158]: 150+
            - generic [ref=e159]: Projects Delivered
          - generic [ref=e160]:
            - generic [ref=e161]: 98%
            - generic [ref=e162]: Client Satisfaction
          - generic [ref=e163]:
            - generic [ref=e164]: 5+
            - generic [ref=e165]: Years Experience
          - generic [ref=e166]:
            - generic [ref=e167]: 24/7
            - generic [ref=e168]: Support Available
      - generic [ref=e171]:
        - generic [ref=e172]:
          - heading "Let's Work Together" [level=2] [ref=e173]
          - paragraph [ref=e174]: Ready to transform your digital presence? Get in touch with us today.
        - generic [ref=e176]:
          - generic [ref=e177]:
            - generic [ref=e178]: Name *
            - textbox "Name *" [ref=e179]:
              - /placeholder: Your name
          - generic [ref=e180]:
            - generic [ref=e181]: Email *
            - textbox "Email *" [ref=e182]:
              - /placeholder: your@email.com
          - generic [ref=e183]:
            - generic [ref=e184]: Company
            - textbox "Company" [ref=e185]:
              - /placeholder: Your company name
          - generic [ref=e186]:
            - generic [ref=e187]: Service Interested In *
            - combobox "Service Interested In *" [ref=e188]:
              - option "Select a service" [selected]
              - option "Web Design & Development"
              - option "SEO Optimization"
              - option "Analytics & Insights"
              - option "Full Digital Strategy"
              - option "Other"
          - generic [ref=e189]:
            - generic [ref=e190]: Project Budget
            - combobox "Project Budget" [ref=e191]:
              - option "Select budget range" [selected]
              - option "$5,000 - $10,000"
              - option "$10,000 - $25,000"
              - option "$25,000 - $50,000"
              - option "$50,000+"
          - generic [ref=e192]:
            - generic [ref=e193]: Message *
            - textbox "Message *" [ref=e194]:
              - /placeholder: Tell us about your project...
          - button "Send Message" [ref=e195]
  - contentinfo [ref=e196]:
    - generic [ref=e197]:
      - generic [ref=e198]:
        - generic [ref=e199]:
          - generic [ref=e200]: Elevate Digital
          - paragraph [ref=e201]: Transform your digital presence with expert web design, SEO, and analytics services. We create experiences that convert visitors into customers.
        - generic [ref=e202]:
          - heading "Quick Links" [level=4] [ref=e203]
          - list [ref=e204]:
            - listitem [ref=e205]:
              - link "Services" [ref=e206]:
                - /url: /services
            - listitem [ref=e207]:
              - link "About" [ref=e208]:
                - /url: /about
            - listitem [ref=e209]:
              - link "Portfolio" [ref=e210]:
                - /url: /portfolio
            - listitem [ref=e211]:
              - link "Pricing" [ref=e212]:
                - /url: /pricing
            - listitem [ref=e213]:
              - link "Blog" [ref=e214]:
                - /url: /blog
            - listitem [ref=e215]:
              - link "Contact" [ref=e216]:
                - /url: /contact
        - generic [ref=e217]:
          - heading "Legal" [level=4] [ref=e218]
          - list [ref=e219]:
            - listitem [ref=e220]:
              - link "Privacy Policy" [ref=e221]:
                - /url: /legal/privacy
            - listitem [ref=e222]:
              - link "Terms of Service" [ref=e223]:
                - /url: /legal/terms
      - generic [ref=e224]:
        - generic [ref=e225]: © 2025 Elevate Digital. All rights reserved.
        - generic [ref=e226]:
          - link "Twitter" [ref=e227]:
            - /url: "#"
            - img [ref=e228]
          - link "LinkedIn" [ref=e230]:
            - /url: "#"
            - img [ref=e231]
          - link "GitHub" [ref=e233]:
            - /url: "#"
            - img [ref=e234]
  - alert [ref=e236]
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
> 18 |     await servicesLink.click();
     |                        ^ Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'Services' }) resolved to 2 elements:
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
  32 |     await contactButton.click();
  33 |     await expect(page).toHaveURL('/contact');
  34 |     
  35 |     const form = page.locator('form');
  36 |     await expect(form).toBeVisible();
  37 |   });
  38 | });
  39 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home-page.spec.ts >> Home Page >> should navigate to contact page
- Location: app\e2e\home-page.spec.ts:22:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'Contact' }) resolved to 2 elements:
    1) <a href="/contact" class="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform inline-block">Contact</a> aka getByRole('navigation').getByRole('link', { name: 'Contact' })
    2) <a href="/contact" class="text-foreground/60 hover:text-foreground transition-colors">Contact</a> aka getByRole('contentinfo').getByRole('link', { name: 'Contact' })

Call log:
  - waiting for getByRole('link', { name: 'Contact' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "Elevate Digital" [ref=e4] [cursor=pointer]:
        - /url: /
      - generic [ref=e5]:
        - link "Services" [ref=e6] [cursor=pointer]:
          - /url: /services
        - link "About" [ref=e7] [cursor=pointer]:
          - /url: /about
        - link "Portfolio" [ref=e8] [cursor=pointer]:
          - /url: /portfolio
        - link "Pricing" [ref=e9] [cursor=pointer]:
          - /url: /pricing
        - link "Blog" [ref=e10] [cursor=pointer]:
          - /url: /blog
        - link "Contact" [ref=e11] [cursor=pointer]:
          - /url: /contact
      - link "Get Started" [ref=e13] [cursor=pointer]:
        - /url: /contact
  - main [ref=e14]:
    - generic [ref=e15]:
      - generic [ref=e19]:
        - heading "Transform Your Digital Presence" [level=1] [ref=e20]
        - paragraph [ref=e21]: We craft stunning websites and data-driven marketing strategies that convert visitors into customers. Experience the power of modern digital marketing.
        - generic [ref=e22]:
          - link "Start Your Project" [ref=e23] [cursor=pointer]:
            - /url: /contact
          - link "Explore Services" [ref=e24] [cursor=pointer]:
            - /url: /services
      - generic [ref=e26]:
        - generic [ref=e28]:
          - heading "Our Services" [level=2] [ref=e29]
          - paragraph [ref=e30]: Comprehensive digital solutions tailored to your business goals
        - generic [ref=e31]:
          - generic [ref=e33]:
            - img [ref=e35]
            - heading "Web Design & Development" [level=3] [ref=e37]
            - paragraph [ref=e38]: Custom, responsive websites built with modern frameworks. Fast, accessible, and conversion-optimized designs that represent your brand perfectly.
            - list [ref=e39]:
              - listitem [ref=e40]: Custom UI/UX Design
              - listitem [ref=e42]: Responsive Development
              - listitem [ref=e44]: Performance Optimization
          - generic [ref=e47]:
            - img [ref=e49]
            - heading "SEO Optimization" [level=3] [ref=e51]
            - paragraph [ref=e52]: Data-driven search engine optimization to improve your visibility and drive organic traffic. We help you rank higher and reach more customers.
            - list [ref=e53]:
              - listitem [ref=e54]: Keyword Research
              - listitem [ref=e56]: On-Page Optimization
              - listitem [ref=e58]: Technical SEO Audits
          - generic [ref=e61]:
            - img [ref=e63]
            - heading "Analytics & Insights" [level=3] [ref=e65]
            - paragraph [ref=e66]: Comprehensive analytics setup and reporting to track performance, understand user behavior, and make data-driven decisions for growth.
            - list [ref=e67]:
              - listitem [ref=e68]: GA4 & Tag Manager
              - listitem [ref=e70]: Custom Dashboards
              - listitem [ref=e72]: Conversion Tracking
      - generic [ref=e75]:
        - generic [ref=e77]:
          - heading "What Our Clients Say" [level=2] [ref=e78]
          - paragraph [ref=e79]: Don't just take our word for it. Here's what our clients have to say about working with us.
        - generic [ref=e80]:
          - generic [ref=e82]:
            - generic [ref=e83]:
              - img [ref=e84]
              - img [ref=e86]
              - img [ref=e88]
              - img [ref=e90]
              - img [ref=e92]
            - paragraph [ref=e94]: "\"Elevate Digital transformed our online presence completely. Our conversion rate increased by 150% within three months. Their team is professional, responsive, and truly understands our business needs.\""
            - generic [ref=e95]:
              - generic [ref=e96]: Sarah Johnson
              - generic [ref=e97]: CEO, TechStyle Boutique
          - generic [ref=e99]:
            - generic [ref=e100]:
              - img [ref=e101]
              - img [ref=e103]
              - img [ref=e105]
              - img [ref=e107]
              - img [ref=e109]
            - paragraph [ref=e111]: "\"The SEO results have been phenomenal. We went from page 5 to top 3 rankings for our main keywords. The team's data-driven approach and regular reporting keep us informed every step of the way.\""
            - generic [ref=e112]:
              - generic [ref=e113]: Michael Chen
              - generic [ref=e114]: Marketing Director, Metro Dental Group
          - generic [ref=e116]:
            - generic [ref=e117]:
              - img [ref=e118]
              - img [ref=e120]
              - img [ref=e122]
              - img [ref=e124]
              - img [ref=e126]
            - paragraph [ref=e128]: "\"Working with Elevate Digital has been a game-changer for our content strategy. Our blog traffic increased by 250% and we're now recognized as thought leaders in our industry.\""
            - generic [ref=e129]:
              - generic [ref=e130]: Emily Rodriguez
              - generic [ref=e131]: Founder, GreenHome Products
      - generic [ref=e135]:
        - generic [ref=e136]:
          - heading "Why Choose Us?" [level=2] [ref=e137]
          - paragraph [ref=e138]: We combine creativity with data-driven strategies to deliver results that matter. Our team is dedicated to helping your business succeed in the digital landscape.
          - generic [ref=e139]:
            - generic [ref=e140]:
              - img [ref=e142]
              - generic [ref=e144]:
                - heading "Results-Driven Approach" [level=4] [ref=e145]
                - paragraph [ref=e146]: Every decision is backed by data and focused on your business goals.
            - generic [ref=e147]:
              - img [ref=e149]
              - generic [ref=e151]:
                - heading "Modern Technology" [level=4] [ref=e152]
                - paragraph [ref=e153]: We use the latest frameworks and best practices for optimal performance.
            - generic [ref=e154]:
              - img [ref=e156]
              - generic [ref=e158]:
                - heading "Dedicated Partnership" [level=4] [ref=e159]
                - paragraph [ref=e160]: We work as an extension of your team, committed to your success.
        - generic [ref=e162]:
          - generic [ref=e163]:
            - generic [ref=e164]: 150+
            - generic [ref=e165]: Projects Delivered
          - generic [ref=e166]:
            - generic [ref=e167]: 98%
            - generic [ref=e168]: Client Satisfaction
          - generic [ref=e169]:
            - generic [ref=e170]: 5+
            - generic [ref=e171]: Years Experience
          - generic [ref=e172]:
            - generic [ref=e173]: 24/7
            - generic [ref=e174]: Support Available
      - generic [ref=e177]:
        - generic [ref=e178]:
          - heading "Let's Work Together" [level=2] [ref=e179]
          - paragraph [ref=e180]: Ready to transform your digital presence? Get in touch with us today.
        - generic [ref=e182]:
          - generic [ref=e183]:
            - generic [ref=e184]: Name *
            - textbox "Name *" [ref=e185]:
              - /placeholder: Your name
          - generic [ref=e186]:
            - generic [ref=e187]: Email *
            - textbox "Email *" [ref=e188]:
              - /placeholder: your@email.com
          - generic [ref=e189]:
            - generic [ref=e190]: Company
            - textbox "Company" [ref=e191]:
              - /placeholder: Your company name
          - generic [ref=e192]:
            - generic [ref=e193]: Service Interested In *
            - combobox "Service Interested In *" [ref=e194]:
              - option "Select a service" [selected]
              - option "Web Design & Development"
              - option "SEO Optimization"
              - option "Analytics & Insights"
              - option "Full Digital Strategy"
              - option "Other"
          - generic [ref=e195]:
            - generic [ref=e196]: Project Budget
            - combobox "Project Budget" [ref=e197]:
              - option "Select budget range" [selected]
              - option "$5,000 - $10,000"
              - option "$10,000 - $25,000"
              - option "$25,000 - $50,000"
              - option "$50,000+"
          - generic [ref=e198]:
            - generic [ref=e199]: Message *
            - textbox "Message *" [ref=e200]:
              - /placeholder: Tell us about your project...
          - button "Send Message" [ref=e201]
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
              - link "Services" [ref=e212] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e213]:
              - link "About" [ref=e214] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e215]:
              - link "Portfolio" [ref=e216] [cursor=pointer]:
                - /url: /portfolio
            - listitem [ref=e217]:
              - link "Pricing" [ref=e218] [cursor=pointer]:
                - /url: /pricing
            - listitem [ref=e219]:
              - link "Blog" [ref=e220] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e221]:
              - link "Contact" [ref=e222] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e223]:
          - heading "Legal" [level=4] [ref=e224]
          - list [ref=e225]:
            - listitem [ref=e226]:
              - link "Privacy Policy" [ref=e227] [cursor=pointer]:
                - /url: /legal/privacy
            - listitem [ref=e228]:
              - link "Terms of Service" [ref=e229] [cursor=pointer]:
                - /url: /legal/terms
      - generic [ref=e230]:
        - generic [ref=e231]: © 2025 Elevate Digital. All rights reserved.
        - generic [ref=e232]:
          - link "Twitter" [ref=e233] [cursor=pointer]:
            - /url: "#"
            - img [ref=e234]
          - link "LinkedIn" [ref=e236] [cursor=pointer]:
            - /url: "#"
            - img [ref=e237]
          - link "GitHub" [ref=e239] [cursor=pointer]:
            - /url: "#"
            - img [ref=e240]
  - alert [ref=e242]
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
> 25 |     await contactLink.click();
     |                       ^ Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'Contact' }) resolved to 2 elements:
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
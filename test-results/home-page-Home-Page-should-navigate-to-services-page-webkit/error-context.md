# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home-page.spec.ts >> Home Page >> should navigate to services page
- Location: app\e2e\home-page.spec.ts:15:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'Services' }) resolved to 3 elements:
    1) <a href="/en/services" class="text-foreground/80 hover:text-foreground inline-block transition-colors">Services</a> aka getByRole('navigation').getByRole('link', { name: 'Services' })
    2) <a href="/en/services" class="border-foreground/20 hover:border-primary hover:text-primary rounded-full border-2 px-8 py-4 text-center text-lg font-semibold transition-all">Explore Services</a> aka getByRole('link', { name: 'Explore Services' })
    3) <a href="/en/services" class="text-foreground/60 hover:text-foreground transition-colors">Services</a> aka getByRole('contentinfo').getByRole('link', { name: 'Services' })

Call log:
  - waiting for getByRole('link', { name: 'Services' })

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
      - generic [ref=e7]:
        - link "Services" [ref=e9]:
          - /url: /en/services
        - link "About" [ref=e11]:
          - /url: /en/about
        - link "Portfolio" [ref=e13]:
          - /url: /en/portfolio
        - link "Pricing" [ref=e15]:
          - /url: /en/pricing
        - link "Blog" [ref=e17]:
          - /url: /en/blog
        - link "Contact" [ref=e19]:
          - /url: /en/contact
        - button "Search" [ref=e21] [cursor=pointer]:
          - img [ref=e22]
        - button "English" [ref=e25] [cursor=pointer]:
          - img [ref=e26]
          - generic [ref=e31]: English
          - img [ref=e32]
      - link "Get Started" [ref=e36]:
        - /url: /en/contact
  - main [ref=e37]:
    - generic [ref=e39]:
      - generic [ref=e43]:
        - heading "Transform Your Digital Presence" [level=1] [ref=e44]:
          - text: Transform Your
          - generic [ref=e45]: Digital Presence
        - paragraph [ref=e46]: We craft stunning websites and data-driven marketing strategies that convert visitors into customers. Experience the power of modern digital marketing.
        - generic [ref=e47]:
          - link "Start Your Project" [ref=e48]:
            - /url: /en/contact
          - link "Explore Services" [ref=e49]:
            - /url: /en/services
      - generic [ref=e51]:
        - generic [ref=e53]:
          - heading "Our Services" [level=2] [ref=e54]
          - paragraph [ref=e55]: Comprehensive digital solutions tailored to your business goals
        - generic [ref=e56]:
          - generic [ref=e58]:
            - img [ref=e60]
            - heading "Web Design & Development" [level=3] [ref=e62]
            - paragraph [ref=e63]: Custom, responsive websites built with modern frameworks. Fast, accessible, and conversion-optimized designs that represent your brand perfectly.
            - list [ref=e64]:
              - listitem [ref=e65]: Custom UI/UX Design
              - listitem [ref=e67]: Responsive Development
              - listitem [ref=e69]: Performance Optimization
          - generic [ref=e72]:
            - img [ref=e74]
            - heading "SEO Optimization" [level=3] [ref=e76]
            - paragraph [ref=e77]: Data-driven search engine optimization to improve your visibility and drive organic traffic. We help you rank higher and reach more customers.
            - list [ref=e78]:
              - listitem [ref=e79]: Keyword Research
              - listitem [ref=e81]: On-Page Optimization
              - listitem [ref=e83]: Technical SEO Audits
          - generic [ref=e86]:
            - img [ref=e88]
            - heading "Analytics & Insights" [level=3] [ref=e90]
            - paragraph [ref=e91]: Comprehensive analytics setup and reporting to track performance, understand user behavior, and make data-driven decisions for growth.
            - list [ref=e92]:
              - listitem [ref=e93]: GA4 & Tag Manager
              - listitem [ref=e95]: Custom Dashboards
              - listitem [ref=e97]: Conversion Tracking
      - generic [ref=e100]:
        - generic [ref=e102]:
          - heading "What Our Clients Say" [level=2] [ref=e103]
          - paragraph [ref=e104]: Don't just take our word for it. Here's what our clients have to say about working with us.
        - generic [ref=e105]:
          - generic [ref=e107]:
            - generic [ref=e108]:
              - img [ref=e109]
              - img [ref=e111]
              - img [ref=e113]
              - img [ref=e115]
              - img [ref=e117]
            - paragraph [ref=e119]: "\"Elevate Digital transformed our online presence completely. Our conversion rate increased by 150% within three months. Their team is professional, responsive, and truly understands our business needs.\""
            - generic [ref=e120]:
              - generic [ref=e121]: Sarah Johnson
              - generic [ref=e122]: CEO, TechStyle Boutique
          - generic [ref=e124]:
            - generic [ref=e125]:
              - img [ref=e126]
              - img [ref=e128]
              - img [ref=e130]
              - img [ref=e132]
              - img [ref=e134]
            - paragraph [ref=e136]: "\"The SEO results have been phenomenal. We went from page 5 to top 3 rankings for our main keywords. The team's data-driven approach and regular reporting keep us informed every step of the way.\""
            - generic [ref=e137]:
              - generic [ref=e138]: Michael Chen
              - generic [ref=e139]: Marketing Director, Metro Dental Group
          - generic [ref=e141]:
            - generic [ref=e142]:
              - img [ref=e143]
              - img [ref=e145]
              - img [ref=e147]
              - img [ref=e149]
              - img [ref=e151]
            - paragraph [ref=e153]: "\"Working with Elevate Digital has been a game-changer for our content strategy. Our blog traffic increased by 250% and we're now recognized as thought leaders in our industry.\""
            - generic [ref=e154]:
              - generic [ref=e155]: Emily Rodriguez
              - generic [ref=e156]: Founder, GreenHome Products
      - generic [ref=e160]:
        - generic [ref=e161]:
          - heading "Why Choose Us?" [level=2] [ref=e162]
          - paragraph [ref=e163]: We combine creativity with data-driven strategies to deliver results that matter. Our team is dedicated to helping your business succeed in the digital landscape.
          - generic [ref=e164]:
            - generic [ref=e165]:
              - img [ref=e167]
              - generic [ref=e169]:
                - heading "Results-Driven Approach" [level=4] [ref=e170]
                - paragraph [ref=e171]: Every decision is backed by data and focused on your business goals.
            - generic [ref=e172]:
              - img [ref=e174]
              - generic [ref=e176]:
                - heading "Modern Technology" [level=4] [ref=e177]
                - paragraph [ref=e178]: We use the latest frameworks and best practices for optimal performance.
            - generic [ref=e179]:
              - img [ref=e181]
              - generic [ref=e183]:
                - heading "Dedicated Partnership" [level=4] [ref=e184]
                - paragraph [ref=e185]: We work as an extension of your team, committed to your success.
        - generic [ref=e187]:
          - generic [ref=e188]:
            - generic [ref=e189]: 150+
            - generic [ref=e190]: Projects Delivered
          - generic [ref=e191]:
            - generic [ref=e192]: 98%
            - generic [ref=e193]: Client Satisfaction
          - generic [ref=e194]:
            - generic [ref=e195]: 5+
            - generic [ref=e196]: Years Experience
          - generic [ref=e197]:
            - generic [ref=e198]: 24/7
            - generic [ref=e199]: Support Available
      - generic [ref=e202]:
        - generic [ref=e203]:
          - heading "Let's Work Together" [level=2] [ref=e204]
          - paragraph [ref=e205]: Ready to transform your digital presence? Get in touch with us today.
        - generic [ref=e207]:
          - generic [ref=e208]:
            - generic [ref=e209]: Name *
            - textbox "Name *" [ref=e210]:
              - /placeholder: Your name
          - generic [ref=e211]:
            - generic [ref=e212]: Email *
            - textbox "Email *" [ref=e213]:
              - /placeholder: your@email.com
          - generic [ref=e214]:
            - generic [ref=e215]: Company
            - textbox "Company" [ref=e216]:
              - /placeholder: Your company name
          - generic [ref=e217]:
            - generic [ref=e218]: Service Interested In *
            - combobox "Service Interested In *" [ref=e219]:
              - option "Select a service" [selected]
              - option "Web Design & Development"
              - option "SEO Optimization"
              - option "Analytics & Insights"
              - option "Full Digital Strategy"
              - option "Other"
          - generic [ref=e220]:
            - generic [ref=e221]: Project Budget
            - combobox "Project Budget" [ref=e222]:
              - option "Select budget range" [selected]
              - option "$5,000 - $10,000"
              - option "$10,000 - $25,000"
              - option "$25,000 - $50,000"
              - option "$50,000+"
          - generic [ref=e223]:
            - generic [ref=e224]: Message *
            - textbox "Message *" [ref=e225]:
              - /placeholder: Tell us about your project...
          - button "Send Message" [ref=e226] [cursor=pointer]
          - generic [ref=e227]:
            - text: Leave this blank
            - textbox [ref=e228]
  - contentinfo [ref=e229]:
    - generic [ref=e230]:
      - generic [ref=e231]:
        - generic [ref=e232]:
          - generic [ref=e233]: Elevate Digital
          - paragraph [ref=e234]: Transform your digital presence with expert web design, SEO, and analytics services. We create experiences that convert visitors into customers.
        - generic [ref=e235]:
          - heading "Quick Links" [level=4] [ref=e236]
          - list [ref=e237]:
            - listitem [ref=e238]:
              - link "Services" [ref=e239]:
                - /url: /en/services
            - listitem [ref=e240]:
              - link "About" [ref=e241]:
                - /url: /en/about
            - listitem [ref=e242]:
              - link "Portfolio" [ref=e243]:
                - /url: /en/portfolio
            - listitem [ref=e244]:
              - link "Pricing" [ref=e245]:
                - /url: /en/pricing
            - listitem [ref=e246]:
              - link "Blog" [ref=e247]:
                - /url: /en/blog
            - listitem [ref=e248]:
              - link "Contact" [ref=e249]:
                - /url: /en/contact
        - generic [ref=e250]:
          - heading "Legal" [level=4] [ref=e251]
          - list [ref=e252]:
            - listitem [ref=e253]:
              - link "Privacy Policy" [ref=e254]:
                - /url: /en/legal/privacy
            - listitem [ref=e255]:
              - link "Terms of Service" [ref=e256]:
                - /url: /en/legal/terms
        - generic [ref=e257]:
          - heading "Follow Us" [level=4] [ref=e258]
          - generic [ref=e259]:
            - link "Follow us on Twitter/X" [ref=e260]:
              - /url: https://twitter.com/elevatedigital
              - img [ref=e261]
            - link "Follow us on LinkedIn" [ref=e263]:
              - /url: https://linkedin.com/company/elevatedigital
              - img [ref=e264]
            - link "Follow us on Instagram" [ref=e266]:
              - /url: https://instagram.com/elevatedigital
              - img [ref=e267]
      - generic [ref=e270]: © 2026 Elevate Digital. All rights reserved.
  - alert [ref=e271]
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
     |                        ^ Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'Services' }) resolved to 3 elements:
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
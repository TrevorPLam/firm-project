# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio-detail.spec.ts >> Portfolio Detail Page >> should display client information
- Location: app\e2e\portfolio-detail.spec.ts:36:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('TechStyle Boutique')
Expected: visible
Error: strict mode violation: getByText('TechStyle Boutique') resolved to 3 elements:
    1) <div>…</div> aka getByText('Client: TechStyle Boutique')
    2) <p class="text-foreground/70 mb-8 text-lg leading-relaxed">TechStyle Boutique, a fashion retailer, came to u…</p> aka getByText('TechStyle Boutique, a fashion')
    ...

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('TechStyle Boutique')

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
      - generic [ref=e7]:
        - link "Services" [ref=e9] [cursor=pointer]:
          - /url: /en/services
        - link "About" [ref=e11] [cursor=pointer]:
          - /url: /en/about
        - link "Portfolio" [ref=e13] [cursor=pointer]:
          - /url: /en/portfolio
        - link "Pricing" [ref=e15] [cursor=pointer]:
          - /url: /en/pricing
        - link "Blog" [ref=e17] [cursor=pointer]:
          - /url: /en/blog
        - link "Contact" [ref=e19] [cursor=pointer]:
          - /url: /en/contact
        - button "Search" [ref=e21] [cursor=pointer]:
          - img [ref=e22]
        - button "English" [ref=e25] [cursor=pointer]:
          - img [ref=e26]
          - generic [ref=e31]: English
          - img [ref=e32]
      - link "Get Started" [ref=e36] [cursor=pointer]:
        - /url: /en/contact
  - main [ref=e37]:
    - generic [ref=e39]:
      - generic [ref=e43]:
        - generic [ref=e45]: Web Design
        - heading "E-Commerce Redesign" [level=1] [ref=e46]
        - paragraph [ref=e47]: Complete e-commerce website redesign resulting in 150% increase in conversions and improved user experience.
        - generic [ref=e48]:
          - generic [ref=e49]:
            - generic [ref=e50]:
              - img "TechStyle Boutique logo" [ref=e51]
              - generic [ref=e52]: "Client: TechStyle Boutique"
            - generic [ref=e53]: "Timeline: 8 weeks"
          - generic [ref=e54]:
            - generic [ref=e55]: "Share:"
            - button "Share on Twitter/X" [ref=e56] [cursor=pointer]:
              - img [ref=e57]
            - button "Share on Facebook" [ref=e59] [cursor=pointer]:
              - img [ref=e60]
            - button "Share on LinkedIn" [ref=e62] [cursor=pointer]:
              - img [ref=e63]
            - button "Share via email" [ref=e65] [cursor=pointer]:
              - img [ref=e66]
      - generic [ref=e71]:
        - generic [ref=e72]:
          - generic [ref=e73]: 150%
          - generic [ref=e74]: Increase in conversions
        - generic [ref=e75]:
          - generic [ref=e76]: 40%
          - generic [ref=e77]: Improvement in page load speed
        - generic [ref=e78]:
          - generic [ref=e79]: 60%
          - generic [ref=e80]: Reduction in bounce rate
        - generic [ref=e81]:
          - generic [ref=e82]: 85%
          - generic [ref=e83]: Increase in mobile traffic
      - generic [ref=e86]:
        - heading "Project Overview" [level=2] [ref=e87]
        - paragraph [ref=e88]: TechStyle Boutique, a fashion retailer, came to us with an outdated e-commerce platform that was struggling to convert visitors. Their website had poor mobile performance, confusing navigation, and a checkout process that caused significant cart abandonment.
      - generic [ref=e91]:
        - heading "The Challenge" [level=2] [ref=e92]
        - paragraph [ref=e93]: "The client needed a complete overhaul of their e-commerce presence. Key challenges included: migrating to a modern platform, improving mobile experience, streamlining the checkout process, integrating with their inventory management system, and maintaining SEO rankings during the transition."
      - generic [ref=e96]:
        - heading "Our Solution" [level=2] [ref=e97]
        - paragraph [ref=e98]: "We built a custom e-commerce solution using Next.js and Shopify, focusing on conversion optimization and user experience. Key improvements included: responsive design with mobile-first approach, streamlined 3-step checkout process, advanced product filtering and search, integrated inventory management, and performance optimization achieving 90+ Lighthouse scores."
      - generic [ref=e101]:
        - heading "Technologies Used" [level=2] [ref=e102]
        - generic [ref=e103]:
          - generic [ref=e104]: Next.js
          - generic [ref=e105]: Shopify
          - generic [ref=e106]: Tailwind CSS
          - generic [ref=e107]: GA4
          - generic [ref=e108]: Hotjar
      - generic [ref=e112]:
        - img [ref=e113]
        - paragraph [ref=e115]: "\"Elevate Digital transformed our online presence completely. Our conversion rate increased by 150% within three months. The team's attention to detail and focus on user experience made all the difference.\""
        - generic [ref=e116]:
          - generic [ref=e117]: Sarah Johnson
          - generic [ref=e118]: CEO, TechStyle Boutique
      - generic [ref=e121]:
        - heading "Services" [level=2] [ref=e122]
        - generic [ref=e123]:
          - generic [ref=e124]: Web Design
          - generic [ref=e125]: E-commerce
          - generic [ref=e126]: UX/UI
          - generic [ref=e127]: Shopify
          - generic [ref=e128]: Next.js
      - generic [ref=e131]:
        - heading "Ready to Achieve Similar Results?" [level=2] [ref=e132]
        - paragraph [ref=e133]: Let's discuss how we can help you achieve your digital marketing goals.
        - link "Start Your Project" [ref=e134] [cursor=pointer]:
          - /url: /en/contact
  - contentinfo [ref=e135]:
    - generic [ref=e136]:
      - generic [ref=e137]:
        - generic [ref=e138]:
          - generic [ref=e139]: Elevate Digital
          - paragraph [ref=e140]: Transform your digital presence with expert web design, SEO, and analytics services. We create experiences that convert visitors into customers.
        - generic [ref=e141]:
          - heading "Quick Links" [level=4] [ref=e142]
          - list [ref=e143]:
            - listitem [ref=e144]:
              - link "Services" [ref=e145] [cursor=pointer]:
                - /url: /en/services
            - listitem [ref=e146]:
              - link "About" [ref=e147] [cursor=pointer]:
                - /url: /en/about
            - listitem [ref=e148]:
              - link "Portfolio" [ref=e149] [cursor=pointer]:
                - /url: /en/portfolio
            - listitem [ref=e150]:
              - link "Pricing" [ref=e151] [cursor=pointer]:
                - /url: /en/pricing
            - listitem [ref=e152]:
              - link "Blog" [ref=e153] [cursor=pointer]:
                - /url: /en/blog
            - listitem [ref=e154]:
              - link "Contact" [ref=e155] [cursor=pointer]:
                - /url: /en/contact
        - generic [ref=e156]:
          - heading "Legal" [level=4] [ref=e157]
          - list [ref=e158]:
            - listitem [ref=e159]:
              - link "Privacy Policy" [ref=e160] [cursor=pointer]:
                - /url: /en/legal/privacy
            - listitem [ref=e161]:
              - link "Terms of Service" [ref=e162] [cursor=pointer]:
                - /url: /en/legal/terms
        - generic [ref=e163]:
          - heading "Follow Us" [level=4] [ref=e164]
          - generic [ref=e165]:
            - link "Follow us on Twitter/X" [ref=e166] [cursor=pointer]:
              - /url: https://twitter.com/elevatedigital
              - img [ref=e167]
            - link "Follow us on LinkedIn" [ref=e169] [cursor=pointer]:
              - /url: https://linkedin.com/company/elevatedigital
              - img [ref=e170]
            - link "Follow us on Instagram" [ref=e172] [cursor=pointer]:
              - /url: https://instagram.com/elevatedigital
              - img [ref=e173]
      - generic [ref=e176]: © 2026 Elevate Digital. All rights reserved.
  - alert [ref=e177]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Portfolio Detail Page', () => {
  4   |   test('should render case study title and description', async ({ page }) => {
  5   |     // Navigate to a specific case study
  6   |     await page.goto('/en/portfolio/ecommerce-redesign');
  7   |     
  8   |     // Verify page title includes case study title
  9   |     await expect(page).toHaveTitle(/E-Commerce Redesign/);
  10  |     
  11  |     // Verify case study title is visible
  12  |     const title = page.locator('h1');
  13  |     await expect(title).toContainText('E-Commerce Redesign');
  14  |     await expect(title).toBeVisible();
  15  |     
  16  |     // Verify description is visible
  17  |     const description = page.getByText(/Complete e-commerce website redesign/);
  18  |     await expect(description).toBeVisible();
  19  |   });
  20  | 
  21  |   test('should display results metrics', async ({ page }) => {
  22  |     await page.goto('/en/portfolio/ecommerce-redesign');
  23  |     
  24  |     // Verify results section heading
  25  |     const resultsHeading = page.getByRole('heading', { name: /Results/i });
  26  |     await expect(resultsHeading).toBeVisible();
  27  |     
  28  |     // Verify metrics are displayed
  29  |     const metrics = page.locator('.text-primary.text-5xl');
  30  |     await expect(metrics.first()).toBeVisible();
  31  |     
  32  |     // Verify specific metric
  33  |     await expect(page.getByText('150%')).toBeVisible();
  34  |   });
  35  | 
  36  |   test('should display client information', async ({ page }) => {
  37  |     await page.goto('/en/portfolio/ecommerce-redesign');
  38  |     
  39  |     // Verify client name is visible
  40  |     const clientName = page.getByText('Client:');
  41  |     await expect(clientName).toBeVisible();
> 42  |     await expect(page.getByText('TechStyle Boutique')).toBeVisible();
      |                                                        ^ Error: expect(locator).toBeVisible() failed
  43  |     
  44  |     // Verify timeline is visible
  45  |     const timeline = page.getByText('Timeline:');
  46  |     await expect(timeline).toBeVisible();
  47  |   });
  48  | 
  49  |   test('should display category badge', async ({ page }) => {
  50  |     await page.goto('/en/portfolio/ecommerce-redesign');
  51  |     
  52  |     // Verify category badge is visible
  53  |     const category = page.locator('span.bg-primary\\/10');
  54  |     await expect(category).toContainText('Web Design');
  55  |     await expect(category).toBeVisible();
  56  |   });
  57  | 
  58  |   test('should display project sections', async ({ page }) => {
  59  |     await page.goto('/en/portfolio/ecommerce-redesign');
  60  |     
  61  |     // Verify project overview section
  62  |     const overviewHeading = page.getByRole('heading', { name: 'Project Overview' });
  63  |     await expect(overviewHeading).toBeVisible();
  64  |     
  65  |     // Verify challenge section
  66  |     const challengeHeading = page.getByRole('heading', { name: 'The Challenge' });
  67  |     await expect(challengeHeading).toBeVisible();
  68  |     
  69  |     // Verify solution section
  70  |     const solutionHeading = page.getByRole('heading', { name: 'Our Solution' });
  71  |     await expect(solutionHeading).toBeVisible();
  72  |   });
  73  | 
  74  |   test('should display technologies used', async ({ page }) => {
  75  |     await page.goto('/en/portfolio/ecommerce-redesign');
  76  |     
  77  |     // Verify technologies heading
  78  |     const techHeading = page.getByRole('heading', { name: 'Technologies Used' });
  79  |     await expect(techHeading).toBeVisible();
  80  |     
  81  |     // Verify technology tags are displayed
  82  |     const techTags = page.locator('.bg-background.border-foreground\\/20');
  83  |     await expect(techTags.first()).toBeVisible();
  84  |   });
  85  | 
  86  |   test('should display testimonial', async ({ page }) => {
  87  |     await page.goto('/en/portfolio/ecommerce-redesign');
  88  |     
  89  |     // Verify testimonial quote is visible
  90  |     const testimonial = page.getByText(/Elevate Digital transformed our online presence/);
  91  |     await expect(testimonial).toBeVisible();
  92  |     
  93  |     // Verify testimonial author
  94  |     const author = page.getByText('Sarah Johnson');
  95  |     await expect(author).toBeVisible();
  96  |     
  97  |     // Verify author role
  98  |     const role = page.getByText('CEO, TechStyle Boutique');
  99  |     await expect(role).toBeVisible();
  100 |   });
  101 | 
  102 |   test('should display services/tags', async ({ page }) => {
  103 |     await page.goto('/en/portfolio/ecommerce-redesign');
  104 |     
  105 |     // Verify services heading
  106 |     const servicesHeading = page.getByRole('heading', { name: 'Services' });
  107 |     await expect(servicesHeading).toBeVisible();
  108 |     
  109 |     // Verify service tags are displayed
  110 |     const serviceTags = page.locator('.bg-background.border-foreground\\/20');
  111 |     await expect(serviceTags.first()).toBeVisible();
  112 |   });
  113 | 
  114 |   test('should have CTA section', async ({ page }) => {
  115 |     await page.goto('/en/portfolio/ecommerce-redesign');
  116 |     
  117 |     // Verify CTA heading
  118 |     const ctaHeading = page.getByRole('heading', { name: 'Ready to Achieve Similar Results?' });
  119 |     await expect(ctaHeading).toBeVisible();
  120 |     
  121 |     // Verify CTA button/link
  122 |     const ctaButton = page.getByRole('link', { name: 'Start Your Project' });
  123 |     await expect(ctaButton).toBeVisible();
  124 |   });
  125 | });
  126 | 
```
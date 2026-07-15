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
    3) <div class="text-foreground/60">CEO, TechStyle Boutique</div> aka getByText('CEO, TechStyle Boutique')

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
      - button "Toggle menu" [ref=e7] [cursor=pointer]:
        - img [ref=e8]
  - main [ref=e10]:
    - generic [ref=e12]:
      - generic [ref=e16]:
        - generic [ref=e18]: Web Design
        - heading "E-Commerce Redesign" [level=1] [ref=e19]
        - paragraph [ref=e20]: Complete e-commerce website redesign resulting in 150% increase in conversions and improved user experience.
        - generic [ref=e21]:
          - generic [ref=e22]:
            - generic [ref=e23]:
              - img "TechStyle Boutique logo" [ref=e24]
              - generic [ref=e25]: "Client: TechStyle Boutique"
            - generic [ref=e26]: "Timeline: 8 weeks"
          - generic [ref=e27]:
            - generic [ref=e28]: "Share:"
            - button "Share on Twitter/X" [ref=e29] [cursor=pointer]:
              - img [ref=e30]
            - button "Share on Facebook" [ref=e32] [cursor=pointer]:
              - img [ref=e33]
            - button "Share on LinkedIn" [ref=e35] [cursor=pointer]:
              - img [ref=e36]
            - button "Share via email" [ref=e38] [cursor=pointer]:
              - img [ref=e39]
      - generic [ref=e44]:
        - generic [ref=e45]:
          - generic [ref=e46]: 150%
          - generic [ref=e47]: Increase in conversions
        - generic [ref=e48]:
          - generic [ref=e49]: 40%
          - generic [ref=e50]: Improvement in page load speed
        - generic [ref=e51]:
          - generic [ref=e52]: 60%
          - generic [ref=e53]: Reduction in bounce rate
        - generic [ref=e54]:
          - generic [ref=e55]: 85%
          - generic [ref=e56]: Increase in mobile traffic
      - generic [ref=e59]:
        - heading "Project Overview" [level=2] [ref=e60]
        - paragraph [ref=e61]: TechStyle Boutique, a fashion retailer, came to us with an outdated e-commerce platform that was struggling to convert visitors. Their website had poor mobile performance, confusing navigation, and a checkout process that caused significant cart abandonment.
      - generic [ref=e64]:
        - heading "The Challenge" [level=2] [ref=e65]
        - paragraph [ref=e66]: "The client needed a complete overhaul of their e-commerce presence. Key challenges included: migrating to a modern platform, improving mobile experience, streamlining the checkout process, integrating with their inventory management system, and maintaining SEO rankings during the transition."
      - generic [ref=e69]:
        - heading "Our Solution" [level=2] [ref=e70]
        - paragraph [ref=e71]: "We built a custom e-commerce solution using Next.js and Shopify, focusing on conversion optimization and user experience. Key improvements included: responsive design with mobile-first approach, streamlined 3-step checkout process, advanced product filtering and search, integrated inventory management, and performance optimization achieving 90+ Lighthouse scores."
      - generic [ref=e74]:
        - heading "Technologies Used" [level=2] [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]: Next.js
          - generic [ref=e78]: Shopify
          - generic [ref=e79]: Tailwind CSS
          - generic [ref=e80]: GA4
          - generic [ref=e81]: Hotjar
      - generic [ref=e85]:
        - img [ref=e86]
        - paragraph [ref=e88]: "\"Elevate Digital transformed our online presence completely. Our conversion rate increased by 150% within three months. The team's attention to detail and focus on user experience made all the difference.\""
        - generic [ref=e89]:
          - generic [ref=e90]: Sarah Johnson
          - generic [ref=e91]: CEO, TechStyle Boutique
      - generic [ref=e94]:
        - heading "Services" [level=2] [ref=e95]
        - generic [ref=e96]:
          - generic [ref=e97]: Web Design
          - generic [ref=e98]: E-commerce
          - generic [ref=e99]: UX/UI
          - generic [ref=e100]: Shopify
          - generic [ref=e101]: Next.js
      - generic [ref=e104]:
        - heading "Ready to Achieve Similar Results?" [level=2] [ref=e105]
        - paragraph [ref=e106]: Let's discuss how we can help you achieve your digital marketing goals.
        - link "Start Your Project" [ref=e107] [cursor=pointer]:
          - /url: /en/contact
  - contentinfo [ref=e108]:
    - generic [ref=e109]:
      - generic [ref=e110]:
        - generic [ref=e111]:
          - generic [ref=e112]: Elevate Digital
          - paragraph [ref=e113]: Transform your digital presence with expert web design, SEO, and analytics services. We create experiences that convert visitors into customers.
        - generic [ref=e114]:
          - heading "Quick Links" [level=4] [ref=e115]
          - list [ref=e116]:
            - listitem [ref=e117]:
              - link "Services" [ref=e118] [cursor=pointer]:
                - /url: /en/services
            - listitem [ref=e119]:
              - link "About" [ref=e120] [cursor=pointer]:
                - /url: /en/about
            - listitem [ref=e121]:
              - link "Portfolio" [ref=e122] [cursor=pointer]:
                - /url: /en/portfolio
            - listitem [ref=e123]:
              - link "Pricing" [ref=e124] [cursor=pointer]:
                - /url: /en/pricing
            - listitem [ref=e125]:
              - link "Blog" [ref=e126] [cursor=pointer]:
                - /url: /en/blog
            - listitem [ref=e127]:
              - link "Contact" [ref=e128] [cursor=pointer]:
                - /url: /en/contact
        - generic [ref=e129]:
          - heading "Legal" [level=4] [ref=e130]
          - list [ref=e131]:
            - listitem [ref=e132]:
              - link "Privacy Policy" [ref=e133] [cursor=pointer]:
                - /url: /en/legal/privacy
            - listitem [ref=e134]:
              - link "Terms of Service" [ref=e135] [cursor=pointer]:
                - /url: /en/legal/terms
        - generic [ref=e136]:
          - heading "Follow Us" [level=4] [ref=e137]
          - generic [ref=e138]:
            - link "Follow us on Twitter/X" [ref=e139] [cursor=pointer]:
              - /url: https://twitter.com/elevatedigital
              - img [ref=e140]
            - link "Follow us on LinkedIn" [ref=e142] [cursor=pointer]:
              - /url: https://linkedin.com/company/elevatedigital
              - img [ref=e143]
            - link "Follow us on Instagram" [ref=e145] [cursor=pointer]:
              - /url: https://instagram.com/elevatedigital
              - img [ref=e146]
      - generic [ref=e149]: © 2026 Elevate Digital. All rights reserved.
  - alert [ref=e150]
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
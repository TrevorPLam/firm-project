# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio-detail.spec.ts >> Portfolio Detail Page >> should render case study title and description
- Location: app\e2e\portfolio-detail.spec.ts:4:7

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /E-Commerce Redesign/
Received string:  "Elevate Digital | Web Design, SEO & Analytics Agency"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    11 × unexpected value "Elevate Digital | Web Design, SEO & Analytics Agency"

```

```yaml
- link "Skip to main content":
  - /url: "#main-content"
- navigation:
  - link "Elevate Digital":
    - /url: /en
  - link "Services":
    - /url: /en/services
  - link "About":
    - /url: /en/about
  - link "Portfolio":
    - /url: /en/portfolio
  - link "Pricing":
    - /url: /en/pricing
  - link "Blog":
    - /url: /en/blog
  - link "Contact":
    - /url: /en/contact
  - button "Search":
    - img
  - button "English":
    - text: English
    - img
  - link "Get Started":
    - /url: /en/contact
- main:
  - text: Web Design
  - heading "E-Commerce Redesign" [level=1]
  - paragraph: Complete e-commerce website redesign resulting in 150% increase in conversions and improved user experience.
  - img "TechStyle Boutique logo"
  - text: "Client: TechStyle Boutique Timeline: 8 weeks Share:"
  - button "Share on Twitter/X":
    - img
  - button "Share on Facebook":
    - img
  - button "Share on LinkedIn":
    - img
  - button "Share via email":
    - img
  - text: 150% Increase in conversions 40% Improvement in page load speed 60% Reduction in bounce rate 85% Increase in mobile traffic
  - heading "Project Overview" [level=2]
  - paragraph: TechStyle Boutique, a fashion retailer, came to us with an outdated e-commerce platform that was struggling to convert visitors. Their website had poor mobile performance, confusing navigation, and a checkout process that caused significant cart abandonment.
  - heading "The Challenge" [level=2]
  - paragraph: "The client needed a complete overhaul of their e-commerce presence. Key challenges included: migrating to a modern platform, improving mobile experience, streamlining the checkout process, integrating with their inventory management system, and maintaining SEO rankings during the transition."
  - heading "Our Solution" [level=2]
  - paragraph: "We built a custom e-commerce solution using Next.js and Shopify, focusing on conversion optimization and user experience. Key improvements included: responsive design with mobile-first approach, streamlined 3-step checkout process, advanced product filtering and search, integrated inventory management, and performance optimization achieving 90+ Lighthouse scores."
  - heading "Technologies Used" [level=2]
  - text: Next.js Shopify Tailwind CSS GA4 Hotjar
  - img
  - paragraph: "\"Elevate Digital transformed our online presence completely. Our conversion rate increased by 150% within three months. The team's attention to detail and focus on user experience made all the difference.\""
  - text: Sarah Johnson CEO, TechStyle Boutique
  - heading "Services" [level=2]
  - text: Web Design E-commerce UX/UI Shopify Next.js
  - heading "Ready to Achieve Similar Results?" [level=2]
  - paragraph: Let's discuss how we can help you achieve your digital marketing goals.
  - link "Start Your Project":
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
- alert
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
> 9   |     await expect(page).toHaveTitle(/E-Commerce Redesign/);
      |                        ^ Error: expect(page).toHaveTitle(expected) failed
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
  42  |     await expect(page.getByText('TechStyle Boutique')).toBeVisible();
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
```
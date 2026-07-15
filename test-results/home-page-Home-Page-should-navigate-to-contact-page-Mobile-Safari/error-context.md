# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home-page.spec.ts >> Home Page >> should navigate to contact page
- Location: app\e2e\home-page.spec.ts:22:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:3000/contact"
Received: "http://localhost:3000/en/contact"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    8 × unexpected value "http://localhost:3000/en"
    3 × unexpected value "http://localhost:3000/en/contact"

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
  - heading "Get in Touch" [level=1]
  - paragraph: Ready to transform your digital presence? We'd love to hear about your project and discuss how we can help you achieve your goals.
  - heading "Send us a message" [level=2]
  - text: Name *
  - textbox "Name *":
    - /placeholder: Your name
  - text: Email *
  - textbox "Email *":
    - /placeholder: your@email.com
  - text: Company
  - textbox "Company":
    - /placeholder: Your company name
  - text: Service Interested In *
  - combobox "Service Interested In *":
    - option "Select a service" [selected]
    - option "Web Design & Development"
    - option "SEO Optimization"
    - option "Analytics & Insights"
    - option "Full Digital Strategy"
    - option "Other"
  - text: Project Budget
  - combobox "Project Budget":
    - option "Select budget range" [selected]
    - option "$5,000 - $10,000"
    - option "$10,000 - $25,000"
    - option "$25,000 - $50,000"
    - option "$50,000+"
  - text: Message *
  - textbox "Message *":
    - /placeholder: Tell us about your project...
  - button "Send Message"
  - heading "Contact Information" [level=2]
  - paragraph: Have questions? Reach out to us directly through any of these channels.
  - img
  - heading "Email" [level=3]
  - link "hello@elevatedigital.com":
    - /url: mailto:hello@elevatedigital.com
  - img
  - heading "Phone" [level=3]
  - link "+1 (234) 567-890":
    - /url: tel:+1234567890
  - img
  - heading "Location" [level=3]
  - paragraph: Available worldwide for remote projects San Francisco, CA
  - img
  - heading "Response Time" [level=3]
  - paragraph: We typically respond within 24 hours For urgent matters, please call us directly
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
- alert: Contact | Elevate Digital
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
> 26 |     await expect(page).toHaveURL('/contact');
     |                        ^ Error: expect(page).toHaveURL(expected) failed
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
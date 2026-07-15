import { test, expect } from '@playwright/test';

test.describe('Portfolio Detail Page', () => {
  test('should render case study title and description', async ({ page }) => {
    // Navigate to a specific case study
    await page.goto('/en/portfolio/ecommerce-redesign');
    
    // Verify page title includes case study title
    await expect(page).toHaveTitle(/E-Commerce Redesign/);
    
    // Verify case study title is visible
    const title = page.locator('h1');
    await expect(title).toContainText('E-Commerce Redesign');
    await expect(title).toBeVisible();
    
    // Verify description is visible
    const description = page.getByText(/Complete e-commerce website redesign/);
    await expect(description).toBeVisible();
  });

  test('should display results metrics', async ({ page }) => {
    await page.goto('/en/portfolio/ecommerce-redesign');
    
    // Verify results section heading
    const resultsHeading = page.getByRole('heading', { name: /Results/i });
    await expect(resultsHeading).toBeVisible();
    
    // Verify metrics are displayed
    const metrics = page.locator('.text-primary.text-5xl');
    await expect(metrics.first()).toBeVisible();
    
    // Verify specific metric
    await expect(page.getByText('150%')).toBeVisible();
  });

  test('should display client information', async ({ page }) => {
    await page.goto('/en/portfolio/ecommerce-redesign');
    
    // Verify client name is visible
    const clientName = page.getByText('Client:');
    await expect(clientName).toBeVisible();
    await expect(page.getByText('TechStyle Boutique')).toBeVisible();
    
    // Verify timeline is visible
    const timeline = page.getByText('Timeline:');
    await expect(timeline).toBeVisible();
  });

  test('should display category badge', async ({ page }) => {
    await page.goto('/en/portfolio/ecommerce-redesign');
    
    // Verify category badge is visible
    const category = page.locator('span.bg-primary\\/10');
    await expect(category).toContainText('Web Design');
    await expect(category).toBeVisible();
  });

  test('should display project sections', async ({ page }) => {
    await page.goto('/en/portfolio/ecommerce-redesign');
    
    // Verify project overview section
    const overviewHeading = page.getByRole('heading', { name: 'Project Overview' });
    await expect(overviewHeading).toBeVisible();
    
    // Verify challenge section
    const challengeHeading = page.getByRole('heading', { name: 'The Challenge' });
    await expect(challengeHeading).toBeVisible();
    
    // Verify solution section
    const solutionHeading = page.getByRole('heading', { name: 'Our Solution' });
    await expect(solutionHeading).toBeVisible();
  });

  test('should display technologies used', async ({ page }) => {
    await page.goto('/en/portfolio/ecommerce-redesign');
    
    // Verify technologies heading
    const techHeading = page.getByRole('heading', { name: 'Technologies Used' });
    await expect(techHeading).toBeVisible();
    
    // Verify technology tags are displayed
    const techTags = page.locator('.bg-background.border-foreground\\/20');
    await expect(techTags.first()).toBeVisible();
  });

  test('should display testimonial', async ({ page }) => {
    await page.goto('/en/portfolio/ecommerce-redesign');
    
    // Verify testimonial quote is visible
    const testimonial = page.getByText(/Elevate Digital transformed our online presence/);
    await expect(testimonial).toBeVisible();
    
    // Verify testimonial author
    const author = page.getByText('Sarah Johnson');
    await expect(author).toBeVisible();
    
    // Verify author role
    const role = page.getByText('CEO, TechStyle Boutique');
    await expect(role).toBeVisible();
  });

  test('should display services/tags', async ({ page }) => {
    await page.goto('/en/portfolio/ecommerce-redesign');
    
    // Verify services heading
    const servicesHeading = page.getByRole('heading', { name: 'Services' });
    await expect(servicesHeading).toBeVisible();
    
    // Verify service tags are displayed
    const serviceTags = page.locator('.bg-background.border-foreground\\/20');
    await expect(serviceTags.first()).toBeVisible();
  });

  test('should have CTA section', async ({ page }) => {
    await page.goto('/en/portfolio/ecommerce-redesign');
    
    // Verify CTA heading
    const ctaHeading = page.getByRole('heading', { name: 'Ready to Achieve Similar Results?' });
    await expect(ctaHeading).toBeVisible();
    
    // Verify CTA button/link
    const ctaButton = page.getByRole('link', { name: 'Start Your Project' });
    await expect(ctaButton).toBeVisible();
  });
});

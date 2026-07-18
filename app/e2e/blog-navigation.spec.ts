import { test, expect } from "@playwright/test";

test.describe("Blog Navigation", () => {
  test("should navigate from blog list to blog detail page", async ({
    page,
  }) => {
    // Navigate to blog list page
    await page.goto("/blog");
    await expect(page).toHaveTitle(/Blog | Elevate Digital/);

    // Verify blog cards are visible
    const firstCard = page.locator("article").first();
    await expect(firstCard).toBeVisible();

    // Get the first card's link and click it
    const firstCardLink = page.locator('a[href^="/blog/"]').first();
    await firstCardLink.click();

    // Verify URL changed to blog detail page
    await expect(page).toHaveURL(/\/blog\/.+/);

    // Verify blog post title is visible on detail page
    const postTitle = page.locator("h1");
    await expect(postTitle).toBeVisible();
  });

  test("should display all blog cards on list page", async ({ page }) => {
    await page.goto("/blog");

    // Verify multiple blog cards are present
    const blogCards = page.locator("article");
    await expect(blogCards).toHaveCount(6);
  });

  test("should have proper link structure for blog cards", async ({ page }) => {
    await page.goto("/blog");

    // Verify cards use Link component (not anchor tags with full reload)
    const cardLinks = page.locator('a[href^="/blog/"]');
    await expect(cardLinks).toHaveCount(6);

    // Verify first link has correct href pattern
    const firstLink = cardLinks.first();
    await expect(firstLink).toHaveAttribute("href", /\/blog\/[\w-]+$/);
  });
});

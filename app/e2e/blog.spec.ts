import { test, expect } from "@playwright/test";

test.describe("Blog List Page", () => {
  test("should render blog list with post titles and categories", async ({
    page,
  }) => {
    await page.goto("/en/blog");

    // Verify page title
    await expect(page).toHaveTitle(/Blog/);

    // Verify hero section
    const hero = page.locator("h1");
    await expect(hero).toContainText("Blog & Insights");

    // Verify blog cards are rendered
    const blogCards = page.locator("article");
    await expect(blogCards).toHaveCount(6);

    // Verify first post has title and category
    const firstCard = blogCards.first();
    const title = firstCard.locator("h3");
    await expect(title).toBeVisible();

    const category = firstCard.locator("span").first();
    await expect(category).toBeVisible();
  });

  test("should display post metadata (date and read time)", async ({
    page,
  }) => {
    await page.goto("/en/blog");

    const firstCard = page.locator("article").first();

    // Verify date and read time are displayed
    const metadata = firstCard.locator(".text-foreground\\/60");
    await expect(metadata).toBeVisible();
  });

  test("should have working links to blog posts", async ({ page }) => {
    await page.goto("/en/blog");

    // Click first blog post link
    const firstLink = page.locator('a[href^="/blog/"]').first();
    await firstLink.click();

    // Verify navigation to detail page
    await expect(page).toHaveURL(/\/blog\/[\w-]+$/);
  });

  test("should display topic clusters section", async ({ page }) => {
    await page.goto("/en/blog");

    // Verify topic clusters heading
    const topicHeading = page.getByRole("heading", {
      name: "Explore by Topic",
    });
    await expect(topicHeading).toBeVisible();

    // Verify topic cards are present
    const topicCards = page.locator('a[href^="/blog?topic="]');
    await expect(topicCards).toHaveCount(5);
  });
});

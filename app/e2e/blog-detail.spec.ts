import { test, expect } from "@playwright/test";

test.describe("Blog Detail Page", () => {
  test("should render blog post title and content", async ({ page }) => {
    // Navigate to a specific blog post
    await page.goto("/en/blog/web-design-trends-2025");

    // Verify page title includes post title
    await expect(page).toHaveTitle(/Web Design Trends/);

    // Verify post title is visible
    const postTitle = page.locator("h1");
    await expect(postTitle).toContainText("Web Design Trends");
    await expect(postTitle).toBeVisible();

    // Verify post content is rendered
    const content = page.locator("article");
    await expect(content).toBeVisible();
  });

  test("should display author information", async ({ page }) => {
    await page.goto("/en/blog/web-design-trends-2025");

    // Verify author name is visible
    const authorName = page.getByText("David Park");
    await expect(authorName).toBeVisible();

    // Verify author role is visible
    const authorRole = page.getByText("UI/UX Designer");
    await expect(authorRole).toBeVisible();
  });

  test("should display post metadata (date and read time)", async ({
    page,
  }) => {
    await page.goto("/en/blog/web-design-trends-2025");

    // Verify date is displayed
    const metadata = page.locator(".text-foreground\\/60");
    await expect(metadata).toContainText("July 10, 2026");

    // Verify read time is displayed
    await expect(metadata).toContainText("5 min read");
  });

  test("should display category badge", async ({ page }) => {
    await page.goto("/en/blog/web-design-trends-2025");

    // Verify category badge is visible
    const category = page.locator("span.bg-primary\\/10");
    await expect(category).toContainText("Web Design");
    await expect(category).toBeVisible();
  });

  test("should display tags", async ({ page }) => {
    await page.goto("/en/blog/web-design-trends-2025");

    // Verify tags section exists
    const tagsSection = page.getByRole("heading", { name: "Services" });
    await expect(tagsSection).toBeVisible();

    // Verify tags are displayed
    const tags = page.locator(".bg-foreground\\/5 span");
    await expect(tags.first()).toBeVisible();
  });

  test("should have back to blog link", async ({ page }) => {
    await page.goto("/en/blog/web-design-trends-2025");

    // Verify back link exists
    const backLink = page.getByRole("link", { name: "Back to Blog" });
    await expect(backLink).toBeVisible();

    // Click back link and verify navigation
    await backLink.click();
    await expect(page).toHaveURL("/en/blog");
  });

  test("should render HTML content correctly", async ({ page }) => {
    await page.goto("/en/blog/web-design-trends-2025");

    // Verify content contains headings
    const headings = page.locator("article h2");
    await expect(headings.first()).toBeVisible();

    // Verify content contains paragraphs
    const paragraphs = page.locator("article p");
    await expect(paragraphs.first()).toBeVisible();
  });
});

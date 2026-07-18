import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Elevate Digital/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("h1");
    await expect(hero).toContainText("Transform Your Digital Presence");
  });

  test("should navigate to services page", async ({ page }) => {
    await page.goto("/");
    const servicesLink = page.getByRole("link", { name: "Services" });
    await servicesLink.click();
    await expect(page).toHaveURL("/services");
  });

  test("should navigate to contact page", async ({ page }) => {
    await page.goto("/");
    const contactLink = page.getByRole("link", { name: "Contact" });
    await contactLink.click();
    await expect(page).toHaveURL("/contact");
  });

  test("should display contact form", async ({ page }) => {
    await page.goto("/");
    const contactButton = page.getByRole("button", {
      name: "Start Your Project",
    });
    await contactButton.click();
    await expect(page).toHaveURL("/contact");

    const form = page.locator("form");
    await expect(form).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";

test.describe("czechowski.tech portfolio smoke tests", () => {
  test("renders hero headline, operator artefact, all four case studies, and verified CTAs with no CV", async ({
    page,
  }) => {
    await page.goto("/");

    // Hero headline & artefact
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "I build edge AI that has to work in the field.",
      })
    ).toBeVisible();

    await expect(page.getByTestId("operator-artefact")).toBeVisible();

    // All four case-study titles
    for (const title of [
      "MiniBand",
      "VoiceOps Map",
      "RackMedic",
      "Developer Platform for live video analytics",
    ]) {
      await expect(
        page.getByRole("heading", { level: 3, name: title })
      ).toBeVisible();
    }

    // Required CTAs with exact hrefs
    await expect(
      page.locator('a[href="mailto:czechowski.contact@gmail.com"]').first()
    ).toBeVisible();
    await expect(
      page
        .locator('a[href="https://www.linkedin.com/in/piotr-czechowski4"]')
        .first()
    ).toBeVisible();
    await expect(
      page.locator('a[href="https://github.com/Piotereko"]').first()
    ).toBeVisible();

    // No CV link or PDF anywhere on the page
    const cvLinks = page.locator(
      'a[href*="cv" i], a[href$=".pdf" i], a:has-text("CV"), button:has-text("CV")'
    );
    await expect(cvLinks).toHaveCount(0);
  });
});

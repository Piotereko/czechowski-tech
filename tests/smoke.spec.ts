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

  test("expands timeline entries inline with accessible controls and keyboard support", async ({
    page,
  }) => {
    await page.goto("/");

    const timeline = page.locator("#timeline");

    // Expandable entry starts collapsed and reveals bullets + links on click
    const rackMedicTrigger = timeline.getByRole("button", {
      name: /RackMedic/i,
    });
    await expect(rackMedicTrigger).toHaveAttribute("aria-expanded", "false");
    const panelId = await rackMedicTrigger.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();

    await rackMedicTrigger.click();
    await expect(rackMedicTrigger).toHaveAttribute("aria-expanded", "true");

    const rackMedicPanel = page.locator(`#${panelId}`);
    await expect(
      rackMedicPanel.getByText(/ESP32-C6/i)
    ).toBeVisible();
    await expect(
      rackMedicPanel.locator('a[href="#rackmedic"]')
    ).toBeVisible();

    // Multiple entries can be open at once, including via keyboard (Enter)
    const pwcTrigger = timeline.getByRole("button", {
      name: /PwC Poland/i,
    });
    await expect(pwcTrigger).toHaveAttribute("aria-expanded", "false");
    await pwcTrigger.focus();
    await page.keyboard.press("Enter");
    await expect(pwcTrigger).toHaveAttribute("aria-expanded", "true");
    await expect(rackMedicTrigger).toHaveAttribute("aria-expanded", "true");
    await expect(timeline.getByText(/AI Builders/i)).toBeVisible();

    // Non-expandable entry (no extra details in site content) is not a button
    await expect(
      timeline.getByText(/Part-time Full Stack AI Developer · Scalentic/i)
    ).toBeVisible();
    await expect(
      timeline.getByRole("button", { name: /Scalentic/i })
    ).toHaveCount(0);
  });
});

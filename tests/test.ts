import { expect, test } from "@playwright/test";
import { loginRoute } from "$lib/utils";

test("index page has expected h1", async ({ page }) => {
  await page.goto(loginRoute);
  await expect(
    page.getByRole("heading", { name: "Welcome to SvelteKit" })
  ).toBeVisible();
});

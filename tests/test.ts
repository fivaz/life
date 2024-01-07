import { expect, test } from '@playwright/test';
import { homeRoute } from '$lib/consts';

test('index page has expected h1', async ({ page }) => {
	await page.goto(homeRoute);
	await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible();
});

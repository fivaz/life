import { expect, test } from '@playwright/test';

import { homeRoute } from '../src/lib/consts';

test('the user can navigate to the homepage', async ({ page }) => {
	await page.goto(homeRoute);

	const createEventButton = page.getByRole('button', { name: 'create event' });
	await expect(createEventButton).toBeVisible();
});

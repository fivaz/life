import { test, expect } from '@playwright/test';
import { loginRoute } from '../src/lib/consts';

test('the user can navigate to the homepage', async ({ page }) => {
	await page.goto(loginRoute);

	const createEventButton = page.getByRole('button', { name: 'create event' });
	await expect(createEventButton).toBeVisible();
});

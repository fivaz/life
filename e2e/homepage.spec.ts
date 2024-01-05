import { test, expect } from '@playwright/test';
import { loginRoute } from '../src/lib/utils';

test('the user can navigate to the login page', async ({ page }) => {
	await page.goto(loginRoute);

	const createEventButton = page.getByRole('button', { name: 'Github' });
	await expect(createEventButton).toBeVisible();
});

import { test, expect } from '@playwright/test';
// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from 'dotenv';
import { loginRoute } from '../src/lib/utils';

config();

const username = process.env.TEST_USERNAME as string;
const password = process.env.TEST_PASSWORD as string;

const authFile = 'playwright/.auth/user.json';

test('authenticate', async ({ page }) => {
	// Perform authentication steps. Replace these actions with your own.
	await page.goto(loginRoute);
	await page.getByRole('button', { name: 'Github' }).click();
	await page.waitForURL('https://github.com/*');
	await page.getByLabel('Username or email address').fill(username);
	await page.getByLabel('Password').fill(password);
	await page.getByRole('button', { name: 'Sign in', exact: true }).click();
	// Wait until the page receives the cookies.
	//
	// Sometimes login flow sets cookies in the process of several redirects.
	// Wait for the final URL to ensure that the cookies are actually set.
	await page.waitForURL(`**/dashboard/home`);
	// Alternatively, you can wait until the page reaches a state where all cookies are set.
	await expect(page.getByRole('button', { name: 'Create event' })).toBeVisible();

	// End of authentication steps.

	await page.context().storageState({ path: authFile });
});

import { expect, test } from '@playwright/test';
// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from 'dotenv';

import { homeRoute, loginRoute } from '../src/lib/consts';

config();

const username = process.env.TEST_USERNAME as string;
const password = process.env.TEST_PASSWORD as string;

const authFile = 'playwright/.auth/user.json';

test('authenticate', async ({ page }) => {
	await page.goto(loginRoute);

	await page.getByLabel('email').fill(username);
	await page.getByLabel('password').fill(password);
	await page.getByRole('button', { exact: true, name: 'Sign in' }).click();

	await page.waitForURL(`**${homeRoute}`);
	await expect(page.getByRole('button', { name: 'Create event' })).toBeVisible();

	await page.context().storageState({ path: authFile });
});

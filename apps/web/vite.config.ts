import 'dotenv/config';

import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

// Import your package.json to get the version
import pkg from './package.json' with { type: 'json' };

// Detect production mode
// eslint-disable-next-line turbo/no-undeclared-env-vars
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
	define: {
		// eslint-disable-next-line turbo/no-undeclared-env-vars
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
		// Inject the version as a global constant
		__APP_VERSION__: JSON.stringify(pkg.version),
	},
	plugins: [
		tailwindcss(),
		// Only include Sentry in production
		...(isProduction
			? [
					sentrySvelteKit({
						sourceMapsUploadOptions: {
							org: 'fivaz-lb',
							project: 'life',
						},
					}),
				]
			: []),
		sveltekit(),
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }],
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
				},
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
				},
			},
		],
	},
});

import 'dotenv/config';

import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Detect production mode
// eslint-disable-next-line turbo/no-undeclared-env-vars
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
	define: {
		// eslint-disable-next-line turbo/no-undeclared-env-vars
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
	},
	plugins: [
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
});

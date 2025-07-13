import 'dotenv/config';

import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	define: {
		'process.env.NODE_ENV': '"production"',
	},
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'fivaz-lb',
				project: 'life',
			},
		}),
		sveltekit(),
		devtoolsJson(),
	],
});

import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	// test: {
	// 	include: ['src/**/*.{test,spec}.{js,ts}'],
	// },
	// build: {
	// 	commonjsOptions: {
	// 		include: [/@life\/shared/, /node_modules/],
	// 	},
	// },
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: 'Life',
				short_name: 'Life',
				description: 'rich-feature day planner',
				theme_color: '#4f46e5',
				background_color: '#ffffff',
			},

			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,avif,woff,woff2}'],

				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},

			devOptions: {
				enabled: false,
				suppressWarnings: true,
				navigateFallback: '/',
				navigateFallbackAllowlist: [/^\/$/],
				type: 'module',
			},
		}),
	],
});

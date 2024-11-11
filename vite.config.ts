import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
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
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2,avif}'],

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

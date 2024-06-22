import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	define: {
		'process.env.NODE_ENV': '"production"',
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			devOptions: {
				enabled: false,
				navigateFallback: '/',
				navigateFallbackAllowlist: [/^\/$/],
				suppressWarnings: true,
				type: 'module',
			},
			injectRegister: false,

			manifest: {
				description: 'life',
				name: 'life',
				short_name: 'life',
				theme_color: '#ffffff',
			},

			pwaAssets: {
				config: true,
				disabled: false,
			},

			registerType: 'autoUpdate',

			workbox: {
				cleanupOutdatedCaches: true,

				clientsClaim: true,
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
			},
		}),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});

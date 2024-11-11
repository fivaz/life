import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'service-worker.ts',
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

			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,avif}'],
			},

			devOptions: {
				enabled: true,
				suppressWarnings: true,
				navigateFallback: '/',
				navigateFallbackAllowlist: [/^\/$/],
				type: 'module',
			},
		}),
	],
});

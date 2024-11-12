import routify from '@roxi/routify/vite-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// const production = process.env.NODE_ENV === 'production'

export default defineConfig({
	clearScreen: false,
	resolve: { alias: { $lib: resolve('src/lib') } },
	envPrefix: 'PUBLIC_',
	plugins: [
		routify({}),
		svelte({
			// TODO check it later
			// compilerOptions: {
			//     dev: !production,
			// },
		}),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: 'life-spa',
				short_name: 'life-spa',
				description: 'life-spa',
				theme_color: '#ffffff',
			},

			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},

			devOptions: {
				enabled: true,
				navigateFallback: 'index.html',
				suppressWarnings: true,
				type: 'module',
			},
		}),
	],

	server: { port: 1337 },
});

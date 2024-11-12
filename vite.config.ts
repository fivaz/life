import routify from '@roxi/routify/vite-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// const production = process.env.NODE_ENV === 'production'

export default defineConfig({
	resolve: { alias: { $lib: resolve('src/lib') } },
	envPrefix: 'PUBLIC_',
	plugins: [
		routify(),
		svelte(),
		VitePWA({
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'sw.ts',
			registerType: 'autoUpdate',
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: 'Life-spa',
				short_name: 'Life-spa',
				description: 'rich-feature day planner',
				theme_color: '#4f46e5',
				background_color: '#ffffff',
			},

			injectManifest: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico,avif}'],
			},

			devOptions: {
				enabled: false,
				navigateFallback: 'index.html',
				suppressWarnings: true,
				type: 'module',
			},
		}),
	],
});

import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'../../packages/shared/src/**/*.{html,js,ts,svelte}',
		'../../packages/svelendar/src/**/*.{html,js,ts,svelte}',
	],
} satisfies Config;

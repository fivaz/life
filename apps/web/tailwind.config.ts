import { tailwindCLasses } from '@life/shared/category';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'../../packages/shared/src/**/*.{html,js,ts,svelte}',
		'../../packages/svelendar/src/**/*.{html,js,ts,svelte}',
	],

	theme: {
		extend: {},
	},

	safelist: tailwindCLasses,
	plugins: [forms, containerQueries],
	darkMode: 'selector',
} satisfies Config;

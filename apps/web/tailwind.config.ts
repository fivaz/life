import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'../../packages/shared/src/**/*.svelte',
		'../../packages/calendar/src/**/*.svelte',
	],

	theme: {
		extend: {},
	},

	plugins: [forms, containerQueries],
} satisfies Config;

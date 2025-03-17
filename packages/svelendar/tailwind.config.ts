import { tailwindCLasses } from '@life/shared/category';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', '../shared/src/**/*.svelte'],
	theme: {
		extend: {},
	},
	safelist: tailwindCLasses,
	plugins: [forms, containerQueries],
	darkMode: 'selector',
} satisfies Config;

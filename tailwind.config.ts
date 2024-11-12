import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	content: ['./index.html', './src/**/*.{svelte,js,ts}'],
	theme: {
		extend: {},
	},
	plugins: [forms, containerQueries],
} satisfies Config;

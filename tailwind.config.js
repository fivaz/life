/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	// eslint-disable-next-line import/no-extraneous-dependencies
	plugins: [require('@tailwindcss/forms')],
	theme: {
		extend: {},
	},
};

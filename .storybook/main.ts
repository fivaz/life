import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		'@storybook/addon-svelte-csf',
	],
	docs: {},
	framework: {
		name: '@storybook/sveltekit',
		options: {},
	},
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx|svelte)'],
};
export default config;

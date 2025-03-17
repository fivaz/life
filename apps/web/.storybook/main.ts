import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.svelte'],
	addons: [
		'@storybook/addon-svelte-csf',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		'@storybook/addon-themes',
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {},
	},
	staticDirs: ['../static'],
};
export default config;

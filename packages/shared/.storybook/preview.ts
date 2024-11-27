import type { Preview } from '@storybook/svelte';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		layout: 'centered'
	},
	args: {
		close: () => console.log('closed')
	},
	tags: ['autodocs']
};

export default preview;

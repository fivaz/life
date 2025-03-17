import '../src/input.css';

import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/svelte';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: 'centered',
	},
	decorators: [
		withThemeByClassName({
			themes: {
				light: '',
				dark: 'dark',
			},
			defaultTheme: 'light',
		}),
	],
	args: {
		close: () => console.log('closed'),
	},
	tags: ['autodocs'],
};

export default preview;

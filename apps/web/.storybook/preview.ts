import '../src/app.css';

import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/sveltekit';
import { fn } from 'storybook/test';

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
		close: fn(),
	},
	tags: ['autodocs'],
};

export default preview;

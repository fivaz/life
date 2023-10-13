import type { Meta, StoryObj } from '@storybook/svelte';

import CalendarNav from './index.svelte';

const meta = {
	component: CalendarNav,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
} satisfies Meta<CalendarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {}
};

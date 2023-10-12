import type { Meta, StoryObj } from '@storybook/svelte';

import CalendarGrid from './index.svelte';

const meta = {
	component: CalendarGrid,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
} satisfies Meta<CalendarGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {}
};

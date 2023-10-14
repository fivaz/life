import type { Meta, StoryObj } from '@storybook/svelte';

import CalendarTimeLabels from './index.svelte';

const meta = {
	component: CalendarTimeLabels,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
} satisfies Meta<CalendarTimeLabels>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {}
};

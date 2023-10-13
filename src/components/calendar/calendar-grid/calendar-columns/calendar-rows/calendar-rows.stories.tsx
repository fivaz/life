import type { Meta, StoryObj } from '@storybook/svelte';

import CalendarRows from './index.svelte';

const meta = {
	component: CalendarRows,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
} satisfies Meta<CalendarRows>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {}
};

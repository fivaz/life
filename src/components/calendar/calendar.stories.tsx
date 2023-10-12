import type { Meta, StoryObj } from '@storybook/svelte';

import Calendar from './index.svelte';

const meta = {
	component: Calendar,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
} satisfies Meta<Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {}
};

import type { Meta, StoryObj } from '@storybook/svelte';

import Calendar3 from './index.svelte';

const meta = {
	component: Calendar3,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
} satisfies Meta<Calendar3>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {}
};

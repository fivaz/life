import type { Meta, StoryObj } from '@storybook/svelte';

import Event from './Event.svelte';

const meta = {
	component: Event,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
} satisfies Meta<Event>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {}
};

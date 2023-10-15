import type { Meta, StoryObj } from '@storybook/svelte';

import EventForm from './EventForm.svelte';

const meta = {
	component: EventForm,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
} satisfies Meta<EventForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {}
};

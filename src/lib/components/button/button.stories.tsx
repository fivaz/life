import type { Meta, StoryObj } from '@storybook/svelte';

import Button from './Button.svelte';

const meta = {
	component: Button,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {}
};

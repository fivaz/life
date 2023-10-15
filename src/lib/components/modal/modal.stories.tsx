import type { Meta, StoryObj } from '@storybook/svelte';

import Modal from './Modal.svelte';

const meta = {
	component: Modal,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
} satisfies Meta<Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {}
};

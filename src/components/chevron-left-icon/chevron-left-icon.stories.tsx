import type { Meta, StoryObj } from '@storybook/svelte';

import ChevronLeftIcon from './index.svelte';

const meta = {
	component: ChevronLeftIcon,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
} satisfies Meta<ChevronLeftIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {}
};

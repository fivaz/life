import type { Meta, StoryObj } from '@storybook/svelte';

import Dashboard from './index.svelte';

const meta = {
	component: Dashboard,
	tags: ['autodocs']
} satisfies Meta<Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

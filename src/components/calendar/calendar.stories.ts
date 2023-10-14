import type { Meta, StoryObj } from '@storybook/svelte';

import BigWrapperDecorator from '$lib/decorators/BigWrapperDecorator.svelte';
import { events } from '$lib/seed/events';
import Calendar from './index.svelte';

const meta = {
	component: Calendar,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {},
	decorators: [() => BigWrapperDecorator as never]
} satisfies Meta<Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		events
	}
};

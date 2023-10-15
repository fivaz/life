import type { Meta, StoryObj } from '@storybook/svelte';

import FullScreenDecorator from '$lib/decorators/FullScreenDecorator.svelte';
import { startOfWeek } from 'date-fns';
import CalendarBody from './CalendarBody.svelte';

const meta = {
	component: CalendarBody,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen'
	},
	argTypes: {},
	decorators: [() => FullScreenDecorator as never]
} satisfies Meta<CalendarBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		currentDate: new Date(),
		weekStart: startOfWeek(new Date())
	}
};

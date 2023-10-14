import type { Meta, StoryObj } from '@storybook/svelte';

import BigWrapperDecorator from '$lib/decorators/BigWrapperDecorator.svelte';
import { events } from '$lib/seed/events';
import { startOfWeek } from 'date-fns';
import CalendarNav from './index.svelte';

const meta = {
	component: CalendarNav,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {},
	decorators: [() => BigWrapperDecorator as never]
} satisfies Meta<CalendarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		currentDate: new Date(),
		weekStart: startOfWeek(new Date()),
		events
	}
};

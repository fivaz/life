import type { Meta, StoryObj } from '@storybook/svelte';

import { startOfWeek } from 'date-fns';
import { events } from '../../../../lib/seed/events';
import CalendarNav from './index.svelte';

const meta = {
	component: CalendarNav,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
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

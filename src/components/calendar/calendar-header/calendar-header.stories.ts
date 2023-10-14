import type { Meta, StoryObj } from '@storybook/svelte';
import { startOfWeek } from 'date-fns';

import CalendarHeader from './index.svelte';

const meta = {
	component: CalendarHeader,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
} satisfies Meta<CalendarHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		currentDate: new Date(),
		weekStart: startOfWeek(new Date())
	}
};

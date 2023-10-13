import type { Meta, StoryObj } from '@storybook/svelte';

import CalendarHeader from './index.svelte';
import { startOfWeek } from 'date-fns';

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
		weekStart: startOfWeek(new Date())
	}
};
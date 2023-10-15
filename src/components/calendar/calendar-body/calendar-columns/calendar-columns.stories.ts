import type { Meta, StoryObj } from '@storybook/svelte';

import BigWrapperDecorator from '$lib/decorators/BigWrapperDecorator.svelte';
import { startOfWeek } from 'date-fns';
import CalendarColumns from './CalendarColumns.svelte';

const meta = {
	component: CalendarColumns,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {},
	decorators: [() => BigWrapperDecorator as never]
} satisfies Meta<CalendarColumns>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		currentDate: new Date(),
		weekStart: startOfWeek(new Date())
	}
};

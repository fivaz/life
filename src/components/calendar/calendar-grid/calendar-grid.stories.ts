import type { Meta, StoryObj } from '@storybook/svelte';

import FullScreenDecorator from '$lib/decorators/FullScreenDecorator.svelte';
import { startOfWeek } from 'date-fns';
import CalendarGrid from './index.svelte';

const meta = {
	component: CalendarGrid,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen'
	},
	argTypes: {},
	decorators: [() => FullScreenDecorator as never]
} satisfies Meta<CalendarGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		currentDate: new Date(),
		weekStart: startOfWeek(new Date())
	}
};

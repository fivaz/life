import type { Meta, StoryObj } from '@storybook/svelte';

import WrapperDecorator from '$lib/seed/WrapperDecorator.svelte';
import { events } from '../../../../../lib/seed/events';
import CalendarRows from './index.svelte';

const meta = {
	component: CalendarRows,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	decorators: [() => WrapperDecorator as never]
} satisfies Meta<CalendarRows>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		events
	}
};

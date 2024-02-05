<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { startOfWeek } from 'date-fns';

	import CalendarHeader from './CalendarHeader.svelte';

	export const meta = {
		argTypes: {},
		component: CalendarHeader,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<CalendarHeader>;
</script>

<Template let:args>
	<CalendarHeader {...args} />
</Template>

<Story
	args={{
		currentDate: new Date(),
		weekStart: startOfWeek(new Date()),
	}}
	name="Primary"
/>

<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { startOfWeek } from 'date-fns';
	import CalendarHeader from './CalendarHeader.svelte';

	export const meta = {
		component: CalendarHeader,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
		argTypes: {},
	} satisfies Meta<CalendarHeader>;
</script>

<Template let:args>
	<CalendarHeader {...args} />
</Template>

<Story
	name="Primary"
	args={{
		currentDate: new Date(),
		weekStart: startOfWeek(new Date()),
	}}
/>

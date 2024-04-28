<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { tasks } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { startOfWeek } from 'date-fns';

	import CalendarBody from './CalendarBody.svelte';

	export const meta = {
		argTypes: {},
		component: CalendarBody,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<CalendarBody>;
</script>

<Template let:args>
	<CalendarBody
		{...args}
		on:createTask={(args) => console.log('createTask', args.detail)}
		on:editTask={(args) => console.log('editTask', args.detail)}
		on:moveEvent={(args) => console.log('moveEvent', args.detail)}
		on:toggleEvent={(args) => console.log('toggleEvent', args.detail)}
		{tasks}
		weekStart={startOfWeek(new Date())}
	/>
</Template>

<Story args={{}} name="Primary" />

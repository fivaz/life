<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { events } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { addDays } from 'date-fns';

	import CalendarColumns from './CalendarColumns.svelte';

	export const meta = {
		argTypes: {},
		component: CalendarColumns,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<CalendarColumns>;
</script>

<Template let:args>
	<CalendarColumns
		{...args}
		dates={Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))}
		on:createTask={(args) => console.log('createTask', args.detail)}
		on:editTask={(args) => console.log('editTask', args.detail)}
		on:moveEvent={(args) => console.log('moveEvent', args.detail)}
		on:toggleEvent={(args) => console.log('toggleEvent', args.detail)}
		selectedDate={new Date()}
		tasks={events}
	/>
</Template>

<Story args={{}} name="Primary" />

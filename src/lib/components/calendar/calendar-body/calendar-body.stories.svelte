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
		on:create={(args) => console.log('create', args)}
		on:edit={(args) => console.log('edit', args)}
		{tasks}
		weekStart={startOfWeek(new Date())}
	/>
</Template>

<Story args={{}} name="Primary" />

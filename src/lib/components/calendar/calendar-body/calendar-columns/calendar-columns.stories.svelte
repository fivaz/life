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
		{events}
	/>
</Template>

<Story args={{}} name="Primary" />

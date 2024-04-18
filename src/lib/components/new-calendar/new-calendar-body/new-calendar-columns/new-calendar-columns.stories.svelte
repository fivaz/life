<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { events } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { addDays } from 'date-fns';

	import NewCalendarColumns from './NewCalendarColumns.svelte';

	export const meta = {
		argTypes: {},
		component: NewCalendarColumns,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewCalendarColumns>;
</script>

<Template let:args>
	<NewCalendarColumns
		{...args}
		dates={Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))}
		{events}
	/>
</Template>

<Story args={{}} name="Primary" />

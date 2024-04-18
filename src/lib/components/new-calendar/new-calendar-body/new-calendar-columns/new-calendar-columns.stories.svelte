<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { addDays, startOfWeek } from 'date-fns';

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
	/>
</Template>

<Story args={{}} name="Primary" />

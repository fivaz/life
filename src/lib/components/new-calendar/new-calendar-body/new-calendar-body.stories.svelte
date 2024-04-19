<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { events } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { startOfWeek } from 'date-fns';

	import NewCalendarBody from './NewCalendarBody.svelte';

	export const meta = {
		argTypes: {},
		component: NewCalendarBody,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewCalendarBody>;
</script>

<Template let:args>
	<NewCalendarBody
		{...args}
		{events}
		on:create={(args) => console.log('create', args)}
		on:edit={(args) => console.log('edit', args)}
		weekStart={startOfWeek(new Date())}
	/>
</Template>

<Story args={{}} name="Primary" />

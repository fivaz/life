<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { tasks } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CalendarRows from './CalendarRows.svelte';

	export const meta = {
		argTypes: {},
		component: CalendarRows,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<CalendarRows>;
</script>

<Template let:args>
	<div class="h-96 w-24">
		<CalendarRows {...args} />
	</div>
</Template>

<Story
	args={{
		events: tasks,
	}}
	name="Primary"
/>

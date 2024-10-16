<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { tasks } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Calendar from './Calendar.svelte';
	export const meta = {
		argTypes: {},
		component: Calendar,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<Calendar>;
</script>

<Template let:args>
	<div class="h-screen">
		<Calendar
			{...args}
			createTask={(date) => console.log('createTask', date)}
			editTask={(task, date) => console.log('editTask', task, date)}
			moveEvent={(event, moveObject) => console.log('moveEvent', event, moveObject)}
			on:toggleEvent={(args) => console.log('toggleEvent', args.detail)}
			{tasks}
		/>
	</div>
</Template>

<Story args={{}} name="Primary" />

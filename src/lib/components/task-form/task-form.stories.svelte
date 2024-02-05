<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { categories } from '$lib/category/seed';
	import { buildEmptyTask } from '$lib/components/task-form/service';
	import { redEvent } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskForm from './TaskForm.svelte';

	export const meta = {
		argTypes: {},
		component: TaskForm,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<TaskForm>;
</script>

<Template let:args>
	<TaskForm {...args} />
</Template>

<Story
	args={{
		categories,
		event: buildEmptyTask(categories),
		form: null,
	}}
	name="Create Event"
/>

<Story
	args={{
		categories,
		event: buildEmptyTask(categories),
		form: null,
	}}
	name="Create ToDo"
/>

<Story
	args={{
		categories,
		event: redEvent,
		form: null,
	}}
	name="Edit event"
/>

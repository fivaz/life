<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { categories } from '$lib/category/seed';
	import { buildEmptyTaskIn, convertToTaskIn } from '$lib/components/task-form/service';
	import { redEvent } from '$lib/task/seed';
	import TaskForm from './TaskForm.svelte';

	export const meta = {
		component: TaskForm,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
		argTypes: {},
	} satisfies Meta<TaskForm>;
</script>

<Template let:args>
	<TaskForm {...args} />
</Template>

<Story
	name="Create Event"
	args={{
		categories,
		form: null,
		event: buildEmptyTaskIn(categories, true),
	}}
/>

<Story
	name="Create ToDo"
	args={{
		categories,
		form: null,
		event: buildEmptyTaskIn(categories, false),
	}}
/>

<Story
	name="Edit event"
	args={{
		categories,
		form: null,
		event: convertToTaskIn(redEvent),
	}}
/>

<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { categories } from '$lib/category/seed';
	import { redEvent } from '$lib/task/seed';
	import { buildEmptyTaskIn } from '../service';
	import { convertToTaskIn } from '../service.js';
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

<script>
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

<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { categories } from '$lib/category/seed';
	import { long } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import { buildEmptyEvent } from '../../../routes/dashboard/home/calendar/service';
	import { buildEmptyToDo } from '../../../routes/dashboard/tasks/service';
	import TaskForm from './TaskForm.svelte';

	export const meta = {
		argTypes: {},
		component: TaskForm,
	} satisfies Meta<TaskForm>;

	</script>

<Template let:args>
	<TaskForm {...args} {categories} on:close={() => console.log('closed')} userId="0" />
</Template>

<Story
	args={{
		targetDate: new Date().toISOString(),
		task: buildEmptyEvent(categories),
	}}
	name="Create Event"
/>

<Story
	args={{
		targetDate: new Date().toISOString(),
		task: long,
	}}
	name="Edit event"
/>

<Story
	args={{
		task: buildEmptyToDo(categories),
	}}
	name="Create ToDo"
/>

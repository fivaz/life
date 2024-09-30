<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { categories } from '$lib/category/seed';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { dialog } from '$lib/components/dialog/service';
	import { buildEmptyEvent, buildEmptyToDo } from '$lib/task/build-utils';
	import { normalWithSubTasks } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskForm from './TaskForm.svelte';

	export const meta = {
		argTypes: {},
		component: TaskForm,
	} satisfies Meta<TaskForm>;
</script>

<Template let:args>
	<Dialog
		cancelText={$dialog.cancelText}
		confirmText={$dialog.confirmText}
		message={$dialog.message}
		resolve={$dialog.resolve}
		show={$dialog.show}
		title={$dialog.title}
	/>

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
		task: normalWithSubTasks,
	}}
	name="Edit event"
/>

<Story
	args={{
		task: buildEmptyToDo(categories),
	}}
	name="Create ToDo"
/>

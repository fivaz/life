<script module lang="ts">
	import { categories } from '$lib/category/seed';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { dialog } from '$lib/components/dialog/service.svelte.js';
	import { buildEmptyEvent, buildEmptyToDo } from '$lib/task/build-utils';
	import { normalWithSubTasks } from '$lib/task/seed';

	import TaskForm from './TaskForm.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { goals } from '$lib/goal/seed';

	const { Story } = defineMeta({
		component: TaskForm,
	});
</script>

{#snippet template(args: any)}
	<Dialog
		cancelText={dialog.value.cancelText}
		confirmText={dialog.value.confirmText}
		message={dialog.value.message}
		resolve={dialog.value.resolve}
		isOpen={dialog.value.show}
		title={dialog.value.title}
	/>
	<div class="w-96">
		<TaskForm {goals} {categories} userId="" close={() => console.log('closed')} {...args} />
	</div>
{/snippet}

<Story
	args={{
		targetDate: new Date().toISOString(),
		task: buildEmptyEvent(categories),
	}}
	name="Create Event"
	children={template}
/>

<Story
	args={{
		targetDate: new Date().toISOString(),
		task: normalWithSubTasks,
	}}
	name="Edit event"
	children={template}
/>

<Story
	args={{
		task: buildEmptyToDo(categories),
	}}
	name="Create ToDo"
	children={template}
/>

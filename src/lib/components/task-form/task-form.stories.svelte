<script module lang="ts">
	import { categories } from '$lib/category/seed';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { dialog } from '$lib/components/dialog/service';
	import { buildEmptyEvent, buildEmptyToDo } from '$lib/task/build-utils';
	import { normalWithSubTasks } from '$lib/task/seed';

	import TaskForm from './TaskForm.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: TaskForm,
	});
</script>

<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any-->
{#snippet template(args: any)}
	<Dialog
		cancelText={$dialog.cancelText}
		confirmText={$dialog.confirmText}
		message={$dialog.message}
		resolve={$dialog.resolve}
		isShown={$dialog.show}
		title={$dialog.title}
	/>
	<div class="w-96">
		<TaskForm {...args} />
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

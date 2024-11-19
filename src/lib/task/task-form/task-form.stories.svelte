<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { categories } from '$lib/category/category.seed';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { dialog } from '$lib/components/dialog/service.svelte.js';
	import { goals } from '$lib/goal/goal.seed';
	import { buildTimedTask, buildUntimedTask } from '$lib/task/build-utils';
	import { normalWithSubTasks } from '$lib/task/task.seed';

	import TaskForm from './TaskForm.svelte';

	const { Story } = defineMeta({
		component: TaskForm,
	});

	import { formatDate } from '$lib/date.utils.svelte.js';
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
		targetDate: formatDate(new Date()),
		task: buildTimedTask(categories),
	}}
	name="Create Event"
	children={template}
/>

<Story
	args={{
		targetDate: formatDate(new Date()),
		task: normalWithSubTasks,
	}}
	name="Edit event"
	children={template}
/>

<Story
	args={{
		task: buildUntimedTask(categories),
	}}
	name="Create ToDo"
	children={template}
/>

<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { categories } from '$lib/category/category.seed';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { dialog } from '$lib/components/dialog/service.svelte';
	import { goals } from '$lib/goal/goal.seed';
	import { buildTimedTask, buildUntimedTask } from '$lib/task/build-utils';
	import { normalWithSubTasks } from '$lib/task/task.seed';

	import TaskForm from './TaskForm.svelte';

	const { Story } = defineMeta({
		component: TaskForm,
	});

	import { formatDate } from '$lib/date.utils.svelte';
</script>

{#snippet template(args: any)}
	<Dialog
		cancelText={dialog.value.cancelText}
		confirmText={dialog.value.confirmText}
		isOpen={dialog.value.show}
		message={dialog.value.message}
		resolve={dialog.value.resolve}
		title={dialog.value.title}
	/>
	<div class="w-96">
		<TaskForm {categories} close={() => console.log('closed')} {goals} userId="" {...args} />
	</div>
{/snippet}

<Story
	name="Create Event"
	args={{
		targetDate: formatDate(new Date()),
		task: buildTimedTask(categories),
	}}
	children={template}
/>

<Story
	name="Edit event"
	args={{
		targetDate: formatDate(new Date()),
		task: normalWithSubTasks,
	}}
	children={template}
/>

<Story
	name="Create ToDo"
	args={{
		task: buildUntimedTask(categories),
	}}
	children={template}
/>

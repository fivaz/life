<script lang="ts" module>
	import { Dialog, dialog } from '@life/shared';
	import { categories } from '@life/shared/category';
	import { formatDate } from '@life/shared/date';
	import { goals } from '@life/shared/goal';
	import { normalWithSubTasks } from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { buildTimedTask, buildUntimedTask } from '$lib/task/build-utils';

	import TaskFormButtom from './TaskFormButtom.svelte';

	const { Story } = defineMeta({
		component: TaskFormButtom,
	});
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
		<TaskFormButtom {categories} close={() => console.log('closed')} {goals} userId="" {...args} />
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

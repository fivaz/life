<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { modal } from '$lib/components/dialog/service';
	import { normalWithSubTasks } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskFormSubTask from './TaskFormSubTask.svelte';
	export const meta = {
		argTypes: {},
		component: TaskFormSubTask,
	} satisfies Meta<TaskFormSubTask>;

	import { convertToTaskIn } from '$lib/task/task-in-utils';
</script>

<Template let:args>
	<Dialog
		cancelText={$modal.cancelText}
		confirmText={$modal.confirmText}
		message={$modal.message}
		resolve={$modal.resolve}
		show={$modal.show}
		title={$modal.title}
	/>

	<div class="w-72">
		<TaskFormSubTask {...args} taskIn={convertToTaskIn(normalWithSubTasks)} />
	</div>
</Template>

<Story args={{}} name="Primary" />

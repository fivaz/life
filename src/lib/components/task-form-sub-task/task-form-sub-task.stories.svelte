<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { modal } from '$lib/components/dialog/service';
	import { convertToTaskIn } from '$lib/components/task-form/service';
	import { done } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskFormSubTask from './TaskFormSubTask.svelte';
	export const meta = {
		argTypes: {},
		component: TaskFormSubTask,
	} satisfies Meta<TaskFormSubTask>;
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

	<TaskFormSubTask {...args} taskIn={convertToTaskIn(done)} />
</Template>

<Story args={{}} name="Primary" />

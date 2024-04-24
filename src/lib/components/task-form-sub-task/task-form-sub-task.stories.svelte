<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { done } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskFormSubTask from './TaskFormSubTask.svelte';

	export const meta = {
		argTypes: {},
		component: TaskFormSubTask,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<TaskFormSubTask>;
</script>

<script>
	import { convertToTaskIn } from '$lib/components/task-form/service';
</script>

<Template let:args>
	<TaskFormSubTask {...args} taskIn={convertToTaskIn(done)} />
</Template>

<Story args={{}} name="Primary" />

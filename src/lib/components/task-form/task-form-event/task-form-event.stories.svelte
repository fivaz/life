<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { normalWithSubTasks } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskFormEvent from './TaskFormEvent.svelte';

	export const meta = {
		argTypes: {},
		component: TaskFormEvent,
	} satisfies Meta<TaskFormEvent>;
</script>

<script>
	import { convertToTaskIn } from '$lib/task/task-in-utils';
</script>

<Template let:args>
	<div class="w-72">
		<TaskFormEvent {...args} taskIn={convertToTaskIn(normalWithSubTasks)} />
	</div>
</Template>

<Story args={{}} name="Primary" />

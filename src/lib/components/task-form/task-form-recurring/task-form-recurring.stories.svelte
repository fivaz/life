<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { normalWithSubTasks } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskFormRecurring from './TaskFormRecurring.svelte';

	export const meta = {
		argTypes: {},
		component: TaskFormRecurring,
	} satisfies Meta<TaskFormRecurring>;
</script>

<script>
	import { convertToTaskIn } from '$lib/task/task-in-utils';
</script>

<Template let:args>
	<div class="w-72">
		<TaskFormRecurring {...args} taskIn={convertToTaskIn(normalWithSubTasks)} />
	</div>
</Template>

<Story args={{}} name="Primary" />

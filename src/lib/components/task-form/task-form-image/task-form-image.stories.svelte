<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { normalWithSubTasks } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskFormImage from './TaskFormImage.svelte';

	export const meta = {
		argTypes: {},
		component: TaskFormImage,
	} satisfies Meta<TaskFormImage>;
</script>

<script>
	import { convertToTaskIn } from '$lib/task/task-in-utils';
</script>

<Template let:args>
	<div class="w-72">
		<TaskFormImage {...args} taskIn={convertToTaskIn(normalWithSubTasks)} />
	</div>
</Template>

<Story args={{}} name="Primary" />

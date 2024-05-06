<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { convertToTaskIn } from '$lib/components/task-form/service';
	import { normalWithSubTasks } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskFormImage from './TaskFormImage.svelte';

	export const meta = {
		argTypes: {},
		component: TaskFormImage,
	} satisfies Meta<TaskFormImage>;
</script>

<Template let:args>
	<div class="w-72">
		<TaskFormImage {...args} taskIn={convertToTaskIn(normalWithSubTasks)} />
	</div>
</Template>

<Story args={{}} name="Primary" />

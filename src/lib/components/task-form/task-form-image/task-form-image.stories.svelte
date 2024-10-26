<script context="module" lang="ts">
	import { normalWithSubTasks } from '$lib/task/seed';
	import TaskFormImage from './TaskFormImage.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: TaskFormImage,
	});
</script>

<script>
	import { convertToTaskIn } from '$lib/task/task-in-utils';
</script>

<Story args={{}} name="Primary">
	<div class="w-72">
		<TaskFormImage file={null} taskIn={convertToTaskIn(normalWithSubTasks)} />
	</div>
</Story>

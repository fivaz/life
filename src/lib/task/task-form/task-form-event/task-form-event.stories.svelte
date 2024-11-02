<script module lang="ts">
	import { normalWithSubTasks } from '$lib/task/seed';
	import { convertToTaskIn } from '$lib/task/task-in-utils';

	import TaskFormEvent from './TaskFormEvent.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: TaskFormEvent,
	});
</script>

<Story args={{}} name="Primary">
	<div class="w-72">
		<TaskFormEvent taskIn={convertToTaskIn(normalWithSubTasks)} />
	</div>
</Story>

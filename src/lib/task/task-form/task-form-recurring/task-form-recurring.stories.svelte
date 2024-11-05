<script module lang="ts">
	import { normalWithSubTasks } from '$lib/task/seed';

	import TaskFormRecurring from './TaskFormRecurring.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: TaskFormRecurring,
	});

	import { convertToTaskIn } from '$lib/task/task-in-utils';

	let taskIn = $state(convertToTaskIn(normalWithSubTasks));
</script>

<Story args={{}} name="Primary">
	<div class="w-72">
		<TaskFormRecurring {taskIn} />
	</div>
</Story>

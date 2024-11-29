<script lang="ts" module>
	import { longRecurring } from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { taskIn } from '$lib/task/task-form/service.svelte';
	import { convertToTaskIn } from '$lib/task/task-in-utils';

	import TaskFormEvent from './TaskFormEvent.svelte';

	const { Story } = defineMeta({
		component: TaskFormEvent,
	});

	taskIn.value = convertToTaskIn(longRecurring);
</script>

<Story name="Primary" args={{}}>
	<div class="rounded-lg bg-indigo-100 p-2">
		<div class="w-72 rounded-lg bg-white p-5">
			<TaskFormEvent />
		</div>
	</div>
</Story>

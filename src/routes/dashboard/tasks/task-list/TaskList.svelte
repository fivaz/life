<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { getTotalDuration } from '$lib/task/time-utils';

import TaskRow from './task-row/TaskRow.svelte';

	export let date: string;
	export let tasks: AnyTask[];
</script>

<li class="rounded-lg border p-1">
	<div class="flex justify-between px-2 font-semibold">
		<div>{date}</div>
		<div>{getTotalDuration(tasks)}</div>
	</div>
	<ul class="flex flex-col gap-1">
		{#each tasks as task (task.id)}
			<TaskRow on:edit {task} />
		{/each}
		<li
			class="relative h-10 rounded-lg border-2 border-dashed border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>
			drop task here
		</li>
	</ul>
</li>

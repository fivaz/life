<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { DATE } from '$lib/consts.js';
	import { getTaskDate } from '$lib/task/time-utils';
	import { CheckBadge } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { format } from 'date-fns';

	// TODO implement this later

	export let tasks: AnyTask[];

	function showDate(task: AnyTask) {
		const date = getTaskDate(task);
		if (!date) {
			return 'N/A';
		}
		return format(date, DATE);
	}
</script>

<ul role="list">
	{#each tasks as task (task)}
		<li class="flex justify-between gap-x-6 py-2">
			<div class="flex gap-3">
				<span class="w-24">{showDate(task)}</span>
				<span>{task.name}</span>
			</div>
			{#if task.isDone}<Icon class="h-6 w-6" src={CheckBadge} />{/if}
		</li>
	{/each}
</ul>

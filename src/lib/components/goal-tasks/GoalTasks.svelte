<script lang="ts">
	import { CheckBadge } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { GoalWithTasks } from '$lib/goal/utils';
	
export let goal: GoalWithTasks;
</script>

<ul role="list" class="divide-y divide-gray-800">
	{#each goal.tasks as task (task)}
		<li class="flex justify-between gap-x-6 py-5">
			<div class="text-sm font-semibold leading-6 text-white">{task.name}</div>
			{#if task.isDone}<Icon src={CheckBadge} class="h-6 w-6 text-white" />{/if}
		</li>
	{/each}
</ul>

<script lang="ts">
	import { CheckBadge } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { GoalWithTasks } from '$lib/goal/utils';

	// TODO implement this later

	export let goal: GoalWithTasks;
</script>

<ul role="list">
	{#each goal.tasks as task (task)}
		<li class="flex justify-between gap-x-6 py-2">
			<div>{task.name}</div>
			{#if task.isDone}<Icon src={CheckBadge} class="h-6 w-6" />{/if}
		</li>
	{/each}
</ul>

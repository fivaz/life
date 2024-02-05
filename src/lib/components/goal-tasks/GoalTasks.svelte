<script lang="ts">
	import type { GoalWithTasks } from '$lib/goal/utils';

	import { CheckBadge } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	// TODO implement this later

	export let goal: GoalWithTasks;
</script>

<ul role="list">
	{#each goal.tasks as task (task)}
		<li class="flex justify-between gap-x-6 py-2">
			<div>{task.name}</div>
			{#if task.isDone}<Icon class="h-6 w-6" src={CheckBadge} />{/if}
		</li>
	{/each}
</ul>

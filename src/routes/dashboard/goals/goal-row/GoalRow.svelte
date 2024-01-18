<script lang="ts">
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '$lib/components/button/Button.svelte';
	import GoalTasks from '$lib/components/goal-tasks/GoalTasks.svelte';
	import type { GGoal, GoalWithTasks } from '$lib/goal/utils';
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	export let goal: GoalWithTasks;

	let dispatch = createEventDispatcher<{ edit: GGoal; remove: GGoal }>();
</script>

<li class={classnames('flex items-center justify-between gap-x-6 rounded-lg p-3 bg-blue-500')}>
	<!--	if is done then add -->
	<div class="flex items-center gap-x-2">
		<div
			class={classnames(
				{ 'line-through': goal.isDone },
				'text-sm font-semibold leading-6 text-gray-50',
			)}
		>
			{goal.name}
		</div>
		<div>
			<GoalTasks {goal} />
		</div>
	</div>

	<div>
		<Button on:click={() => dispatch('edit', goal)} type="button">
			<Icon src={Settings} class="h-4 w-4" />
		</Button>
	</div>
</li>

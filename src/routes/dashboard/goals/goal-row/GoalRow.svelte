<script lang="ts">
	import type { Goal } from '$lib/goal/utils';
	import type { AnyTask } from '$lib/task/utils';

	import Button from '$lib/components/button/Button.svelte';
	import GoalTasks from '$lib/components/goal-tasks/GoalTasks.svelte';
	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
	import { Plus, Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	export let goal: Goal;
	export let tasks: AnyTask[];

	$: tasksCompleted = tasks.reduce((total, task) => total + Number(task.isDone), 0);

	let dispatch = createEventDispatcher<{ add: null; edit: Goal; remove: Goal }>();
</script>

<li class="rounded-lg bg-neutral-100 p-3 text-sm font-semibold leading-6 text-blue-500">
	<div class={'flex items-center justify-between gap-x-6'}>
		<div class={clsx({ 'line-through': goal.isDone })}>
			{goal.name}
		</div>

		<div>
			<Button on:click={() => dispatch('add')} type="button">
				<Icon class="h-4 w-4" src={Plus} />
			</Button>
			<Button on:click={() => dispatch('edit', goal)} type="button">
				<Icon class="h-4 w-4" src={Settings} />
			</Button>
		</div>
	</div>

	<div>
		{#if tasks.length}
			<ProgressBar maxValue={tasks.length} value={tasksCompleted} />
			<GoalTasks {tasks} />
		{:else}
			<div class="text-red-500">No tasks yet</div>
		{/if}
	</div>
</li>

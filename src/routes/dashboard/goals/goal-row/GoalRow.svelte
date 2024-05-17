<script lang="ts">
	import type { Goal } from '$lib/goal/utils';
	import type { AnyTask } from '$lib/task/utils';

	import GoalTasks from '$lib/components/goal-tasks/GoalTasks.svelte';
	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
	import { Plus, Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	export let goal: Goal;
	export let tasks: AnyTask[];

	$: tasksCompleted = tasks.reduce((total, task) => total + Number(task.isDone), 0);

	const dispatch = createEventDispatcher<{ addTask: null; editGoal: Goal }>();
</script>

<li
	class="rounded-lg bg-gray-50 py-3 text-base leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/5"
>
	<div class={'flex items-center justify-between px-3 pb-2'}>
		<div class={clsx('w-[calc(100%-70px)] truncate', { 'line-through': goal.isDone })}>
			{goal.name}
		</div>

		<div>
			<button
				class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				on:click={() => dispatch('addTask')}
				type="button"
			>
				<Icon class="h-4 w-4" src={Plus} />
			</button>
			<button
				class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				on:click={() => dispatch('editGoal', goal)}
				type="button"
			>
				<Icon class="h-4 w-4 text-black" src={Settings} />
			</button>
		</div>
	</div>

	<div class="text-sm">
		{#if tasks.length}
			<ProgressBar maxValue={tasks.length} value={tasksCompleted} />
			<GoalTasks on:editTask {tasks} />
		{:else}
			<div class="px-3 text-red-500">No tasks yet</div>
		{/if}
	</div>
</li>

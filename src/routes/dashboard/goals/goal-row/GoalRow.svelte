<script lang="ts">
	import type { Goal } from '$lib/goal/utils';
	import type { AnyTask } from '$lib/task/utils';

	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
	import { Plus, Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	import GoalIcon from '../goal-form/goal-icon/GoalIcon.svelte';
	import { getIcon } from '../goal-form/goal-icon/service';
	import GoalTasks from './goal-tasks/GoalTasks.svelte';

	export let goal: Goal;
	export let tasks: AnyTask[];

	$: tasksCompleted = tasks.reduce((total, task) => total + Number(task.isDone), 0);

	const dispatch = createEventDispatcher<{ addTask: null; editGoal: Goal }>();

	$: icon = getIcon(goal.icon);
</script>

<li
	class="rounded-lg bg-gray-50 py-3 text-base leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/5"
>
	<div class={'flex items-center justify-between px-3 pb-2'}>
		<div
			class={clsx('flex w-[calc(100%-70px)] items-center gap-2 truncate', {
				'line-through': goal.isDone,
			})}
		>
			<GoalIcon class="h-5 w-5 text-indigo-600" {icon} />
			<span>{goal.name}</span>
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

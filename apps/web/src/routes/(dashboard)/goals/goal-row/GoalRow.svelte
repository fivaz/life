<script lang="ts">
	import { GoalIcon } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { sortTasks } from '@life/shared/task';
	import { ChevronDown, ChevronUp, Plus, Settings2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
	import type { Goal } from '$lib/goal/goal.model';
	import { fetchGoalTasks } from '$lib/task/task.repository';
	import { getCompletedTasks } from '$lib/task/task-utils';

	import GoalTasks from './goal-tasks/GoalTasks.svelte';

	interface Props {
		goal: Goal;
		addTask: () => void;
		editGoal: (goal: Goal) => void;
		editTask: (task: Task) => void;
	}

	let { goal, editGoal, addTask, editTask }: Props = $props();

	let isTaskListOpen = $state(false);

	export function getNumberOfTasks(tasks: Task[]) {
		if (tasks.length === 0) {
			return '';
		}
		if (tasks.length === 1) {
			return '1 task';
		}
		return `${tasks.length} tasks`;
	}

	let tasks = $state<Task[]>([]);

	fetchGoalTasks(goal.id, (rawTasks) => (tasks = sortTasks(rawTasks)));
</script>

<li
	class="rounded-lg bg-gray-50 py-3 text-base leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/5"
>
	<div class="w-full">
		<div class={'flex items-center justify-between px-3 pb-2'}>
			<div
				class="flex w-[calc(100%-70px)] items-center gap-2 truncate"
				class:line-through={goal.isDone}
			>
				<GoalIcon name={goal.icon} class="h-5 w-5 text-indigo-600" />
				<span>{goal.name}</span>
			</div>

			<div>
				<button
					class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					onclick={addTask}
					type="button"
				>
					<Icon class="h-4 w-4" src={Plus} />
				</button>
				<button
					class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					onclick={() => editGoal(goal)}
					type="button"
				>
					<Icon class="h-4 w-4 text-black" src={Settings2} />
				</button>
			</div>
		</div>

		{#if tasks.length}
			<ProgressBar maxValue={tasks.length} value={getCompletedTasks(tasks)} />
			{#if isTaskListOpen}
				<GoalTasks {editTask} {tasks} />
			{/if}
		{/if}
	</div>

	<div class="text-sm">
		{#if tasks.length}
			<button
				class="flex w-full items-end justify-center gap-2 text-base hover:bg-gray-100 hover:underline"
				onclick={() => (isTaskListOpen = !isTaskListOpen)}
			>
				<span>{getNumberOfTasks(tasks)}</span>
				<Icon class="h-4 w-4 animate-bounce" src={isTaskListOpen ? ChevronUp : ChevronDown} />
			</button>
		{:else}
			<div class="w-full px-3 text-center text-red-500">No tasks yet</div>
		{/if}
	</div>
</li>

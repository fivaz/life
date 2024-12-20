<script lang="ts">
	import { GoalIcon } from '@life/shared';
	import { parseDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { sortTasks } from '@life/shared/task';
	import { ChevronDown, ChevronUp, Settings2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { format } from 'date-fns';
	import { CalendarPlus, GitPullRequestCreate } from 'lucide-svelte';

	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
	import type { Goal } from '$lib/goal/goal.model';
	import { fetchGoalTasks } from '$lib/task/task.repository';
	import { getCompletedTasks } from '$lib/task/task-utils';
	import { DATE_FR } from '$lib/utils.svelte';

	import type { HierarchicalGoal } from '../goals-by-parent/service';
	import GoalTasks from './goal-tasks/GoalTasks.svelte';
	// eslint-disable-next-line import/no-self-import
	import GoalRow from './GoalRow.svelte';

	interface Props {
		goal: HierarchicalGoal;
		addGoal?: (goal: Goal) => void;
		addTask: (goal: Goal) => void;
		editGoal: (goal: Goal) => void;
		editTask: (task: Task) => void;
	}

	let { goal, addGoal, editGoal, addTask, editTask }: Props = $props();

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

	function convertToGoal(hierarchicalGoal: HierarchicalGoal): Goal {
		const { children, ...goal } = hierarchicalGoal;
		return goal;
	}
</script>

<div
	class="rounded-lg bg-gray-50 py-3 text-base leading-6 text-gray-900 shadow-sm ring-1 ring-gray-300"
>
	<div class="flex items-center justify-between px-3">
		<div class="flex items-center gap-2" class:line-through={goal.isDone}>
			<GoalIcon name={goal.icon} class="h-5 w-5 text-indigo-600" />
			<span>{goal.name}</span>
		</div>

		<div class="flex items-center justify-center gap-2">
			{#if goal.deadline}
				<span class="text-sm"> {format(parseDate(goal.deadline), DATE_FR)}</span>
			{/if}
			{#if addGoal}
				<button
					class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					onclick={() => addGoal(convertToGoal(goal))}
					type="button"
				>
					<GitPullRequestCreate class="h-4 w-4" />
				</button>
			{/if}

			<button
				class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				onclick={() => addTask(convertToGoal(goal))}
				type="button"
			>
				<CalendarPlus class="h-4 w-4" />
			</button>
			<button
				class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				onclick={() => editGoal(convertToGoal(goal))}
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

	{#if goal.children.length}
		<div class="flex flex-col gap-3 px-2 pt-2">
			{#each goal.children as childGoal (childGoal.id)}
				<GoalRow {addGoal} {addTask} {editGoal} {editTask} goal={childGoal} />
			{/each}
		</div>
	{/if}

	<div class="text-sm">
		{#if tasks.length}
			<button
				class="flex w-full items-end justify-center gap-2 text-base hover:bg-gray-100 hover:underline"
				onclick={() => (isTaskListOpen = !isTaskListOpen)}
			>
				<span>{getNumberOfTasks(tasks)}</span>
				<Icon class="h-4 w-4 animate-bounce" src={isTaskListOpen ? ChevronUp : ChevronDown} />
			</button>
		{/if}
	</div>
</div>

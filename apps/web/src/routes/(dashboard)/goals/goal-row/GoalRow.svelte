<script lang="ts">
	import { Button, GoalIcon, LText } from '@life/shared';
	import { parseDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { sortTasks } from '@life/shared/task';
	import { format } from 'date-fns';
	import {
		CalendarPlus,
		ChevronDownIcon,
		ChevronUpIcon,
		GitPullRequestCreate,
		Settings2Icon,
	} from 'lucide-svelte';

	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
	import type { Goal } from '$lib/goal/goal.model';
	import { buildEmptyGoalWithParent } from '$lib/goal/goal.model';
	import { fetchGoalTasks } from '$lib/task/task.repository';
	import { getCompletedTasks } from '$lib/task/task-utils';
	import { DATE_FR } from '$lib/utils.svelte';

	import GoalFormButton from '../goal-form/GoalForm.svelte';
	import type { HierarchicalGoal } from '../goals-by-parent/service';
	import GoalTasks from './goal-tasks/GoalTasks.svelte';
	// eslint-disable-next-line import/no-self-import
	import GoalRow from './GoalRow.svelte';

	interface Props {
		goal: HierarchicalGoal;
		addTask: (goal: Goal) => void;
		editGoal: (goal: Goal) => void;
		editTask: (task: Task) => void;
		goals: Goal[];
		isHierarchicalView?: boolean;
	}

	let { goal, editGoal, addTask, editTask, goals, isHierarchicalView = false }: Props = $props();

	let isTaskListOpen = $state(false);

	let newChildGoal = $state<Goal>(buildEmptyGoalWithParent(goal.id));

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
	class="flex flex-col gap-2 rounded-lg border border-gray-300 bg-gray-50 p-3 text-base leading-6 shadow-sm dark:border-gray-700 dark:bg-gray-950"
>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2" class:line-through={goal.isDone}>
			<GoalIcon name={goal.icon} class="h-5 w-5 text-indigo-600" />
			<LText>{goal.name}</LText>
		</div>

		<div class="flex items-center justify-center gap-2">
			{#if goal.deadline}
				<LText class="text-sm">{format(parseDate(goal.deadline), DATE_FR)}</LText>
			{/if}
			{#if isHierarchicalView}
				<GoalFormButton color="none" goal={newChildGoal} {goals} padding="px-2 py-1">
					<GitPullRequestCreate class="size-4" />
				</GoalFormButton>
			{/if}

			<Button color="white" onclick={() => addTask(convertToGoal(goal))} padding="px-2 py-1">
				<CalendarPlus class="h-4 w-4" />
			</Button>
			<Button color="white" onclick={() => editGoal(convertToGoal(goal))} padding="px-2 py-1">
				<Settings2Icon class="h-4 w-4" />
			</Button>
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
				<GoalRow {addTask} {editGoal} {editTask} goal={childGoal} {goals} {isHierarchicalView} />
			{/each}
		</div>
	{/if}

	{#if tasks.length}
		<button
			class="flex w-full items-end justify-center gap-2 rounded-md text-base outline-dashed outline-1 outline-gray-300 hover:bg-gray-100 hover:underline dark:outline-gray-700 hover:dark:bg-gray-900"
			onclick={() => (isTaskListOpen = !isTaskListOpen)}
		>
			<LText>{getNumberOfTasks(tasks)}</LText>
			<LText>
				{#if isTaskListOpen}
					<ChevronUpIcon class="size-4 animate-bounce"></ChevronUpIcon>
				{:else}
					<ChevronDownIcon class="size-4 animate-bounce"></ChevronDownIcon>
				{/if}
			</LText>
		</button>
	{/if}
</div>

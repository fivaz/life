<script lang="ts">
	import { IconRender, LText } from '@life/shared';
	import { parseDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { sortTasks } from '@life/shared/task';
	import { format } from 'date-fns';
	import {
		CalendarPlusIcon,
		ChevronDownIcon,
		ChevronUpIcon,
		GitPullRequestCreateIcon,
		Settings2Icon,
	} from 'lucide-svelte';

	import { categories } from '$lib/category/category.svelte';
	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
	import type { Goal } from '$lib/goal/goal.model';
	import { buildEmptyGoalWithParent, removeGoalChildren } from '$lib/goal/goal.model';
	import { buildTimedTask } from '$lib/task/build-utils';
	import { fetchGoalTasks } from '$lib/task/task.repository';
	import TaskFormButton from '$lib/task/task-form/TaskFormButton.svelte';
	import { getCompletedTasks } from '$lib/task/task-utils';
	import { DATE_FR } from '$lib/utils.svelte';

	import GoalFormButtonButton from '../goal-form/GoalFormButton.svelte';
	import type { HierarchicalGoal } from '../goals-by-parent/service';
	import GoalTasks from './goal-tasks/GoalTasks.svelte';
	// eslint-disable-next-line import/no-self-import
	import GoalRow from './GoalRow.svelte';

	interface Props {
		goal: HierarchicalGoal;
		isHierarchicalView?: boolean;
	}

	let { goal, isHierarchicalView = false }: Props = $props();

	let isTaskListOpen = $state(false);

	let newChildGoal = $state<Goal>(buildEmptyGoalWithParent(goal.id));

	let newGoalTask = $state<Task>(buildTimedTask(categories.value, removeGoalChildren(goal)));

	$effect(() => {
		newGoalTask = buildTimedTask(categories.value, removeGoalChildren(goal));
	});

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

<div
	class="flex flex-col gap-2 rounded-lg border border-gray-300 bg-gray-50 p-3 text-base leading-6 shadow dark:border-gray-700 dark:bg-gray-900"
>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2 truncate">
			<IconRender name={goal.icon} class="size-5 text-indigo-600" />
			<LText class="truncate {goal.isDone ? 'line-through' : ''}">{goal.name}</LText>
		</div>

		<div class="flex items-center justify-center gap-2">
			{#if goal.deadline}
				<LText class="text-sm">{format(parseDate(goal.deadline), DATE_FR)}</LText>
			{/if}
			{#if isHierarchicalView}
				<GoalFormButtonButton color="dark" goal={newChildGoal} padding="px-2 py-1">
					<GitPullRequestCreateIcon class="size-4" />
				</GoalFormButtonButton>
			{/if}

			<TaskFormButton color="dark" padding="px-2 py-1" task={newGoalTask}>
				<CalendarPlusIcon class="size-4" />
			</TaskFormButton>

			<GoalFormButtonButton color="dark" {goal} padding="px-2 py-1">
				<Settings2Icon class="size-4" />
			</GoalFormButtonButton>
		</div>
	</div>

	{#if tasks.length}
		<ProgressBar maxValue={tasks.length} value={getCompletedTasks(tasks)} />
		{#if isTaskListOpen}
			<GoalTasks {tasks} />
		{/if}
	{/if}

	{#if goal.children.length}
		<div class="flex flex-col gap-3 px-2 pt-2">
			{#each goal.children as childGoal (childGoal.id)}
				<GoalRow goal={childGoal} {isHierarchicalView} />
			{/each}
		</div>
	{/if}

	{#if tasks.length}
		<button
			class="flex w-full items-end justify-center gap-2 divide-gray-400 rounded-md border border-dashed border-gray-400 text-base hover:bg-gray-50 dark:divide-gray-700 dark:border-gray-700 dark:hover:bg-gray-800"
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

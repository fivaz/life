<script lang="ts">
	import { Button, Modal } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { DocumentText } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CalendarArrowDown, CalendarArrowDownIcon, ListTree, Plus } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';
	import { fetchCategories } from '$lib/category/category.respository';
	import type { Goal } from '$lib/goal/goal.model';
	import { buildEmptyGoal } from '$lib/goal/goal.model';
	import { fetchGoals } from '$lib/goal/goal.repository';
	import { buildTimedTask, buildUntimedTask } from '$lib/task/build-utils';
	import TaskForm from '$lib/task/task-form/TaskForm.svelte';
	import { title } from '$lib/utils.svelte';

	import GoalForm from './goal-form/GoalForm.svelte';
	import GoalRow from './goal-row/GoalRow.svelte';
	import GoalsByDeadline from './goals-by-deadline/GoalsByDeadline.svelte';
	import GoalsByParent from './goals-by-parent/GoalsByParent.svelte';
	import { sortGoalsByDate } from './service';

	let editingGoal = $state<Goal>(buildEmptyGoal());

	let editingTask = $state<Task>(buildUntimedTask([]));

	let isFormOpen = $state<boolean>(false);

	let isTaskFormOpen = $state<boolean>(false);

	title.value = 'Goals';

	function openForm(goal = buildEmptyGoal()) {
		isFormOpen = true;
		editingGoal = goal;
	}

	let goals = $state<Goal[]>([]);

	fetchGoals(goals);

	let categories = $state<Category[]>([]);

	fetchCategories(categories);

	function onAddTask(goal: Goal) {
		isTaskFormOpen = true;
		editingTask = buildTimedTask(categories, goal);
	}

	function onEditTask(task: Task) {
		isTaskFormOpen = true;
		editingTask = task;
	}

	let isParentView = $state(true);
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>

		<div class="flex items-center justify-between gap-5 md:grow-0">
			<button
				class="rounded bg-white p-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				onclick={() => (isParentView = !isParentView)}
				type="button"
			>
				{#if isParentView}
					<CalendarArrowDown class="h-5 w-5" />
				{:else}
					<ListTree class="h-5 w-5" />
				{/if}
			</button>

			<div class="h-7 border-r border-gray-300"></div>

			<Button onclick={() => openForm()}>
				<Plus class="h-4 w-auto" />
				New Goal
			</Button>
		</div>
	</div>

	{#if isParentView}
		<GoalsByParent addTask={onAddTask} editGoal={openForm} editTask={onEditTask} {goals} />
	{:else}
		<GoalsByDeadline addTask={onAddTask} editGoal={openForm} editTask={onEditTask} {goals} />
	{/if}

	<Modal bind:isOpen={isTaskFormOpen}>
		<TaskForm {categories} close={() => (isTaskFormOpen = false)} {goals} task={editingTask} />
	</Modal>

	<Modal bind:isOpen={isFormOpen}>
		<GoalForm close={() => (isFormOpen = false)} goal={editingGoal} {goals} />
	</Modal>
</div>

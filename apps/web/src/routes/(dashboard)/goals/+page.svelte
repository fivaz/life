<script lang="ts">
	import { Button, LText, Modal } from '@life/shared';
	import { sortGoals } from '@life/shared/goal';
	import type { Task } from '@life/shared/task';
	import { CalendarArrowDown, ListTree, Plus } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';
	import { fetchCategories } from '$lib/category/category.respository';
	import type { Goal } from '$lib/goal/goal.model';
	import { buildEmptyGoal, buildEmptyGoalWithParent } from '$lib/goal/goal.model';
	import { fetchGoals } from '$lib/goal/goal.repository';
	import { buildTimedTask, buildUntimedTask } from '$lib/task/build-utils';
	import TaskForm from '$lib/task/task-form/TaskForm.svelte';
	import { title } from '$lib/utils.svelte';

	import GoalForm from './goal-form/GoalForm.svelte';
	import GoalsByDeadline from './goals-by-deadline/GoalsByDeadline.svelte';
	import GoalsByParent from './goals-by-parent/GoalsByParent.svelte';

	let editingGoal = $state<Goal>(buildEmptyGoal());

	let editingTask = $state<Task>(buildUntimedTask([]));

	let isFormOpen = $state<boolean>(true);

	let isTaskFormOpen = $state<boolean>(false);

	title.value = 'Goals';

	let goals = $state<Goal[]>([]);

	fetchGoals((unsortedGoals) => (goals = sortGoals(unsortedGoals)));

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

	function onAddRootGoal() {
		isFormOpen = true;
		editingGoal = buildEmptyGoal();
	}

	function onAddGoal(goal: Goal) {
		isFormOpen = true;
		editingGoal = buildEmptyGoalWithParent(goal.id);
	}

	function onEditGoal(goal: Goal) {
		isFormOpen = true;
		editingGoal = goal;
	}

	let isSmartView = $state(true);
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<LText class="hidden text-2xl font-bold md:block">{title.value}</LText>

		<div class="flex items-center justify-between gap-5 md:grow-0">
			<Button color="white" onclick={() => (isSmartView = !isSmartView)} padding="p-1.5">
				{#if isSmartView}
					<ListTree class="h-5 w-5" />
				{:else}
					<CalendarArrowDown class="h-5 w-5" />
				{/if}
			</Button>

			<div class="h-7 border-r border-gray-300 dark:border-gray-700"></div>

			<Button onclick={() => onAddRootGoal()}>
				<Plus class="h-4 w-auto" />
				New Goal
			</Button>
		</div>
	</div>

	{#if isSmartView}
		<GoalsByDeadline addTask={onAddTask} editGoal={onEditGoal} editTask={onEditTask} {goals} />
	{:else}
		<GoalsByParent
			addGoal={onAddGoal}
			addTask={onAddTask}
			editGoal={onEditGoal}
			editTask={onEditTask}
			{goals}
		/>
	{/if}

	<Modal bind:isOpen={isTaskFormOpen}>
		<TaskForm {categories} close={() => (isTaskFormOpen = false)} {goals} task={editingTask} />
	</Modal>

	<Modal bind:isOpen={isFormOpen}>
		<GoalForm close={() => (isFormOpen = false)} goal={editingGoal} {goals} />
	</Modal>
</div>

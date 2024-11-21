<script lang="ts">
	import { orderBy } from 'firebase/firestore';
	import { Plus } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';
	import { fetchCategories } from '$lib/category/category.respository';
	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';
	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { DB_PATH } from '$lib/consts';
	import { title } from '$lib/date.utils.svelte';
	import type { Goal } from '$lib/goal/goal.model';
	import { buildEmptyGoal } from '$lib/goal/goal.model';
	import { fetchGoals } from '$lib/goal/goal.repository';
	import { buildTimedTask, buildUntimedTask } from '$lib/task/build-utils';
	import type { Task } from '$lib/task/task.model';
	import { taskSchema } from '$lib/task/task.model';
	import TaskForm from '$lib/task/task-form/TaskForm.svelte';

	import GoalForm from './goal-form/GoalForm.svelte';
	import GoalRow from './goal-row/GoalRow.svelte';
	import { sortGoalsByDate } from './service';

	let editingGoal = $state<Goal>(buildEmptyGoal());

	let editingTask = $state<Task>(buildUntimedTask([]));

	let isFormOpen = $state<boolean>(false);

	let isTaskFormOpen = $state<boolean>(false);

	let taskType: Task;

	title.value = 'Goals';

	function openForm(goal = buildEmptyGoal()) {
		isFormOpen = true;
		editingGoal = goal;
	}

	let goals = $state<Goal[]>([]);

	fetchGoals(goals, orderBy('deadline'));

	let goalsByDate = $derived(sortGoalsByDate(goals));

	let categories = $state<Category[]>([]);

	fetchCategories(categories);
</script>

<div class="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>
		<span></span>
		<Button onclick={() => openForm()}>
			<Plus class="h-4 w-auto" />
			New Goal
		</Button>
	</div>

	<div class="flex flex-col gap-5">
		<ul class="divide-y divide-gray-100">
			{#each goalsByDate as date (date)}
				<div class="flex justify-between p-2 font-semibold">{date}</div>
				<div class="flex flex-col gap-3">
					{#each goalsByDate[date] as goal (goal.id)}
						<!--TODO replace it here too with a Object key goalId value list of tasks-->
						<DBCollection
							schema={taskSchema}
							segment="{DB_PATH.GOALS}/{goal.id}/{DB_PATH.TASKS}"
							type={taskType}
						>
							{#snippet data(tasks)}
								<GoalRow
									addTask={() => {
										isTaskFormOpen = true;
										editingTask = buildTimedTask(categories, goal);
									}}
									editGoal={openForm}
									editTask={(task) => {
										isTaskFormOpen = true;
										editingTask = task;
									}}
									{goal}
									{tasks}
								/>
							{/snippet}
						</DBCollection>
					{/each}
				</div>
			{/each}

			<Modal bind:isOpen={isTaskFormOpen}>
				<TaskForm {categories} close={() => (isTaskFormOpen = false)} {goals} task={editingTask} />
			</Modal>
		</ul>

		<Modal bind:isOpen={isFormOpen}>
			<GoalForm close={() => (isFormOpen = false)} goal={editingGoal} />
		</Modal>
	</div>
</div>

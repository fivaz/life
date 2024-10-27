<script lang="ts">
	import { type Goal } from '$lib/goal/utils';
	import type { Task } from '$lib/task/utils';

	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { DB_PATH } from '$lib/consts';
	import { buildEmptyEvent, buildEmptyToDo } from '$lib/task/build-utils';
	import { title } from '$lib/utils.svelte';

	import GoalForm from './goal-form/GoalForm.svelte';
	import GoalRow from './goal-row/GoalRow.svelte';
	import { buildEmptyGoal, sortGoalsByDate } from './service';
	import { Plus } from 'lucide-svelte';
	import DBGoals from '$lib/goal/DBGoals.svelte';
	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';
	import DBCategories from '$lib/category/DBCategories.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';

	let editingGoal = $state(buildEmptyGoal());

	let editingTask: Task = $state(buildEmptyToDo([]));

	let showForm = $state(false);

	let isTaskFormOpen = $state(false);

	let taskType: Task;

	function handleEditGoal(goal: Goal) {
		showForm = true;
		editingGoal = goal;
	}
</script>

<DBCategories>
	{#snippet data(categories, userId)}
		<div class="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>
				<span></span>
				<Button
					onclick={() => {
						showForm = true;
						editingGoal = buildEmptyGoal();
					}}
				>
					<Plus class="h-4 w-auto" />
					New Goal
				</Button>
			</div>
			<div class="flex flex-col gap-5">
				<ul class="divide-y divide-gray-100" role="list">
					<DBGoals>
						{#snippet data(goals)}
							{@const goalsByDate = sortGoalsByDate(goals)}

							{#each goalsByDate as date (date)}
								<div class="flex justify-between p-2 font-semibold">{date}</div>
								<div class="flex flex-col gap-3">
									{#each goalsByDate[date] as goal (goal)}
										<DBCollection
											collection="{DB_PATH.GOALS}/{goal.id}/{DB_PATH.TASKS}"
											type={taskType}
										>
											{#snippet data(tasks)}
												<GoalRow
													{goal}
													addTask={() => {
														isTaskFormOpen = true;
														editingTask = buildEmptyEvent(categories, goal);
													}}
													editGoal={(goal) => handleEditGoal(goal)}
													editTask={(task) => {
														isTaskFormOpen = true;
														editingTask = task;
													}}
													{tasks}
												/>
											{/snippet}
										</DBCollection>
									{/each}
								</div>
							{/each}

							<Modal bind:isOpen={isTaskFormOpen}>
								<TaskForm
									{userId}
									{categories}
									{goals}
									close={() => (isTaskFormOpen = false)}
									task={editingTask}
								/>
							</Modal>
						{/snippet}
					</DBGoals>
				</ul>

				<Modal bind:isOpen={showForm}>
					<GoalForm goal={editingGoal} close={() => (showForm = false)} {userId} />
				</Modal>
			</div>
		</div>
	{/snippet}
</DBCategories>

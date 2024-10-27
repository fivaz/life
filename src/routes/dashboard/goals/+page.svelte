<script lang="ts">
	import type { Goal } from '$lib/goal/utils';
	import type { Task } from '$lib/task/utils';

	import { type Category } from '$lib/category/utils';
	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskFormWrapper from '$lib/components/task-form-wrapper/TaskFormWrapper.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import { buildEmptyEvent, buildEmptyToDo } from '$lib/task/build-utils';
	import { title } from '$lib/utils';
	import AuthGuard from '$lib/components/auth-guard/AuthGuard.svelte';

	import GoalForm from './goal-form/GoalForm.svelte';
	import GoalRow from './goal-row/GoalRow.svelte';
	import { buildEmptyGoal, sortGoalsByDate } from './service';
	import { Plus } from 'lucide-svelte';

	let editingGoal = $state(buildEmptyGoal());

	let editingTask: Task = $state(buildEmptyToDo([]));

	let showForm = $state(false);

	let showTaskForm = $state(false);

	let goalType: Goal;

	let taskType: Task;

	let categoryType: Category;

	function handleEditGoal(goal: Goal) {
		showForm = true;
		editingGoal = goal;
	}

	title.set('Goals');
</script>

<div class="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{$title}</h1>
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

	<AuthGuard>
		{#snippet data(user)}
			<TypedCollection
				ref={`${DB_PATH.USERS}/${user.uid}/${DB_PATH.CATEGORIES}`}
				type={categoryType}
			>
				{#snippet data(categories)}
					<div class="flex flex-col gap-5">
						<ul class="divide-y divide-gray-100" role="list">
							<TypedCollection
								ref={`${DB_PATH.USERS}/${user.uid}/${DB_PATH.GOALS}`}
								type={goalType}
							>
								{#snippet data(goals)}
									{@const goalsByDate = sortGoalsByDate(goals)}

									{#each goalsByDate as date (date)}
										<div class="flex justify-between p-2 font-semibold">{date}</div>
										<div class="flex flex-col gap-3">
											{#each goalsByDate[date] as goal (goal)}
												<TypedCollection
													ref="{DB_PATH.USERS}/{user.uid}/{DB_PATH.GOALS}/{goal.id}/{DB_PATH.TASKS}"
													type={taskType}
												>
													{#snippet data(tasks)}
														<GoalRow
															{goal}
															addTask={() => {
																showTaskForm = true;
																editingTask = buildEmptyEvent(categories, goal);
															}}
															editGoal={(goal) => handleEditGoal(goal)}
															editTask={(task) => {
																showTaskForm = true;
																editingTask = task;
															}}
															{tasks}
														/>
													{/snippet}
												</TypedCollection>
											{/each}
										</div>
									{/each}
									<TaskFormWrapper
										bind:isOpen={showTaskForm}
										{categories}
										{editingTask}
										{goals}
										userId={user.uid}
									/>
								{/snippet}
							</TypedCollection>
						</ul>

						<Modal close={() => (showForm = false)} isOpen={showForm}>
							<GoalForm goal={editingGoal} close={() => (showForm = false)} userId={user.uid} />
						</Modal>
					</div>
				{/snippet}
			</TypedCollection>
		{/snippet}
	</AuthGuard>
</div>

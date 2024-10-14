<script lang="ts">
	import type { Goal } from '$lib/goal/utils';
	import type { AnyTask } from '$lib/task/utils';

	import { type Category } from '$lib/category/utils';
	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskFormWrapper from '$lib/components/task-form-wrapper/TaskFormWrapper.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { DbPaTH } from '$lib/consts';
	import { buildEmptyEvent, buildEmptyToDo } from '$lib/task/build-utils';
	import { SignedIn } from 'sveltefire';

	import GoalForm from './goal-form/GoalForm.svelte';
	import GoalRow from './goal-row/GoalRow.svelte';
	import { buildEmptyGoal, sortGoalsByDate } from './service';

	let editingGoal = buildEmptyGoal();

	let editingTask: AnyTask = buildEmptyToDo([]);

	let showForm = false;

	let showTaskForm = false;

	let goalType: Goal;

	let taskType: AnyTask;

	let categoryType: Category;

	function handleEditGoal(goal: Goal) {
		showForm = true;
		editingGoal = goal;
	}
</script>

<div class="py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SignedIn let:user>
			<TypedCollection
				let:data={categories}
				ref={`${DbPaTH.USERS}/${user.uid}/${DbPaTH.CATEGORIES}`}
				type={categoryType}
			>
				<div class="flex flex-col gap-5">
					<div class="flex items-center justify-between">
						<h1 class="text-lg font-semibold leading-7 text-gray-900">Goals</h1>
						<Button
							on:click={() => {
								showForm = true;
								editingGoal = buildEmptyGoal();
							}}
						>
							Create Goal
						</Button>
					</div>

					<ul class="divide-y divide-gray-100" role="list">
						<TypedCollection
							let:data={goals}
							ref={`${DbPaTH.USERS}/${user.uid}/${DbPaTH.GOALS}`}
							type={goalType}
						>
							{@const goalsByDate = sortGoalsByDate(goals)}

							{#each goalsByDate as date (date)}
								<div class="flex justify-between p-2 font-semibold">{date}</div>
								<div class="flex flex-col gap-3">
									{#each goalsByDate[date] as goal (goal)}
										<TypedCollection
											let:data={tasks}
											ref="{DbPaTH.USERS}/{user.uid}/{DbPaTH.GOALS}/{goal.id}/{DbPaTH.TASKS}"
											type={taskType}
										>
											<GoalRow
												{goal}
												on:addTask={() => {
													showTaskForm = true;
													editingTask = buildEmptyEvent(categories, goal);
												}}
												on:editGoal={(e) => handleEditGoal(e.detail)}
												on:editTask={(e) => {
													showTaskForm = true;
													editingTask = e.detail;
												}}
												{tasks}
											/>
										</TypedCollection>
									{/each}
								</div>
							{/each}
							<TaskFormWrapper
								bind:show={showTaskForm}
								{categories}
								{editingTask}
								{goals}
								userId={user.uid}
							/>
						</TypedCollection>
					</ul>

					<Modal on:close={() => (showForm = false)} show={showForm}>
						<GoalForm goal={editingGoal} on:close={() => (showForm = false)} userId={user.uid} />
					</Modal>
				</div>
			</TypedCollection>
		</SignedIn>
	</div>
</div>

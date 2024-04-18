<script lang="ts">
	import type { Goal } from '$lib/goal/utils';
	import type { AnyTask } from '$lib/task/utils';

	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { SignedIn } from 'sveltefire';

	import GoalForm from './goal-form/GoalForm.svelte';
	import GoalRow from './goal-row/GoalRow.svelte';
	import { buildEmptyGoal, groupGoalsByDate } from './service';

	let editingGoal = buildEmptyGoal();

	let showForm = false;

	let goalType: Goal;

	let taskType: AnyTask;
</script>

<div class="py-4">
	<SignedIn let:user>
		<TypedCollection let:data={goals} ref={`users/${user.uid}/goals`} type={goalType}>
			<div class="flex flex-col gap-5">
				<div class="flex justify-end">
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
					{#each Object.entries(groupGoalsByDate(goals)) as [date, list] (date)}
						<div class="flex justify-between px-2">
							<div>{date}</div>
						</div>
						<div class="flex flex-col gap-2">
							{#each list as goal (goal)}
								<TypedCollection
									let:data={tasks}
									ref="users/{user.uid}/goals/{goal.id}/tasks"
									type={taskType}
								>
									<GoalRow
										{goal}
										on:edit={(e) => {
											showForm = true;
											editingGoal = e.detail;
										}}
										{tasks}
									/>
								</TypedCollection>
							{/each}
						</div>
					{/each}
				</ul>

				<Modal on:close={() => (showForm = false)} show={showForm}>
					<GoalForm goal={editingGoal} on:close={() => (showForm = false)} userId={user.uid} />
				</Modal>
			</div>
		</TypedCollection>
	</SignedIn>
</div>

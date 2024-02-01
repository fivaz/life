<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import SlimCollection from '$lib/components/slim-collection/SlimCollection.svelte';
	import type { Goal } from '$lib/goal/utils';
	import { SignedIn } from 'sveltefire';
	import GoalForm from './goal-form/GoalForm.svelte';
	import GoalRow from './goal-row/GoalRow.svelte';
	import { buildEmptyGoal, groupGoalsByDate } from './service';

	let editingGoal = buildEmptyGoal();

	let showForm = false;

	function parseGoals(goalsCollection: Array<Goal & Record<string, string>>): Goal[] {
		return goalsCollection.map((datum) => ({
			id: datum.id,
			name: datum.name,
			deadline: datum.deadline,
			isDone: datum.isDone,
		}));
	}
</script>

<SignedIn let:user>
	<SlimCollection ref={`users/${user.uid}/goals`} parse={parseGoals} let:data={goals}>
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

			<ul role="list" class="divide-y divide-gray-100">
				{#each Object.entries(groupGoalsByDate(goals)) as [date, list] (date)}
					<div class="flex justify-between px-2">
						<div>{date}</div>
					</div>
					<div class="flex flex-col gap-2">
						{#each list as goal (goal)}
							<GoalRow
								{goal}
								on:edit={(e) => {
									showForm = true;
									editingGoal = e.detail;
								}}
							/>
						{/each}
					</div>
				{/each}
			</ul>

			<Modal show={showForm} on:close={() => (showForm = false)}>
				<GoalForm userId={user.uid} goal={editingGoal} on:close={() => (showForm = false)} />
			</Modal>
		</div>
	</SlimCollection>
</SignedIn>

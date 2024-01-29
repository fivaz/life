<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import { goals, groupedGoals } from '$lib/goal/store';
	import type { PageData } from './$types';
	import GoalForm from './goal-form/GoalForm.svelte';
	import GoalRow from './goal-row/GoalRow.svelte';
	import { buildEmptyGoal, convertToGoalIn } from './service';

	export let data: PageData;

	let editingGoal = buildEmptyGoal();

	let showForm = false;

	goals.set(data.goals);
</script>

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
		{#each Object.entries($groupedGoals) as [date, list] (date)}
			<div class="flex justify-between px-2">
				<div>{date}</div>
			</div>
			<div class="flex flex-col gap-2">
				{#each list as goal (goal)}
					<GoalRow
						{goal}
						on:edit={(e) => {
							showForm = true;
							editingGoal = convertToGoalIn(e.detail);
						}}
					/>
				{/each}
			</div>
		{/each}
	</ul>

	<GoalForm show={showForm} goal={editingGoal} on:close={() => (showForm = false)} />
</div>

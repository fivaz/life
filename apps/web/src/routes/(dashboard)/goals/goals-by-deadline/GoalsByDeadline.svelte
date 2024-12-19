<script lang="ts">
	import type { Goal } from '@life/shared/goal';
	import type { Task } from '@life/shared/task';

	import { buildTimedTask } from '$lib/task/build-utils';

	import GoalRow from '../goal-row/GoalRow.svelte';
	import { sortGoalsByDate } from '../service';

	interface Props {
		goals: Goal[];
		addTask: (goal: Goal) => void;
		editTask: (task: Task) => void;
		editGoal: (goal: Goal) => void;
	}

	let { goals, addTask, editGoal, editTask }: Props = $props();

	let goalsByDate = $derived(sortGoalsByDate(goals));
</script>

<div class="flex flex-col gap-5">
	<div class="divide-y divide-gray-100">
		{#each goalsByDate as date (date)}
			<div class="flex justify-between p-2 font-semibold">{date}</div>
			<div class="flex flex-col gap-3">
				{#each goalsByDate[date] as goal (goal.id)}
					<GoalRow
						addTask={() => addTask(goal)}
						{editGoal}
						{editTask}
						goal={{ ...goal, children: [] }}
					/>
				{/each}
			</div>
		{/each}
	</div>
</div>

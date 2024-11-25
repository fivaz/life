<script lang="ts">
	import { taskIn } from '$lib/task/task-form/service.svelte';

	import { nameOfDaysOfWeek } from './service';

	function handleCheckboxChange(day: string) {
		const index = taskIn.value.recurringDaysOfWeek.indexOf(day);

		if (index !== -1) {
			// If day is already in the array, remove it
			taskIn.value.recurringDaysOfWeek.splice(index, 1);
		} else {
			// Otherwise, insert it at its proper position
			const dayIndex = nameOfDaysOfWeek.indexOf(day);
			taskIn.value.recurringDaysOfWeek.splice(dayIndex, 0, day);
		}

		// Update taskIn.value.recurringDaysOfWeek to trigger reactivity
		taskIn.value.recurringDaysOfWeek = [...taskIn.value.recurringDaysOfWeek];
	}
</script>

<div class="flex justify-around">
	{#each nameOfDaysOfWeek as day (day)}
		<div class="flex flex-col items-center gap-1">
			<label class="text-sm font-medium text-gray-700" for={day}>{day}</label>
			<input
				id={day}
				class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
				checked={taskIn.value.recurringDaysOfWeek.includes(day)}
				onchange={() => handleCheckboxChange(day)}
				type="checkbox"
			/>
		</div>
	{/each}
</div>

<script lang="ts">
	import { weekDays } from '$lib/components/days-checkbox/service';

	export let value: string[];

	export let name: string;

	function handleCheckboxChange(day: string) {
		const index = value.indexOf(day);

		if (index !== -1) {
			// If day is already in the array, remove it
			value.splice(index, 1);
		} else {
			// Otherwise, insert it at its proper position
			const dayIndex = weekDays.indexOf(day);
			value.splice(dayIndex, 0, day);
		}

		// Update value to trigger reactivity
		value = [...value];
	}
</script>

<input type="hidden" {name} {value} />

<div class="flex justify-between">
	{#each weekDays as day (day)}
		<div class="flex flex-col items-center gap-1">
			<label for={day} class="text-sm font-medium text-gray-700">{day}</label>
			<input
				id={day}
				type="checkbox"
				checked={value.includes(day)}
				on:change={() => handleCheckboxChange(day)}
				class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
			/>
		</div>
	{/each}
</div>

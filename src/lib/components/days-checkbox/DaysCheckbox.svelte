<script lang="ts">
	import { weekDays } from '$lib/components/days-checkbox/service';
	import classnames from 'classnames';

	// TODO since this component will only be used inside a TaskForm I think I should move it there
	export let value: string[];

	export let name: string;

	let className = '';
	export { className as class };

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

<input {name} type="hidden" {value} />

<div class={classnames(className)}>
	{#each weekDays as day (day)}
		<div class="flex flex-col items-center gap-1">
			<label class="text-sm font-medium text-gray-700" for={day}>{day}</label>
			<input
				checked={value.includes(day)}
				class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
				id={day}
				on:change={() => handleCheckboxChange(day)}
				type="checkbox"
			/>
		</div>
	{/each}
</div>

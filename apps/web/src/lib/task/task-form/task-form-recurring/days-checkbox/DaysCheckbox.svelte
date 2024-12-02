<script lang="ts">
	import { Button } from '@life/shared';
	import { Copy, CopyCheck } from 'lucide-svelte';

	import { tooltip } from '$lib/components/tooltip/tooltip.action';
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

	let isAllSelected = $derived(taskIn.value.recurringDaysOfWeek.length === nameOfDaysOfWeek.length);

	function checkAllDays() {
		taskIn.value.recurringDaysOfWeek = nameOfDaysOfWeek;
	}

	function uncheckAllDays() {
		taskIn.value.recurringDaysOfWeek = [];
	}
</script>

<div>
	<div class="flex items-center justify-between">
		<h3 class="text-sm text-gray-700">Repeat every</h3>

		{#if isAllSelected}
			<Button class="h-6 w-6 p-1" color="white" noPadding onclick={uncheckAllDays}>
				<Copy class="h-4 w-4" />
			</Button>
		{:else}
			<Button class="h-6 w-6 p-1" color="white" noPadding onclick={checkAllDays}>
				<CopyCheck class="h-4 w-4" />
			</Button>
		{/if}
	</div>

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
</div>

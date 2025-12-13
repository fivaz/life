<script lang="ts">
	import { Button, LText } from '@life/shared';
	import { CopyCheckIcon, CopyIcon } from 'lucide-svelte';

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
		<LText class="text-sm">Repeat every</LText>

		{#if isAllSelected}
			<Button class="size-6 p-1" color="white" onclick={uncheckAllDays} padding="">
				<CopyIcon class="size-4 shrink-0 text-indigo-500" />
			</Button>
		{:else}
			<Button class="size-6 p-1" color="white" onclick={checkAllDays} padding="">
				<CopyCheckIcon class="size-4 shrink-0 text-indigo-500" />
			</Button>
		{/if}
	</div>

	<div class="flex justify-around">
		{#each nameOfDaysOfWeek as day (day)}
			<div class="flex flex-col items-center gap-1">
				<label class="text-sm font-medium" for={day}><LText>{day}</LText></label>
				<input
					id={day}
					class="size-4 rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-500"
					checked={taskIn.value.recurringDaysOfWeek.includes(day)}
					onchange={() => handleCheckboxChange(day)}
					type="checkbox"
				/>
			</div>
		{/each}
	</div>
</div>

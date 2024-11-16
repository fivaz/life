<script lang="ts">
	import { differenceInMinutes, format } from 'date-fns';
	import { slide } from 'svelte/transition';

	import Input from '$lib/components/form/input/Input.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import { TIME } from '$lib/consts';
	import { taskIn } from '$lib/task/task-form/service.svelte';
	import { sumTimes } from '$lib/task/time-utils';

	let isEventOpen = $state(true);

	function getDuration(startTime: string, endTime: string): string {
		if (!startTime || !endTime) {
			return '';
		}

		const [startTimeHours, startTimeMinutes] = startTime.split(':').map(Number);
		const [endTimeHours, endTimeMinutes] = endTime.split(':').map(Number);

		const startTimeDate = new Date(0, 0, 0, startTimeHours, startTimeMinutes);
		const endTimeDate = new Date(0, 0, 0, endTimeHours, endTimeMinutes);

		const totalMinutes = differenceInMinutes(endTimeDate, startTimeDate);
		const totalHours = Math.floor(totalMinutes / 60);
		const remainingMinutes = totalMinutes % 60;

		return format(new Date(0, 0, 0, totalHours, remainingMinutes), TIME);
	}

	function togglePanel() {
		if (!taskIn.value.isEvent) {
			taskIn.value.isEvent = true;
		}
		isEventOpen = !isEventOpen;
	}
</script>

<div class="rounded-lg bg-white p-2">
	<div class="flex">
		<button class="flex-1 text-start" onclick={togglePanel} type="button"> Time </button>
		<Toggle bind:value={taskIn.value.isEvent} />
	</div>

	{#if taskIn.value.isEvent && isEventOpen}
		<div transition:slide>
			<div class="flex gap-3">
				<Input
					bind:value={taskIn.value.startTime}
					class="w-1/2"
					label="Start at"
					name="startTime"
					oninput={(value) => (taskIn.value.endTime = sumTimes(value, taskIn.value.duration))}
					required
					type="time"
				/>

				<Input
					bind:value={taskIn.value.endTime}
					class="w-1/2"
					label="End at"
					name="endTime"
					oninput={(value) => (taskIn.value.duration = getDuration(taskIn.value.startTime, value))}
					required
					type="time"
				/>
			</div>
		</div>
	{/if}
</div>

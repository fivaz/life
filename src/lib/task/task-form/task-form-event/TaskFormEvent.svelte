<script lang="ts">
	import Input from '$lib/components/form/input/Input.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import { differenceInMinutes, format } from 'date-fns';
	import { TIME } from '$lib/consts';
	import { sumTimes } from '$lib/task/time-utils';
	import { slide } from 'svelte/transition';
	import { taskIn } from '$lib/task/task-form/service.svelte';

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
</script>

<div class="rounded-lg bg-white p-2">
	<div class="flex">
		<button
			class="flex-1 text-start"
			onclick={() => {
				if (taskIn.value.isEvent) {
					isEventOpen = !isEventOpen;
				} else {
					taskIn.value.isEvent = true;
				}
			}}
			type="button"
		>
			Event
		</button>
		<Toggle bind:value={taskIn.value.isEvent} onchange={(value) => (isEventOpen = value)} />
	</div>

	{#if taskIn.value.isEvent}
		{#if isEventOpen}
			<div transition:slide>
				<Input bind:value={taskIn.value.date} label="Date" name="date" required type="date" />

				<div class="flex gap-3">
					<Input
						bind:value={taskIn.value.startTime}
						class="w-1/2"
						label="Start time"
						name="startTime"
						oninput={(input) => (taskIn.value.endTime = sumTimes(input, taskIn.value.duration))}
						required
						type="time"
					/>

					<Input
						bind:value={taskIn.value.endTime}
						class="w-1/2"
						label="End time"
						name="endTime"
						oninput={(input) =>
							(taskIn.value.duration = getDuration(taskIn.value.startTime, input))}
						required
						type="time"
					/>
				</div>
			</div>
		{/if}
	{/if}
</div>

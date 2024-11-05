<script lang="ts">
	import type { TaskIn } from '$lib/task/task-in-utils';

	import Input from '$lib/components/form/input/Input.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import { differenceInMinutes, format } from 'date-fns';
	import { TIME } from '$lib/consts';
	import { sumTimes } from '$lib/task/time-utils';
	import { slide } from 'svelte/transition';

	interface Props {
		taskIn: TaskIn;
	}

	let { taskIn = $bindable() }: Props = $props();

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
				if (taskIn.isEvent) {
					isEventOpen = !isEventOpen;
				} else {
					taskIn.isEvent = true;
				}
			}}
			type="button"
		>
			Event
		</button>
		<Toggle bind:value={taskIn.isEvent} onchange={(value) => (isEventOpen = value)} />
	</div>

	{#if taskIn.isEvent}
		{#if isEventOpen}
			<div transition:slide>
				<Input bind:value={taskIn.date} label="Date" name="date" required type="date" />

				<div class="flex gap-3">
					<Input
						bind:value={taskIn.startTime}
						class="w-1/2"
						label="Start time"
						name="startTime"
						oninput={(input) => (taskIn.endTime = sumTimes(input, taskIn.duration))}
						required
						type="time"
					/>

					<Input
						bind:value={taskIn.endTime}
						class="w-1/2"
						label="End time"
						name="endTime"
						oninput={(input) => (taskIn.duration = getDuration(taskIn.startTime, input))}
						required
						type="time"
					/>
				</div>
			</div>
		{/if}
	{/if}
</div>

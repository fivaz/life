<script lang="ts">
	import { LText } from '@life/shared';
	import { formatTime } from '@life/shared/date';
	import { differenceInMinutes } from 'date-fns';
	import { slide } from 'svelte/transition';

	import Input from '$lib/components/form/input/Input.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
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

		return formatTime(new Date(0, 0, 0, totalHours, remainingMinutes));
	}

	function togglePanel() {
		if (!taskIn.value.isEvent) {
			taskIn.value.isEvent = true;
		}
		isEventOpen = !isEventOpen;
	}
</script>

<div class="rounded-lg border border-gray-300 p-2 dark:border-gray-700">
	<div class="flex">
		<button class="flex-1 text-start" onclick={togglePanel} type="button">
			<LText>Time</LText>
		</button>

		<Toggle bind:value={taskIn.value.isEvent} />
	</div>

	{#if taskIn.value.isEvent && isEventOpen}
		<div transition:slide>
			<div class="flex gap-3">
				<Input
					name="startTime"
					class="w-1/2"
					inputClass="w-full"
					label="Start at"
					oninput={(value) => (taskIn.value.endTime = sumTimes(value, taskIn.value.duration))}
					required
					type="time"
					bind:value={taskIn.value.startTime}
				/>

				<Input
					name="endTime"
					class="w-1/2"
					inputClass="w-full"
					label="End at"
					oninput={(value) => (taskIn.value.duration = getDuration(taskIn.value.startTime, value))}
					required
					type="time"
					bind:value={taskIn.value.endTime}
				/>
			</div>
		</div>
	{/if}
</div>

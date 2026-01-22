<script lang="ts">
	import { buildDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { isUntimed } from '@life/shared/task';
	import { CalendarClock, CalendarDays } from '@lucide/svelte';
	import { isAfter, isBefore, subMinutes } from 'date-fns';

	import { sumTimes } from '$lib/task/time-utils';

	interface Props {
		task: Task;
		currentDate: Date;
	}

	let { task, currentDate }: Props = $props();

	let isCurrent = $derived.by(() => {
		const startDate = subMinutes(buildDate(currentDate, task.startTime), 1);
		const endDate = buildDate(currentDate, sumTimes(task.startTime, task.duration));

		return isAfter(currentDate, startDate) && isBefore(currentDate, endDate);
	});
</script>

<div class={isCurrent ? 'rounded-lg border-2 border-dashed border-violet-500' : ''}>
	<div
		class="
	{task.isDone ? 'bg-red-500' : 'bg-green-500'}
	flex justify-between gap-3 rounded-lg px-3 py-2 text-sm leading-6 font-semibold text-white"
	>
		<div class="flex grow items-center gap-2 truncate">
			{#if isUntimed(task)}
				<CalendarDays class="size-5 text-white" />
			{:else}
				<CalendarClock class="size-5 text-white" />
			{/if}
			<div class="w-[calc(100%-20px)] truncate text-sm leading-6 font-semibold">{task.name}</div>
		</div>

		<div>
			{task.duration}
		</div>
	</div>
</div>

<script lang="ts">
	import { currentDate } from '@life/shared';
	import {
		buildDate,
	} from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { isUntimed } from '@life/shared/task';
	import { isAfter, isBefore, subMinutes } from 'date-fns';
	import { CalendarClock, CalendarDays } from 'lucide-svelte';

	import { sumTimes } from '$lib/task/time-utils';

	interface Props {
		task: Task;
	}

	let { task }: Props = $props();

	let isCurrent = $derived.by(() => {
		const startDate = subMinutes(buildDate(currentDate.value, task.startTime), 1);
		const endDate = buildDate(currentDate.value, sumTimes(task.startTime, task.duration));

		return isAfter(currentDate.value, startDate) && isBefore(currentDate.value, endDate);
	});
</script>

<div class={isCurrent ? 'rounded-lg border-2 border-dashed border-violet-500' : ''}>
	<div
		class="
	{task.isDone ? 'bg-red-500' : 'bg-green-500'}
	flex justify-between gap-3 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-white"
	>
		<div class="flex grow items-center gap-2 truncate">
			{#if isUntimed(task)}
				<CalendarDays class="h-5 w-5 text-white" />
			{:else}
				<CalendarClock class="h-5 w-5 text-white" />
			{/if}
			<div class="w-[calc(100%-20px)] truncate text-sm font-semibold leading-6">{task.name}</div>
		</div>

		<div>
			{task.duration}
		</div>
	</div>
</div>

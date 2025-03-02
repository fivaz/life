<script lang="ts">
	import type { Task } from '@life/shared/task';
	import { CalendarArrowDown, CalendarArrowUp, CalendarMinus } from 'lucide-svelte';

	import type { Interval } from '../report-chart/service';
	import { prepareData } from '../report-chart/service';
	import ReportTask from './report-task/ReportTask.svelte';
	import { generateTasksByPeriod } from './service';

	interface Props {
		tasks: Task[];
		interval: Interval;
		startAt: string;
		endAt: string;
	}

	let { tasks, interval, startAt, endAt }: Props = $props();

	const tasksByPeriod = $derived.by(() => {
		const { sortedTasks, startDate, endDate } = prepareData(tasks, startAt, endAt);

		return generateTasksByPeriod(sortedTasks, interval, startDate, endDate);
	});

	function getTaskDelta(period: string): number {
		return tasksByPeriod[period].completed.length - tasksByPeriod[period].created.length;
	}
</script>

<h2 class="text-base font-semibold leading-5 text-gray-900">Tasks Changes</h2>

{#each Object.keys(tasksByPeriod).toReversed() as period (period)}
	<div class="flex justify-between text-sm font-semibold text-gray-900">
		<span>{period}</span>

		<div class="flex gap-2">
			<span>{getTaskDelta(period)}</span>
			{#if getTaskDelta(period) > 0}
				<CalendarArrowUp class="h-5 w-5 text-red-500" />
			{:else if getTaskDelta(period) < 0}
				<CalendarArrowDown class="h-5 w-5 text-green-500" />
			{:else}
				<CalendarMinus class="h-5 w-5 text-yellow-500" />
			{/if}
		</div>
	</div>

	<ul class="flex flex-col gap-2">
		{#each tasksByPeriod[period].completed as task, index (task.id)}
			<ReportTask index={index + 1} {task} />
		{/each}
		{#each tasksByPeriod[period].created as task, index (task.id)}
			<ReportTask index={index + 1} isAdd {task} />
		{/each}
	</ul>
{/each}

<script lang="ts">
	import type { Task } from '@life/shared/task';
	import { CalendarArrowDown, CalendarArrowUp, CalendarMinus } from 'lucide-svelte';

	import ReportTask from './report-task/ReportTask.svelte';

	interface Props {
		tasksByPeriod: Record<string, { created: Task[]; completed: Task[] }>;
	}

	let { tasksByPeriod }: Props = $props();

	function getTaskDelta(period: string): number {
		return tasksByPeriod[period].created.length - tasksByPeriod[period].completed.length;
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

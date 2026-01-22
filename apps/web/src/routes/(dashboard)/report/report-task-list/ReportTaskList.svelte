<script lang="ts">
	import { LText } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { CalendarArrowDown, CalendarArrowUp, CalendarMinus } from '@lucide/svelte';

	import ReportTask from './report-task/ReportTask.svelte';

	interface Props {
		tasksByPeriod: Record<string, { created: Task[]; completed: Task[] }>;
	}

	let { tasksByPeriod }: Props = $props();

	function getTaskDelta(period: string): number {
		return tasksByPeriod[period].created.length - tasksByPeriod[period].completed.length;
	}
</script>

<LText class="text-base leading-5 font-semibold">Tasks Changes</LText>

{#each Object.keys(tasksByPeriod).toReversed() as period (period)}
	<div class="flex justify-between text-sm font-semibold">
		<LText>{period}</LText>

		<div class="flex gap-2">
			<LText>{getTaskDelta(period)}</LText>
			{#if getTaskDelta(period) > 0}
				<CalendarArrowUp class="size-5 text-red-500" />
			{:else if getTaskDelta(period) < 0}
				<CalendarArrowDown class="size-5 text-green-500" />
			{:else}
				<CalendarMinus class="size-5 text-yellow-500" />
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

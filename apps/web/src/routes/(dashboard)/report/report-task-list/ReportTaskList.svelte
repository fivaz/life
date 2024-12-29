<script lang="ts">
	import { CalendarArrowDown, CalendarArrowUp, CalendarMinus } from 'lucide-svelte';

	import type { Dataset } from '../service';
	import ReportTask from './report-task/ReportTask.svelte';

	interface Props {
		dataset: Dataset;
	}

	let { dataset }: Props = $props();

	function getTaskDelta(dataset: Dataset, label: string): number {
		return dataset.added[label].length - dataset.removed[label].length;
	}
</script>

<h2 class="text-base font-semibold leading-5 text-gray-900">Tasks Changes</h2>

{#each dataset.labels.toReversed() as label (label)}
	<div class="flex justify-between text-sm font-semibold text-gray-900">
		<span>{label}</span>

		<div class="flex gap-2">
			<span>{getTaskDelta(dataset, label)}</span>
			{#if getTaskDelta(dataset, label) > 0}
				<CalendarArrowUp class="h-5 w-5 text-red-500" />
			{:else if getTaskDelta(dataset, label) < 0}
				<CalendarArrowDown class="h-5 w-5 text-green-500" />
			{:else}
				<CalendarMinus class="h-5 w-5 text-yellow-500" />
			{/if}
		</div>
	</div>
	<ul class="flex flex-col gap-2">
		{#each dataset.removed[label] as task (task.id)}
			<ReportTask {task} />
		{/each}
		{#each dataset.added[label] as task (task.id)}
			<ReportTask isAdd {task} />
		{/each}
	</ul>
{/each}

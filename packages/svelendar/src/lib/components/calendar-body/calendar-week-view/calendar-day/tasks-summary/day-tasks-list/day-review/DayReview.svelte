<script lang="ts">
	import { convertMinutesToTime } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { Chart } from 'chart.js';

	import { chartPlugins, createChartConfig, getProcessedChartData } from './service';

	interface Props {
		tasks: Task[];
	}

	let { tasks }: Props = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	// Derive the processed data so it's only calculated once per task change
	const processed = $derived(getProcessedChartData(tasks));

	$effect(() => {
		if (chart) {
			chart.data.labels = processed.labels;
			chart.data.datasets[0].data = processed.data;
			chart.data.datasets[0].backgroundColor = processed.backgroundColor;
			chart.update();
		} else if (canvas) {
			Chart.register(...chartPlugins);
			chart = new Chart(canvas, createChartConfig(processed));
		}

		return () => {
			if (chart) {
				chart.destroy();
				chart = null;
			}
		};
	});
</script>

<div class="flex flex-col items-center gap-4">
	<div class="relative h-48 w-48">
		<canvas bind:this={canvas}></canvas>
	</div>

	<div class="grid w-full grid-cols-2 gap-2 text-xs">
		{#each processed.labels as label, i (label)}
			{@const minutes = processed.data[i]}
			<div class="flex items-center gap-2">
				<div
					style="background-color: {processed.backgroundColor[i]}"
					class="h-2 w-2 rounded-full"
				></div>
				<span class="truncate text-gray-600 dark:text-gray-400">
					{label} ({convertMinutesToTime(minutes)})
				</span>
			</div>
		{/each}
	</div>
</div>

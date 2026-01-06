<script lang="ts">
	import { LText } from '@life/shared';
	import { convertMinutesToTime } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { Chart as ChartJS } from 'chart.js';

	import { chartPlugins, getChartConfig, getProcessedChartData } from './service';

	interface Props {
		tasks: Task[];
		date: Date;
	}

	let { tasks, date }: Props = $props();

	let canvasRef = $state<HTMLCanvasElement | null>(null);
	let chartInstance: ChartJS | null = null; // No need for $state if we don't bind to it

	const processed = $derived(getProcessedChartData(tasks, date));

	// Effect 1: Handle Setup and Cleanup
	$effect(() => {
		if (!canvasRef) return;
		const ctx = canvasRef.getContext('2d');
		if (!ctx) return;

		ChartJS.register(...chartPlugins);

		// Create the chart once
		chartInstance = new ChartJS(ctx, getChartConfig(processed));

		return () => {
			chartInstance?.destroy();
			chartInstance = null;
		};
	});

	// Effect 2: Handle Data Updates (Syncing Chart with Svelte State)
	$effect(() => {
		if (chartInstance && processed) {
			chartInstance.data.labels = processed.labels;
			chartInstance.data.datasets[0].data = processed.data;
			chartInstance.data.datasets[0].backgroundColor = processed.backgroundColor;
			chartInstance.update('active'); // Animates the changes between tabs
		}
	});
</script>

<div class="flex flex-col items-center gap-4">
	<div class="relative h-48 w-48">
		<canvas bind:this={canvasRef}></canvas>
	</div>

	<div class="grid w-full grid-cols-2 gap-x-4 gap-y-2 text-xs">
		{#each processed.labels as label, i (label)}
			<div class="flex items-center gap-2">
				<div
					style="background-color: {processed.backgroundColor[i]}"
					class="h-2 w-2 shrink-0 rounded-full"
				></div>
				<div class="flex flex-1 justify-between gap-1 truncate">
					<LText level="middle">
						{label}
					</LText>
					<LText level="darker">
						{convertMinutesToTime(processed.data[i])}
					</LText>
				</div>
			</div>
		{/each}
	</div>
</div>

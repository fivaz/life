<script lang="ts">
	import type { Task } from '@life/shared/task';
	import {
		BarController,
		BarElement,
		CategoryScale,
		Chart as ChartJS,
		Filler,
		Legend,
		LinearScale,
		LineController,
		LineElement,
		PointElement,
		Title,
		Tooltip,
	} from 'chart.js';

	import { darkMode } from '$lib/utils.svelte';

	import type { Interval, ReportChartType } from './service';
	import { getChartConfig } from './service';

	ChartJS.register(
		BarElement,
		BarController,
		LineElement,
		LineController,
		LinearScale,
		CategoryScale,
		Title,
		Tooltip,
		Legend,
		Filler,
		PointElement,
	);

	type Props = {
		chartType: ReportChartType;
		tasks: Task[];
		interval: Interval;
		startAt: string;
		endAt: string;
	};

	const { chartType, tasks, interval, startAt, endAt }: Props = $props();

	let canvasRef: HTMLCanvasElement | null = null;

	let chartInstance = $state<ChartJS | null>(null);

	$effect(() => {
		if (!canvasRef) return;
		const ctx = canvasRef.getContext('2d');
		if (!ctx) return;

		ChartJS.defaults.borderColor = darkMode.value
			? 'oklch(0.373 0.034 259.733)'
			: 'oklch(0.872 0.01 258.338)';

		chartInstance = new ChartJS(
			ctx,
			getChartConfig(chartType as 'line', tasks, interval, startAt, endAt),
		);

		return () => chartInstance?.destroy();
	});
</script>

<canvas bind:this={canvasRef}></canvas>

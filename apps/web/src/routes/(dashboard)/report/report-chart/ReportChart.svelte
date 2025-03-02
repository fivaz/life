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

	const { chartType, tasks, interval, startAt, endAt } = $props<{
		chartType: ReportChartType;
		tasks: Task[];
		interval: Interval;
		startAt: string;
		endAt: string;
	}>();

	let canvasRef: HTMLCanvasElement | null = null;

	let chartInstance = $state<ChartJS | null>(null);

	$effect(() => {
		if (!canvasRef) return;
		const ctx = canvasRef.getContext('2d');
		if (!ctx) return;

		chartInstance = new ChartJS(ctx, getChartConfig(chartType, tasks, interval, startAt, endAt));

		return () => chartInstance?.destroy();
	});
</script>

<canvas bind:this={canvasRef}></canvas>

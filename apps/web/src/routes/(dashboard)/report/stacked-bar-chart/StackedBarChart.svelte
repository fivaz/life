<script lang="ts">
	import type { Task } from '@life/shared/task';
	import {
		BarElement,
		CategoryScale,
		Chart as ChartJS,
		Legend,
		LinearScale,
		Title,
		Tooltip,
	} from 'chart.js';

	import type { Interval } from '../service';
	import { getChartConfig } from './service';

	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

	let { tasks, periodStartAt, periodEndAt, interval } = $props<{
		tasks: Task[];
		periodStartAt: string;
		periodEndAt: string;
		interval: Interval;
	}>();

	let canvasRef: HTMLCanvasElement | null = null;

	let chartInstance = $state<ChartJS | null>(null);

	$effect(() => {
		if (!canvasRef) return;
		const ctx = canvasRef.getContext('2d');
		if (!ctx) return;

		const config = getChartConfig(tasks, interval, periodStartAt, periodEndAt);

		chartInstance = new ChartJS(ctx, config);

		return () => chartInstance?.destroy();
	});
</script>

<canvas bind:this={canvasRef}></canvas>

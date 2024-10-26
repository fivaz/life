<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Chart, type ChartConfiguration } from 'chart.js/auto';

	// TODO
	// import {
	// 	CategoryScale,
	// 	Chart as ChartJS,
	// 	Filler,
	// 	Legend,
	// 	LineElement,
	// 	LinearScale,
	// 	PointElement,
	// 	Title,
	// 	Tooltip,
	// } from 'chart.js';
	//
	// ChartJS.register(
	// 	Title,
	// 	Filler,
	// 	Tooltip,
	// 	Legend,
	// 	LineElement,
	// 	LinearScale,
	// 	PointElement,
	// 	CategoryScale,
	// );

	let { data, options } = $props<{
		data: ChartConfiguration['data'];
		options: ChartConfiguration['options'];
	}>();

	let canvasRef: HTMLCanvasElement | null = null;

	let chartInstance = $state<Chart | null>(null);

	$effect(() => {
		if (chartInstance) {
			chartInstance.data = data;
			chartInstance.options = options;
			chartInstance.update();
		}
	});

	onMount(() => {
		if (!canvasRef) return;
		chartInstance = new Chart(canvasRef, {
			type: 'line',
			data,
			options,
		});
	});

	onDestroy(() => {
		if (chartInstance) chartInstance.destroy();
	});
</script>

<canvas bind:this={canvasRef}></canvas>

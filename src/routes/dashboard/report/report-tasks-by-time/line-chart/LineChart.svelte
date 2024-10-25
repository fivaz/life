<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	//
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

	let { data, options } = $props<{ data: any; options?: any }>();

	let canvasRef: HTMLCanvasElement;

	let chartInstance: Chart | null = null;

	$effect(() => {
		if (chartInstance) {
			chartInstance.data = data;
			chartInstance.options = options;
			chartInstance.update();
		}
	});

	onMount(() => {
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

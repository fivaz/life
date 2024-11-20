<script lang="ts">
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import type { Task } from '$lib/task/task.model';

	import LineChart from './line-chart/LineChart.svelte';
	import type { ReportInterval } from './service';
	import { getDataSet, ReportIntervals } from './service';

	interface Props {
		tasks: Task[];
	}

	let { tasks }: Props = $props();

	let interval: ReportInterval = $state(ReportIntervals.DAY);

	let intervalKey = $derived(getIntervalKey(interval));

	//if interval is day then intervalKey is dd.MM.yy
	function getIntervalKey(interval: ReportInterval): string {
		return (
			Object.keys(ReportIntervals)
				.find((key) => ReportIntervals[key] === interval)
				?.toLowerCase() || 'day'
		);
	}

	let dataset = $derived(getDataSet(tasks, interval));

	let data = $derived({
		datasets: [
			{
				backgroundColor: '#a78bfa',
				borderColor: '#7c3aed',
				borderWidth: 1,
				data: dataset[1],
				fill: true,
				tension: 0.3,
			},
		],
		labels: dataset[0],
	});

	let options = $derived({
		elements: {
			point: {
				radius: interval === ReportIntervals.DAY ? 0 : 3,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	});
</script>

<div>
	<div class="flex items-center justify-between">
		<h2 class="text-base font-semibold leading-5 text-gray-600">Tasks by {intervalKey}</h2>
		<Select
			class="flex w-40 items-center gap-2"
			label="Interval"
			selectClass="grow"
			bind:value={interval}
		>
			{#snippet placeholder()}
				<span class="lowercase">{intervalKey}</span>
			{/snippet}

			{#each Object.keys(ReportIntervals) as reportIntervalKey (reportIntervalKey)}
				<SelectItem class="lowercase" value={ReportIntervals[reportIntervalKey]}>
					{reportIntervalKey}
				</SelectItem>
			{/each}
		</Select>
	</div>

	<LineChart {data} {options} />
</div>

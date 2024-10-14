<script lang="ts">
	import type { AnyTask } from '$lib/task/utils.js';

	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import {
		CategoryScale,
		Chart as ChartJS,
		Filler,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		Title,
		Tooltip,
	} from 'chart.js';
	import { Line } from 'svelte-chartjs';

	import {
		type ReportInterval,
		ReportIntervals,
		getDataSet,
		getUncompletedTasksByDate,
	} from './service';

	ChartJS.register(
		Title,
		Filler,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
	);

	export let tasks: AnyTask[];

	let interval: ReportInterval = ReportIntervals.DAY;

	$: intervalKey =
		Object.keys(ReportIntervals)
			.find((key) => ReportIntervals[key] === interval)
			?.toLowerCase() || 'day';

	$: uncompletedTasksByDate = getUncompletedTasksByDate(tasks, interval);

	$: dataset = getDataSet(uncompletedTasksByDate, interval);

	$: data = {
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
	};

	$: options = {
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
	};
</script>

<div>
	<div class="flex items-center justify-between">
		<h2 class="text-base font-semibold leading-5 text-gray-600">Tasks by {intervalKey}</h2>
		<Select
			bind:value={interval}
			class="flex w-40 items-center gap-2"
			label="Interval"
			selectClass="grow"
		>
			<span class="lowercase" slot="placeholder">
				{intervalKey}
			</span>
			{#each Object.keys(ReportIntervals) as reportIntervalKey (reportIntervalKey)}
				<SelectItem class="lowercase" value={ReportIntervals[reportIntervalKey]}>
					{reportIntervalKey}
				</SelectItem>
			{/each}
		</Select>
	</div>
	<Line {data} {options} />
</div>

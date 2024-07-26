<script lang="ts">
	import type { AnyTask } from '$lib/task/utils.js';

	import Select from '$lib/components/select/Select.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import {
		CategoryScale,
		Chart as ChartJS,
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

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	export let tasks: AnyTask[];

	let interval: ReportInterval = ReportIntervals.DAY;

	$: uncompletedTasksByDate = getUncompletedTasksByDate(tasks, interval);

	$: dataset = getDataSet(uncompletedTasksByDate);

	$: data = {
		datasets: [
			{
				borderColor: '#10b981',
				data: dataset[1],
				fill: false,
				label: 'Tasks by time',
				tension: 0.1,
			},
		],
		labels: dataset[0],
	};
</script>

<div>
	<div class="flex justify-end">
		<Select bind:value={interval} label="Interval" selectClass="w-40">
			<span class="lowercase" slot="placeholder">
				{Object.keys(ReportIntervals).find((key) => ReportIntervals[key] === interval) ||
					ReportIntervals.DAY}
			</span>
			{#each Object.keys(ReportIntervals) as reportIntervalKey (reportIntervalKey)}
				<SelectItem class="lowercase" value={ReportIntervals[reportIntervalKey]}>
					{reportIntervalKey}
				</SelectItem>
			{/each}
		</Select>
	</div>
	<Line {data} options={{ responsive: true }} />
</div>

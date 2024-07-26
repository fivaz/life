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

	$: intervalKey =
		Object.keys(ReportIntervals)
			.find((key) => ReportIntervals[key] === interval)
			?.toLowerCase() || 'day';

	$: uncompletedTasksByDate = getUncompletedTasksByDate(tasks, interval);

	$: dataset = getDataSet(uncompletedTasksByDate, interval);

	$: data = {
		datasets: [
			{
				borderColor: '#10b981',
				borderWidth: 1,
				data: dataset[1],
				fill: false,
				label: `Tasks by ${intervalKey}`,
				tension: 0.1,
			},
		],
		labels: dataset[0],
		options: {
			scales: {
				x: {
					time: {
						unit: interval.toLowerCase(),
					},
					type: 'time',
				},
			},
		},
	};
</script>

<div>
	<div class="flex justify-end">
		<Select bind:value={interval} label="Interval" selectClass="w-40">
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
	<Line {data} options={{ responsive: true }} />
</div>

<script lang="ts">
	import type { AnyTask } from '$lib/task/utils.js';

	import { categories } from '$lib/category/seed';
	import Select from '$lib/components/select/Select.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import { DATE } from '$lib/consts.js';
	import { getTaskDateTime } from '$lib/task/time-utils.js';
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
	import { eachDayOfInterval, format, isBefore, isEqual, parse, parseISO, subDays } from 'date-fns';
	import { report } from 'eslint-plugin-sonarjs/lib/src/utils/locations';
	import { Line } from 'svelte-chartjs';

	import {
		type ReportInterval,
		ReportIntervals,
		type UncompletedTasksByDate,
		getDayBeforeFirstDay,
		getUncompletedTasksByDate,
	} from './service';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	export let tasks: AnyTask[];

	let interval: ReportInterval = DATE;

	$: uncompletedTasksByDate = getUncompletedTasksByDate(tasks, interval);

	$: firstLabel = getDayBeforeFirstDay(uncompletedTasksByDate);

	$: data = {
		datasets: [
			{
				borderColor: 'rgb(75, 192, 192)',
				data: [0, ...Object.values(uncompletedTasksByDate)],
				fill: false,
				label: 'Tasks by time',
				tension: 0.1,
			},
		],
		labels: [firstLabel, ...Object.keys(uncompletedTasksByDate)],
	};
</script>

<div>
	<div class="flex justify-end">
		<Select bind:value={interval} label="Interval" selectClass="w-40">
			<span class="lowercase" slot="placeholder">
				{Object.keys(ReportIntervals).find((key) => ReportIntervals[key] === interval) ||
					Object.keys(ReportIntervals)[0]}
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

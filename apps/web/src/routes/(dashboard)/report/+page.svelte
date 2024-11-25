<script lang="ts">
	import { where } from 'firebase/firestore';

	import { CATEGORY_WORK } from '$lib/category/category.model';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import { title } from '$lib/date.utils.svelte';
	import type { Task } from '$lib/task/task.model';
	import { fetchTasks } from '$lib/task/task.repository';

	import LineChart from './line-chart/LineChart.svelte';
	import type { ReportInterval } from './service';
	import { getDataSet, getIntervalKey, ReportIntervals } from './service';

	title.value = 'Report';

	let tasks = $state<Task[]>([]);

	fetchTasks(tasks, where('category.type', '==', CATEGORY_WORK));

	let interval: ReportInterval = $state(ReportIntervals.DAY);

	let intervalKey = $derived(getIntervalKey(interval));

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

<div class="py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>

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
	</div>
</div>

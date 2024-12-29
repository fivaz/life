<script lang="ts">
	import { Button } from '@life/shared';
	import { CATEGORY_WORK } from '@life/shared/category';
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { addDays, endOfWeek, startOfWeek, subDays } from 'date-fns';
	import { where } from 'firebase/firestore';
	import {
		Calendar1,
		CalendarArrowDown,
		CalendarArrowUp,
		CalendarMinus,
		CalendarRange,
	} from 'lucide-svelte';

	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import { tooltip } from '$lib/components/tooltip/tooltip.action';
	import { fetchTasks } from '$lib/task/task.repository';
	import { title } from '$lib/utils.svelte';

	import LineChart from './line-chart/LineChart.svelte';
	import ReportTaskList from './report-task-list/ReportTaskList.svelte';
	import type { Interval } from './service';
	import { generateGraphData, getDatasetDelta, intervals } from './service';

	title.value = 'Report';

	let tasks = $state<Task[]>([]);

	fetchTasks(tasks, where('category.type', '==', CATEGORY_WORK));

	let selectedInterval: Interval = $state(intervals[0]);

	let periodStartAt = $state(formatDate(subDays(new Date(), 3)));

	let periodEndAt = $state(formatDate(addDays(new Date(), 3)));

	let dataset = $derived(generateGraphData(tasks, selectedInterval, periodStartAt, periodEndAt));

	let datasetDelta: number = $derived(getDatasetDelta(dataset.data));

	let isPeriodCurrentWeek: boolean = $state(true);

	function togglePeriodToCurrentWeek() {
		isPeriodCurrentWeek = !isPeriodCurrentWeek;
		if (isPeriodCurrentWeek) {
			periodStartAt = formatDate(startOfWeek(new Date()));
			periodEndAt = formatDate(endOfWeek(new Date()));
		} else {
			periodStartAt = '';
			periodEndAt = '';
		}
	}

	let data = $derived({
		datasets: [
			{
				backgroundColor: '#a78bfa',
				borderColor: '#7c3aed',
				borderWidth: 1,
				data: dataset.data,
				fill: true,
				tension: 0.3,
			},
		],
		labels: dataset.labels,
	});

	let options = $derived({
		...(dataset.data.length < 300 && {
			scales: {
				y: {
					grace: '10%',
				},
			},
		}),
		elements: {
			point: {
				radius: dataset.data.length > 300 ? 0 : 3,
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

		<div class="flex flex-col gap-3">
			<div class="flex flex-col items-center justify-between gap-5 md:flex-row">
				<div class="flex items-center gap-5">
					<h2 class="text-base font-semibold leading-5 text-gray-900">
						Tasks by {selectedInterval}
					</h2>
					{#if datasetDelta > 0}
						<div use:tooltip={'tasks increased'}>
							<CalendarArrowUp class="h-5 w-5 text-red-500" />
						</div>
					{:else if datasetDelta < 0}
						<div use:tooltip={'tasks decreased'}>
							<CalendarArrowDown class="h-5 w-5 text-green-500" />
						</div>
					{:else}
						<div use:tooltip={'tasks remained equal'}>
							<CalendarMinus class="h-5 w-5 text-yellow-500" />
						</div>
					{/if}
				</div>

				<div class="flex flex-col items-center gap-3 md:flex-row">
					<Button class="p-1" color="white" noPadding onclick={togglePeriodToCurrentWeek}>
						{#if isPeriodCurrentWeek}
							<div use:tooltip={'remove filter'}>
								<CalendarRange class="l-5 w-5" />
							</div>
						{:else}
							<div use:tooltip={'filter to the current week'}>
								<Calendar1 class="l-5 w-5" />
							</div>
						{/if}
					</Button>

					<Input
						class="flex items-center gap-2"
						label="Start at"
						type="date"
						bind:value={periodStartAt}
					/>

					<Input
						class="flex items-center gap-2"
						label="End at"
						type="date"
						bind:value={periodEndAt}
					/>

					<Select
						class="flex w-40 items-center gap-2"
						label="Interval"
						selectClass="grow"
						bind:value={selectedInterval}
					>
						{#snippet placeholder()}
							<span class="lowercase">{selectedInterval}</span>
						{/snippet}

						{#each intervals as interval (interval)}
							<SelectItem class="lowercase" value={interval}>{interval}</SelectItem>
						{/each}
					</Select>
				</div>
			</div>

			<LineChart {data} {options} />

			<div class="flex flex-col gap-2">
				{#if dataset.labels.length < 200}
					<ReportTaskList {dataset} />
				{/if}
			</div>
		</div>
	</div>
</div>

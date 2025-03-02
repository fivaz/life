<script lang="ts">
	import { Button } from '@life/shared';
	import { CATEGORY_WORK } from '@life/shared/category';
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { addDays, subDays } from 'date-fns';
	import { where } from 'firebase/firestore';
	import {
		Calendar1,
		CalendarArrowDown,
		CalendarArrowUp,
		CalendarMinus,
		CalendarRange,
		ChartColumnStackedIcon,
		ChartLineIcon,
	} from 'lucide-svelte';

	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import { tooltip } from '$lib/components/tooltip/tooltip.action';
	import { fetchTasks } from '$lib/task/task.repository';
	import { title } from '$lib/utils.svelte';

	import ReportChart from './report-chart/ReportChart.svelte';
	import type { Interval, ReportChartType } from './report-chart/service';
	import ReportTaskList from './report-task-list/ReportTaskList.svelte';
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

	let chartType: 'stacked' | 'line' = $state<ReportChartType>('line');

	function togglePeriodToCurrentWeek() {
		isPeriodCurrentWeek = !isPeriodCurrentWeek;
		if (isPeriodCurrentWeek) {
			periodStartAt = formatDate(subDays(new Date(), 3));
			periodEndAt = formatDate(addDays(new Date(), 3));
		} else {
			periodStartAt = '';
			periodEndAt = '';
		}
	}
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
						<div class="flex gap-2" use:tooltip={'tasks increased'}>
							<span>{datasetDelta}</span>
							<CalendarArrowUp class="h-5 w-5 text-red-500" />
						</div>
					{:else if datasetDelta < 0}
						<div class="flex gap-2" use:tooltip={'tasks decreased'}>
							<span>{datasetDelta}</span>
							<CalendarArrowDown class="h-5 w-5 text-green-500" />
						</div>
					{:else}
						<div class="flex gap-2" use:tooltip={'tasks remained equal'}>
							<span>{datasetDelta}</span>
							<CalendarMinus class="h-5 w-5 text-yellow-500" />
						</div>
					{/if}
				</div>

				<div class="flex flex-col items-center gap-3 md:flex-row">
					{#if chartType === 'line'}
						<Button class="p-1" color="white" noPadding onclick={() => (chartType = 'stacked')}>
							<ChartColumnStackedIcon class="l-5 w-5" />
						</Button>
					{:else}
						<Button class="p-1" color="white" noPadding onclick={() => (chartType = 'line')}>
							<ChartLineIcon class="l-5 w-5" />
						</Button>
					{/if}

					<Button class="p-1" color="white" noPadding onclick={togglePeriodToCurrentWeek}>
						{#if isPeriodCurrentWeek}
							<CalendarRange class="l-5 w-5" />
						{:else}
							<Calendar1 class="l-5 w-5" />
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

			<ReportChart
				{chartType}
				endAt={periodEndAt}
				interval={selectedInterval}
				startAt={periodStartAt}
				{tasks}
			/>

			<div class="flex flex-col gap-2">
				{#if dataset.labels.length < 200}
					<ReportTaskList {dataset} />
				{/if}
			</div>
		</div>
	</div>
</div>

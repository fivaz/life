<script lang="ts">
	import { Button } from '@life/shared';
	import { CATEGORY_WORK } from '@life/shared/category';
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { clsx } from 'clsx';
	import { addDays, subDays } from 'date-fns';
	import { where } from 'firebase/firestore';

	import { fetchTasks } from '$lib/task/task.repository';
	import { title } from '$lib/utils.svelte';

	import ReportChart from './report-chart/ReportChart.svelte';
	import type { Interval, ReportChartType } from './report-chart/service';
	import { prepareData } from './report-chart/service';
	import ReportTaskList from './report-task-list/ReportTaskList.svelte';
	import { generateTasksByPeriod } from './report-task-list/service';
	import ReportHeader from './ReportHeader.svelte';
	import { generateGraphData, intervals } from './service';

	title.value = 'Report';

	let tasks = $state<Task[]>([]);

	fetchTasks(tasks, where('category.type', '==', CATEGORY_WORK));

	let selectedInterval: Interval = $state(intervals[0]);

	let periodStartAt = $state(formatDate(subDays(new Date(), 3)));

	let periodEndAt = $state(formatDate(addDays(new Date(), 3)));

	let chartType = $state<ReportChartType>('line');

	const tasksByPeriod = $derived.by(() => {
		const { sortedTasks, startDate, endDate } = prepareData(tasks, periodStartAt, periodEndAt);

		return generateTasksByPeriod(sortedTasks, selectedInterval, startDate, endDate);
	});
</script>

<div class="py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>

		<div class="flex flex-col gap-3">
			<ReportHeader
				bind:chartType
				bind:endAt={periodEndAt}
				bind:interval={selectedInterval}
				bind:startAt={periodStartAt}
			/>

			<ReportChart
				{chartType}
				endAt={periodEndAt}
				interval={selectedInterval}
				startAt={periodStartAt}
				{tasks}
			/>

			<div class="flex flex-col gap-2">
				{#if Object.keys(tasksByPeriod).length < 200}
					<ReportTaskList {tasksByPeriod} />
				{/if}
			</div>
		</div>
	</div>
</div>

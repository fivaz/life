<script lang="ts">
	import { CATEGORY_WORK } from '@life/shared/category';
	import { where } from 'firebase/firestore';

	import { fetchTasks } from '$lib/task/task.repository';
	import { title } from '$lib/utils.svelte';

	import ReportChart from './report-chart/ReportChart.svelte';
	import ReportTaskList from './report-task-list/ReportTaskList.svelte';
	import ReportHeader from './ReportHeader.svelte';
	import { getTasksByPeriod, reportStore } from './runes.svelte';

	title.value = 'Report';

	// Initialize tasks fetch
	fetchTasks(reportStore.tasks, where('category.type', '==', CATEGORY_WORK));
</script>

<div class="py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>

		<div class="flex flex-col gap-3">
			<ReportHeader />

			<ReportChart
				chartType={reportStore.chartType}
				endAt={reportStore.periodEndAt}
				interval={reportStore.selectedInterval}
				startAt={reportStore.periodStartAt}
				tasks={reportStore.tasks}
			/>

			<div class="flex flex-col gap-2">
				{#if Object.keys(getTasksByPeriod()).length < 200}
					<ReportTaskList tasksByPeriod={getTasksByPeriod()} />
				{/if}
			</div>
		</div>
	</div>
</div>

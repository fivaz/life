// report-state.svelte.ts
import { CATEGORY_WORK } from '@life/shared/category';
import { formatDate } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { addDays, subDays } from 'date-fns';
import { where } from 'firebase/firestore';
import { fetchTasks } from '$lib/task/task.repository';
import type { Interval, ReportChartType } from './report-chart/service';
import { intervals } from './service';
import { prepareData } from './report-chart/service';
import { generateTasksByPeriod } from './report-task-list/service';

// Single state object
export const reportStore = $state({
	tasks: [] as Task[],
	selectedInterval: intervals[0] as Interval,
	periodStartAt: formatDate(subDays(new Date(), 3)),
	periodEndAt: formatDate(addDays(new Date(), 3)),
	chartType: 'line' as ReportChartType,
});

// Export a function that returns the derived value
export function getTasksByPeriod() {
	const { sortedTasks, startDate, endDate } = prepareData(
		reportStore.tasks,
		reportStore.periodStartAt,
		reportStore.periodEndAt,
	);
	return generateTasksByPeriod(sortedTasks, reportStore.selectedInterval, startDate, endDate);
}

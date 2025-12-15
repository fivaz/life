// report-state.svelte.ts
import { formatDate } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { addDays, subDays } from 'date-fns';
import { SvelteDate } from 'svelte/reactivity';

import type { Interval, ReportChartType } from './report-chart/service';
import { prepareData } from './report-chart/service';
import { generateTasksByPeriod } from './report-task-list/service';
import { intervals } from './service';

// Single state object
export const reportStore = $state({
	tasks: [] as Task[],
	selectedInterval: intervals[0] as Interval,
	periodStartAt: formatDate(subDays(new SvelteDate(), 3)),
	periodEndAt: formatDate(addDays(new SvelteDate(), 3)),
	chartType: 'line' as ReportChartType,
	isSimplified: true,
});

// Export a function that returns the derived value
export function getTasksByPeriod() {
	const { sortedTasks, startDate, endDate } = prepareData(
		reportStore.tasks,
		reportStore.periodStartAt,
		reportStore.periodEndAt,
	);
	return generateTasksByPeriod(
		sortedTasks,
		reportStore.selectedInterval,
		startDate,
		endDate,
		reportStore.isSimplified,
	);
}

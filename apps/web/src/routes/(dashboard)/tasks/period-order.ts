import { parseDate } from '@life/shared/date';

import type { TaskLists } from './service';

// Sorting logic for periods: enforce consistent ordering
const BUCKET_WEIGHTS: Record<string, number> = {
	overdue: 1,
	today: 2,
	tomorrow: 3,
	thisWeek: 4,
	nextWeek: 5,
	// custom dates will be 6 (default)
	someday: 7,
	recurringDaily: 8,
	recurringWeekly: 9,
	recurringMonthly: 10,
	recurringYearly: 11,
};

export function getOrderedPeriods(tasksByPeriod: TaskLists) {
	return Object.keys(tasksByPeriod)
		.map((period) => ({
			period,
			tasks: tasksByPeriod[period],
			weight: BUCKET_WEIGHTS[period] ?? 6, // default for custom date buckets
		}))
		.sort((a, b) => {
			// First sort by weight
			if (a.weight !== b.weight) {
				return a.weight - b.weight;
			}
			// If same weight (i.e., custom dates), sort by actual date
			if (a.weight === 6) {
				return parseDate(a.period).getTime() - parseDate(b.period).getTime();
			}
			return 0;
		});
}

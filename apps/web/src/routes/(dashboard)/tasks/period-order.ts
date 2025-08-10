import { parseDate } from '@life/shared/date';

import type { TaskLists } from './service';

// Sorting logic for periods: enforce consistent ordering
const BUCKET_WEIGHTS: Record<string, number> = {
	overdue: 1,
	today: 2,
	tomorrow: 3,
	thisWeek: 4,
	nextWeek: 5,
	// custom dates = 6 by default
	someday: 7,
	recurringDaily: 8,
	recurringWeekly: 9,
	recurringMonthly: 10,
	recurringYearly: 11,
};

export function getOrderedPeriods(tasksByPeriod: TaskLists) {
	return Object.keys(tasksByPeriod).sort((a, b) => {
		const weightA = BUCKET_WEIGHTS[a] ?? 6;
		const weightB = BUCKET_WEIGHTS[b] ?? 6;

		if (weightA !== weightB) {
			return weightA - weightB;
		}

		// if both are custom dates
		if (weightA === 6) {
			return parseDate(a).getTime() - parseDate(b).getTime();
		}
		return 0;
	});
}

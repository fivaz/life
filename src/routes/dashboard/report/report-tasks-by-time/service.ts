import type { AnyTask } from '$lib/task/utils';

import { DATE } from '$lib/consts';
import { getTaskDateTime } from '$lib/task/time-utils';
import {
	eachDayOfInterval,
	eachMonthOfInterval,
	eachQuarterOfInterval,
	eachWeekOfInterval,
	eachYearOfInterval,
	format,
	isBefore,
	isEqual,
	parse,
	parseISO,
	subDays,
} from 'date-fns';

export type UncompletedTasksByDate = {
	[Symbol.iterator](): IterableIterator<[string, number]>;
	[key: string]: number;
};

export const ReportIntervals: Record<string, string> = {
	// 1 - DAY
	DAY: 'yyyy-MM-dd',

	// 2 - WEEK
	WEEK: "yyyy-'W'II",

	// 3 - REST
	MONTH: 'yyyy-MM',
	QUARTER: "yyyy-'Q'Q",
	YEAR: 'yyyy',
};

export type ReportInterval = (typeof ReportIntervals)[keyof typeof ReportIntervals];

function getDatesInRange(interval: ReportInterval, startDate: Date, endDate: Date): Date[] {
	switch (interval) {
		case ReportIntervals.DAY:
			return eachDayOfInterval({ end: endDate, start: startDate });
		case ReportIntervals.WEEK:
			return eachWeekOfInterval({ end: endDate, start: startDate });
		case ReportIntervals.MONTH:
			return eachMonthOfInterval({ end: endDate, start: startDate });
		case ReportIntervals.QUARTER:
			return eachQuarterOfInterval({ end: endDate, start: startDate });
		case ReportIntervals.YEAR:
			return eachYearOfInterval({ end: endDate, start: startDate });
		default:
			console.error('Invalid interval:', interval);
			return eachDayOfInterval({ end: endDate, start: startDate });
	}
}

export function getUncompletedTasksByDate(
	tasks: AnyTask[],
	interval: ReportInterval,
): UncompletedTasksByDate {
	const uncompletedTasksByDate: UncompletedTasksByDate = {
		[Symbol.iterator]() {
			const entries = Object.entries(this)
				.filter(([key]) => key !== Symbol.iterator.toString())
				.sort(([a], [b]) => a.localeCompare(b));
			return entries[Symbol.iterator]();
		},
	};

	tasks.forEach((task) => {
		const createdAt = parseISO(task.createdAt);
		const endAt = task.isDone ? getTaskDateTime(task) : new Date();

		const dateRange = getDatesInRange(interval, createdAt, endAt);

		dateRange.forEach((date) => {
			const dateString = format(date, DATE);

			if (!uncompletedTasksByDate[dateString]) {
				uncompletedTasksByDate[dateString] = 0;
			}

			// Increment the count for the specific date
			if (!task.isDone || isBefore(date, endAt) || isEqual(date, endAt)) {
				uncompletedTasksByDate[dateString]++;
			}
		});
	});

	return uncompletedTasksByDate;
}

export function getDataSet(
	uncompletedTasksByDate: UncompletedTasksByDate,
): [labels: string[], values: number[]] {
	const labels = [];
	const values = [];

	for (const [date, value] of uncompletedTasksByDate) {
		labels.push(date);
		values.push(value);
	}

	//add initial values
	if (labels.length) {
		const firstDayDate = parse(labels[0], DATE, new Date());
		const beforeFirstDateString = format(subDays(firstDayDate, 1), DATE);
		labels.unshift(beforeFirstDateString);
		values.unshift(0);
	}

	return [labels, values];
}

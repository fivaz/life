import { DATE, formatDate } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { getTaskDateTime, sortTasks } from '@life/shared/task';
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
	subMonths,
	subQuarters,
	subWeeks,
	subYears,
} from 'date-fns';

export type UncompletedTasksByDate = {
	[Symbol.iterator](): IterableIterator<[string, number]>;
	[key: string]: number;
};

export const ReportIntervals: Record<string, string> = {
	// 1 - DAY
	DAY: 'dd.MM.yy',

	// 2 - WEEK
	WEEK: "YY-'W'w",

	// 3 - REST
	MONTH: 'MMM yy',
	QUARTER: "'Q'Q yy",
	YEAR: 'yyyy',
};

export type ReportInterval = (typeof ReportIntervals)[keyof typeof ReportIntervals];

//if interval is day then intervalKey is dd.MM.yy
export function getIntervalKey(interval: ReportInterval): string {
	return (
		Object.keys(ReportIntervals)
			.find((key) => ReportIntervals[key] === interval)
			?.toLowerCase() || 'day'
	);
}

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

/**
 convert a list of tasks into an object in which the keys are dates in a given interval and the
 values are the amount of uncompleted tasks in each date

 {
	 '01.01.2024': 3,
	 '01.02.2024': 2,
	 '01.03.2024': 5,
	 ...
 }
 */
export function getUncompletedTasksByDate(
	tasks: Task[],
	interval: ReportInterval,
): UncompletedTasksByDate {
	const uncompletedTasksByDate: UncompletedTasksByDate = {
		// the iterator is to make sure the objects keys are always sorted by date
		[Symbol.iterator]() {
			const entries = Object.entries(this)
				.filter(([key]) => key !== Symbol.iterator.toString())
				.sort(([a], [b]) => a.localeCompare(b));
			return entries[Symbol.iterator]();
		},
	};

	if (!tasks.length) {
		return { ...uncompletedTasksByDate, [formatDate(new Date())]: 0 };
	}

	const listEndAt = getEndAt(tasks);

	tasks.forEach((task) => {
		const createdAt = parseISO(task.createdAt);
		const endAt = task.isDone ? getTaskDateTime(task) || new Date() : listEndAt;

		const dateRange = getDatesInRange(interval, createdAt, endAt);

		dateRange.forEach((date) => {
			const dateString = formatDate(date);

			if (!uncompletedTasksByDate[dateString]) {
				uncompletedTasksByDate[dateString] = 0;
			}

			// Increment the count for the specific date
			if (isBefore(date, endAt) || isEqual(date, endAt)) {
				uncompletedTasksByDate[dateString]++;
			}
		});
	});

	return uncompletedTasksByDate;
}

function getEndAt(tasks: Task[]) {
	const sortedTasks = sortTasks(tasks);
	//get the last task whose date isn't null
	const firstDatedTask = sortedTasks.toReversed().find((task) => task.date);
	if (!firstDatedTask) {
		return new Date();
	}

	const date = getTaskDateTime(firstDatedTask);
	if (!date) {
		return new Date();
	}

	return date;
}

function getBeforeFirstDate(labels: string[], interval: ReportInterval) {
	const firstDate = parse(labels[0], interval, new Date(), {
		useAdditionalWeekYearTokens: true,
	});

	switch (interval) {
		case ReportIntervals.DAY:
			return format(subDays(firstDate, 1), interval);
		case ReportIntervals.WEEK:
			return format(subWeeks(firstDate, 1), interval, {
				useAdditionalWeekYearTokens: true,
			});
		case ReportIntervals.MONTH:
			return format(subMonths(firstDate, 1), interval);
		case ReportIntervals.QUARTER:
			return format(subQuarters(firstDate, 1), interval);
		case ReportIntervals.YEAR:
			return format(subYears(firstDate, 1), interval);
		default:
			console.error('Invalid interval:', interval);
			return formatDate(subDays(firstDate, 1));
	}
}

export function getDataSet(
	tasks: Task[],
	interval: ReportInterval,
): [labels: string[], values: number[]] {
	const labels = [];
	const values = [];

	const uncompletedTasksByDate = getUncompletedTasksByDate(tasks, interval);

	for (const [date, value] of uncompletedTasksByDate) {
		const formattedDate = format(
			parse(date, DATE, new Date(), {
				useAdditionalWeekYearTokens: true,
			}),
			interval,
			{
				useAdditionalWeekYearTokens: true,
			},
		);
		labels.push(formattedDate);
		values.push(value);
	}

	//add initial values
	if (labels.length) {
		const beforeFirstDate = getBeforeFirstDate(labels, interval);
		labels.unshift(beforeFirstDate);
		values.unshift(0);
	}

	return [labels, values];
}

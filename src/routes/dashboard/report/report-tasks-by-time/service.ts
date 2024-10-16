import { DATE } from '$lib/consts';
import { getTaskDateTime } from '$lib/task/time-utils';
import { type Task, sortTasks } from '$lib/task/utils';
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

function getEndAt(tasks: Task[]) {
	const sortedTasks = sortTasks(tasks);
	return getTaskDateTime(sortedTasks[sortedTasks.length - 1]);
}

export function getUncompletedTasksByDate(
	tasks: Task[],
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

	if (!tasks.length) {
		return { ...uncompletedTasksByDate, [format(new Date(), DATE)]: 0 };
	}

	const listEndAt = getEndAt(tasks);

	tasks.forEach((task) => {
		const createdAt = parseISO(task.createdAt);
		const endAt = task.isDone ? getTaskDateTime(task) : listEndAt;

		const dateRange = getDatesInRange(interval, createdAt, endAt);

		dateRange.forEach((date) => {
			const dateString = format(date, DATE);

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
			return format(subDays(firstDate, 1), DATE);
	}
}

export function getDataSet(
	uncompletedTasksByDate: UncompletedTasksByDate,
	interval: ReportInterval,
): [labels: string[], values: number[]] {
	const labels = [];
	const values = [];

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

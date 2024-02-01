import type { Task } from '@prisma/client';
import type { Category } from '$lib/category/utils';
import { DATE, TIME } from '$lib/consts';
import type { Goal } from '$lib/goal/utils';
import { format, parse, parseISO } from 'date-fns';

export type TTask = Omit<Task, 'deleted' | 'userId'> & {
	category: Category;
	goal: Goal | null | undefined;
};

export type OnlyTTask = Omit<TTask, 'category' | 'goal'>;

export type EEvent = Omit<TTask, 'startDate' | 'endDate' | 'duration'> & {
	startDate: Date;
	endDate: Date;
	duration: number;
};

export type OnlyEEvent = Omit<EEvent, 'category' | 'goal'>;

export function convertToMinutes(duration: string) {
	// to check if the duration string is HH:mm format
	if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(duration)) {
		return 0;
	}
	const [hours, minutes] = duration.split(':').map(Number);
	return hours * 60 + minutes;
}

export function convertToTime(minutes: number | null): string {
	if (!minutes) {
		return 'unset';
	}
	const date = new Date(0, 0, 0, Math.floor(minutes / 60), minutes % 60);
	return format(date, TIME);
}

export async function getTask(
	request: Request,
): Promise<{ task: OnlyTTask; isForThisEventOnly: boolean; targetDate: Date | null }> {
	const data = await request.formData();
	const categoryId = Number(data.get('categoryId'));
	const goalId = data.get('goalId') ? Number(data.get('goalId')) : null;
	const categoryName = data.get('categoryName') as string;

	const id = Number(data.get('id'));
	const isDone = !!data.get('isDone');
	const name = data.get('name') as string;
	const description = data.get('description') as string;
	const isEvent = !!data.get('isEvent');

	const startDateString = data.get('startDate') as string;
	const endDateString = data.get('endDate') as string;
	const durationString = data.get('duration') as string;
	const deadlineString = data.get('deadline') as string;

	const isRecurring = !!data.get('isRecurring');
	const isForThisEventOnly = !!data.get('isForThisEventOnly');
	const targetDateString = data.get('targetDate') as string;

	const recurringStartAtString = data.get('recurringStartAt') as string;
	const recurringEndAtString = data.get('recurringEndAt') as string;
	const recurringDaysOfWeekString = data.get('recurringDaysOfWeek') as string;
	const recurringExceptionsString = data.get('recurringExceptions') as string;

	if (!categoryName || !categoryId) {
		throw Error('internal error, please refresh the page');
	}

	const deadline = deadlineString ? parseISO(deadlineString) : null;

	let startDate = null;
	let endDate = null;
	let duration = null;

	if (isEvent) {
		startDate = parseISO(startDateString);
		endDate = parseISO(endDateString);
		duration = convertToMinutes(durationString);
	}

	let recurringStartAt = null;
	let recurringEndAt = null;
	let recurringDaysOfWeek: string[] = [];
	let recurringExceptions: Date[] = [];
	let targetDate = null;

	if (isRecurring) {
		recurringStartAt = parseISO(recurringStartAtString);
		recurringEndAt = parseISO(recurringEndAtString);

		recurringDaysOfWeek = recurringDaysOfWeekString.split(',');

		recurringExceptions = recurringExceptionsString
			? recurringExceptionsString.split(', ').map((date) => parse(date, DATE, new Date()))
			: [];

		targetDate = parseISO(targetDateString);
	}

	if (startDate && endDate && startDate > endDate) {
		throw Error('startDate should be before endDate');
	}

	return {
		isForThisEventOnly,
		targetDate,
		task: {
			id,
			name: name || categoryName,
			description,
			startDate,
			endDate,
			duration,
			deadline,
			isDone,
			categoryId,
			goalId,
			isRecurring,
			recurringStartAt,
			recurringEndAt,
			recurringDaysOfWeek,
			recurringExceptions,
		},
	};
}

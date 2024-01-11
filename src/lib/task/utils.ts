import type { Task } from '@prisma/client';
import type { CCategory } from '$lib/category/utils';
import { DATE, TIME } from '$lib/consts';
import { format, parse, parseISO } from 'date-fns';

export type TTask = Omit<Task, 'deleted' | 'userId'> & {
	category: CCategory;
};

export type OnlyTTask = Omit<TTask, 'category'>;

export type EEvent = Omit<TTask, 'startDate' | 'endDate' | 'duration'> & {
	startDate: Date;
	endDate: Date;
	duration: number;
};

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
): Promise<OnlyTTask & { isForThisEventOnly: boolean }> {
	const data = await request.formData();
	const categoryId = Number(data.get('categoryId'));
	const categoryName = data.get('categoryName') as string;

	const id = Number(data.get('id'));
	const isDone = !!data.get('isDone');
	const name = data.get('name') as string;
	const description = data.get('description') as string;
	const isEvent = !!data.get('isEvent');

	const startDateString = data.get('startDate') as string;
	const endDateString = data.get('endDate') as string;
	const durationString = data.get('duration') as string;

	let isRecurring = !!data.get('isRecurring');
	const isForThisEventOnly = !!data.get('isForThisEventOnly');

	const recurringStartAtString = data.get('recurringStartAt') as string;
	const recurringEndAtString = data.get('recurringEndAt') as string;
	const recurringDaysOfWeekString = data.get('recurringDaysOfWeek') as string;
	const recurringExceptionsString = data.get('recurringExceptions') as string;

	if (!categoryName || !categoryId) {
		throw Error('internal error, please refresh the page');
	}

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

	if (isForThisEventOnly) {
		isRecurring = false;
	}

	if (isRecurring) {
		recurringStartAt = parseISO(recurringStartAtString);
		recurringEndAt = parseISO(recurringEndAtString);

		recurringDaysOfWeek = recurringDaysOfWeekString.split(',');

		recurringExceptions = recurringExceptionsString
			? recurringExceptionsString.split(', ').map((date) => parse(date, DATE, new Date()))
			: [];
	}

	if (startDate && endDate && startDate > endDate) {
		throw Error('startDate should be before endDate');
	}

	return {
		id,
		name: name || categoryName,
		description,
		startDate,
		endDate,
		duration,
		isDone,
		categoryId,
		isRecurring,
		recurringStartAt,
		recurringEndAt,
		recurringDaysOfWeek,
		isForThisEventOnly,
		recurringExceptions,
	};
}

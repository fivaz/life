import type { Task } from '@prisma/client';
import type { CCategory } from '$lib/category/utils';
import { TIME } from '$lib/consts';
import { format, parseISO } from 'date-fns';

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

export async function getTask(request: Request): Promise<OnlyTTask> {
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

	const isRecurring = !!data.get('isRecurring');
	const recurringStartAtString = data.get('recurringStartAt') as string;
	const recurringEndAtString = data.get('recurringEndAt') as string;
	const recurringDaysOfWeekString = data.get('recurringDaysOfWeek') as string;
	const isForThisEventOnly = !!data.get('isForThisEventOnly');

	if (!categoryName || !categoryId) {
		throw Error('internal error, please refresh the page');
	}

	const startDate = isEvent ? parseISO(startDateString) : null;
	const endDate = isEvent ? parseISO(endDateString) : null;
	const duration = isEvent ? convertToMinutes(durationString) : null;

	const recurringStartAt = isRecurring ? parseISO(recurringStartAtString) : null;
	const recurringEndAt = isRecurring ? parseISO(recurringEndAtString) : null;
	const recurringDaysOfWeek = isRecurring ? recurringDaysOfWeekString.split(',') : [];

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
	};
}

import type { Task } from '@prisma/client';
import type { CCategory } from '$lib/category/utils';
import { TIME } from '$lib/consts';
import { format } from 'date-fns';

export type TTask = Omit<Task, 'deleted' | 'userId'> & {
	category: CCategory;
};

export type OnlyTTask = Omit<TTask, 'category'>;

export function convertToMinutes(duration: string) {
	const [hours, minutes] = duration.split(':').map(Number);
	return hours * 60 + minutes;
}

export function convertToTime(minutes: number): string {
	const date = new Date(0, 0, 0, Math.floor(minutes / 60), minutes % 60);
	return format(date, TIME);
}

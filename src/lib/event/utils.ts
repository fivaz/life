import type { Event, Recurrent } from '@prisma/client';
import type { CCategory } from '$lib/category/utils';
import { TIME } from '$lib/utils';
import { format } from 'date-fns';

export type EEvent = Omit<Event, 'deleted' | 'userId'> & {
	category: CCategory;
	recurrent: Recurrent | null;
};

export type OnlyEEvent = Omit<EEvent, 'category' | 'recurrent'>;

export function convertToMinutes(duration: string) {
	const [hours, minutes] = duration.split(':').map(Number);
	return hours * 60 + minutes;
}

export function convertToTime(minutes: number): string {
	const date = new Date(0, 0, 0, Math.floor(minutes / 60), minutes % 60);
	return format(date, TIME);
}

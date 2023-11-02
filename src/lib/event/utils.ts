import type { Event } from '@prisma/client';
import type { CCategory } from '$lib/category/utils';

export type EEvent = Omit<Event, 'deleted' | 'userId'> & { category: CCategory };

export type OnlyEEvent = Omit<EEvent, 'category'>;

export function convertToMinutes(duration: string) {
	const [hours, minutes] = duration.split(':').map(Number);
	return hours * 60 + minutes;
}

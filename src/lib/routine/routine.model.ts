import type { dateISO, yyyyMMdd } from '$lib/task/task.model';

export const times = ['morning', 'afternoon', 'evening', 'all-day'] as const;

export type Routine = {
	completeHistory: { date: yyyyMMdd; isCompleted: boolean }[];
	createdAt: dateISO;
	icon: string;
	id: string;
	name: string;
	order: number;
	startAt: yyyyMMdd | null;
	endAt: yyyyMMdd | null;
	time: (typeof times)[number];
};

export function buildEmptyRoutine(): Routine {
	return {
		completeHistory: [],
		createdAt: new Date().toISOString(),
		icon: 'Fire',
		id: '',
		name: '',
		order: 0,
		startAt: null,
		endAt: null,
		time: 'all-day',
	};
}

import type { dateISO, yyyyMMdd } from '$lib/task/task.model';

import Afternoon from '../../routes/(dashboard)/routine/time-icons/afternoon/Afternoon.svelte';
import AllDay from '../../routes/(dashboard)/routine/time-icons/all-day/AllDay.svelte';
import Evening from '../../routes/(dashboard)/routine/time-icons/evening/Evening.svelte';
import Morning from '../../routes/(dashboard)/routine/time-icons/morning/Morning.svelte';

export const times = ['morning', 'afternoon', 'evening', 'all-day'] as const;

export type Routine = {
	completeHistory: { date: yyyyMMdd; isCompleted: boolean }[];
	createdAt: dateISO;
	icon: string;
	id: string;
	name: string;
	order: number;
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
		time: 'all-day',
	};
}

export const routineTimeMap = {
	morning: { label: 'morning', icon: Morning },
	afternoon: { label: 'afternoon', icon: Afternoon },
	evening: { label: 'evening', icon: Evening },
	'all-day': { label: 'all day', icon: AllDay },
};

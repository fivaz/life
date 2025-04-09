import { z } from 'zod';

import { zDate } from '$lib/utils';

import Long from '../../routes/(dashboard)/routine/duration-icons/Long.svelte';
import Medium from '../../routes/(dashboard)/routine/duration-icons/Medium.svelte';
import Short from '../../routes/(dashboard)/routine/duration-icons/Short.svelte';
import Afternoon from '../../routes/(dashboard)/routine/time-icons/afternoon/Afternoon.svelte';
import AllDay from '../../routes/(dashboard)/routine/time-icons/all-day/AllDay.svelte';
import Evening from '../../routes/(dashboard)/routine/time-icons/evening/Evening.svelte';
import Morning from '../../routes/(dashboard)/routine/time-icons/morning/Morning.svelte';

export const periods = ['morning', 'afternoon', 'evening', 'all-day'] as const;
export const durations = ['short', 'medium', 'long'] as const;

export const routineSchema = z.object({
	id: z.string(),
	createdAt: z.string().datetime(),
	icon: z.string(),
	name: z.string(),
	order: z.number(),
	time: z.enum(periods),
	isDisabled: z.boolean(),
	duration: z.enum(durations).optional(),
	completeHistory: z.array(
		z.object({
			date: zDate,
			isCompleted: z.boolean(),
		}),
	),
});

export type Routine = z.infer<typeof routineSchema>;

export function buildEmptyRoutine(): Routine {
	return {
		completeHistory: [],
		createdAt: new Date().toISOString(),
		icon: 'Fire',
		id: '',
		name: '',
		order: 0,
		time: 'all-day',
		duration: 'short',
		isDisabled: false,
	};
}

export const routineTimeMap = {
	morning: { label: 'morning', icon: Morning },
	afternoon: { label: 'afternoon', icon: Afternoon },
	evening: { label: 'evening', icon: Evening },
	'all-day': { label: 'all day', icon: AllDay },
};

export const routineDurationMap = {
	short: { label: 'short', icon: Short },
	medium: { label: 'medium', icon: Medium },
	long: { label: 'long', icon: Long },
};

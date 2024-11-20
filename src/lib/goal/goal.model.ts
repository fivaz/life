import { format, lastDayOfQuarter } from 'date-fns';
import { z } from 'zod';

import { DATE, zDate } from '$lib/date.utils.svelte';

export type Goal = {
	deadline: string;
	icon: null | string;
	id: string;
	isDone: boolean;
	name: string;
};

export function buildEmptyGoal(): Goal {
	return {
		deadline: format(lastDayOfQuarter(new Date()), DATE),
		icon: 'Fire',
		id: '',
		isDone: false,
		name: '',
	};
}

export const goalSchema = z.object({
	id: z.string(),
	name: z.string(),
	icon: z.string().nullable(),
	deadline: zDate.nullable(),
	isDone: z.boolean(),
});

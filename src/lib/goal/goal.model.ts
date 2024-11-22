import { lastDayOfQuarter } from 'date-fns';
import { z } from 'zod';

import { formatDate } from '$lib/date.utils.svelte';
import { zDate } from '$lib/utils';

// TODO make deadline 	deadline: yyyyMMdd | null;
export type Goal = {
	deadline: string;
	icon: null | string;
	id: string;
	isDone: boolean;
	name: string;
};

export function buildEmptyGoal(): Goal {
	return {
		deadline: formatDate(lastDayOfQuarter(new Date())),
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

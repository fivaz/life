import { formatDate } from '@life/shared/date';
import { lastDayOfQuarter } from 'date-fns';
import { z } from 'zod';

import { zDateOrEmpty } from '$lib/utils';

export const goalSchema = z.object({
	id: z.string(),
	name: z.string(),
	icon: z.string(),
	deadline: zDateOrEmpty,
	isDone: z.boolean(),
});

export type Goal = z.infer<typeof goalSchema>;

export function buildEmptyGoal(): Goal {
	return {
		deadline: formatDate(lastDayOfQuarter(new Date())),
		icon: 'Fire',
		id: '',
		isDone: false,
		name: '',
	};
}

import { formatDate } from '@life/shared/date';
import { addDays, lastDayOfQuarter } from 'date-fns';
import { z } from 'zod';

import { zDateOrEmpty } from '$lib/utils';

import type { HierarchicalGoal } from '../../routes/(dashboard)/goals/goals-by-parent/service';

export const goalSchema = z.object({
	id: z.string(),
	name: z.string(),
	icon: z.string(),
	startDate: zDateOrEmpty,
	deadline: zDateOrEmpty,
	isDone: z.boolean(),
	parent: z.string(),
});

export type Goal = z.infer<typeof goalSchema>;

export function buildEmptyGoal(): Goal {
	return {
		startDate: formatDate(new Date()),
		deadline: formatDate(addDays(new Date(), 7)),
		icon: 'Fire',
		id: '',
		isDone: false,
		name: '',
		parent: '',
	};
}

export function buildEmptyGoalWithParent(parent: string): Goal {
	return {
		startDate: formatDate(new Date()),
		deadline: formatDate(lastDayOfQuarter(new Date())),
		icon: 'Fire',
		id: '',
		isDone: false,
		name: '',
		parent,
	};
}

export function removeGoalChildren(goal: Goal | HierarchicalGoal): Goal {
	if ('children' in goal) {
		const { children, ...rest } = goal;
		return rest;
	} else {
		const { ...rest } = goal;
		return rest;
	}
}

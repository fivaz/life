import type { AnyEvent, Event } from '$lib/task/utils';

import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
import { getDuration } from '$lib/task/utils';

export function isShort(event: Event) {
	return Math.abs(getDuration(event)) <= 15;
}

export function toggleCompletion(userId: string, event: AnyEvent, targetDate: string) {
	const newEvent = { ...event, isDone: !event.isDone };
	const { id, ...data } = newEvent;
	editPossibleSingleRecurringEvent(id, data, userId, targetDate);
}

import {
	editPossibleSingleRecurringEvent,
} from '$lib/components/task-form/service';
import { removeDraggedEvent, setDraggedEvent } from '$lib/dragged/store';
import type { AnyEvent, Event } from '$lib/task/utils';
import { getDuration } from '$lib/task/utils';

export function isShort(event: Event) {
	return Math.abs(getDuration(event)) <= 15;
}

export function toggleCompletion(userId: string, event: AnyEvent, targetDate: Date) {
	event.isDone = !event.isDone;
	const { id, ...data } = event;
	editPossibleSingleRecurringEvent(id, data, userId, targetDate);
}

export function dragStart(e: DragEvent, event: Event) {
	if (e.currentTarget instanceof HTMLDivElement) {
		e.currentTarget.style.opacity = '0.5';
		setDraggedEvent(event);
	}
}

export function dragEnd(e: DragEvent) {
	if (e.currentTarget instanceof HTMLDivElement) {
		e.currentTarget.style.opacity = '';
		removeDraggedEvent();
	}
}
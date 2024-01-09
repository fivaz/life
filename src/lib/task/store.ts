import { DATE_FR } from '$lib/consts';
import type { EEvent } from '$lib/task/utils';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { derived, writable } from 'svelte/store';

export const events = writable<EEvent[]>([]);

function getDateName(date: Date): string {
	if (isToday(date)) {
		return 'Today';
	}
	if (isTomorrow(date)) {
		return 'Tomorrow';
	}
	if (isYesterday(date)) {
		return 'Yesterday';
	}
	return format(date, DATE_FR);
}

function groupEventsByDate(events: EEvent[]): Record<string, EEvent[]> {
	return events.reduce<Record<string, EEvent[]>>((groups, event) => {
		const date = getDateName(event.startDate);

		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(event);
		return groups;
	}, {});
}

export const toDos = derived(events, ($events) =>
	groupEventsByDate($events.filter((event) => event.isDone === false)),
);

export function updateEvent(newEvent: EEvent) {
	events.update(($events) => {
		const index = $events.findIndex((event) => event.id === newEvent.id);
		if (index !== -1) {
			// Update existing event
			return $events.map((event) => (event.id === newEvent.id ? newEvent : event));
		} else {
			// Add new event
			return [...$events, newEvent];
		}
	});
}

export function removeEvent(event: EEvent) {
	events.update(($events) => $events.filter((existingEvent) => existingEvent.id !== event.id));
}
export function toggleEvent(event: EEvent) {
	events.update(($events) => [
		...$events.filter((existingEvent) => existingEvent.id !== event.id),
		{ ...event, isDone: !event.isDone },
	]);
}

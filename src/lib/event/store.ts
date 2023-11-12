import type { EEvent } from '$lib/event/utils';
import { DATE_FR } from '$lib/utils';
import { format } from 'date-fns';
import { derived, writable } from 'svelte/store';

export const events = writable<EEvent[]>([]);

function groupEventsByDate(events: EEvent[]): Record<string, EEvent[]> {
	return events.reduce<Record<string, EEvent[]>>((groups, event) => {
		const date = format(event.startDate, DATE_FR);
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

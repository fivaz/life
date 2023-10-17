import type { TEvent } from '$lib';
import { writable } from 'svelte/store';

export const events = writable<TEvent[]>([]);

export function updateEvent(newEvent: TEvent) {
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

export function removeEvent(event: TEvent) {
	events.update(($events) => $events.filter((existingEvent) => existingEvent.id !== event.id));
}
export function toggleEvent(event: TEvent) {
	events.update(($events) => [
		...$events.filter((existingEvent) => existingEvent.id !== event.id),
		{ ...event, isDone: !event.isDone }
	]);
}

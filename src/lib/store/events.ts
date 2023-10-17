import type { TEvent } from '$lib';
import { writable } from 'svelte/store';

export const events = writable<TEvent[]>([]);

export function updateEvent(newEvent: TEvent) {
	events.update(($events) => {
		const index = $events.findIndex((e) => e.id === newEvent.id);
		if (index !== -1) {
			// Update existing event
			return $events.map((e) => (e.id === newEvent.id ? newEvent : e));
		} else {
			// Add new event
			return [...$events, newEvent];
		}
	});
}

export function removeEvent(event: TEvent) {
	events.update(($events) => $events.filter((event) => event.id !== event.id));
}
export function toggleEvent(event: TEvent) {
	events.update(($todos) => [
		...$todos.filter((e) => e.id !== event.id),
		{ ...event, isDone: !event.isDone }
	]);
}

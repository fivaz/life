import type { TEvent } from '$lib';
import { writable } from 'svelte/store';

export const events = writable<TEvent[]>([]);

export function update(newEvent: TEvent) {
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

export function remove(event: TEvent) {
	events.update(($events) => $events.filter((e) => e !== event));
}
export function toggle(event: TEvent, isDone: boolean) {
	events.update(($todos) => [...$todos.filter((e) => e.id !== event.id), { ...event, isDone }]);
}

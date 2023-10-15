import type { TEvent } from '$lib';
import { writable } from 'svelte/store';

export const events = writable<TEvent[]>([]);

export function add(event: TEvent) {
	events.update(($events) => [...$events, event]);
}
export function remove(event: TEvent) {
	events.update(($events) => $events.filter((e) => e !== event));
}
export function toggle(event: TEvent, isDone: boolean) {
	events.update(($todos) => [...$todos.filter((e) => e.id !== event.id), { ...event, isDone }]);
}

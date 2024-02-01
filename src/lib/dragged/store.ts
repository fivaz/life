import type { Event } from '$lib/task/utils';
import { writable } from 'svelte/store';

export const draggedEvent = writable<Event | undefined>(undefined);
export function setDraggedEvent(newEvent: Event) {
	draggedEvent.set(newEvent);
}

export function removeDraggedEvent() {
	draggedEvent.set(undefined);
}

import type { EEvent } from '$lib/event/utils';
import { writable } from 'svelte/store';

export const draggedEvent = writable<EEvent | undefined>(undefined);
export function setDraggedEvent(newEvent: EEvent) {
	draggedEvent.set(newEvent);
}

export function removeDraggedEvent() {
	draggedEvent.set(undefined);
}

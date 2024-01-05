import type { EEvent } from '$lib/event/utils';
import { writable } from 'svelte/store';

export const draggedEvent = writable<EEvent | undefined>(undefined);
export function setDraggedEvent(newEvent: EEvent) {
	draggedEvent.update(() => newEvent);
}

export function removeDraggedEvent() {
	draggedEvent.update(() => undefined);
}

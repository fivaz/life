import type { TTask } from '$lib/task/utils';
import { writable } from 'svelte/store';

export const draggedEvent = writable<TTask | undefined>(undefined);
export function setDraggedEvent(newEvent: TTask) {
	draggedEvent.update(() => newEvent);
}

export function removeDraggedEvent() {
	draggedEvent.update(() => undefined);
}

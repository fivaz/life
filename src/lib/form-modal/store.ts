import { writable } from 'svelte/store';

export const modalMap = writable<Map<string, boolean>>(new Map());

// Function to open a modal
export function openModal(modalId: string) {
	modalMap.update((modals) => {
		modals.set(modalId, true);
		return new Map(modals);
	});
}

// Function to close a modal
export function closeModal(modalId: string) {
	modalMap.update((modals) => {
		modals.set(modalId, false);
		return new Map(modals);
	});
}

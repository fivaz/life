import { writable } from 'svelte/store';

export const isModalVisible = writable<boolean>(false);

export function openModal() {
	isModalVisible.update(() => true);
}

export function closeModal() {
	isModalVisible.update(() => false);
}

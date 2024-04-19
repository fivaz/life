import { writable } from 'svelte/store';

export const isSomethingDragging = writable<boolean>(false);

import { writable } from 'svelte/store';

export const isSomethingDragging = writable<boolean>(false);

export const GRID_CELL_HEIGHT = 28;

export const GRID_CELL_TIME = 15;

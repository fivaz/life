import { writable } from 'svelte/store';

export const GRID_CLASS = 'grid-class';
// this var is used in a style tag ass grid-class, if you change the value, remember to also change the style tag
export const GRID_CELL_TIME = 15;

export const NUMBER_OF_CELLS = (24 * 60) / GRID_CELL_TIME;

export const GRID_CELL_HEIGHT = 30;

export const isSomethingDragging = writable<boolean>(false);

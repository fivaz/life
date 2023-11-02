import type { TToDo } from '$lib/to-do/utils';

export const work = {
	id: 1,
	name: 'do my Bachelor Thesis',
	isDone: false,
};

export const cook = {
	id: 2,
	name: 'learn a new recipe',
	isDone: false,
};

export const exercise = {
	id: 3,
	name: 'Stretch',
	isDone: true,
};

export const chore = {
	id: 4,
	name: 'Open my letters',
	isDone: false,
};

export const toDos: TToDo[] = [work, cook, exercise, chore];

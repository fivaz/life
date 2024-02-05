import type { Category } from '$lib/category/utils';

let id = 0;

export const work = {
	color: 'green',
	id: `${id++}`,
	isDefault: true,
	name: 'Work',
	type: 'work',
};

export const fun = {
	color: 'red',
	id: `${id++}`,
	isDefault: false,
	name: 'Free time',
	type: 'fun',
};

export const routine = {
	color: 'yellow',
	id: `${id++}`,
	isDefault: false,
	name: 'Routine',
	type: 'fun',
};

export const sleep = {
	color: 'blue',
	id: `${id++}`,
	isDefault: false,
	name: 'Sleep',
	type: 'sleep',
};

export const categories: Category[] = [work, fun, routine, sleep];

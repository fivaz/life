import type { Category } from '$lib/category/utils';

let id = 0;

export const work = {
	id: `${id++}`,
	name: 'Work',
	isDefault: true,
	color: 'green',
	type: 'work',
};

export const fun = {
	id: `${id++}`,
	name: 'Free time',
	isDefault: false,
	color: 'red',
	type: 'fun',
};

export const routine = {
	id: `${id++}`,
	name: 'Routine',
	isDefault: false,
	color: 'yellow',
	type: 'fun',
};

export const sleep = {
	id: `${id++}`,
	name: 'Sleep',
	isDefault: false,
	color: 'blue',
	type: 'sleep',
};

export const categories: Category[] = [work, fun, routine, sleep];

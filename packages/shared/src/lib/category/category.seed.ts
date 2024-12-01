import type { Category } from '$lib/category/category.model.js';

let id = 0;

export const work: Category = {
	color: 'green',
	id: `${id++}`,
	isDefault: true,
	name: 'Work',
	type: 'work',
	order: 0,
};

export const fun: Category = {
	color: 'red',
	id: `${id++}`,
	isDefault: false,
	name: 'Free time',
	type: 'fun',
	order: 1,
};

export const routine: Category = {
	color: 'yellow',
	id: `${id++}`,
	isDefault: false,
	name: 'Routine',
	type: 'fun',
	order: 2,
};

export const sleep: Category = {
	color: 'blue',
	id: `${id++}`,
	isDefault: false,
	name: 'Sleep',
	type: 'sleep',
	order: 3,
};

export const categories: Category[] = [work, fun, routine, sleep];

import type { CCategory } from '$lib/category/utils';

let id = 0;

export const work = {
	id: id++,
	name: 'Work',
	isDefault: true,
	color: 'green',
	group: 'work',
};

export const fun = {
	id: id++,
	name: 'Free time',
	isDefault: false,
	color: 'red',
	group: 'fun',
};

export const routine = {
	id: id++,
	name: 'Routine',
	isDefault: false,
	color: 'yellow',
	group: 'fun',
};

export const sleep = {
	id: id++,
	name: 'Sleep',
	isDefault: false,
	color: 'blue',
	group: 'sleep',
};

export const categories: CCategory[] = [work, fun, routine, sleep];

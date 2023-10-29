import type { CCategory } from '$lib/category/utils';

export const work = {
	id: 1,
	name: 'Work',
	isDefault: true,
	color: 'green',
	group: 'work',
};

export const fun = {
	id: 2,
	name: 'Free time',
	isDefault: false,
	color: 'red',
	group: 'fun',
};

export const routine = {
	id: 3,
	name: 'Routine',
	isDefault: false,
	color: 'yellow',
	group: 'fun',
};

export const sleep = {
	id: 3,
	name: 'Sleep',
	isDefault: false,
	color: 'blue',
	group: 'sleep',
};

export const categories: CCategory[] = [work, fun, routine, sleep];

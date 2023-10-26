import type { CCategory } from '$lib/category/utils';

export const work = {
	id: 1,
	name: 'Work',
	isDefault: true,
	color: 'green',
};

export const fun = {
	id: 2,
	name: 'Free time',
	isDefault: false,
	color: 'red',
};

export const routine = {
	id: 3,
	name: 'Routine',
	isDefault: false,
	color: 'yellow',
};

export const categories: CCategory[] = [work, fun, routine];

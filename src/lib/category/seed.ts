import type { CCategory } from '$lib/category/utils';

export const categories: CCategory[] = [
	{
		id: 1,
		name: 'Work',
		isDefault: true,
		color: 'red',
	},
	{
		id: 2,
		name: 'Free time',
		isDefault: false,
		color: 'blue',
	},
	{
		id: 3,
		name: 'Routine',
		isDefault: false,
		color: 'green',
	},
];

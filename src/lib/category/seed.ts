import type { CCategory } from '$lib/category/utils';

export const categories: CCategory[] = [
	{
		id: 1,
		name: 'Work',
		isDefault: true
	},
	{
		id: 2,
		name: 'Free time',
		isDefault: false
	},
	{
		id: 3,
		name: 'Routine',
		isDefault: false
	}
];

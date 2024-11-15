import { tailwindColors } from '$lib/category/category.utils';

export const CategoryTypes = {
	FUN: 'fun',
	SLEEP: 'sleep',
	WORK: 'work',
};

export type CategoryType = (typeof CategoryTypes)[keyof typeof CategoryTypes];

export type Category = {
	color: string;
	id: string;
	isDefault: boolean;
	name: string;
	type: CategoryType;
};

export function buildEmptyCategory() {
	return {
		color: Object.keys(tailwindColors)[0],
		id: '',
		isDefault: false,
		name: '',
		type: Object.values(CategoryTypes)[0] as CategoryType,
	};
}

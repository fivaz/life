import { type CategoryType, CategoryTypes } from '$lib/category/category.model';
import { tailwindColors } from '$lib/category/category.utils';

export function buildEmptyCategory() {
	return {
		color: Object.keys(tailwindColors)[0],
		id: '',
		isDefault: false,
		name: '',
		type: Object.values(CategoryTypes)[0] as CategoryType,
	};
}

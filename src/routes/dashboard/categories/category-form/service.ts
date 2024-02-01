import { tailwindColors, types } from '$lib/category/utils';

export const modalId = 'category-form';

export function buildEmptyCategory() {
	return {
		name: '',
		isDefault: false,
		color: Object.keys(tailwindColors)[0],
		type: types[0] as string,
	};
}

import type { Category } from '$lib/category/category.model';

export function checkErrors(category: Category): string {
	if (!category.name) {
		return 'name is required';
	}

	return '';
}

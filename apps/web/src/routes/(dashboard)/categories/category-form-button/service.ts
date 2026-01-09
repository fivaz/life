import type { Category } from '@life/shared/category';

export function checkErrors(category: Category): string {
	if (!category.name) {
		return 'name is required';
	}

	return '';
}

import type { Category } from '$lib/category/utils';

export function parseCategories(
	categoriesCollection: Array<Category & Record<string, string>>,
): Category[] {
	return categoriesCollection.map((datum) => ({
		id: datum.id,
		name: datum.name,
		color: datum.color,
		type: datum.type,
		isDefault: datum.isDefault,
	}));
}

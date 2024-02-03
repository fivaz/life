import type { Category } from '$lib/category/utils';

export function parseCategories(categoriesCollection: unknown): Category[] {
	return categoriesCollection as Category[];
}

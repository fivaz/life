import type { Category } from '$lib/category/category.model';
import { fetchCategories } from '$lib/category/category.respository';

let categories = $state<Category[]>([]);

let hasStarted = $state<boolean>(false);

export function useCategories<T = Category>(handleCategories?: (categories: Category[]) => T[]) {
	if (categories.length === 0 && !hasStarted) {
		hasStarted = true;
		fetchCategories(categories);
	}

	return {
		get value(): T[] {
			if (handleCategories) {
				return handleCategories(categories);
			} else {
				return categories as T[];
			}
		},
		set value(value: Category[]) {
			categories = value;
		},
		update(newCategories: Category[]) {
			categories.splice(0, categories.length, ...newCategories);
		},
	};
}

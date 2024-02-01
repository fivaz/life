import type { CCategory } from '$lib/category/utils';
import { writable } from 'svelte/store';

export const categories = writable<CCategory[]>([]);

export function addCategory(newCategory: any) {
	categories.update(($categories) => {
		return [...$categories, newCategory];
	});
}

export function updateCategory(newCategory: CCategory) {
	categories.update(($categories) => {
		const index = $categories.findIndex((category) => category.id === newCategory.id);
		if (index !== -1) {
			return $categories.map((category) =>
				category.id === newCategory.id ? newCategory : category,
			);
		} else {
			return [...$categories, newCategory];
		}
	});
}

export function removeCategory(category: CCategory) {
	categories.update(($categories) =>
		$categories.filter((existingCategory) => existingCategory.id !== category.id),
	);
}

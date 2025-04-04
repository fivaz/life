import type { Category } from '$lib/category/category.model';

export const categoriesStore = $state<{ value: Category[] }>({ value: [] });

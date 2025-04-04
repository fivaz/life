import type { Category } from '$lib/category/category.model';

export const categories = $state<{ value: Category[] }>({ value: [] });

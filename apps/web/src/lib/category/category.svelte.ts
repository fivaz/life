import type { Category } from '@life/shared/category';

export const categories = $state<{ value: Category[] }>({ value: [] });

import { z } from 'zod';

import type { TailwindColor } from '$lib/category/category.utils';
import { tailwindColors } from '$lib/category/category.utils';

export const CATEGORY_WORK = 'work';

export const categoryTypes = ['fun', 'sleep', CATEGORY_WORK] as const;

export type CategoryType = (typeof categoryTypes)[number];

export const categorySchema = z.object({
	id: z.string(),
	name: z.string(),
	isDefault: z.boolean(),
	type: z.enum(categoryTypes),
	color: z.enum(tailwindColors),
});

export type Category = z.infer<typeof categorySchema>;

export function buildEmptyCategory(): Category {
	return {
		color: tailwindColors[0],
		id: '',
		isDefault: false,
		name: '',
		type: categoryTypes[0],
	};
}

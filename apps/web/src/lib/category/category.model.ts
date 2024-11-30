import { categoryTypes, tailwindColors } from '@life/shared/category';
import { z } from 'zod';

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

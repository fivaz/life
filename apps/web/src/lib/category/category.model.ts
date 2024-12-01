import { categoryTypes, tailwindColors } from '@life/shared/category';
import { z } from 'zod';

export const categorySchema = z.object({
	id: z.string(),
	name: z.string(),
	type: z.enum(categoryTypes),
	color: z.enum(tailwindColors),
	order: z.number(),
});

export type Category = z.infer<typeof categorySchema>;

export function buildEmptyCategory(): Category {
	return {
		color: tailwindColors[0],
		id: '',
		name: '',
		type: categoryTypes[0],
		order: 0,
	};
}

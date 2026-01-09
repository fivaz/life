import { type Category, tailwindColors } from '@life/shared/category';

export function buildEmptyCategory(): Category {
	return {
		color: tailwindColors[0],
		id: '',
		name: '',
		type: 'work',
		order: 0,
		parent: null,
	};
}

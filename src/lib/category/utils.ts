import type { Category } from '@prisma/client';

export type CCategory = Omit<Category, 'userId' | 'deleted'>;

export const tailwindClasses = [
	{
		color: 'green',
		classes: 'bg-green-500',
	},
	{
		color: 'blue',
		classes: 'bg-blue-500',
	},
	{
		color: 'red',
		classes: 'bg-red-500',
	},
	{
		color: 'yellow',
		classes: 'bg-yellow-500',
	},
	{
		color: 'purple',
		classes: 'bg-purple-500',
	},
];

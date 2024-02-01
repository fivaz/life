import type { Category } from '@prisma/client';

export type CCategory = Omit<Category, 'id' | 'userId' | 'deleted' | 'group'> & {
	id?: string;
	type: string;
};

export type TailwindColor = {
	lightBg: string;
	darkBg: string;
	hoverBg: string;
	text: string;
};

export const tailwindColors: Record<string, TailwindColor> = {
	green: {
		lightBg: 'bg-green-50',
		darkBg: 'bg-green-500',
		hoverBg: 'hover:bg-green-100',
		text: 'text-green-700',
	},
	blue: {
		lightBg: 'bg-blue-50',
		darkBg: 'bg-blue-500',
		hoverBg: 'hover:bg-blue-100',
		text: 'text-blue-700',
	},
	red: {
		lightBg: 'bg-red-50',
		darkBg: 'bg-red-500',
		hoverBg: 'hover:bg-red-100',
		text: 'text-red-700',
	},
	yellow: {
		lightBg: 'bg-yellow-50',
		darkBg: 'bg-yellow-500',
		hoverBg: 'hover:bg-yellow-100',
		text: 'text-yellow-700',
	},
	purple: {
		lightBg: 'bg-purple-50',
		darkBg: 'bg-purple-500',
		hoverBg: 'hover:bg-purple-100',
		text: 'text-purple-700',
	},
};

export const types = ['sleep', 'work', 'fun'] as const;

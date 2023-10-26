import type { Category } from '@prisma/client';

export type CCategory = Omit<Category, 'userId' | 'deleted'>;

export const tailwindClasses: Record<string, string> = {
	green: 'bg-green-50 hover:bg-green-100 text-green-700',
	blue: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
	red: 'bg-red-50 hover:bg-red-100 text-red-700',
	yellow: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700',
	purple: 'bg-purple-50 hover:bg-purple-100 text-purple-700',
};

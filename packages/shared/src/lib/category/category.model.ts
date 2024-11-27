export const CATEGORY_WORK = 'work';

export const categoryTypes = ['fun', 'sleep', CATEGORY_WORK] as const;

export type CategoryType = (typeof categoryTypes)[number];

// these will be used by Calendar
export type Category = {
	id: string;
	name: string;
	isDefault: boolean;
	type: CategoryType;
	color: TailwindColor;
};

export const tailwindColors = ['red', 'green', 'blue', 'lime', 'yellow', 'purple'] as const;

export type TailwindColor = (typeof tailwindColors)[number];

export const tailwindColorMap: Record<TailwindColor, Record<string, string>> = {
	blue: {
		darkBg: 'bg-blue-500',
		hoverBg: 'hover:bg-blue-300',
		hoverLightBg: 'hover:bg-blue-100',
		hoverText: 'group-hover:text-blue-700',
		lightBg: 'bg-blue-50',
		lightText: 'text-blue-500',
		text: 'text-blue-700',
	},
	green: {
		darkBg: 'bg-green-500',
		hoverBg: 'hover:bg-green-300',
		hoverLightBg: 'hover:bg-green-100',
		hoverText: 'group-hover:text-green-700',
		lightBg: 'bg-green-50',
		lightText: 'text-green-500',
		text: 'text-green-700',
	},
	lime: {
		darkBg: 'bg-lime-500',
		hoverBg: 'hover:bg-lime-300',
		hoverLightBg: 'hover:bg-lime-100',
		hoverText: 'group-hover:text-lime-700',
		lightBg: 'bg-lime-50',
		lightText: 'text-lime-500',
		text: 'text-lime-700',
	},
	purple: {
		darkBg: 'bg-purple-500',
		hoverBg: 'hover:bg-purple-300',
		hoverLightBg: 'hover:bg-purple-100',
		hoverText: 'group-hover:text-purple-700',
		lightBg: 'bg-purple-50',
		lightText: 'text-purple-500',
		text: 'text-purple-700',
	},
	red: {
		darkBg: 'bg-red-500',
		hoverBg: 'hover:bg-red-300',
		hoverLightBg: 'hover:bg-red-100',
		hoverText: 'group-hover:text-red-700',
		lightBg: 'bg-red-50',
		lightText: 'text-red-500',
		text: 'text-red-700',
	},
	yellow: {
		darkBg: 'bg-yellow-500',
		hoverBg: 'hover:bg-yellow-300',
		hoverLightBg: 'hover:bg-yellow-100',
		hoverText: 'group-hover:text-yellow-700',
		lightBg: 'bg-yellow-50',
		lightText: 'text-yellow-500',
		text: 'text-yellow-700',
	},
};

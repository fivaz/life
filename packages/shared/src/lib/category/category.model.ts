export const CATEGORY_WORK = 'work';

export const categoryTypes = ['fun', 'sleep', CATEGORY_WORK] as const;

export type CategoryType = (typeof categoryTypes)[number];

export type Category = {
	id: string;
	name: string;
	type: CategoryType;
	color: TailwindColor;
	order: number;
};

export const tailwindColors = [
	'red',
	'rose',
	'pink',
	'orange',
	'yellow',
	'lime',
	'green',
	'teal',
	'cyan',
	'sky',
	'blue',
	'purple',
] as const;

export type TailwindColor = (typeof tailwindColors)[number];

export const tailwindColorMap: Record<TailwindColor, Record<string, string>> = {
	red: {
		darkBg: 'bg-red-500',
		hoverBg: 'hover:bg-red-300',
		hoverLightBg: 'hover:bg-red-100',
		hoverText: 'group-hover:text-red-700',
		lightBg: 'bg-red-50',
		lightText: 'text-red-500',
		text: 'text-red-700',
	},
	orange: {
		darkBg: 'bg-orange-500',
		hoverBg: 'hover:bg-orange-300',
		hoverLightBg: 'hover:bg-orange-100',
		hoverText: 'group-hover:text-orange-700',
		lightBg: 'bg-orange-50',
		lightText: 'text-orange-500',
		text: 'text-orange-700',
	},
	pink: {
		darkBg: 'bg-pink-500',
		hoverBg: 'hover:bg-pink-300',
		hoverLightBg: 'hover:bg-pink-100',
		hoverText: 'group-hover:text-pink-700',
		lightBg: 'bg-pink-50',
		lightText: 'text-pink-500',
		text: 'text-pink-700',
	},
	rose: {
		darkBg: 'bg-rose-500',
		hoverBg: 'hover:bg-rose-300',
		hoverLightBg: 'hover:bg-rose-100',
		hoverText: 'group-hover:text-rose-700',
		lightBg: 'bg-rose-50',
		lightText: 'text-rose-500',
		text: 'text-rose-700',
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
	lime: {
		darkBg: 'bg-lime-500',
		hoverBg: 'hover:bg-lime-300',
		hoverLightBg: 'hover:bg-lime-100',
		hoverText: 'group-hover:text-lime-700',
		lightBg: 'bg-lime-50',
		lightText: 'text-lime-500',
		text: 'text-lime-700',
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
	teal: {
		darkBg: 'bg-teal-500',
		hoverBg: 'hover:bg-teal-300',
		hoverLightBg: 'hover:bg-teal-100',
		hoverText: 'group-hover:text-teal-700',
		lightBg: 'bg-teal-50',
		lightText: 'text-teal-500',
		text: 'text-teal-700',
	},
	cyan: {
		darkBg: 'bg-cyan-500',
		hoverBg: 'hover:bg-cyan-300',
		hoverLightBg: 'hover:bg-cyan-100',
		hoverText: 'group-hover:text-cyan-700',
		lightBg: 'bg-cyan-50',
		lightText: 'text-cyan-500',
		text: 'text-cyan-700',
	},
	sky: {
		darkBg: 'bg-sky-500',
		hoverBg: 'hover:bg-sky-300',
		hoverLightBg: 'hover:bg-sky-100',
		hoverText: 'group-hover:text-sky-700',
		lightBg: 'bg-sky-50',
		lightText: 'text-sky-500',
		text: 'text-sky-700',
	},
	blue: {
		darkBg: 'bg-blue-500',
		hoverBg: 'hover:bg-blue-300',
		hoverLightBg: 'hover:bg-blue-100',
		hoverText: 'group-hover:text-blue-700',
		lightBg: 'bg-blue-50',
		lightText: 'text-blue-500',
		text: 'text-blue-700',
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
};

export function extractTailwindColorValues(
	colorMap: Record<string, Record<string, string>>,
): string[] {
	return Object.values(colorMap).flatMap((colorValues) => Object.values(colorValues));
}

export const tailwindCLasses = extractTailwindColorValues(tailwindColorMap);

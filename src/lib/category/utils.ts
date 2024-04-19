export type GroupType = (typeof types)[number];

export type Category = {
	color: string;
	id: string;
	isDefault: boolean;
	name: string;
	type: GroupType;
};

export type TailwindColor = {
	darkBg: string;
	hoverBg: string;
	lightBg: string;
	lightText: string;
	normalBgCss: string;
	text: string;
};

export const tailwindColors: Record<string, TailwindColor> = {
	blue: {
		darkBg: 'bg-blue-500',
		hoverBg: 'hover:bg-blue-100',
		lightBg: 'bg-blue-50',
		lightText: 'text-blue-500 group-hover:text-blue-700',
		normalBgCss: '#bfdbfe',
		text: 'text-blue-700',
	},
	green: {
		darkBg: 'bg-green-500',
		hoverBg: 'hover:bg-green-100',
		lightBg: 'bg-green-50',
		lightText: 'text-green-500 group-hover:text-green-700',
		normalBgCss: '#bbf7d0',
		text: 'text-green-700',
	},
	purple: {
		darkBg: 'bg-purple-500',
		hoverBg: 'hover:bg-purple-100',
		lightBg: 'bg-purple-50',
		lightText: 'text-purple-500 group-hover:text-purple-700',
		normalBgCss: '#e9d5ff',
		text: 'text-purple-700',
	},
	red: {
		darkBg: 'bg-red-500',
		hoverBg: 'hover:bg-red-100',
		lightBg: 'bg-red-50',
		lightText: 'text-red-500 group-hover:text-red-700',
		normalBgCss: '#fecaca',
		text: 'text-red-700',
	},
	yellow: {
		darkBg: 'bg-yellow-500',
		hoverBg: 'hover:bg-yellow-100',
		lightBg: 'bg-yellow-50',
		lightText: 'text-yellow-500 group-hover:text-yellow-700',
		normalBgCss: '#fef08a',
		text: 'text-yellow-700',
	},
};

export const types = ['sleep', 'work', 'fun'] as const;

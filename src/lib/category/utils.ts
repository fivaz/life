export type Category = {
	color: string;
	id: string;
	isDefault: boolean;
	name: string;
	type: string;
};

export type TailwindColor = {
	darkBg: string;
	hoverBg: string;
	lightBg: string;
	text: string;
};

export const tailwindColors: Record<string, TailwindColor> = {
	blue: {
		darkBg: 'bg-blue-500',
		hoverBg: 'hover:bg-blue-100',
		lightBg: 'bg-blue-50',
		text: 'text-blue-700',
	},
	green: {
		darkBg: 'bg-green-500',
		hoverBg: 'hover:bg-green-100',
		lightBg: 'bg-green-50',
		text: 'text-green-700',
	},
	purple: {
		darkBg: 'bg-purple-500',
		hoverBg: 'hover:bg-purple-100',
		lightBg: 'bg-purple-50',
		text: 'text-purple-700',
	},
	red: {
		darkBg: 'bg-red-500',
		hoverBg: 'hover:bg-red-100',
		lightBg: 'bg-red-50',
		text: 'text-red-700',
	},
	yellow: {
		darkBg: 'bg-yellow-500',
		hoverBg: 'hover:bg-yellow-100',
		lightBg: 'bg-yellow-50',
		text: 'text-yellow-700',
	},
};

export const types = ['sleep', 'work', 'fun'] as const;

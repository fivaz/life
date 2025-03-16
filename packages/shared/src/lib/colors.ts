// 100 - full
// 50 - 950
// zero - 900
export const bgColors = {
	darker: 'bg-gray-100 dark:bg-black',
	dark: 'bg-gray-50 dark:bg-gray-950',
	light: 'bg-white dark:bg-gray-900',
};

// 200 - 900
// 300 - 800
// 400 - 700
export const borderColors = {
	darker: 'border-gray-300 dark:border-gray-700 divide-gray-300 dark:divide-gray-700',
	dark: 'border-gray-200 dark:border-gray-800 divide-gray-200 dark:divide-gray-800',
	light: 'border-gray-100 dark:border-gray-900 divide-gray-100 dark:divide-gray-900',
};

export const textColors = {
	darker: 'text-gray-900 dark:text-white',
	dark: 'text-gray-700 dark:text-gray-100',
	middle: 'text-gray-500',
	light: 'text-gray-50 dark:text-gray-900',
	lighter: 'text-white dark:text-gray-800',
	primaryDarker: 'text-indigo-600 dark:text-white',
};

export const appColors = {
	darker: `${bgColors.darker} ${borderColors.darker}`,
};

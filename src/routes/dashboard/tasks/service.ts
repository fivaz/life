import type { Category } from '$lib/category/utils';
import type { AnyTask, ToDo } from '$lib/task/utils';

import { DATE } from '$lib/consts';
import { convertDurationToMinutes } from '$lib/task/utils';
import { endOfWeek, format } from 'date-fns';

export function buildEmptyToDo(categories: Category[]): ToDo {
	return {
		category: categories.find((category) => category.isDefault) || categories[0],
		deadline: format(endOfWeek(new Date()), DATE),
		description: '',
		goal: null,
		id: '',
		isDone: false,
		name: '',
	};
}

export function getSumOfDurationsAsTime(tasks: AnyTask[]): string {
	const sumOfDurationsInMinutes = tasks.reduce(
		(sum, task) => sum + convertDurationToMinutes(task),
		0,
	);
	const hours = Math.floor(sumOfDurationsInMinutes / 60);
	const remainingMinutes = sumOfDurationsInMinutes % 60;
	return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
}

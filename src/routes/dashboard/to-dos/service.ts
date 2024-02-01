import type { Category } from '$lib/category/utils';
import { DATE } from '$lib/consts';
import type { Task, ToDo } from '$lib/task/utils';
import { convertToMinutes } from '$lib/task/utils';
import { endOfWeek, format } from 'date-fns';

export function buildEmptyToDo(categories: Category[]): ToDo {
	return {
		name: '',
		description: '',
		isDone: false,
		category: categories.find((category) => category.isDefault) || categories[0],
		goal: null,
		deadline: format(endOfWeek(new Date()), DATE),
	};
}

export function getSumOfDurationsAsTime(tasks: Task[]): string {
	const sumOfDurationsInMinutes = tasks.reduce(
		(sum, task) => sum + convertToMinutes(task.duration),
		0,
	);
	const hours = Math.floor(sumOfDurationsInMinutes / 60);
	const remainingMinutes = sumOfDurationsInMinutes % 60;
	return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
}

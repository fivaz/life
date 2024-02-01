import type { Category } from '$lib/category/utils';
import { DATE } from '$lib/consts';
import type { Task, ToDo } from '$lib/task/utils';
import { endOfWeek, format } from 'date-fns';
import { string } from 'yup';

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
	const sumOfDurationsInMinutes = tasks.reduce((sum, task) => sum + (task.duration || 0), 0);
	const hours = Math.floor(sumOfDurationsInMinutes / 60);
	const remainingMinutes = sumOfDurationsInMinutes % 60;
	return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
}

export function parseTasks(tasksCollection: Array<Task & Record<string, string>>): Partial<Task>[] {
	return tasksCollection.map((datum) => ({
		id: datum.id,
		name: datum.name,
		isDone: datum.isDone,
		category: datum.category,
		description: datum.description,
		goal: datum.goal,

		deadline: datum.deadline,

		date: datum.date,
		startTime: datum.startTime,
		endTime: datum.endTime,
		duration: datum.duration,

		recurringExceptions: datum.recurringExceptions,
		recurringDaysOfWeek: datum.recurringDaysOfWeek,
		recurringStartAt: datum.recurringStartAt,
		recurringEndAt: datum.recurringEndAt,
	}));
}

import type { Category } from '$lib/category/utils';
import type { AnyTask, ToDo } from '$lib/task/utils';

import { DATE } from '$lib/consts';
import { db } from '$lib/firebase';
import { getTasksByDate } from '$lib/task/store';
import { getDurationInMinutes } from '$lib/task/utils';
import { endOfWeek, format } from 'date-fns';
import { collection, query, where } from 'firebase/firestore';

export function buildEmptyToDo(categories: Category[]): ToDo {
	return {
		category: categories.find((category) => category.isDefault) || categories[0],
		deadline: format(endOfWeek(new Date()), DATE),
		description: '',
		duration: '',
		goal: null,
		id: '',
		isDone: false,
		name: '',
	};
}

export function getSumOfDurationsAsTime(tasks: AnyTask[]): string {
	const sumOfDurationsInMinutes = tasks.reduce((sum, task) => sum + getDurationInMinutes(task), 0);
	const hours = Math.floor(sumOfDurationsInMinutes / 60);
	const remainingMinutes = sumOfDurationsInMinutes % 60;
	return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
}

export function queryUncompletedTasks(userId: string) {
	const tasksRef = collection(db, `users/${userId}/tasks`);
	return query(tasksRef, where('isDone', '==', false));
}

export function getTasksByDateOrdered(tasks: AnyTask[]): [string, AnyTask[]][] {
	const groupedTasks = getTasksByDate(tasks);

	const keys = new Set(['Today', 'Tomorrow']);
	Object.keys(groupedTasks).forEach((key) => keys.add(key));

	const entries: [string, AnyTask[]][] = [];
	keys.forEach((key) => entries.push([key, groupedTasks[key] || []]));
	return entries;
}

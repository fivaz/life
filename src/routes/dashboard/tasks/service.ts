import type { AnyTask } from '$lib/task/utils';

import { db } from '$lib/firebase';
import { getDurationInMinutes } from '$lib/task/utils';
import { type Query, collection, query, where } from 'firebase/firestore';

export function getSumOfDurationsAsTime(tasks: AnyTask[]): string {
	const sumOfDurationsInMinutes = tasks.reduce((sum, task) => sum + getDurationInMinutes(task), 0);
	const hours = Math.floor(sumOfDurationsInMinutes / 60);
	const remainingMinutes = sumOfDurationsInMinutes % 60;
	return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
}

export function queryUncompletedTasks(userId: string) {
	const tasksRef = collection(db, `users/${userId}/tasks`);
	return query(tasksRef, where('isDone', '==', false)) as Query<AnyTask>;
}

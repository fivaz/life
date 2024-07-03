import { DATE } from '$lib/consts';
import { db } from '$lib/firebase';
import { type AnyTask } from '$lib/task/utils';
import { parse } from 'date-fns';
import { Query, collection, query, where } from 'firebase/firestore';

export type Goal = {
	deadline: string;
	icon: null | string;
	id: string;
	isDone: boolean;
	name: string;
};

export function queryUncompletedGoals(userId: string) {
	const goalsRef = collection(db, `users/${userId}/goals`);
	return query(goalsRef, where('isDone', '==', false)) as Query<Goal>;
}

export function sortGoals(goals: Goal[]) {
	return goals.sort((a, b) => {
		const dateA = a.deadline ? parse(a.deadline, DATE, new Date()) : null;
		const dateB = b.deadline ? parse(b.deadline, DATE, new Date()) : null;
		if (!dateA) {
			return 1;
		}
		if (!dateB) {
			return -1;
		}
		return dateA.getTime() - dateB.getTime();
	});
}

export function getCompletedTasks(tasks: AnyTask[]): number {
	return tasks.reduce((total, task) => total + Number(task.isDone), 0);
}

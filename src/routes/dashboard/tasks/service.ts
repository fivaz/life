import type { AnyTask } from '$lib/task/utils';

import { db } from '$lib/firebase';
import { type Query, collection, query, where } from 'firebase/firestore';

export function queryUncompletedTasks(userId: string) {
	const tasksRef = collection(db, `users/${userId}/tasks`);
	return query(tasksRef, where('isDone', '==', false)) as Query<AnyTask>;
}

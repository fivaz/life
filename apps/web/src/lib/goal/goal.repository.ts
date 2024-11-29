import type { QueryConstraint } from 'firebase/firestore';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
	writeBatch,
} from 'firebase/firestore';

import type { Category } from '$lib/category/category.model';
import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import type { Goal } from '$lib/goal/goal.model';
import { goalSchema } from '$lib/goal/goal.model';
import { fetchItems } from '$lib/repository.svelte';
import { getTaskPath } from '$lib/task/task.repository';

export function fetchGoals(
	handleGoals: Goal[] | ((goals: Goal[]) => void),
	...constrains: QueryConstraint[]
): void {
	const handleGoalsSorted = (goals: Goal[]) => {
		goals.sort((a, b) => a.deadline.localeCompare(b.deadline));

		if (typeof handleGoals === 'function') {
			handleGoals(goals);
		} else {
			handleGoals.splice(0, handleGoals.length, ...goals);
		}
	};

	fetchItems(handleGoalsSorted, DB_PATH.GOALS, goalSchema, ...constrains);
}

export function getGoalPath(userId: string) {
	return `${DB_PATH.USERS}/${userId}/${DB_PATH.GOALS}`;
}

export function editGoal(goal: Goal, userId: string) {
	const goalDocRef = doc(db, getGoalPath(userId), goal.id);
	const { id, ...goalWithoutId } = goal;
	void updateDoc(goalDocRef, goalWithoutId);
	void updateGoalInTasks(goal, userId);
}

async function updateGoalInTasks(goal: Goal, userId: string) {
	const tasksQuery = query(collection(db, getTaskPath(userId)), where('goal.id', '==', goal.id));

	const tasksSnapshot = await getDocs(tasksQuery);

	const batch = writeBatch(db);

	tasksSnapshot.forEach((taskDoc) => {
		const taskRef = taskDoc.ref;
		batch.update(taskRef, { goal });
	});

	await batch.commit();
}

export function addGoal(goal: Goal, userId: string) {
	const goalsCollectionRef = collection(db, getGoalPath(userId));
	const { id, ...goalWithoutId } = goal;
	void addDoc(goalsCollectionRef, goalWithoutId);
}

export async function deleteGoal(id: string | undefined, userId: string, close: () => void) {
	if (id) {
		const goalDocRef = doc(db, getGoalPath(userId), id);
		await deleteDoc(goalDocRef);
		close();
	}
}

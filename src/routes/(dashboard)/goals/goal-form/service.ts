import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import type { Goal } from '$lib/goal/goal.model';

// EDIT
export function editGoal(id: string, data: Omit<Goal, 'id'>, userId: string) {
	const goalDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.GOALS, id);
	return updateDoc(goalDocRef, data);
}

// ADD
export function addGoal(data: Omit<Goal, 'id'>, userId: string) {
	const goalsCollectionRef = collection(db, DB_PATH.USERS, userId, DB_PATH.GOALS);
	return addDoc(goalsCollectionRef, data);
}

// DELETE
export async function deleteGoal(id: string | undefined, userId: string, close: () => void) {
	if (id) {
		const goalDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.GOALS, id);
		await deleteDoc(goalDocRef);
		close();
	}
}

// OTHERS
export function checkErrors(goal: Goal): string {
	if (!goal.name) {
		return 'name is required';
	}

	return '';
}

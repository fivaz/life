import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import type { Goal } from '$lib/goal/goal.model';

export function getGoalPath(userId: string) {
	return `${DB_PATH.USERS}/${userId}/${DB_PATH.GOALS}`;
}

export function editGoal(id: string, data: Omit<Goal, 'id'>, userId: string) {
	const goalDocRef = doc(db, getGoalPath(userId), id);
	return updateDoc(goalDocRef, data);
}

export function addGoal(data: Omit<Goal, 'id'>, userId: string) {
	const goalsCollectionRef = collection(db, getGoalPath(userId));
	return addDoc(goalsCollectionRef, data);
}

export async function deleteGoal(id: string | undefined, userId: string, close: () => void) {
	if (id) {
		const goalDocRef = doc(db, getGoalPath(userId), id);
		await deleteDoc(goalDocRef);
		close();
	}
}

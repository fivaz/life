import type { Goal } from '$lib/goal/utils';
import type { EventDispatcher } from 'svelte';

import { DbPaTH } from '$lib/consts';
import { db } from '$lib/firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export function editGoal(id: string, data: Omit<Goal, 'id'>, userId: string) {
	const goalDocRef = doc(db, DbPaTH.USERS, userId, 'goals', id);
	return updateDoc(goalDocRef, data);
}

export function addGoal(data: Omit<Goal, 'id'>, userId: string) {
	const goalsCollectionRef = collection(db, DbPaTH.USERS, userId, 'goals');
	return addDoc(goalsCollectionRef, data);
}

export async function deleteGoal(
	id: string | undefined,
	userId: string,
	dispatch: EventDispatcher<{ close: null }>,
) {
	if (id) {
		const goalDocRef = doc(db, DbPaTH.USERS, userId, 'goals', id);
		await deleteDoc(goalDocRef);
		dispatch('close');
	}
}

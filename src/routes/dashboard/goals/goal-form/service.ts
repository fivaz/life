import { createModal } from '$lib/components/dialog/service';
import { DATE } from '$lib/consts';
import { db } from '$lib/firebase';
import type { Goal } from '$lib/goal/utils';
import { parse } from 'date-fns';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { EventDispatcher } from 'svelte';
import { string } from 'yup';

export function editGoal(id: string, data: Omit<Goal, 'id'>, userId: string) {
	const goalDocRef = doc(db, 'users', userId, 'goals', id);
	return updateDoc(goalDocRef, data);
}

export function addGoal(data: Omit<Goal, 'id'>, userId: string) {
	const goalsCollectionRef = collection(db, 'users', userId, 'goals');
	return addDoc(goalsCollectionRef, data);
}

export async function deleteGoal(
	id: string | undefined,
	userId: string,
	dispatch: EventDispatcher<{ close: null }>,
) {
	const result = await createModal({ title: 'Are you sure?' });
	if (result && id) {
		const goalDocRef = doc(db, 'users', userId, 'goals', id);
		await deleteDoc(goalDocRef);
		dispatch('close');
	}
}

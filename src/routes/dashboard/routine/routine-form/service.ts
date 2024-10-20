import type { EventDispatcher } from 'svelte';

import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import { type Routine } from '$lib/routine/utils';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';

export function buildEmptyRoutine(): Routine {
	return {
		completeHistory: [],
		createdAt: new Date().toISOString(),
		icon: 'Fire',
		id: '',
		name: '',
		order: 0,
	};
}

export function toggleRoutineCompletion(
	routine: Routine,
	selectedDate: string,
	userId: string,
): void {
	const item = routine.completeHistory.find(({ date }) => date === selectedDate);

	if (item) {
		item.isCompleted = !item.isCompleted;
	} else {
		routine.completeHistory.push({ date: selectedDate, isCompleted: true });
	}

	const { id, ...data } = routine;

	const routineDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.ROUTINES, id);
	void updateDoc(routineDocRef, data);
}

export function editRoutine(id: string, data: Omit<Routine, 'id'>, userId: string) {
	const routineDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.ROUTINES, id);
	void updateDoc(routineDocRef, data);
}

export function addRoutine(data: Omit<Routine, 'id'>, userId: string) {
	const routinesCollectionRef = collection(db, DB_PATH.USERS, userId, DB_PATH.ROUTINES);
	void addDoc(routinesCollectionRef, data);
}

export async function deleteRoutine(
	id: string | undefined,
	userId: string,
	dispatch: EventDispatcher<{ close: null }>,
) {
	if (id) {
		const routineDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.ROUTINES, id);
		await deleteDoc(routineDocRef);
		dispatch('close');
	}
}

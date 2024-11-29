import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	orderBy,
	updateDoc,
	writeBatch,
} from 'firebase/firestore';

import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import { fetchItems } from '$lib/repository.svelte';
import type { Routine } from '$lib/routine/routine.model';
import { routineSchema } from '$lib/routine/routine.model';

import { convertToMap } from '../../routes/(dashboard)/routine/service.svelte';

export function fetchRoutines(): void {
	fetchItems(convertToMap, DB_PATH.ROUTINES, routineSchema, orderBy('order'));
}

export function getRoutinePath(userId: string) {
	return `${DB_PATH.USERS}/${userId}/${DB_PATH.ROUTINES}`;
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

	const routineDocRef = doc(db, getRoutinePath(userId), id);
	void updateDoc(routineDocRef, data);
}

export function editRoutine(routine: Routine, userId: string) {
	const routineDocRef = doc(db, getRoutinePath(userId), routine.id);
	const { id, ...routineWithoutId } = routine;
	void updateDoc(routineDocRef, routineWithoutId);
}

export function addRoutine(routine: Routine, userId: string) {
	const routinesCollectionRef = collection(db, getRoutinePath(userId));
	const { id, ...routineWithoutId } = routine;
	void addDoc(routinesCollectionRef, routineWithoutId);
}

export async function deleteRoutine(id: string | undefined, userId: string, close: () => void) {
	if (id) {
		const routineDocRef = doc(db, getRoutinePath(userId), id);
		await deleteDoc(routineDocRef);
		close();
	}
}

export async function updateRoutines(userId: string, routines: Routine[]) {
	const batch = writeBatch(db);

	routines.forEach(({ id, time, order }) => {
		const routineRef = doc(db, getRoutinePath(userId), id);
		batch.update(routineRef, { time, order });
	});

	try {
		await batch.commit();
	} catch (error) {
		console.error('Error in batch update: ', error);
	}
}

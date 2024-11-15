import { addDoc, collection, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore';

import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import type { Routine } from '$lib/routine/routine.model';

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

export async function deleteRoutine(id: string | undefined, userId: string, close: () => void) {
	if (id) {
		const routineDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.ROUTINES, id);
		await deleteDoc(routineDocRef);
		close();
	}
}

export async function updateRoutines(userId: string, routines: Routine[]) {
	const batch = writeBatch(db);

	routines.forEach((routine, index) => {
		const routineRef = doc(db, `${DB_PATH.USERS}/${userId}/${DB_PATH.ROUTINES}/${routine.id}`);
		batch.update(routineRef, { order: index });
	});

	try {
		await batch.commit();
	} catch (error) {
		console.error('Error in batch update: ', error);
	}
}

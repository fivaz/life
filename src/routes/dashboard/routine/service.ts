import type { Routine } from '$lib/routine/utils';

import { DbPaTH } from '$lib/consts';
import { db } from '$lib/firebase';
import {
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
	writeBatch,
} from 'firebase/firestore';
import { derived, writable } from 'svelte/store';

export const routines = writable<Routine[]>([]);

export function fetchRoutines(userId: string) {
	const routinesRef = collection(db, `users/${userId}/routines`);
	const q = query(routinesRef, orderBy('order'));

	onSnapshot(q, (snapshot) => {
		const routinesList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Routine);
		console.log('routines updated');
		routines.set(routinesList);
	});
}

export async function updateRoutineOrder(userId: string, routines: Routine[]) {
	const batch = writeBatch(db); // Initialize a batch

	routines.forEach((routine, index) => {
		const routineRef = doc(db, `users/${userId}/routines/${routine.id}`);
		batch.update(routineRef, { order: index });
	});

	try {
		await batch.commit();
	} catch (error) {
		console.error('Error in batch update: ', error);
	}
}

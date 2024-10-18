import type { Routine } from '$lib/routine/utils';

import { db } from '$lib/firebase';
import { doc, writeBatch } from 'firebase/firestore';
import { writable } from 'svelte/store';

export const routines = writable<Routine[]>([]);

export async function updateRoutine(userId: string, routines: Routine[]) {
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

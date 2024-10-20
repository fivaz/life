import type { Routine } from '$lib/routine/utils';

import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import { doc, writeBatch } from 'firebase/firestore';

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

import { collection, type Query, type QuerySnapshot } from 'firebase/firestore';

import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import { type Routine, routineSchema } from '$lib/routine/routine.model';

const emptyRoutineMap: Record<Routine['time'], Routine[]> = {
	morning: [],
	afternoon: [],
	evening: [],
	'all-day': [],
};

export const isLoading = $state<{ value: boolean }>({ value: true });

export const routinesMap = $state<{ value: Record<Routine['time'], Routine[]> }>({
	value: emptyRoutineMap,
});

export function populateRoutines(snapshot: QuerySnapshot<Routine>) {
	// Clear existing routines
	routinesMap.value = emptyRoutineMap;

	// Populate routines from the snapshot
	snapshot.docs.forEach((doc) => {
		const routine = { ...doc.data(), id: doc.id };

		const validation = routineSchema.safeParse(routine);

		if (!validation.success) {
			console.warn(`validation failed for routine: ${routine.id}, ${validation.error}`);
		} else {
			routinesMap.value[routine.time].push(validation.data);
		}
	});

	const keys = Object.keys(routinesMap.value) as Routine['time'][];

	keys.forEach((time) => {
		routinesMap.value[time].sort((a: Routine, b: Routine) => a.order - b.order);
	});

	isLoading.value = false;
}

export function getRoutinePath(userId: string) {
	return collection(db, `${DB_PATH.USERS}/${userId}/${DB_PATH.ROUTINES}`) as Query<Routine>;
}

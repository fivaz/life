import type { QuerySnapshot, Unsubscribe } from 'firebase/firestore';
import { onSnapshot, orderBy } from 'firebase/firestore';

import { DB_PATH } from '$lib/consts';
import { getQuery } from '$lib/repository.svelte';
import type { Routine } from '$lib/routine/routine.model';
import { routineSchema } from '$lib/routine/routine.model';
import { currentUser } from '$lib/user/user.utils.svelte';

export const emptyRoutineMap: Record<Routine['time'], Routine[]> = {
	morning: [],
	afternoon: [],
	evening: [],
	'all-day': [],
};

export const routinesMap = $state<{ value: Record<Routine['time'], Routine[]> }>({
	value: emptyRoutineMap,
});

export function fetchRoutines(): void {
	$effect(() => {
		let unsubscribe: Unsubscribe = () => {};

		if (currentUser.uid) {
			unsubscribe = onSnapshot(getQuery(DB_PATH.ROUTINES, orderBy('order')), (snapshot) =>
				populateRoutineMap(snapshot),
			);
		}

		return () => unsubscribe();
	});
}

export function populateRoutineMap(snapshot: QuerySnapshot) {
	routinesMap.value = emptyRoutineMap;

	snapshot.docs.forEach((doc) => {
		const routine = { ...doc.data(), id: doc.id };

		const validation = routineSchema.safeParse(routine);

		if (!validation.success) {
			console.warn(`validation failed: ${routine.id}, ${validation.error}`);
		} else {
			routinesMap.value[validation.data.time].push(validation.data);
		}
	});
}

// duration of the animation of the week changing in milliseconds
export const weekChangeDuration = 800;

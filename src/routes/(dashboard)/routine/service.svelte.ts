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

export function convertToMap(newRoutines: Routine[]) {
	routinesMap.value = emptyRoutineMap;
	newRoutines.forEach((routine) => {
		routinesMap.value[routine.time].push(routine);
	});
}

// duration of the animation of the week changing in milliseconds
export const weekChangeDuration = 800;

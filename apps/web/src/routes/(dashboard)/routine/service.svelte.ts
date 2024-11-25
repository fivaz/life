import type { Routine } from '$lib/routine/routine.model';

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

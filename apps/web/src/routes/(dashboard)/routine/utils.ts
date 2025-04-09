import { isBefore, isSameDay, startOfDay } from 'date-fns';

import type { Routine } from '$lib/routine/routine.model';

import { disableRoutineVisibility, nonShortRoutineVisibility } from './service.svelte';

export function getAvailableRoutines(routines: Routine[], date: Date): Routine[] {
	return routines.filter((routine) => {
		const routineCreationDate = startOfDay(new Date(routine.createdAt));

		return isSameDay(routineCreationDate, date) || isBefore(routineCreationDate, date);
	});
}

export function isRoutineVisible(routine: Routine): boolean {
	// If disableRoutineVisibilityValue is true and item is disabled, return false
	if (!disableRoutineVisibility.value && routine.isDisabled) {
		return false;
	}

	// If nonShortRoutineVisibilityValue is true and duration is not 'short', return false
	if (!nonShortRoutineVisibility.value && routine.duration !== 'short') {
		return false;
	}

	// Otherwise, return true
	return true;
}

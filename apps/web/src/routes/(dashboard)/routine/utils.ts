import { isBefore, isSameDay, startOfDay } from 'date-fns';

import type { Routine } from '$lib/routine/routine.model';

export function getAvailableRoutines(routines: Routine[], date: Date): Routine[] {
	return routines.filter((routine) => {
		const routineCreationDate = startOfDay(new Date(routine.createdAt));

		return isSameDay(routineCreationDate, date) || isBefore(routineCreationDate, date);
	});
}

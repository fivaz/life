import { formatDate, parseDate } from '@life/shared/date';
import { subDays } from 'date-fns';
import { getContext, setContext } from 'svelte';

import type { Routine } from '$lib/routine/routine.model';

export const statusColor = {
	none: 'bg-red-100 text-red-500 dark:bg-red-200 dark:text-red-600 border-b border-red-200',
	uncompleted:
		'bg-yellow-100 text-yellow-500 dark:bg-yellow-200 dark:text-yellow-600 border-b border-yellow-200',
	completed:
		'bg-green-100 text-green-500 dark:bg-green-200 dark:text-green-600 border-b border-green-200',
};

export function getStatusColor(routine: Routine, selectedDate: string): keyof typeof statusColor {
	const existingRoutine = routine.completeHistory.find(({ date }) => date === selectedDate);

	if (existingRoutine) {
		return existingRoutine.isCompleted ? 'completed' : 'uncompleted';
	} else {
		return 'none';
	}
}

export function getStreak(routine: Routine, selectedDate: string): number {
	let streakValue = 0;
	let selectedDateObj = parseDate(selectedDate);

	while (true) {
		const dateStr = formatDate(selectedDateObj);

		if (
			routine.completeHistory.length === 0 ||
			!routine.completeHistory.find((entry) => entry.date === dateStr)?.isCompleted
		) {
			break;
		}

		streakValue++;
		selectedDateObj = subDays(selectedDateObj, 1);
	}

	return streakValue;
}

const openRoutineFormKey = Symbol('openRoutineForm');

export function getOpenRoutineForm(): (routine?: Routine) => void {
	return getContext(openRoutineFormKey) as (routine?: Routine) => void;
}

export function setOpenRoutineForm(value: (routine?: Routine) => void) {
	setContext(openRoutineFormKey, value);
}

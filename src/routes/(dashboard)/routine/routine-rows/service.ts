import { format, parse, subDays } from 'date-fns';

import { DATE } from '$lib/consts';
import type { Routine } from '$lib/routine/routine.model';

export const statusColor = {
	none: 'bg-red-100 text-red-500',
	uncompleted: 'bg-yellow-100 text-yellow-500',
	completed: 'bg-green-100 text-green-500',
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
	let selectedDateObj = parse(selectedDate, DATE, new Date());

	while (true) {
		const dateStr = format(selectedDateObj, DATE);

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

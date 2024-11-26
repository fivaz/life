import { formatDate } from '@life/lib/date';
import { addDays, startOfWeek } from 'date-fns';

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

let _selectedDate = $state<Date>(new Date());

export const previousDate = $state<{ value: Date }>({ value: new Date() });

export const selectedDate = {
	get value() {
		return _selectedDate;
	},
	set value(newDate: Date) {
		previousDate.value = _selectedDate;
		_selectedDate = newDate;
	},
};

// weekStart needs to be a string because an object isn't the same as another object,
// and it has animations tied to when the value changes
const _weekStart = $derived<string>(formatDate(startOfWeek(selectedDate.value)));

const _weekDates = $derived<Date[]>(Array.from({ length: 7 }, (_, i) => addDays(_weekStart, i)));

export const weekDates = {
	get value() {
		return _weekDates;
	},
};

import type { CCategory } from '$lib/category/utils';
import type { EEvent } from '$lib/event/utils';
import { addMinutes, setHours, setMinutes } from 'date-fns';

function buildDate(date: Date, timeInterval: number) {
	if (timeInterval < 0 || timeInterval > 48) {
		throw 'Invalid number. Please enter a number between 0 and 48.';
	}

	return setMinutes(setHours(date, 0), timeInterval * 30);
}

export function buildDefaultEvent(categories: CCategory[]): EEvent {
	return {
		id: 0,
		name: '',
		description: null,
		startDate: new Date(),
		endDate: addMinutes(new Date(), 15),
		isDone: false,
		categoryId: categories[0].id,
		category: categories[0],
	};
}

export function buildEventWithTime(
	categories: CCategory[],
	date: Date,
	timeInterval: number,
): EEvent {
	console.log(buildDate(date, timeInterval));
	return {
		id: 0,
		name: '',
		description: null,
		startDate: buildDate(date, timeInterval),
		endDate: buildDate(date, timeInterval + 0.5),
		isDone: false,
		categoryId: categories[0].id,
		category: categories[0],
	};
}

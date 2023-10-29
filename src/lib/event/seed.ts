import { fun, routine, work } from '$lib/category/seed';
import type { EEvent } from '$lib/event/utils';
import { addDays } from 'date-fns';

function getTodayAtTime(time: string): Date {
	// Parse the hour and minute from the input time
	const [hour, minute] = time.split(':').map(Number);

	// Get today's date at the given hour and minute
	// Format the date as an ISO 8601 string
	const date = new Date();

	date.setHours(hour, minute, 0, 0);

	return date;
}

export const normalWithoutDescription: EEvent = {
	id: 1,
	name: 'Breakfast',
	description: null,
	startDate: getTodayAtTime('07:00'),
	endDate: getTodayAtTime('07:45'),
	isDone: false,
	categoryId: routine.id,
	category: routine,
};

export const shortWithoutDescription: EEvent = {
	id: 2,
	name: 'Breakfast',
	description: null,
	startDate: getTodayAtTime('07:45'),
	endDate: getTodayAtTime('08:00'),
	isDone: false,
	categoryId: routine.id,
	category: routine,
};

export const long: EEvent = {
	id: 4,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: null,
	startDate: getTodayAtTime('10:15'),
	endDate: addDays(getTodayAtTime('12:30'), 1),
	isDone: true,
	categoryId: work.id,
	category: work,
};

export const done: EEvent = {
	id: 5,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: null,
	startDate: getTodayAtTime('00:15'),
	endDate: getTodayAtTime('01:30'),
	isDone: true,
	categoryId: work.id,
	category: work,
};

export const redEvent: EEvent = {
	id: 6,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: null,
	startDate: getTodayAtTime('15:15'),
	endDate: getTodayAtTime('16:30'),
	isDone: false,
	categoryId: fun.id,
	category: fun,
};

export const events: EEvent[] = [
	normalWithoutDescription,
	shortWithoutDescription,
	long,
	done,
	redEvent,
];

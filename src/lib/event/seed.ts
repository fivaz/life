import { fun, routine, sleep, work } from '$lib/category/seed';
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

let id = 0;
export const normalWithoutDescription: EEvent = {
	id: id++,
	name: 'Breakfast',
	description: null,
	startDate: getTodayAtTime('07:00'),
	endDate: getTodayAtTime('07:45'),
	duration: 45,
	isDone: false,
	categoryId: routine.id,
	category: routine,
};

export const shortWithoutDescription: EEvent = {
	id: id++,
	name: 'Breakfast',
	description: null,
	startDate: getTodayAtTime('07:45'),
	endDate: getTodayAtTime('08:00'),
	duration: 15,
	isDone: false,
	categoryId: routine.id,
	category: routine,
};

export const long: EEvent = {
	id: id++,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: null,
	startDate: getTodayAtTime('10:15'),
	endDate: addDays(getTodayAtTime('12:30'), 1),
	duration: 135,
	isDone: true,
	categoryId: work.id,
	category: work,
};

export const done: EEvent = {
	id: id++,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: null,
	startDate: getTodayAtTime('00:15'),
	endDate: getTodayAtTime('01:30'),
	duration: 75,
	isDone: true,
	categoryId: work.id,
	category: work,
};

export const redEvent: EEvent = {
	id: id++,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: null,
	startDate: getTodayAtTime('15:15'),
	endDate: getTodayAtTime('16:30'),
	duration: 75,
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

export const sleepEvent: EEvent = {
	id: id++,
	name: 'sleep',
	description: null,
	startDate: getTodayAtTime('00:00'),
	endDate: getTodayAtTime('08:00'),
	duration: 480,
	isDone: false,
	categoryId: sleep.id,
	category: sleep,
};

export const workEvent: EEvent = {
	id: id++,
	name: 'work',
	description: null,
	startDate: getTodayAtTime('08:00'),
	endDate: getTodayAtTime('16:00'),
	duration: 480,
	isDone: false,
	categoryId: work.id,
	category: work,
};

export const funEvent: EEvent = {
	id: id++,
	name: 'fun',
	description: null,
	startDate: getTodayAtTime('16:00'),
	endDate: getTodayAtTime('23:59'),
	duration: 480,
	isDone: false,
	categoryId: fun.id,
	category: fun,
};

export const perfectDay: EEvent[] = [sleepEvent, workEvent, funEvent];

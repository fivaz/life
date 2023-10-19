import type { EEvent } from '$lib';
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

// Usage:
console.log(getTodayAtTime('06:30')); // Outputs today's date at 06:30 in ISO format

export const normalWithoutDescription: EEvent = {
	id: 1,
	name: 'Breakfast',
	description: null,
	startDate: getTodayAtTime('07:00'),
	endDate: getTodayAtTime('07:45'),
	isDone: false
};

export const shortWithoutDescription: EEvent = {
	id: 2,
	name: 'Breakfast2 ',
	description: null,
	startDate: getTodayAtTime('07:45'),
	endDate: getTodayAtTime('08:00'),
	isDone: false
};

export const normalDescription: EEvent = {
	id: 3,
	name: 'Flight to Paris',
	description: 'John F. Kennedy International Airport',
	startDate: addDays(getTodayAtTime('00:00'), 2),
	endDate: addDays(getTodayAtTime('23:59'), 2),
	isDone: false
};

export const long: EEvent = {
	id: 4,
	name: 'Meeting with design team at Disney',
	description: null,
	startDate: getTodayAtTime('10:15'),
	endDate: addDays(getTodayAtTime('12:30'), 1),
	isDone: true
};

export const done: EEvent = {
	id: 4,
	name: 'Meeting with design team at Disney',
	description: null,
	startDate: getTodayAtTime('10:15'),
	endDate: getTodayAtTime('12:30'),
	isDone: true
};

export const events: EEvent[] = [
	normalWithoutDescription,
	shortWithoutDescription,
	normalDescription,
	long,
	done
];

import { fun, routine, sleep, work } from '$lib/category/seed';
import type { TTask } from '$lib/task/utils';
import { addDays, set, startOfWeek } from 'date-fns';

function getTodayAtTime(time: string): Date {
	const [hours, minutes] = time.split(':').map(Number);

	const date = new Date();

	return set(date, { hours, minutes });
}

let id = 0;
export const normalWithoutDescription: TTask = {
	id: id++,
	name: 'Breakfast',
	description: null,
	startDate: getTodayAtTime('07:00'),
	endDate: getTodayAtTime('07:45'),
	duration: 45,
	deadline: startOfWeek(new Date()),
	isDone: false,
	categoryId: routine.id,
	category: routine,
	goalId: null,
	goal: null,
	isRecurring: false,
	recurringStartAt: null,
	recurringEndAt: null,
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const shortWithoutDescription: TTask = {
	id: id++,
	name: 'Breakfast',
	description: null,
	startDate: getTodayAtTime('07:45'),
	endDate: getTodayAtTime('08:00'),
	duration: 15,
	deadline: startOfWeek(new Date()),
	isDone: false,
	categoryId: routine.id,
	category: routine,
	goalId: null,
	goal: null,
	isRecurring: false,
	recurringStartAt: null,
	recurringEndAt: null,
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const long: TTask = {
	id: id++,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: null,
	startDate: getTodayAtTime('10:15'),
	endDate: addDays(getTodayAtTime('12:30'), 1),
	duration: 135,
	deadline: startOfWeek(new Date()),
	isDone: true,
	categoryId: work.id,
	category: work,
	goalId: null,
	goal: null,
	isRecurring: false,
	recurringStartAt: null,
	recurringEndAt: null,
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const done: TTask = {
	id: id++,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: null,
	startDate: getTodayAtTime('00:15'),
	endDate: getTodayAtTime('01:30'),
	duration: 75,
	deadline: startOfWeek(new Date()),
	isDone: true,
	categoryId: work.id,
	category: work,
	goalId: null,
	goal: null,
	isRecurring: false,
	recurringStartAt: null,
	recurringEndAt: null,
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const redEvent: TTask = {
	id: id++,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: null,
	startDate: getTodayAtTime('15:15'),
	endDate: getTodayAtTime('16:30'),
	duration: 75,
	deadline: startOfWeek(new Date()),
	isDone: false,
	categoryId: fun.id,
	category: fun,
	goalId: null,
	goal: null,
	isRecurring: false,
	recurringStartAt: null,
	recurringEndAt: null,
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const events: TTask[] = [
	normalWithoutDescription,
	shortWithoutDescription,
	long,
	done,
	redEvent,
];

export const sleepEvent: TTask = {
	id: id++,
	name: 'sleep',
	description: null,
	startDate: getTodayAtTime('00:00'),
	endDate: getTodayAtTime('08:00'),
	duration: 480,
	deadline: startOfWeek(new Date()),
	isDone: false,
	categoryId: sleep.id,
	category: sleep,
	goalId: null,
	goal: null,
	isRecurring: false,
	recurringStartAt: null,
	recurringEndAt: null,
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const workEvent: TTask = {
	id: id++,
	name: 'work',
	description: null,
	startDate: getTodayAtTime('08:00'),
	endDate: getTodayAtTime('16:00'),
	duration: 480,
	deadline: startOfWeek(new Date()),
	isDone: false,
	categoryId: work.id,
	category: work,
	goalId: null,
	goal: null,
	isRecurring: true,
	recurringStartAt: new Date(),
	recurringEndAt: addDays(new Date(), 7),
	recurringDaysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
	recurringExceptions: [],
};

export const funEvent: TTask = {
	id: id++,
	name: 'fun',
	description: null,
	startDate: getTodayAtTime('16:00'),
	endDate: getTodayAtTime('23:59'),
	duration: 480,
	deadline: startOfWeek(new Date()),
	isDone: false,
	categoryId: fun.id,
	category: fun,
	goalId: null,
	goal: null,
	isRecurring: false,
	recurringStartAt: null,
	recurringEndAt: null,
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const perfectDay: TTask[] = [sleepEvent, workEvent, funEvent];

import type { AnyTask, Event, RecurringEvent, ToDo } from '$lib/task/utils';

import { fun, routine, sleep, work } from '$lib/category/seed';
import { DATE, TIME } from '$lib/consts';
import { format, set, startOfWeek } from 'date-fns';

function getTodayAtTime(time: string): Date {
	const [hours, minutes] = time.split(':').map(Number);

	const date = new Date();

	return set(date, { hours, minutes });
}

let id = 0;
export const normalWithoutDescription: Event = {
	category: routine,
	date: format(getTodayAtTime('07:00'), DATE),
	description: '',
	duration: '00:45',
	endTime: format(getTodayAtTime('07:45'), TIME),
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: 'Breakfast',
	startTime: format(getTodayAtTime('07:00'), TIME),
};

export const shortWithoutDescription: ToDo = {
	category: routine,
	deadline: format(startOfWeek(new Date()), DATE),
	description: '',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: 'Breakfast',
};

const longText =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
export const long: RecurringEvent = {
	category: work,
	date: format(getTodayAtTime('10:15'), DATE),
	description: '',
	duration: '02:15',
	endTime: format(getTodayAtTime('12:30'), TIME),
	goal: null,
	id: `${id++}`,
	isDone: true,
	name: longText,
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
	recurringStartAt: '',
	startTime: format(getTodayAtTime('10:15'), TIME),
};

export const done: Event = {
	category: work,
	date: format(getTodayAtTime('00:15'), DATE),
	description: '',
	duration: '01:15',
	endTime: format(getTodayAtTime('01:30'), TIME),
	goal: null,
	id: `${id++}`,
	isDone: true,
	name: longText,
	startTime: format(getTodayAtTime('00:15'), TIME),
};

export const redEvent: ToDo = {
	category: fun,
	deadline: format(startOfWeek(new Date()), DATE),
	description: '',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: longText,
};

export const tasks: AnyTask[] = [
	normalWithoutDescription,
	shortWithoutDescription,
	long,
	done,
	redEvent,
];

export const sleepRecurringEvent: RecurringEvent = {
	category: sleep,
	date: format(getTodayAtTime('00:00'), DATE),
	description: '',
	duration: '08:00',
	endTime: format(getTodayAtTime('08:00'), TIME),
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: 'sleep',
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
	recurringStartAt: '',
	startTime: format(getTodayAtTime('00:00'), TIME),
};

export const workToDo: ToDo = {
	category: work,
	deadline: format(startOfWeek(new Date()), DATE),
	description: '',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: 'work',
};

export const funEvent: Event = {
	category: fun,
	date: format(getTodayAtTime('16:00'), DATE),
	description: '',
	duration: '08:00',
	endTime: format(getTodayAtTime('23:59'), TIME),
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: 'fun',
	startTime: format(getTodayAtTime('16:00'), TIME),
};

export const perfectDay: AnyTask[] = [sleepRecurringEvent, workToDo, funEvent];

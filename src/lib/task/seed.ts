import { fun, routine, sleep, work } from '$lib/category/seed';
import { DATE, TIME } from '$lib/consts';
import type { AnyTask, Event, RecurringEvent, ToDo } from '$lib/task/utils';
import { format, set, startOfWeek } from 'date-fns';

function getTodayAtTime(time: string): Date {
	const [hours, minutes] = time.split(':').map(Number);

	const date = new Date();

	return set(date, { hours, minutes });
}

let id = 0;
export const normalWithoutDescription: Event = {
	id: `${id++}`,
	name: 'Breakfast',
	description: '',
	date: format(getTodayAtTime('07:00'), DATE),
	startTime: format(getTodayAtTime('07:00'), TIME),
	endTime: format(getTodayAtTime('07:45'), TIME),
	duration: '00:45',
	isDone: false,
	category: routine,
	goal: null,
};

export const shortWithoutDescription: ToDo = {
	id: `${id++}`,
	name: 'Breakfast',
	description: '',
	deadline: format(startOfWeek(new Date()), DATE),
	isDone: false,
	category: routine,
	goal: null,
};

export const long: RecurringEvent = {
	id: `${id++}`,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: '',
	date: format(getTodayAtTime('10:15'), DATE),
	startTime: format(getTodayAtTime('10:15'), TIME),
	endTime: format(getTodayAtTime('12:30'), TIME),
	duration: '02:15',
	isDone: true,
	category: work,
	goal: null,
	recurringStartAt: '',
	recurringEndAt: '',
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const done: Event = {
	id: `${id++}`,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: '',
	date: format(getTodayAtTime('00:15'), DATE),
	startTime: format(getTodayAtTime('00:15'), TIME),
	endTime: format(getTodayAtTime('01:30'), TIME),
	duration: '01:15',
	isDone: true,
	category: work,
	goal: null,
};

export const redEvent: ToDo = {
	id: `${id++}`,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: '',
	deadline: format(startOfWeek(new Date()), DATE),
	isDone: false,
	category: fun,
	goal: null,
};

export const events: AnyTask[] = [
	normalWithoutDescription,
	shortWithoutDescription,
	long,
	done,
	redEvent,
];

export const sleepEvent: RecurringEvent = {
	id: `${id++}`,
	name: 'sleep',
	description: '',
	date: format(getTodayAtTime('00:00'), DATE),
	startTime: format(getTodayAtTime('00:00'), TIME),
	endTime: format(getTodayAtTime('08:00'), TIME),
	duration: '08:00',
	isDone: false,
	category: sleep,
	goal: null,
	recurringStartAt: '',
	recurringEndAt: '',
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const workEvent: ToDo = {
	id: `${id++}`,
	name: 'work',
	description: '',
	deadline: format(startOfWeek(new Date()), DATE),
	isDone: false,
	category: work,
	goal: null,
};

export const funEvent: Event = {
	id: `${id++}`,
	name: 'fun',
	description: '',
	date: format(getTodayAtTime('16:00'), DATE),
	startTime: format(getTodayAtTime('16:00'), TIME),
	endTime: format(getTodayAtTime('23:59'), TIME),
	duration: '08:00',
	isDone: false,
	category: fun,
	goal: null,
};

export const tasks: AnyTask[] = [sleepEvent, workEvent, funEvent];

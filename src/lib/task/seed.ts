import { fun, routine, sleep, work } from '$lib/category/seed';
import { DATE, TIME } from '$lib/consts';
import type { Task } from '$lib/task/utils';
import { addDays, format, set, startOfWeek } from 'date-fns';

function getTodayAtTime(time: string): Date {
	const [hours, minutes] = time.split(':').map(Number);

	const date = new Date();

	return set(date, { hours, minutes });
}

let id = 0;
export const normalWithoutDescription: Task = {
	id: `${id++}`,
	name: 'Breakfast',
	description: '',
	date: format(getTodayAtTime('07:00'), DATE),
	startTime: format(getTodayAtTime('07:00'), TIME),
	endTime: format(getTodayAtTime('07:45'), TIME),
	duration: '00:45',
	deadline: format(startOfWeek(new Date()), DATE),
	isDone: false,
	category: routine,
	goal: null,
	recurringStartAt: '',
	recurringEndAt: '',
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const shortWithoutDescription: Task = {
	id: `${id++}`,
	name: 'Breakfast',
	description: '',
	date: format(getTodayAtTime('07:45'), DATE),
	startTime: format(getTodayAtTime('07:45'), TIME),
	endTime: format(getTodayAtTime('08:00'), TIME),
	duration: '00:15',
	deadline: format(startOfWeek(new Date()), DATE),
	isDone: false,
	category: routine,
	goal: null,
	recurringStartAt: '',
	recurringEndAt: '',
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const long: Task = {
	id: `${id++}`,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: '',
	date: format(getTodayAtTime('10:15'), DATE),
	startTime: format(getTodayAtTime('10:15'), TIME),
	endTime: format(getTodayAtTime('12:30'), TIME),
	duration: '02:15',
	deadline: format(startOfWeek(new Date()), DATE),
	isDone: true,
	category: work,
	goal: null,
	recurringStartAt: '',
	recurringEndAt: '',
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const done: Task = {
	id: `${id++}`,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: '',
	date: format(getTodayAtTime('00:15'), DATE),
	startTime: format(getTodayAtTime('00:15'), TIME),
	endTime: format(getTodayAtTime('01:30'), TIME),
	duration: '01:15',
	deadline: format(startOfWeek(new Date()), DATE),
	isDone: true,
	category: work,
	goal: null,
	recurringStartAt: '',
	recurringEndAt: '',
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const redEvent: Task = {
	id: `${id++}`,
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	description: '',
	date: format(getTodayAtTime('15:15'), DATE),
	startTime: format(getTodayAtTime('15:15'), TIME),
	endTime: format(getTodayAtTime('16:30'), TIME),
	duration: '01:15',
	deadline: format(startOfWeek(new Date()), DATE),
	isDone: false,
	category: fun,
	goal: null,
	recurringStartAt: '',
	recurringEndAt: '',
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const events: Task[] = [
	normalWithoutDescription,
	shortWithoutDescription,
	long,
	done,
	redEvent,
];

export const sleepEvent: Task = {
	id: `${id++}`,
	name: 'sleep',
	description: '',
	date: format(getTodayAtTime('00:00'), DATE),
	startTime: format(getTodayAtTime('00:00'), TIME),
	endTime: format(getTodayAtTime('08:00'), TIME),
	duration: '08:00',
	deadline: format(startOfWeek(new Date()), DATE),
	isDone: false,
	category: sleep,
	goal: null,
	recurringStartAt: '',
	recurringEndAt: '',
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const workEvent: Task = {
	id: `${id++}`,
	name: 'work',
	description: '',
	date: format(getTodayAtTime('08:00'), DATE),
	startTime: format(getTodayAtTime('08:00'), TIME),
	endTime: format(getTodayAtTime('16:00'), TIME),
	duration: '08:00',
	deadline: format(startOfWeek(new Date()), DATE),
	isDone: false,
	category: work,
	goal: null,
	recurringStartAt: format(new Date(), DATE),
	recurringEndAt: format(addDays(new Date(), 7), DATE),
	recurringDaysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
	recurringExceptions: [],
};

export const funEvent: Task = {
	id: `${id++}`,
	name: 'fun',
	description: '',
	date: format(getTodayAtTime('16:00'), DATE),
	startTime: format(getTodayAtTime('16:00'), TIME),
	endTime: format(getTodayAtTime('23:59'), TIME),
	duration: '08:00',
	deadline: format(startOfWeek(new Date()), DATE),
	isDone: false,
	category: fun,
	goal: null,
	recurringStartAt: '',
	recurringEndAt: '',
	recurringDaysOfWeek: [],
	recurringExceptions: [],
};

export const tasks: Task[] = [sleepEvent, workEvent, funEvent];

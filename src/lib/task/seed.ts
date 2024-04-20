import type { AnyTask, Event, RecurringEvent, ToDo } from '$lib/task/utils';

import { fun, routine, sleep, work } from '$lib/category/seed';
import { DATE, TIME } from '$lib/consts';
import { format, set, startOfTomorrow, startOfWeek, startOfYesterday } from 'date-fns';

function getTodayAtTime(time: string): Date {
	const [hours, minutes] = time.split(':').map(Number);

	const date = new Date();

	return set(date, { hours, minutes });
}

let id = 0;
export const normalWithoutDescription: Event = {
	category: sleep,
	date: format(getTodayAtTime('00:00'), DATE),
	description: '',
	duration: '07:00',
	goal: null,
	id: `${id++}`,
	image: null,
	isDone: false,
	name: 'sleep',
	startTime: format(getTodayAtTime('00:00'), TIME),
};

export const shortWithoutDescription: Event = {
	category: routine,
	date: format(getTodayAtTime('07:00'), DATE),
	description: '',
	duration: '00:15',
	goal: null,
	id: `${id++}`,
	image: null,
	isDone: false,
	name: 'Breakfast',
	startTime: format(getTodayAtTime('07:00'), TIME),
};

const longText =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
export const long: RecurringEvent = {
	category: work,
	date: format(getTodayAtTime('10:15'), DATE),
	description: longText,
	duration: '02:15',
	goal: null,
	id: `${id++}`,
	image: null,
	isDone: false,
	name: longText,
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
	recurringStartAt: '',
	startTime: format(getTodayAtTime('10:15'), TIME),
};

export const done: Event = {
	category: work,
	date: format(startOfYesterday(), DATE),
	description: '',
	duration: '01:15',
	goal: null,
	id: `${id++}`,
	image: null,
	isDone: true,
	name: longText,
	startTime: format(getTodayAtTime('15:15'), TIME),
};

export const events: AnyTask[] = [normalWithoutDescription, shortWithoutDescription, long, done];

export const sleepRecurringEvent: RecurringEvent = {
	category: sleep,
	date: format(getTodayAtTime('00:00'), DATE),
	description: '',
	duration: '08:00',
	goal: null,
	id: `${id++}`,
	image: null,
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
	duration: '',
	goal: null,
	id: `${id++}`,
	image: null,
	isDone: false,
	name: longText,
};

export const funEvent: Event = {
	category: fun,
	date: format(getTodayAtTime('16:00'), DATE),
	description: '',
	duration: '08:00',
	goal: null,
	id: `${id++}`,
	image: null,
	isDone: false,
	name: 'fun',
	startTime: format(getTodayAtTime('16:00'), TIME),
};

export const birthdayToDo: ToDo = {
	category: work,
	deadline: format(startOfTomorrow(), DATE),
	description: '',
	duration: '01:15',
	goal: null,
	id: `${id++}`,
	image: null,
	isDone: true,
	name: "Friend's birthday",
};

export const toDos: ToDo[] = [workToDo, birthdayToDo];

export const perfectDay: AnyTask[] = [sleepRecurringEvent, workToDo, funEvent];

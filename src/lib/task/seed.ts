import type { AnyTask, Event, RecurringEvent, ToDo } from '$lib/task/utils';

import { fun, routine, sleep, work } from '$lib/category/seed';
import { DATE, TIME } from '$lib/consts';
import { format, set, startOfTomorrow, startOfWeek, startOfYesterday } from 'date-fns';

function getTodayAtTime(time: string): Date {
	const [hours, minutes] = time.split(':').map(Number);

	const date = new Date();

	return set(date, { hours, minutes });
}

const longText =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

let id = 0;
export const normalWithoutDescription: Event = {
	category: sleep,
	date: format(getTodayAtTime('00:00'), DATE),
	description: '',
	duration: '07:00',
	goal: null,
	id: `${id++}`,
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
	isDone: false,
	name: 'Breakfast',
	startTime: format(getTodayAtTime('07:00'), TIME),
};

export const long: RecurringEvent = {
	category: work,
	date: format(getTodayAtTime('10:15'), DATE),
	description: longText,
	duration: '02:15',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: longText,
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
	recurringStartAt: '',
	startTime: format(getTodayAtTime('10:15'), TIME),
};

export const sleepRecurringEvent: RecurringEvent = {
	category: sleep,
	date: format(getTodayAtTime('00:00'), DATE),
	description: '',
	duration: '08:00',
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
export const done: Event = {
	category: work,
	date: format(startOfYesterday(), DATE),
	description: '',
	duration: '01:15',
	goal: null,
	id: `${id++}`,
	isDone: true,
	name: 'Put away apartment',
	startTime: format(getTodayAtTime('15:15'), TIME),
	subTasks: [
		{ id: id++, isDone: true, name: 'Dusting a room' },
		{ id: id++, isDone: false, name: 'Emptying the trash' },
		{ id: id++, isDone: true, name: 'Wiping down countertops' },
		{ id: id++, isDone: false, name: 'Watering house plants' },
		{ id: id++, isDone: true, name: 'Sorting the mail' },
	],
};

export const funEvent: Event = {
	category: fun,
	date: format(getTodayAtTime('16:00'), DATE),
	description: '',
	duration: '08:00',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: 'fun',
	startTime: format(getTodayAtTime('16:00'), TIME),
};

export const events: AnyTask[] = [
	normalWithoutDescription,
	shortWithoutDescription,
	long,
	sleepRecurringEvent,
	done,
	funEvent,
];

export const workToDo: ToDo = {
	category: work,
	deadline: format(startOfWeek(new Date()), DATE),
	description: '',
	duration: '',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: longText,
};

export const birthdayToDo: ToDo = {
	category: work,
	deadline: format(startOfTomorrow(), DATE),
	description: '',
	duration: '01:15',
	goal: null,
	id: `${id++}`,
	isDone: true,
	name: "Friend's birthday",
};

export const toDos: ToDo[] = [workToDo, birthdayToDo];

export const tasks: AnyTask[] = [...events, ...toDos];

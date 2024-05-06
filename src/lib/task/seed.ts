import type { AnyTask, Event, RecurringEvent, ToDo } from '$lib/task/utils';

import { routine, sleep, work } from '$lib/category/seed';
import { DATE, TIME } from '$lib/consts';
import { buildDate } from '$lib/task/time-utils';
import { format, startOfTomorrow, startOfWeek, startOfYesterday } from 'date-fns';

function getTodayAtTime(time: string): Date {
	const date = new Date();

	return buildDate(date, time);
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

export const normalWithDescription: Event = {
	category: work,
	date: format(startOfYesterday(), DATE),
	description: longText,
	duration: '00:30',
	goal: null,
	id: `${id++}`,
	isDone: true,
	name: 'Put away apartment',
	startTime: format(getTodayAtTime('15:15'), TIME),
};

export const normalWithSubTasks: Event = {
	category: work,
	date: format(startOfYesterday(), DATE),
	description: '',
	duration: '00:30',
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

export const shortWithDescription: Event = {
	category: routine,
	date: format(getTodayAtTime('07:00'), DATE),
	description: longText,
	duration: '00:15',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: 'Breakfast',
	startTime: format(getTodayAtTime('07:00'), TIME),
};

export const shortWithSubTasks: Event = {
	category: routine,
	date: format(getTodayAtTime('07:00'), DATE),
	description: longText,
	duration: '00:15',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: 'Breakfast',
	startTime: format(getTodayAtTime('07:00'), TIME),
	subTasks: [
		{ id: id++, isDone: true, name: 'Dusting a room' },
		{ id: id++, isDone: false, name: 'Emptying the trash' },
		{ id: id++, isDone: true, name: 'Wiping down countertops' },
		{ id: id++, isDone: false, name: 'Watering house plants' },
		{ id: id++, isDone: true, name: 'Sorting the mail' },
	],
};

export const longRecurring: RecurringEvent = {
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

export const events: AnyTask[] = [
	normalWithoutDescription,
	normalWithDescription,
	normalWithSubTasks,
	shortWithoutDescription,
	shortWithDescription,
	shortWithSubTasks,
	longRecurring,
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

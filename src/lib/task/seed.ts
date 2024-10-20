import type { Event, RecurringEvent, Task, ToDo } from '$lib/task/utils';

import { routine, sleep, work } from '$lib/category/seed';
import { DATE, TIME } from '$lib/consts';
import { sleepEarly } from '$lib/goal/seed';
import { buildDate } from '$lib/task/time-utils';
import { format, startOfTomorrow, startOfWeek, startOfYesterday } from 'date-fns';

function getTodayAtTime(time: string): Date {
	const date = new Date();

	return buildDate(date, time);
}

const longText =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

let id = 0;

export const normalWithoutDescriptionWithGoal: Event = {
	category: sleep,
	createdAt: startOfTomorrow().toISOString(),
	date: format(getTodayAtTime('00:00'), DATE),
	description: '',
	duration: '07:00',
	goal: sleepEarly,
	id: `${id++}`,
	isDone: false,
	name: 'sleep',
	startTime: format(getTodayAtTime('00:00'), TIME),
};

export const normalWithoutDescriptionWithoutGoal: Event = {
	category: sleep,
	createdAt: startOfTomorrow().toISOString(),
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
	createdAt: startOfTomorrow().toISOString(),
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
	createdAt: startOfTomorrow().toISOString(),
	date: format(startOfYesterday(), DATE),
	description: `
		[x] - Dusting a room \n' },
		[ ] - Emptying the trash \n' },
		[x] - Wiping down countertops \n' },
		[ ] - Watering house plants \n' },
		[x] - Sorting the mail \n' },
	`,
	duration: '00:30',
	goal: null,
	id: `${id++}`,
	isDone: true,
	name: 'Put away apartment',
	startTime: format(getTodayAtTime('15:15'), TIME),
};

export const shortWithoutDescription: Event = {
	category: routine,
	createdAt: startOfTomorrow().toISOString(),
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
	createdAt: startOfTomorrow().toISOString(),
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
	createdAt: startOfTomorrow().toISOString(),
	date: format(getTodayAtTime('07:00'), DATE),
	description: `
		[x] - Dusting a room \n' },
		[ ] - Emptying the trash \n' },
		[x] - Wiping down countertops \n' },
		[ ] - Watering house plants \n' },
		[x] - Sorting the mail \n' },
	`,
	duration: '00:15',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: 'Breakfast',
	startTime: format(getTodayAtTime('07:00'), TIME),
};

export const longRecurring: RecurringEvent = {
	category: work,
	createdAt: startOfTomorrow().toISOString(),
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

export const events: Task[] = [
	normalWithoutDescriptionWithGoal,
	normalWithoutDescriptionWithoutGoal,
	normalWithDescription,
	normalWithSubTasks,
	shortWithoutDescription,
	shortWithDescription,
	shortWithSubTasks,
	longRecurring,
];

export const workToDo: ToDo = {
	category: work,
	createdAt: startOfTomorrow().toISOString(),
	deadline: format(startOfWeek(new Date(), { weekStartsOn: 1 }), DATE),
	description: '',
	duration: '',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: longText,
};

export const birthdayToDo: ToDo = {
	category: work,
	createdAt: startOfTomorrow().toISOString(),
	deadline: format(startOfTomorrow(), DATE),
	description: '',
	duration: '01:15',
	goal: null,
	id: `${id++}`,
	isDone: true,
	name: "Friend's birthday",
};

export const toDos: ToDo[] = [workToDo, birthdayToDo];

export const tasks: Task[] = [...events, ...toDos];

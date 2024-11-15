import { format, startOfTomorrow, startOfWeek, startOfYesterday } from 'date-fns';

import { routine, sleep, work } from '$lib/category/category.seed';
import { DATE, TIME } from '$lib/consts';
import { sleepEarly } from '$lib/goal/goal.seed';
import type { CalendarTask } from '$lib/task/task.model';
import { buildDate } from '$lib/task/time-utils';

function getTodayAtTime(time: string): Date {
	const date = new Date();

	return buildDate(date, time);
}

const longText =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

let id = 0;

export const normalWithoutDescriptionWithGoal: CalendarTask = {
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
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const normalWithoutDescriptionWithoutGoal: CalendarTask = {
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
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const normalWithDescription: CalendarTask = {
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
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const normalWithSubTasks: CalendarTask = {
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
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const shortWithoutDescription: CalendarTask = {
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
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const shortWithDescription: CalendarTask = {
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
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const shortWithSubTasks: CalendarTask = {
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
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const longRecurring: CalendarTask = {
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
	recurringEndAt: null,
	recurringExceptions: [],
	recurringFrequency: 'daily',
	startTime: format(getTodayAtTime('10:15'), TIME),
	image: '',
};

export const events: CalendarTask[] = [
	normalWithoutDescriptionWithGoal,
	normalWithoutDescriptionWithoutGoal,
	normalWithDescription,
	normalWithSubTasks,
	shortWithoutDescription,
	shortWithDescription,
	shortWithSubTasks,
	longRecurring,
];

export const workToDo: CalendarTask = {
	category: work,
	createdAt: startOfTomorrow().toISOString(),
	date: format(startOfWeek(new Date(), { weekStartsOn: 1 }), DATE),
	description: '',
	duration: '',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: longText,
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
	startTime: format(getTodayAtTime('15:15'), TIME),
};

export const birthdayToDo: CalendarTask = {
	category: work,
	createdAt: startOfTomorrow().toISOString(),
	date: format(startOfTomorrow(), DATE),
	description: '',
	duration: '01:15',
	goal: null,
	id: `${id++}`,
	isDone: true,
	name: "Friend's birthday",
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
	startTime: format(getTodayAtTime('15:15'), TIME),
};

export const toDos: CalendarTask[] = [workToDo, birthdayToDo];

export const tasks: CalendarTask[] = [...events, ...toDos];

import { startOfTomorrow, startOfWeek, startOfYesterday } from 'date-fns';

import { routine, sleep, work } from '$lib/category/category.seed';
import { weekStartsOn } from '$lib/date.utils.svelte';
import { formatDate, formatTime } from '$lib/date.utils.svelte.js';
import { sleepEarly } from '$lib/goal/goal.seed';
import type { TimedTask } from '$lib/task/task.model';
import { buildDate } from '$lib/task/time-utils';

function getTodayAtTime(time: string): Date {
	const date = new Date();

	return buildDate(date, time);
}

const longText =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

let id = 0;

export const normalWithoutDescriptionWithGoal: TimedTask = {
	category: sleep,
	createdAt: startOfTomorrow().toISOString(),
	date: formatDate(getTodayAtTime('00:00')),
	description: '',
	duration: '07:00',
	goal: sleepEarly,
	id: `${id++}`,
	isDone: false,
	name: 'sleep',
	startTime: formatTime(getTodayAtTime('00:00')),
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const normalWithoutDescriptionWithoutGoal: TimedTask = {
	category: sleep,
	createdAt: startOfTomorrow().toISOString(),
	date: formatDate(getTodayAtTime('00:00')),
	description: '',
	duration: '07:00',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: 'sleep',
	startTime: formatTime(getTodayAtTime('00:00')),
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const normalWithDescription: TimedTask = {
	category: work,
	createdAt: startOfTomorrow().toISOString(),
	date: formatDate(startOfYesterday()),
	description: longText,
	duration: '00:30',
	goal: null,
	id: `${id++}`,
	isDone: true,
	name: 'Put away apartment',
	startTime: formatTime(getTodayAtTime('15:15')),
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const normalWithSubTasks: TimedTask = {
	category: work,
	createdAt: startOfTomorrow().toISOString(),
	date: formatDate(startOfYesterday()),
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
	startTime: formatTime(getTodayAtTime('15:15')),
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const shortWithoutDescription: TimedTask = {
	category: routine,
	createdAt: startOfTomorrow().toISOString(),
	date: formatDate(getTodayAtTime('07:00')),
	description: '',
	duration: '00:15',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: 'Breakfast',
	startTime: formatTime(getTodayAtTime('07:00')),
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const shortWithDescription: TimedTask = {
	category: routine,
	createdAt: startOfTomorrow().toISOString(),
	date: formatDate(getTodayAtTime('07:00')),
	description: longText,
	duration: '00:15',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: 'Breakfast',
	startTime: formatTime(getTodayAtTime('07:00')),
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const shortWithSubTasks: TimedTask = {
	category: routine,
	createdAt: startOfTomorrow().toISOString(),
	date: formatDate(getTodayAtTime('07:00')),
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
	startTime: formatTime(getTodayAtTime('07:00')),
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
};

export const longRecurring: TimedTask = {
	category: work,
	createdAt: startOfTomorrow().toISOString(),
	date: formatDate(getTodayAtTime('10:15')),
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
	startTime: formatTime(getTodayAtTime('10:15')),
	image: '',
};

export const events: TimedTask[] = [
	normalWithoutDescriptionWithGoal,
	normalWithoutDescriptionWithoutGoal,
	normalWithDescription,
	normalWithSubTasks,
	shortWithoutDescription,
	shortWithDescription,
	shortWithSubTasks,
	longRecurring,
];

export const workToDo: TimedTask = {
	category: work,
	createdAt: startOfTomorrow().toISOString(),
	date: formatDate(startOfWeek(new Date(), { weekStartsOn })),
	description: '',
	duration: '00:15',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: longText,
	image: '',
	recurringFrequency: null,
	recurringDaysOfWeek: [],
	recurringEndAt: null,
	recurringExceptions: [],
	startTime: formatTime(getTodayAtTime('15:15')),
};

export const birthdayToDo: TimedTask = {
	category: work,
	createdAt: startOfTomorrow().toISOString(),
	date: formatDate(startOfTomorrow()),
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
	startTime: formatTime(getTodayAtTime('15:15')),
};

export const toDos: TimedTask[] = [workToDo, birthdayToDo];

export const tasks: TimedTask[] = [...events, ...toDos];

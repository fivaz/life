import { buildDate } from '@life/lib/date';
import type { Task } from '@life/lib/task';
import { startOfTomorrow, startOfWeek, startOfYesterday } from 'date-fns';

import { routine, sleep, work } from '$lib/category/category.seed';
import { formatDate, formatTime } from '$lib/date.utils.svelte';
import { sleepEarly } from '$lib/goal/goal.seed';

function getTodayAtTime(time: string): Date {
	const date = new Date();

	return buildDate(date, time);
}

const longText =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

let id = 0;

export const normalWithoutDescriptionWithGoal: Task = {
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
	recurringFrequency: '',
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
};

export const normalWithoutDescriptionWithoutGoal: Task = {
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
	recurringFrequency: '',
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
};

export const normalWithDescription: Task = {
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
	recurringFrequency: '',
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
};

export const normalWithSubTasks: Task = {
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
	recurringFrequency: '',
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
};

export const shortWithoutDescription: Task = {
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
	recurringFrequency: '',
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
};

export const shortWithDescription: Task = {
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
	recurringFrequency: '',
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
};

export const shortWithSubTasks: Task = {
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
	recurringFrequency: '',
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
};

export const longRecurring: Task = {
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
	recurringEndAt: '',
	recurringExceptions: [],
	recurringFrequency: 'daily',
	startTime: formatTime(getTodayAtTime('10:15')),
	image: '',
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

export const workToDo: Task = {
	category: work,
	createdAt: startOfTomorrow().toISOString(),
	date: formatDate(startOfWeek(new Date())),
	description: '',
	duration: '00:15',
	goal: null,
	id: `${id++}`,
	isDone: false,
	name: longText,
	image: '',
	recurringFrequency: '',
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
	startTime: formatTime(getTodayAtTime('15:15')),
};

export const birthdayToDo: Task = {
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
	recurringFrequency: '',
	recurringDaysOfWeek: [],
	recurringEndAt: '',
	recurringExceptions: [],
	startTime: formatTime(getTodayAtTime('15:15')),
};

export const toDos: Task[] = [workToDo, birthdayToDo];

export const tasks: Task[] = [...events, ...toDos];

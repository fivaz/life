import { lastDayOfQuarter, lastDayOfYear } from 'date-fns';

import { formatDate } from '$lib/date.js';
import type { Goal } from '$lib/goal/goal.model.js';

let id = 0;
export const learnToDrive: Goal = {
	startDate: formatDate(new Date()),
	deadline: formatDate(lastDayOfQuarter(new Date())),
	icon: 'Car',
	id: `${id++}`,
	isDone: true,
	name: 'learn to drive',
	parent: '',
};

export const sleepEarly: Goal = {
	startDate: formatDate(new Date()),
	deadline: formatDate(lastDayOfQuarter(new Date())),
	icon: 'Bed',
	id: `${id++}`,
	isDone: false,
	name: 'sleep early',
	parent: '',
};

export const investMoney: Goal = {
	startDate: formatDate(new Date()),
	deadline: formatDate(lastDayOfYear(new Date())),
	icon: 'MoneyBill1Wave',
	id: `${id++}`,
	isDone: true,
	name: 'invest Money',
	parent: '',
};

export const readTheGospelOfJohn: Goal = {
	startDate: formatDate(new Date()),
	deadline: formatDate(lastDayOfQuarter(new Date())),
	icon: 'Cross',
	id: `${id++}`,
	isDone: false,
	name: 'read the gospel of John',
	parent: '',
};

export const goals = [learnToDrive, sleepEarly, investMoney, readTheGospelOfJohn];

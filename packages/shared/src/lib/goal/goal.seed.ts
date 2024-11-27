import { lastDayOfQuarter, lastDayOfYear } from 'date-fns';

import { formatDate } from '$lib/date.js';
import type { Goal } from '$lib/goal/goal.model.js';

let id = 0;
export const learnToDrive: Goal = {
	deadline: formatDate(lastDayOfQuarter(new Date())),
	icon: 'Car',
	id: `${id++}`,
	isDone: true,
	name: 'learn to drive'
};

export const sleepEarly: Goal = {
	deadline: formatDate(lastDayOfQuarter(new Date())),
	icon: 'Bed',
	id: `${id++}`,
	isDone: false,
	name: 'sleep early'
};

export const investMoney: Goal = {
	deadline: formatDate(lastDayOfYear(new Date())),
	icon: 'MoneyBill1Wave',
	id: `${id++}`,
	isDone: true,
	name: 'invest Money'
};

export const readTheGospelOfJohn: Goal = {
	deadline: formatDate(lastDayOfQuarter(new Date())),
	icon: 'Cross',
	id: `${id++}`,
	isDone: false,
	name: 'read the gospel of John'
};

export const goals = [learnToDrive, sleepEarly, investMoney, readTheGospelOfJohn];

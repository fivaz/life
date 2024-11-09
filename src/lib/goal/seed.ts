import { format, lastDayOfQuarter, lastDayOfYear } from 'date-fns';

import { DATE } from '$lib/consts';
import type { Goal } from '$lib/goal/utils';

let id = 0;
export const learnToDrive: Goal = {
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	icon: 'Car',
	id: `${id++}`,
	isDone: true,
	name: 'learn to drive',
};

export const sleepEarly: Goal = {
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	icon: 'Bed',
	id: `${id++}`,
	isDone: false,
	name: 'sleep early',
};

export const investMoney: Goal = {
	deadline: format(lastDayOfYear(new Date()), DATE),
	icon: 'MoneyBill1Wave',
	id: `${id++}`,
	isDone: true,
	name: 'invest Money',
};

export const readTheGospelOfJohn: Goal = {
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	icon: 'Cross',
	id: `${id++}`,
	isDone: false,
	name: 'read the gospel of John',
};

export const goals = [learnToDrive, sleepEarly, investMoney, readTheGospelOfJohn];

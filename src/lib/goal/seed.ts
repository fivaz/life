import type { Goal } from '$lib/goal/utils';

import { DATE } from '$lib/consts';
import { format, lastDayOfQuarter, lastDayOfYear } from 'date-fns';

let id = 0;
export const learnToDrive: Goal = {
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	icon: 'fa-car',
	id: `${id++}`,
	isDone: true,
	name: 'learn to drive',
};

export const cancelMyBankAccount: Goal = {
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	icon: null,
	id: `${id++}`,
	isDone: false,
	name: 'cancel my bank account',
};

export const investMoney: Goal = {
	deadline: format(lastDayOfYear(new Date()), DATE),
	icon: 'fa-money-bill-wave',
	id: `${id++}`,
	isDone: true,
	name: 'invest Money',
};

export const readTheGospelOfJohn: Goal = {
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	icon: 'fa-cross',
	id: `${id++}`,
	isDone: false,
	name: 'read the gospel of John',
};

export const goals = [learnToDrive, cancelMyBankAccount, investMoney, readTheGospelOfJohn];

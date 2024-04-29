import type { Goal } from '$lib/goal/utils';

import { DATE } from '$lib/consts';
import { format, lastDayOfQuarter, lastDayOfYear } from 'date-fns';

let id = 0;
export const learnToDrive: Goal = {
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	id: `${id++}`,
	isDone: true,
	name: 'Learn to drive',
};

export const cancelMyBankAccount: Goal = {
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	id: `${id++}`,
	isDone: false,
	name: 'Cancel my bank account',
};

export const investMoney: Goal = {
	deadline: format(lastDayOfYear(new Date()), DATE),
	id: `${id++}`,
	isDone: true,
	name: 'Invest Money',
};

export const readTheGospelOfJohn: Goal = {
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	id: `${id++}`,
	isDone: false,
	name: 'Read the gospel of John',
};

export const goals = [learnToDrive, cancelMyBankAccount, investMoney, readTheGospelOfJohn];

import type { GGoal } from '$lib/goal/utils';
import { lastDayOfQuarter, lastDayOfYear } from 'date-fns';

let id = 0;
export const learnToDrive = {
	id: id++,
	name: 'Work',
	isDone: true,
	deadline: lastDayOfQuarter(new Date()),
};

export const cancelMyBankAccount = {
	id: id++,
	name: 'cancel my bank account',
	isDone: false,
	deadline: lastDayOfQuarter(new Date()),
};

export const investMoney = {
	id: id++,
	name: 'invest Money',
	isDone: true,
	deadline: lastDayOfYear(new Date()),
};

export const readTheGospelOfJohn = {
	id: id++,
	name: 'read the gospel of John',
	isDone: false,
	deadline: lastDayOfQuarter(new Date()),
};

export const goals: GGoal[] = [learnToDrive, cancelMyBankAccount, investMoney, readTheGospelOfJohn];

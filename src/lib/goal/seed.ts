import type { GoalWithTasks } from '$lib/goal/utils';

import { DATE } from '$lib/consts';
import { addWeeks, endOfWeek, format, lastDayOfQuarter, lastDayOfYear } from 'date-fns';

let id = 0;
export const learnToDrive: GoalWithTasks = {
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	id: `${id++}`,
	isDone: true,
	name: 'learn to drive',
	tasks: [
		{
			deadline: format(endOfWeek(addWeeks(new Date(), 10)), DATE),
			description: '',
			duration: '',
			id: '1',
			isDone: true,
			name: 'learn to drive',
		},
	],
};

export const cancelMyBankAccount: GoalWithTasks = {
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	id: `${id++}`,
	isDone: false,
	name: 'cancel my bank account',
	tasks: [
		{
			deadline: format(endOfWeek(addWeeks(new Date(), 1)), DATE),
			description: '',
			duration: '',
			id: '10',
			isDone: false,
			name: 'write the letter',
		},
		{
			deadline: format(endOfWeek(addWeeks(new Date(), 1)), DATE),
			description: '',
			duration: '',
			id: '11',
			isDone: true,
			name: 'print my documents',
		},
		{
			deadline: format(endOfWeek(addWeeks(new Date(), 1)), DATE),
			description: '',
			duration: '',
			id: '12',
			isDone: false,
			name: 'send a letter',
		},
	],
};

export const investMoney: GoalWithTasks = {
	deadline: format(lastDayOfYear(new Date()), DATE),
	id: `${id++}`,
	isDone: true,
	name: 'invest Money',
	tasks: [
		{
			deadline: format(endOfWeek(addWeeks(new Date(), 5)), DATE),
			description: '',
			duration: '',
			id: '40',
			isDone: false,
			name: 'read about the best investment',
		},
		{
			deadline: format(endOfWeek(addWeeks(new Date(), 6)), DATE),
			description: '',
			duration: '',
			id: '40',
			isDone: false,
			name: 'read about the best way to invest',
		},
		{
			deadline: format(endOfWeek(addWeeks(new Date(), 7)), DATE),
			description: '',
			duration: '',
			id: '40',
			isDone: false,
			name: 'invest',
		},
	],
};

export const readTheGospelOfJohn: GoalWithTasks = {
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	id: `${id++}`,
	isDone: false,
	name: 'read the gospel of John',
	tasks: [
		{
			deadline: format(endOfWeek(new Date()), DATE),
			description: '',
			duration: '',
			id: '40',
			isDone: false,
			name: 'read until the chapter 5',
		},
		{
			deadline: format(endOfWeek(addWeeks(new Date(), 1)), DATE),
			description: '',
			duration: '',
			id: '41',
			isDone: false,
			name: 'read until the chapter 10',
		},
		{
			deadline: format(endOfWeek(addWeeks(new Date(), 2)), DATE),
			description: '',
			duration: '',
			id: '42',
			isDone: false,
			name: 'read until the chapter 15',
		},
		{
			deadline: format(endOfWeek(addWeeks(new Date(), 3)), DATE),
			description: '',
			duration: '',
			id: '43',
			isDone: false,
			name: 'read until the chapter 21',
		},
	],
};

export const goals = [learnToDrive, cancelMyBankAccount, investMoney, readTheGospelOfJohn];

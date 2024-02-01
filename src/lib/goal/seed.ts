import { DATE } from '$lib/consts';
import type { GoalWithTasks } from '$lib/goal/utils';
import { addWeeks, endOfWeek, format, lastDayOfQuarter, lastDayOfYear } from 'date-fns';

let id = 0;
export const learnToDrive: GoalWithTasks = {
	id: `${id++}`,
	name: 'learn to drive',
	isDone: true,
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	tasks: [
		{
			id: '1',
			name: 'learn to drive',
			description: '',
			isDone: true,
			deadline: format(endOfWeek(addWeeks(new Date(), 10)), DATE),
		},
	],
};

export const cancelMyBankAccount: GoalWithTasks = {
	id: `${id++}`,
	name: 'cancel my bank account',
	isDone: false,
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	tasks: [
		{
			id: '10',
			name: 'write the letter',
			description: '',
			isDone: false,
			deadline: format(endOfWeek(addWeeks(new Date(), 1)), DATE),
		},
		{
			id: '11',
			name: 'print my documents',
			description: '',
			isDone: true,
			deadline: format(endOfWeek(addWeeks(new Date(), 1)), DATE),
		},
		{
			id: '12',
			name: 'send a letter',
			description: '',
			isDone: false,
			deadline: format(endOfWeek(addWeeks(new Date(), 1)), DATE),
		},
	],
};

export const investMoney: GoalWithTasks = {
	id: `${id++}`,
	name: 'invest Money',
	isDone: true,
	deadline: format(lastDayOfYear(new Date()), DATE),
	tasks: [
		{
			id: '40',
			name: 'read about the best investment',
			description: '',
			isDone: false,
			deadline: format(endOfWeek(addWeeks(new Date(), 5)), DATE),
		},
		{
			id: '40',
			name: 'read about the best way to invest',
			description: '',
			isDone: false,
			deadline: format(endOfWeek(addWeeks(new Date(), 6)), DATE),
		},
		{
			id: '40',
			name: 'invest',
			description: '',
			isDone: false,
			deadline: format(endOfWeek(addWeeks(new Date(), 7)), DATE),
		},
	],
};

export const readTheGospelOfJohn: GoalWithTasks = {
	id: `${id++}`,
	name: 'read the gospel of John',
	isDone: false,
	deadline: format(lastDayOfQuarter(new Date()), DATE),
	tasks: [
		{
			id: '40',
			name: 'read until the chapter 5',
			description: '',
			isDone: false,
			deadline: format(endOfWeek(new Date()), DATE),
		},
		{
			id: '41',
			name: 'read until the chapter 10',
			description: '',
			isDone: false,
			deadline: format(endOfWeek(addWeeks(new Date(), 1)), DATE),
		},
		{
			id: '42',
			name: 'read until the chapter 15',
			description: '',
			isDone: false,
			deadline: format(endOfWeek(addWeeks(new Date(), 2)), DATE),
		},
		{
			id: '43',
			name: 'read until the chapter 21',
			description: '',
			isDone: false,
			deadline: format(endOfWeek(addWeeks(new Date(), 3)), DATE),
		},
	],
};

export const goals = [learnToDrive, cancelMyBankAccount, investMoney, readTheGospelOfJohn];

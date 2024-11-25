import type { Routine } from '$lib/routine/routine.model';

export const routines: Routine[] = [
	{
		completeHistory: [{ date: '2024-11-17', isCompleted: true }],
		createdAt: '2024-11-01T00:00:00.000Z',
		icon: 'Book',
		id: '1',
		name: 'Read a Book',
		order: 1,
		time: 'evening',
	},
	{
		completeHistory: [{ date: '2024-11-17', isCompleted: false }],
		createdAt: '2024-10-15T00:00:00.000Z',
		icon: 'Weightlifting Barbell',
		id: '2',
		name: 'Workout',
		order: 2,
		time: 'morning',
	},
	{
		completeHistory: [{ date: '2024-11-16', isCompleted: true }],
		createdAt: '2024-09-20T00:00:00.000Z',
		icon: 'Food Plate',
		id: '3',
		name: 'Healthy Snack',
		order: 3,
		time: 'afternoon',
	},
	{
		completeHistory: [{ date: '2024-11-17', isCompleted: true }],
		createdAt: '2024-08-05T00:00:00.000Z',
		icon: 'Cross (Religion)',
		id: '4',
		name: 'Meditation',
		order: 4,
		time: 'morning',
	},
	{
		completeHistory: [{ date: '2024-11-15', isCompleted: true }],
		createdAt: '2024-07-10T00:00:00.000Z',
		icon: 'Bed',
		id: '5',
		name: 'Make the Bed',
		order: 5,
		time: 'morning',
	},
	{
		completeHistory: [{ date: '2024-11-16', isCompleted: false }],
		createdAt: '2024-06-20T00:00:00.000Z',
		icon: 'House',
		id: '6',
		name: 'Clean Desk',
		order: 6,
		time: 'all-day',
	},
	{
		completeHistory: [{ date: '2024-11-17', isCompleted: false }],
		createdAt: '2024-05-25T00:00:00.000Z',
		icon: 'CalendarCheck',
		id: '7',
		name: 'Plan Day',
		order: 7,
		time: 'morning',
	},
	{
		completeHistory: [{ date: '2024-11-16', isCompleted: true }],
		createdAt: '2024-04-15T00:00:00.000Z',
		icon: 'Plant Sprout',
		id: '8',
		name: 'Water Plants',
		order: 8,
		time: 'afternoon',
	},
	{
		completeHistory: [{ date: '2024-11-17', isCompleted: false }],
		createdAt: '2024-03-10T00:00:00.000Z',
		icon: 'Food Plate',
		id: '9',
		name: 'Prepare Dinner',
		order: 9,
		time: 'evening',
	},
	{
		completeHistory: [{ date: '2024-11-17', isCompleted: true }],
		createdAt: '2024-01-01T00:00:00.000Z',
		icon: 'Pills',
		id: '10',
		name: 'Skincare Routine',
		order: 10,
		time: 'evening',
	},
];

export const routinesMap = routines.reduce<Record<Routine['time'], Routine[]>>(
	(map, routine) => {
		map[routine.time].push(routine);
		return map;
	},
	{ morning: [], afternoon: [], evening: [], 'all-day': [] },
);

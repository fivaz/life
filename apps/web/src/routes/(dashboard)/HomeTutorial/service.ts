import { formatDate, parseDate } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { addDays, isSameWeek, startOfWeek } from 'date-fns';
import type { WriteBatch } from 'firebase/firestore';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';

import { DB_PATH, demoLogin } from '$lib/consts';
import { db } from '$lib/firebase';
import { getTaskPath } from '$lib/task/task.repository';

const defaultTasks: Task[] = [
	{
		id: '0C8OJfVbwcC7C3pAaaQj',
		category: {
			color: 'yellow',
			name: 'routine',
			type: 'fun',
			order: 1,
			id: '1GkduvZmuNOu6UEQxjLj',
		},
		recurringDaysOfWeek: [],
		isDone: false,
		duration: '02:00',
		createdAt: '2025-06-15T20:08:09.834Z',
		recurringExceptions: [],
		name: 'Go to the gym',
		recurringEndAt: '',
		image: '',
		startTime: '06:00',
		goal: null,
		description: '',
		recurringFrequency: '',
		date: '2025-06-25',
	},
	{
		id: '3xqEG2sPriJFeCHNv4IZ',
		name: 'Go to the gym',
		image: '',
		startTime: '06:00',
		category: {
			order: 1,
			color: 'yellow',
			type: 'fun',
			id: '1GkduvZmuNOu6UEQxjLj',
			name: 'routine',
		},
		description: '',
		recurringExceptions: ['2025-06-17', '2025-06-18'],
		isDone: false,
		createdAt: '2025-06-15T20:10:14.557Z',
		recurringFrequency: 'daily',
		recurringEndAt: '',
		date: '2025-06-24',
		duration: '02:00',
		recurringDaysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
		goal: null,
	},
	{
		id: '4SVf5uAjEv3YW12ntvls',
		startTime: '10:15',
		duration: '01:00',
		description: '',
		recurringExceptions: [],
		name: 'Sales meeting',
		date: '2025-06-28',
		recurringDaysOfWeek: [],
		category: {
			order: 2,
			name: 'work',
			id: 'SDBYJb7II8IiXUcULYsI',
			color: 'green',
			type: 'work',
		},
		isDone: false,
		recurringFrequency: '',
		image: '',
		createdAt: '2024-09-29T23:34:53.179Z',
		recurringEndAt: '',
		goal: null,
	},
	{
		id: 'IQmvM9QX9j01EZWkK3sY',
		category: {
			color: 'red',
			order: 0,
			name: 'fun',
			type: 'fun',
			id: 'fXrQwF8pGnyFIMYHr4w9',
		},
		duration: '02:00',
		startTime: '11:45',
		goal: {
			id: 'B269NF2Z0dvYVozEOeec',
			name: 'Enjoy my visit to Paris',
			icon: '',
			deadline: '2024-03-31',
			parent: '',
			isDone: false,
		},
		recurringExceptions: [],
		createdAt: '2024-09-29T23:28:19.705Z',
		image: '',
		name: 'Sightseeing',
		recurringEndAt: '',
		description: 'Eiffel Tower, The Arc de Triomphe and Notre Dame',
		isDone: false,
		date: '2025-06-24',
		recurringDaysOfWeek: [],
		recurringFrequency: '',
	},
	{
		id: 'IxKsnmDzVeMFDxmDcfNh',
		name: 'Date night',
		recurringEndAt: '',
		createdAt: '2024-09-29T23:32:17.160Z',
		recurringFrequency: '',
		goal: null,
		date: '2025-06-29',
		duration: '04:00',
		startTime: '18:00',
		description: '',
		recurringDaysOfWeek: [],
		category: {
			type: 'fun',
			id: 'fXrQwF8pGnyFIMYHr4w9',
			color: 'red',
			name: 'fun',
			order: 0,
		},
		recurringExceptions: [],
		isDone: false,
		image: '',
	},
	{
		id: 'LitkbHCjO5aRstCuAGoi',
		goal: null,
		date: '2025-06-29',
		duration: '00:15',
		createdAt: '2024-09-29T23:23:13.317Z',
		recurringFrequency: '',
		startTime: '',
		description: '',
		category: {
			name: 'routine',
			color: 'yellow',
			id: '1GkduvZmuNOu6UEQxjLj',
			type: 'fun',
			order: 1,
		},
		recurringExceptions: [],
		recurringDaysOfWeek: [],
		image: '',
		isDone: false,
		name: "Sam's birthday",
		recurringEndAt: '',
	},
	{
		id: 'Mpk90hENyceCbyeNlCGt',
		startTime: '15:00',
		createdAt: '2024-09-29T23:26:09.217Z',
		recurringDaysOfWeek: [],
		recurringEndAt: '',
		recurringFrequency: '',
		isDone: false,
		date: '2025-06-24',
		description: 'Aéroport international de Genève',
		duration: '02:30',
		recurringExceptions: [],
		name: 'Flight to Paris',
		goal: null,
		category: {
			name: 'work',
			id: 'SDBYJb7II8IiXUcULYsI',
			type: 'work',
			order: 2,
			color: 'green',
		},
		image: '',
	},
	{
		id: 'VMswVtJEqvq74SNuv83x',
		isDone: false,
		startTime: '17:45',
		name: 'Sales meeting',
		recurringExceptions: [],
		image: '',
		date: '2025-06-25',
		category: {
			type: 'work',
			id: 'SDBYJb7II8IiXUcULYsI',
			name: 'work',
			color: 'green',
			order: 2,
		},
		recurringDaysOfWeek: [],
		description: '',
		createdAt: '2025-06-15T20:13:58.907Z',
		goal: null,
		duration: '00:45',
		recurringFrequency: '',
		recurringEndAt: '',
	},
	{
		id: 'VntwQZEfYtdVSm7lbA8P',
		category: {
			type: 'fun',
			order: 0,
			name: 'fun',
			color: 'red',
			id: 'fXrQwF8pGnyFIMYHr4w9',
		},
		image: '',
		isDone: false,
		createdAt: '2025-06-15T20:14:12.100Z',
		recurringFrequency: '',
		date: '2025-06-26',
		goal: null,
		name: 'Date night',
		description: '',
		duration: '00:45',
		recurringEndAt: '',
		startTime: '16:15',
		recurringExceptions: [],
		recurringDaysOfWeek: [],
	},
	{
		id: 'dCIFXLOXby9RRsMx7JXv',
		startTime: '',
		description: '',
		isDone: false,
		name: "Sam's birthday party",
		recurringExceptions: [],
		recurringDaysOfWeek: [],
		category: {
			name: 'fun',
			type: 'fun',
			id: 'ozfG1Kg4VP5Q9TckE0Vs',
			order: 1,
			color: 'red',
		},
		recurringEndAt: '',
		recurringFrequency: '',
		duration: '01:30',
		createdAt: '2024-09-29T23:35:50.145Z',
		goal: null,
		date: '2025-06-25',
		image: '',
	},
	{
		id: 'kFNUKSeTPnTFlDEuTRfC',
		isDone: false,
		recurringEndAt: '',
		goal: {
			deadline: '2025-07-30',
			icon: 'Flame',
			isDone: false,
			name: 'Enjoy my visit to Paris',
			parent: '',
			id: 'B269NF2Z0dvYVozEOeec',
		},
		date: '2025-06-29',
		name: 'Visit Louvre Museum',
		createdAt: '2024-09-29T23:33:15.348Z',
		duration: '01:00',
		image:
			'https://firebasestorage.googleapis.com/v0/b/waser-life.appspot.com/o/users%2Fo9bdQJ3gYjZllQH9Y9Y66fKh7283%2Ftasks%2FkFNUKSeTPnTFlDEuTRfC?alt=media&token=c6a47123-910b-42af-a971-c330970becbc',
		description: '4 Place du Louvre, 75001 Paris',
		startTime: '15:45',
		recurringFrequency: '',
		category: {
			type: 'fun',
			id: 'fXrQwF8pGnyFIMYHr4w9',
			name: 'fun',
			color: 'red',
			order: 0,
		},
		recurringDaysOfWeek: [],
		recurringExceptions: [],
	},
];

const getTasks = async (uid: string): Promise<Task[]> => {
	const tasksRef = collection(db, getTaskPath(uid));
	const snapshot = await getDocs(tasksRef);

	return snapshot.docs.map((docSnap) => ({
		...docSnap.data(),
		id: docSnap.id,
	})) as Task[];
};

const shouldResetTasks = (tasks: Task[], now: Date): boolean => {
	return tasks.some((task) => {
		const createdAt = task.createdAt ? new Date(task.createdAt) : null;
		return !createdAt || !isSameWeek(createdAt, now, { weekStartsOn: 1 });
	});
};

const deleteAllTasks = async (tasks: Task[], uid: string) => {
	console.log('delete current tasks');
	const batch = writeBatch(db);
	console.log('tasks', tasks);
	tasks.forEach((task) => {
		const ref = doc(db, getTaskPath(uid), task.id);
		batch.delete(ref);
	});
	await batch.commit();
};

const prepareDefaultTasksForThisWeek = (now: Date): Task[] => {
	const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 });

	return defaultTasks
		.map((task) => {
			const parsedDate = parseDate(task.date);
			if (!parsedDate) return null;

			const weekDay = parsedDate.getDay(); // 0–6
			const adjustedWeekDay = weekDay === 0 ? 6 : weekDay - 1;
			const newDate = addDays(startOfThisWeek, adjustedWeekDay);

			return {
				...task,
				date: formatDate(newDate),
				createdAt: now.toISOString(),
			};
		})
		.filter(Boolean) as Task[];
};

const insertDefaultTasks = async (uid: string, tasks: Task[]) => {
	console.log('insert new tasks');
	const batch = writeBatch(db);
	tasks.forEach((task) => {
		const taskRef = doc(db, getTaskPath(uid), task.id);
		batch.set(taskRef, task);
	});
	await batch.commit();
};

export const resetData = async () => {
	const uid = demoLogin.uid;
	const now = new Date();
	const tasks = await getTasks(uid);

	if (!shouldResetTasks(tasks, now)) return;

	await deleteAllTasks(tasks, uid);

	const newTasks = prepareDefaultTasksForThisWeek(now);
	await insertDefaultTasks(uid, newTasks);
};

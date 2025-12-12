import { formatDate, parseDate } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { addDays, isSameWeek, startOfWeek } from 'date-fns';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';

import { demoLogin } from '$lib/consts';
import { db } from '$lib/firebase';
import { getTaskPath } from '$lib/task/task.repository';

const defaultTasks: Task[] = [
	{
		recurringExceptions: [],
		goal: null,
		category: {
			type: 'fun',
			order: 1,
			id: '1GkduvZmuNOu6UEQxjLj',
			color: 'yellow',
			name: 'routine',
		},
		description: '',
		name: 'Go to the gym',
		startTime: '06:00',
		createdAt: '2025-06-23T20:39:13.148Z',
		duration: '02:00',
		id: '3xqEG2sPriJFeCHNv4IZ',
		recurringFrequency: 'daily',
		recurringEndAt: '',
		date: '2025-06-23',
		image: '',
		recurringDaysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
		isDone: false,
	},
	{
		id: '4SVf5uAjEv3YW12ntvls',
		duration: '01:00',
		image: '',
		isDone: false,
		recurringFrequency: '',
		category: {
			name: 'work',
			type: 'work',
			order: 2,
			color: 'green',
			id: 'SDBYJb7II8IiXUcULYsI',
		},
		description: '',
		createdAt: '2025-06-23T20:39:13.148Z',
		date: '2025-06-28',
		recurringDaysOfWeek: [],
		name: 'Sales meeting',
		recurringEndAt: '',
		recurringExceptions: [],
		startTime: '10:15',
		goal: null,
	},
	{
		duration: '02:00',
		isDone: false,
		date: '2025-06-24',
		category: {
			id: 'fXrQwF8pGnyFIMYHr4w9',
			name: 'fun',
			color: 'red',
			type: 'fun',
			order: 0,
		},
		id: 'IQmvM9QX9j01EZWkK3sY',
		image: '',
		recurringFrequency: '',
		recurringEndAt: '',
		createdAt: '2025-06-23T20:39:13.148Z',
		startTime: '11:45',
		goal: {
			icon: '',
			startDate: '2024-03-15',
			deadline: '2024-03-31',
			isDone: false,
			parent: '',
			name: 'Enjoy my visit to Paris',
			id: 'B269NF2Z0dvYVozEOeec',
		},
		recurringExceptions: [],
		recurringDaysOfWeek: [],
		description: 'Eiffel Tower, The Arc de Triomphe and Notre Dame',
		name: 'Sightseeing',
	},
	{
		isDone: false,
		createdAt: '2025-06-23T20:39:13.148Z',
		name: 'Date night',
		image: '',
		category: {
			name: 'fun',
			color: 'red',
			type: 'fun',
			id: 'fXrQwF8pGnyFIMYHr4w9',
			order: 0,
		},
		recurringDaysOfWeek: [],
		date: '2025-06-29',
		startTime: '18:00',
		recurringEndAt: '',
		recurringExceptions: [],
		id: 'IxKsnmDzVeMFDxmDcfNh',
		recurringFrequency: '',
		description: '',
		duration: '04:00',
		goal: null,
	},
	{
		date: '2025-06-29',
		recurringDaysOfWeek: [],
		id: 'LitkbHCjO5aRstCuAGoi',
		recurringExceptions: [],
		isDone: false,
		recurringFrequency: '',
		recurringEndAt: '',
		name: "Sam's birthday",
		startTime: '',
		goal: null,
		duration: '00:15',
		description: '',
		category: {
			id: '1GkduvZmuNOu6UEQxjLj',
			name: 'routine',
			type: 'fun',
			order: 1,
			color: 'yellow',
		},
		image: '',
		createdAt: '2025-06-23T20:39:13.148Z',
	},
	{
		image: '',
		category: {
			name: 'work',
			order: 2,
			id: 'SDBYJb7II8IiXUcULYsI',
			type: 'work',
			color: 'green',
		},
		recurringEndAt: '',
		recurringDaysOfWeek: [],
		goal: null,
		name: 'Flight to Paris',
		id: 'Mpk90hENyceCbyeNlCGt',
		recurringFrequency: '',
		description: 'Aéroport international de Genève',
		duration: '02:30',
		date: '2025-06-24',
		startTime: '15:00',
		createdAt: '2025-06-23T20:39:13.148Z',
		isDone: false,
		recurringExceptions: [],
	},
	{
		recurringDaysOfWeek: [],
		image: '',
		duration: '01:30',
		recurringEndAt: '',
		category: {
			color: 'red',
			order: 1,
			name: 'fun',
			id: 'ozfG1Kg4VP5Q9TckE0Vs',
			type: 'fun',
		},
		description: '',
		createdAt: '2025-06-23T20:39:13.148Z',
		recurringExceptions: [],
		isDone: false,
		name: "Sam's birthday party",
		goal: null,
		recurringFrequency: '',
		startTime: '',
		id: 'dCIFXLOXby9RRsMx7JXv',
		date: '2025-06-25',
	},
	{
		recurringDaysOfWeek: [],
		recurringExceptions: [],
		isDone: false,
		image:
			'https://firebasestorage.googleapis.com/v0/b/waser-life.appspot.com/o/users%2Fo9bdQJ3gYjZllQH9Y9Y66fKh7283%2Ftasks%2FkFNUKSeTPnTFlDEuTRfC?alt=media&token=c6a47123-910b-42af-a971-c330970becbc',
		duration: '01:00',
		description: '4 Place du Louvre, 75001 Paris',
		goal: {
			parent: '',
			id: 'B269NF2Z0dvYVozEOeec',
			name: 'Enjoy my visit to Paris',
			isDone: false,
			icon: 'Flame',
			startDate: '2025-07-15',
			deadline: '2025-07-30',
		},
		name: 'Visit Louvre Museum',
		category: {
			name: 'fun',
			type: 'fun',
			order: 0,
			color: 'red',
			id: 'fXrQwF8pGnyFIMYHr4w9',
		},
		startTime: '15:45',
		createdAt: '2025-06-23T20:39:13.148Z',
		recurringEndAt: '',
		id: 'kFNUKSeTPnTFlDEuTRfC',
		recurringFrequency: '',
		date: '2025-06-29',
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

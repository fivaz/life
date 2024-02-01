import type { Category } from '$lib/category/utils';
import { weekDays } from '$lib/components/days-checkbox/service';
import { createModal } from '$lib/components/dialog/service';
import { DATE, DATETIME, TIME } from '$lib/consts';
import { db } from '$lib/firebase';
import type { Goal } from '$lib/goal/utils';
import type { OnlyTTask, Task, ToDo, Event } from '$lib/task/utils';
import {
	add,
	addMinutes,
	addMonths,
	differenceInMinutes,
	endOfWeek,
	format,
	isAfter,
	isValid,
	parse,
} from 'date-fns';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import type { EventDispatcher } from 'svelte';

export type TaskIn = OnlyTTask & {
	wasRecurring: boolean;
	isEvent: boolean;
};

export function buildEmptyTask(categories: Category[], goal: Goal | null = null): Task {
	return {
		name: '',
		description: '',
		date: format(new Date(), DATE),
		startTime: format(new Date(), TIME),
		endTime: format(addMinutes(new Date(), 15), TIME),
		duration: '00:15',
		deadline: format(endOfWeek(new Date()), DATE),
		isDone: false,
		category: categories.find((category) => category.isDefault) || categories[0],
		goal,
		recurringStartAt: format(new Date(), DATE),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringExceptions: [],
	};
}

export function getEndTime(startTime: string, duration: string): string {
	if (!startTime || !duration) {
		return '';
	}
	const [startTimeHours, startTimeMinutes] = startTime.split(':').map(Number);
	const [DurationHours, durationMinutes] = duration.split(':').map(Number);

	const startTimeDate = new Date(1, 0, 0, startTimeHours, startTimeMinutes);

	const totalDate = add(startTimeDate, { hours: DurationHours, minutes: durationMinutes });
	return format(totalDate, TIME);
}

export function getDuration(startTime: string, endTime: string): string {
	if (!startTime || !endTime) {
		return '';
	}
	const [startTimeHours, startTimeMinutes] = startTime.split(':').map(Number);
	const [endTimeHours, endTimeMinutes] = endTime.split(':').map(Number);

	const startTimeDate = new Date(0, 0, 0, startTimeHours, startTimeMinutes);
	const endTimeDate = new Date(0, 0, 0, endTimeHours, endTimeMinutes);

	const totalMinutes = differenceInMinutes(endTimeDate, startTimeDate);
	const totalHours = Math.floor(totalMinutes / 60);
	const remainingMinutes = totalMinutes % 60;

	return format(new Date(0, 0, 0, totalHours, remainingMinutes), TIME);
}

export function formatDates(task: TaskIn, formData: FormData) {
	if (task.isEvent) {
		buildEventDates(formData);
	} else {
		buildDeadline(formData);
	}
}

function buildEventDates(formData: FormData): void {
	const date = formData.get('date') as string;
	const startTime = formData.get('startTime') as string;
	const endTime = formData.get('endTime') as string;
	const isRecurring = !!formData.get('isRecurring');

	const startDateString = `${date} ${startTime}`;
	const endDateString = `${date} ${endTime}`;

	// Parse the date and time string
	const startDate = parse(startDateString, DATETIME, new Date());
	const endDate = parse(endDateString, DATETIME, new Date());

	if (!isValid(startDate) || !isValid(endDate)) {
		throw Error('date, startTime and endTime should be valid date and time');
	}

	formData.set('startDate', startDate.toISOString());
	formData.set('endDate', endDate.toISOString());

	if (isRecurring) {
		const recurringStartAtString = formData.get('recurringStartAt') as string;
		const recurringEndAtString = formData.get('recurringEndAt') as string;
		const recurringStartAt = parse(recurringStartAtString, DATE, new Date());
		const recurringEndAt = parse(recurringEndAtString, DATE, new Date());

		if (!isValid(recurringStartAt) || !isValid(recurringEndAt)) {
			throw Error('date, recurringStartAt and recurringEndAt should be valid date and time');
		}

		formData.set('recurringStartAt', recurringStartAt.toISOString());
		formData.set('recurringEndAt', recurringEndAt.toISOString());
	}
}

function buildDeadline(formData: FormData) {
	const deadlineString = formData.get('deadline') as string;

	const deadline = deadlineString ? parse(deadlineString, DATE, new Date()).toISOString() : '';

	formData.set('deadline', deadline);
}

export function isEventsDateInverted(task: Event | ToDo) {
	return (
		'startTime' in task &&
		'endTime' in task &&
		!isAfter(parse(task.endTime, TIME, new Date()), parse(task.startTime, TIME, new Date()))
	);
}

export function editTask(id: string | undefined, data: Partial<Omit<Task, 'id'>>, userId: string) {
	if (id) {
		const taskDocRef = doc(db, 'users', userId, 'tasks', id);
		void updateDoc(taskDocRef, data);
	}
}

export function addTask(data: Partial<Omit<Task, 'id'>>, userId: string) {
	const tasksCollectionRef = collection(db, 'users', userId, 'tasks');
	void addDoc(tasksCollectionRef, data);
}

export async function deleteTask(
	id: string | undefined,
	userId: string,
	dispatch: EventDispatcher<{ close: null }>,
) {
	const result = await createModal({ title: 'Are you sure?' });
	if (result && id) {
		const taskDocRef = doc(db, 'users', userId, 'tasks', id);
		await deleteDoc(taskDocRef);
		dispatch('close');
	}
}
//
// const handleCreate: SubSubmitFunction<TaskIn> = ({ formData, data: task }) => {
// 	formatDates(task, formData);
//
// 	// dispatch('close');
//
// 	return async ({ result }) => {
// 		await applyAction(result);
// 		if (result.type === 'success' && result.data?.created) {
// 			updateTasks(result.data.created);
// 		} else if (result.type === 'error') {
// 			console.log(result.error || UnknownError);
// 		}
// 	};
// };
//
// const handleEdit: SubSubmitFunction<TaskIn> = async ({ formData, data: task }) => {
// 	formatDates(task, formData);
//
// 	if (task.isEvent) {
// 		if (task.wasRecurring && task.isRecurring) {
// 			const result = await createModal({
// 				title: 'This is a repeating event',
// 				message: 'Do you want to save the changes for ?',
// 				confirmText: 'this event only',
// 				cancelText: 'future events',
// 			});
//
// 			if (result === null) {
// 				return () => {};
// 			}
//
// 			formData.set('isForThisEventOnly', result ? 'true' : '');
// 		}
// 	}
// 	// dispatch('close');
//
// 	return async ({ result }) => {
// 		await applyAction(result);
// 		if (result.type === 'success' && result.data?.updated) {
// 			updateTasks(result.data.updated);
// 		} else if (result.type === 'error') {
// 			console.log(result.error || UnknownError);
// 		}
// 	};
// };

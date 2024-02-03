import type { Category } from '$lib/category/utils';
import { weekDays } from '$lib/components/days-checkbox/service';
import { createModal } from '$lib/components/dialog/service';
import { DATE, TIME } from '$lib/consts';
import { db } from '$lib/firebase';
import type { OptionalId } from '$lib/form-utils';
import type { Goal } from '$lib/goal/utils';
import type { Task, AnyTask, RecurringEvent } from '$lib/task/utils';
import {
	add,
	addMinutes,
	addMonths,
	differenceInMinutes,
	endOfWeek,
	format,
} from 'date-fns';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import type { EventDispatcher } from 'svelte';

export function buildEmptyTask(categories: Category[], goal?: Goal): OptionalId<Task> {
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
		recurringExceptions: '',
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

export function editPossibleSingleRecurringEvent(
	id: string,
	data: Omit<AnyTask, 'id'>,
	userId: string,
	targetDate: Date,
) {
	if ('recurringExceptions' in data) {
		editSingleRecurringEvent(id, data as Omit<RecurringEvent, 'id'>, userId, targetDate);
	} else {
		editTask(id, data, userId);
	}
}

export function editSingleRecurringEvent(
	id: string,
	recurringData: Omit<RecurringEvent, 'id'>,
	userId: string,
	targetDate: Date,
) {
	const date = format(targetDate, DATE);

	// remove te recurring attributes
	const {
		recurringStartAt,
		recurringEndAt,
		recurringDaysOfWeek,
		recurringExceptions,
		...eventData
	} = recurringData;

	const newEvent = { ...eventData, date };

	void addTask(newEvent, userId);

	recurringData.recurringExceptions = recurringData.recurringExceptions + `, ` + date;

	editTask(id, recurringData, userId);
}

export async function editTaskWithPrompt(
	id: string,
	data: Omit<AnyTask, 'id'>,
	userId: string,
	targetDate: Date,
) {
	if ('recurringStartAt' in data) {
		const recurringData = data as Omit<RecurringEvent, 'id'>;
		const result = await createModal({
			title: 'This is a repeating event',
			message: 'Do you want to save the changes for ?',
			confirmText: 'this event only',
			cancelText: 'future events',
		});

		if (result === null) {
			return;
		}

		if (result) {
			editSingleRecurringEvent(id, recurringData, userId, targetDate);
		} else {
			editTask(id, recurringData, userId);
		}
	} else {
		editTask(id, data, userId);
	}
}

export function editTask(id: string, data: Omit<AnyTask, 'id'>, userId: string) {
	const taskDocRef = doc(db, 'users', userId, 'tasks', id);
	void updateDoc(taskDocRef, data);
}

export function addTask(data: Omit<AnyTask, 'id'>, userId: string) {
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

import { createDialog } from '$lib/components/dialog/service.svelte.js';
import type { Goal } from '$lib/goal/goal.utils';
import { isTimed, type Task } from '$lib/task/task.model';
import { isRecurring } from '$lib/task/task.model';
import { addExceptionToRecurring, addTask, deleteTask, editTask } from '$lib/task/task.repository';
import { getHalfTime, sumTimes } from '$lib/task/time-utils';

// ADD

// EDIT

export function editSingleRecurringEvent(
	id: string,
	recurringEvent: Omit<Task, 'id'>,
	userId: string,
	targetDate: string,
	file?: File | null,
) {
	//remove all the recurring attributes from the event
	const event: Omit<Task, 'id'> = {
		...recurringEvent,
		recurringFrequency: null,
		recurringDaysOfWeek: [],
		recurringEndAt: null,
		recurringExceptions: [],
	};

	// clone the event but with a new date
	event.date = targetDate;

	void addTask(event, userId, file);

	addExceptionToRecurring(id, recurringEvent, targetDate, userId);
}

export async function editTaskWithPrompt({
	data,
	file,
	formerGoal,
	id,
	targetDate,
	userId,
	wasRecurring,
}: {
	data: Omit<Task, 'id'>;
	file: File | null;
	formerGoal: Goal | null;
	id: string;
	targetDate: string | undefined;
	userId: string;
	wasRecurring: boolean;
}): Promise<boolean> {
	if (isRecurring(data) && wasRecurring && targetDate) {
		const recurringData = data as Omit<Task, 'id'>;
		const result = await createDialog({
			cancelText: 'future events',
			confirmText: 'this event only',
			message: 'Do you want to save the changes for ?',
			title: 'This is a repeating event',
		});

		if (result === null) {
			return false;
		}
		if (result) {
			editSingleRecurringEvent(id, recurringData, userId, targetDate, file);
		} else {
			void editTask(id, recurringData, userId, formerGoal, file);
		}
	} else {
		void editTask(id, data, userId, formerGoal, file);
	}
	return true;
}

// DELETE

export async function deletePossibleSingleRecurringEvent(
	task: Task,
	userId: string,
	targetDate: string | undefined,
): Promise<boolean> {
	const { id, ...data } = task;

	if (isRecurring(task) && targetDate) {
		const result = await createDialog({
			cancelText: 'all events',
			confirmText: 'this event only',
			message: 'Do you want to delete ?',
			title: 'This is a repeating event',
		});

		if (result === null) {
			return false;
		}

		if (result) {
			addExceptionToRecurring(id, data as Omit<Task, 'id'>, targetDate, userId);
		} else {
			deleteTask(id, data, userId);
		}
	} else {
		deleteTask(id, data, userId);
	}

	return true;
}

// OTHERS

export function duplicateTask(task: Task, userId: string) {
	const halfDuration = getHalfTime(task.duration);

	const { id, ...data } = { ...task };
	data.duration = halfDuration;

	void editTask(id, data, userId, null, null);

	const copyData = {
		...data,
		...(isTimed(task) ? { startTime: sumTimes(task.startTime, halfDuration) } : {}),
	};

	void addTask(copyData, userId);
}

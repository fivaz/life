import { createDialog } from '@life/shared';
import { convertTimeToMinutes, DATE, formatDate, formatTime, TIME } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { getHalfTime, isRecurring, isTimed } from '@life/shared/task';
import { addMinutes, parse } from 'date-fns';

import { buildEmptyCategory } from '$lib/category/category.model';
import type { Goal } from '$lib/goal/goal.model';
import { buildTimedTask } from '$lib/task/build-utils';
import { addExceptionToRecurring, addTask, deleteTask, editTask } from '$lib/task/task.repository';
import type { TaskIn } from '$lib/task/task-in-utils';
import { convertToTaskIn } from '$lib/task/task-in-utils';

export const taskIn = $state<{ value: TaskIn }>({
	value: convertToTaskIn(buildTimedTask([buildEmptyCategory()])),
});

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
		recurringFrequency: '',
		recurringDaysOfWeek: [],
		recurringEndAt: '',
		recurringExceptions: [],
	};

	// clone the event but with a new date
	event.date = targetDate;

	void addTask(event, userId, file);

	addExceptionToRecurring(id, recurringEvent, targetDate, userId);
}

//EDIT
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

export function duplicateTask(task: Task, userId: string) {
	const halfDuration = getHalfTime(task.duration);

	const { id, ...data } = { ...task };
	data.duration = halfDuration;
	if (!data.groupId) {
		data.groupId = id;
	}

	void editTask(id, data, userId, null, null);

	const copyTask = {
		...data,
	};

	if (isTimed(task)) {
		// Combine date and time into one Date object
		const fullStart = parse(`${task.date} ${task.startTime}`, `${DATE} ${TIME}`, new Date());
		const newDateTime = addMinutes(fullStart, convertTimeToMinutes(halfDuration));

		const newDate = formatDate(newDateTime);
		const newTime = formatTime(newDateTime);

		copyTask.date = newDate;
		copyTask.startTime = newTime;
	}

	void addTask(copyTask, userId);
}

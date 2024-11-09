import type { Task } from '$lib/task/utils';

import { nameOfDaysOfWeek } from '$lib/task/task-form/task-form-recurring/days-checkbox/service';
import { DATE, TIME } from '$lib/consts';
import { convertTimeToMinutes, getCurrentRoundedDate, sumTimes } from '$lib/task/time-utils';
import { isRecurring, isUntimed } from '$lib/task/utils';
import { addMinutes, addMonths, format, isAfter, parse } from 'date-fns';

// TaskIn is a super type that has all the attributes of possible Tasks together
export type TaskIn = Task & {
	endTime: string;
	image: string;
	isEvent: boolean;
	isRecurring: boolean;
};

function checkDuration(taskIn: TaskIn): string {
	if (
		taskIn.isEvent &&
		convertTimeToMinutes(taskIn.startTime) + convertTimeToMinutes(taskIn.duration) > 60 * 24
	) {
		return "event's duration shouldn't be more than a single day";
	}
	return '';
}

function checkIsInverted(taskIn: TaskIn): string {
	if (
		taskIn.isEvent &&
		!isAfter(parse(taskIn.endTime, TIME, new Date()), parse(taskIn.startTime, TIME, new Date()))
	) {
		return 'start time should be before end time';
	}
	return '';
}

export function checkErrors(taskIn: TaskIn): string {
	return checkDuration(taskIn) || checkIsInverted(taskIn);
}

export function convertToTask(taskIn: TaskIn): Task {
	taskIn.name = taskIn.name || taskIn.category.name;

	const { endTime, ...task } = taskIn;

	if (!taskIn.isEvent) {
		task.startTime = '';
	}

	if (!taskIn.isRecurring) {
		task.recurringFrequency = '';
		task.recurringDaysOfWeek = [];
		task.recurringEndAt = '';
		task.recurringExceptions = [];
	}

	return task;
}

export function convertToTaskIn(task: Task): TaskIn {
	const taskIn: TaskIn = Object.assign(buildEmptyTaskIn(), task);

	taskIn.endTime = sumTimes(taskIn.startTime, taskIn.duration);

	if (isUntimed(task)) {
		taskIn.isEvent = true;
	}

	if (isRecurring(task)) {
		taskIn.isRecurring = true;
	}

	return taskIn;
}

function buildEmptyTaskIn(): TaskIn {
	const now = getCurrentRoundedDate();

	return {
		id: '',
		name: '',
		description: '',
		goal: null,
		isDone: false,
		category: { id: '', name: 'no Category', isDefault: false, color: '', type: '' },
		createdAt: format(now, DATE),
		date: format(now, DATE),
		duration: '00:15',
		endTime: format(addMinutes(now, 15), TIME),
		image: '',
		isEvent: false,
		isRecurring: false,
		recurringFrequency: 'daily',
		recurringDaysOfWeek: nameOfDaysOfWeek.slice(1, 6),
		recurringEndAt: format(addMonths(now, 1), DATE),
		recurringExceptions: [],
		startTime: format(now, TIME),
	};
}

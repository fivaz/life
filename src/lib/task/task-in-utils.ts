import { addMonths, format, isAfter, parse } from 'date-fns';

import { DATE, TIME } from '$lib/consts';
import { nameOfDaysOfWeek } from '$lib/task/task-form/task-form-recurring/days-checkbox/service';
import { convertTimeToMinutes, sumTimes } from '$lib/task/time-utils';
import { isTimed, type Task } from '$lib/task/utils';
import { isRecurring } from '$lib/task/utils';

// TaskIn is a super type that has all the attributes of possible Tasks together
export type TaskIn = Omit<
	Task,
	| 'startTime'
	| 'recurringFrequency'
	| 'recurringExceptions'
	| 'recurringDaysOfWeek'
	| 'recurringEndAt'
> & {
	endTime: string;
	image: string;
	isEvent: boolean;
	isRecurring: boolean;
	startTime: string;
	recurringFrequency: string;
	recurringExceptions: string[];
	recurringEndAt: string;
	recurringDaysOfWeek: string[];
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

	const { endTime, ...rest } = taskIn;

	const task = rest as Task;

	if (!taskIn.isEvent) {
		task.startTime = null;
	}

	if (!taskIn.isRecurring) {
		task.recurringFrequency = null;
		task.recurringDaysOfWeek = [];
		task.recurringEndAt = null;
		task.recurringExceptions = [];
	}

	return task;
}

export function convertToTaskIn(task: Task): TaskIn {
	const taskIn = {
		...task,
		isEvent: false,
		isRecurring: false,
		endTime: '',
	} as TaskIn;

	if (isTimed(task)) {
		taskIn.isEvent = true;
	} else {
		taskIn.startTime = format(new Date(), TIME);
	}

	taskIn.endTime = sumTimes(taskIn.startTime, taskIn.duration);

	if (isRecurring(task)) {
		taskIn.isRecurring = true;
	} else {
		taskIn.recurringFrequency = 'daily';
		taskIn.recurringDaysOfWeek = nameOfDaysOfWeek.slice(1, 6);
		taskIn.recurringEndAt = format(addMonths(new Date(), 1), DATE);
		taskIn.recurringExceptions = [];
	}

	return taskIn;
}

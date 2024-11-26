import { convertTimeToMinutes } from '@life/lib/date';
import type { Task } from '@life/lib/task';
import { isRecurring, isTimed } from '@life/lib/task';
import { addMonths, isAfter, parse } from 'date-fns';

import { formatDate, formatTime, TIME } from '$lib/date.utils.svelte';
import type { Frequency } from '$lib/task/task.model';
import { nameOfDaysOfWeek } from '$lib/task/task-form/task-form-recurring/days-checkbox/service';
import { getCurrentRoundedDate, sumTimes } from '$lib/task/time-utils';

// TaskIn is a super type that has all the attributes of possible Tasks together
export type TaskIn = Omit<
	Task,
	| 'startTime'
	| 'date'
	| 'duration'
	| 'recurringFrequency'
	| 'recurringExceptions'
	| 'recurringDaysOfWeek'
	| 'recurringEndAt'
> & {
	startTime: string;
	duration: string;
	endTime: string;
	date: string;
	image: string;
	isEvent: boolean;
	isRecurring: boolean;
	recurringFrequency: Frequency | '';
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

	const { endTime, isEvent, isRecurring, ...rest } = taskIn;

	return {
		...rest,
		startTime: isEvent ? rest.startTime : '',
		recurringFrequency: isRecurring && rest.recurringFrequency ? rest.recurringFrequency : '',
		recurringDaysOfWeek: isRecurring ? rest.recurringDaysOfWeek : [],
		recurringEndAt: isRecurring ? rest.recurringEndAt : '',
		recurringExceptions: isRecurring ? rest.recurringExceptions : [],
	};
}

export function convertToTaskIn(task: Task): TaskIn {
	const time = formatTime(getCurrentRoundedDate());

	return {
		...task,
		isEvent: isTimed(task),
		isRecurring: isRecurring(task),
		startTime: task.startTime || time,
		endTime: sumTimes(task.startTime || time, task.duration),
		recurringFrequency: task.recurringFrequency || 'daily',
		recurringDaysOfWeek: task.recurringDaysOfWeek.length
			? task.recurringDaysOfWeek
			: nameOfDaysOfWeek.slice(1, 6),
		recurringEndAt: task.recurringEndAt || formatDate(addMonths(new Date(), 1)),
	};
}

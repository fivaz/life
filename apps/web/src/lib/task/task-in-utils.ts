import { convertTimeToMinutes, floorRound15, formatTime, parseTime } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { isRecurring, isTimed } from '@life/shared/task';
import { isAfter } from 'date-fns';

import { sumTimes } from '$lib/task/time-utils';

// TaskIn is a super type that has all the attributes of possible Tasks together
export type TaskIn = Task & {
	endTime: string;
	isEvent: boolean;
	isRecurring: boolean;
	file: File | null;
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
	if (taskIn.isEvent && !isAfter(parseTime(taskIn.endTime), parseTime(taskIn.startTime))) {
		return 'start time should be before end time';
	}
	return '';
}

export function checkErrors(taskIn: TaskIn): string {
	return checkDuration(taskIn) || checkIsInverted(taskIn);
}

export function convertToTask(taskIn: TaskIn): Task {
	taskIn.name = taskIn.name || taskIn.category.name;

	const { endTime, isEvent, isRecurring, file, ...rest } = taskIn;

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
	const time = formatTime(floorRound15(new Date()));

	return {
		...task,
		isEvent: isTimed(task),
		isRecurring: isRecurring(task),
		startTime: task.startTime || time,
		endTime: sumTimes(task.startTime || time, task.duration),
		recurringFrequency: task.recurringFrequency || 'daily',
		file: null,
	};
}

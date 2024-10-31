import type { Event, RecurringEvent, Task, ToDo } from '$lib/task/utils';

import { weekDays } from '$lib/components/task-form/task-form-recurring/days-checkbox/service';
import { DATE, TIME } from '$lib/consts';
import { convertTimeToMinutes, getCurrentRoundedDate, sumTimes } from '$lib/task/time-utils';
import { isRecurring, isToDo } from '$lib/task/utils';
import { addMinutes, addMonths, format, isAfter, parse } from 'date-fns';

// TaskIn is a super type that has all the attributes of possible Tasks together
export type TaskIn = ToDo &
	Event &
	Omit<RecurringEvent, 'recurringExceptions'> & {
		endTime: string;
		image: string;
		isEvent: boolean;
		isRecurring: boolean;
		recurringExceptions: Date[];
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

export function convertToAnyTask(taskIn: TaskIn): Task {
	taskIn.name = taskIn.name || taskIn.category.name;

	if (taskIn.isEvent) {
		if (taskIn.isRecurring) {
			return getRecurringEvent(taskIn);
		} else {
			return getEvent(taskIn);
		}
	} else {
		return getToDo(taskIn);
	}
}

export function getToDo(data: TaskIn): ToDo {
	return {
		category: data.category,
		createdAt: data.createdAt,
		deadline: data.deadline,
		description: data.description,
		duration: data.duration,
		goal: data.goal,
		id: data.id,
		image: data.image,
		isDone: data.isDone,
		name: data.name,
	};
}

export function getEvent(data: TaskIn): Event {
	return {
		category: data.category,
		createdAt: data.createdAt,
		date: data.date,
		description: data.description,
		duration: data.duration,
		goal: data.goal,
		id: data.id,
		image: data.image,
		isDone: data.isDone,
		name: data.name,
		startTime: data.startTime,
	};
}

export function getRecurringEvent(data: TaskIn): RecurringEvent {
	return {
		category: data.category,
		createdAt: data.createdAt,
		date: data.date,
		description: data.description,
		duration: data.duration,
		goal: data.goal,
		id: data.id,
		image: data.image,
		isDone: data.isDone,
		name: data.name,
		recurringDaysOfWeek: data.recurringDaysOfWeek,
		recurringEndAt: data.recurringEndAt,
		recurringExceptions: data.recurringExceptions.map((date) => format(date, DATE)),
		recurringStartAt: data.recurringStartAt,
		startTime: data.startTime,
	};
}

export function convertToTaskIn(task: Task): TaskIn {
	if (isToDo(task)) {
		return convertToDo(task);
	} else if (isRecurring(task)) {
		return convertRecurring(task);
	} else {
		return convertEvent(task);
	}
}

function convertToDo(todo: ToDo): TaskIn {
	return {
		...todo,
		date: format(new Date(), DATE),
		duration: todo.duration || '00:15',
		endTime: format(addMinutes(getCurrentRoundedDate(), convertTimeToMinutes(todo.duration)), TIME),
		image: todo.image || '',
		isEvent: false,
		isRecurring: false,
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringExceptions: [],
		recurringStartAt: format(new Date(), DATE),
		startTime: format(getCurrentRoundedDate(), TIME),
	};
}

function convertRecurring(event: RecurringEvent): TaskIn {
	return {
		...event,
		deadline: event.date,
		endTime: sumTimes(event.startTime, event.duration),
		image: event.image || '',
		isEvent: true,
		isRecurring: true,
		recurringExceptions: event.recurringExceptions.map((date) => parse(date, DATE, new Date())),
	};
}

function convertEvent(event: Event): TaskIn {
	return {
		...event,
		deadline: event.date,
		endTime: sumTimes(event.startTime, event.duration),
		image: event.image || '',
		isEvent: true,
		isRecurring: false,
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringExceptions: [],
		recurringStartAt: format(new Date(), DATE),
	};
}

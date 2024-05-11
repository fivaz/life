import type { AnyTask, Event, RecurringEvent, SubTask, Task, ToDo } from '$lib/task/utils';

import { getEndTime } from '$lib/components/task-form/service';
import { weekDays } from '$lib/components/task-form/task-form-recurring/days-checkbox/service';
import { DATE, TIME } from '$lib/consts';
import { convertTimeToMinutes } from '$lib/task/time-utils';
import { addMinutes, addMonths, format, isAfter, parse } from 'date-fns';

export type TaskIn = Omit<Task, 'recurringExceptions'> & {
	endTime: string;
	image: string;
	isEvent: boolean;
	isRecurring: boolean;
	recurringExceptions: Date[];
	subTasks: SubTask[];
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

export function convertToAnyTask(taskIn: TaskIn): AnyTask {
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
		deadline: data.deadline,
		description: data.description,
		duration: data.duration,
		goal: data.goal,
		id: data.id,
		image: data.image,
		isDone: data.isDone,
		name: data.name,
		subTasks: data.subTasks,
	};
}

export function getEvent(data: TaskIn): Event {
	return {
		category: data.category,
		date: data.date,
		description: data.description,
		duration: data.duration,
		goal: data.goal,
		id: data.id,
		image: data.image,
		isDone: data.isDone,
		name: data.name,
		startTime: data.startTime,
		subTasks: data.subTasks,
	};
}

export function getRecurringEvent(data: TaskIn): RecurringEvent {
	return {
		category: data.category,
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
		subTasks: data.subTasks,
	};
}

export function convertToTaskIn(task: AnyTask): TaskIn {
	if ('deadline' in task) {
		return convertToDo(task);
	} else {
		if ('recurringStartAt' in task) {
			return convertRecurring(task);
		} else {
			return convertEvent(task);
		}
	}
}

function convertToDo(todo: ToDo): TaskIn {
	return {
		...todo,
		date: format(new Date(), DATE),
		duration: '00:15',
		endTime: format(addMinutes(new Date(), 15), TIME),
		image: todo.image || '',
		isEvent: false,
		isRecurring: false,
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringExceptions: [],
		recurringStartAt: format(new Date(), DATE),
		startTime: format(new Date(), TIME),
		subTasks: todo.subTasks || [],
	};
}

function convertRecurring(event: RecurringEvent): TaskIn {
	return {
		...event,
		deadline: event.date,
		endTime: getEndTime(event.startTime, event.duration),
		image: event.image || '',
		isEvent: true,
		isRecurring: true,
		recurringExceptions: event.recurringExceptions.map((date) => parse(date, DATE, new Date())),
		subTasks: event.subTasks || [],
	};
}

function convertEvent(event: Event): TaskIn {
	return {
		...event,
		deadline: event.date,
		endTime: getEndTime(event.startTime, event.duration),
		image: event.image || '',
		isEvent: true,
		isRecurring: false,
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringExceptions: [],
		recurringStartAt: format(new Date(), DATE),
		subTasks: event.subTasks || [],
	};
}

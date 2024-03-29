import type { Category } from '$lib/category/utils';
import type { TaskIn } from '$lib/components/task-form/service';
import type { Goal } from '$lib/goal/utils';

import { DATE, TIME } from '$lib/consts';
import { format, isAfter, parse } from 'date-fns';

export type CoreTask = {
	category: Category;
	description: string;
	duration: string;
	goal: Goal | null;
	id: string;
	isDone: boolean;
	name: string;
};

export type ToDo = CoreTask & {
	deadline: string;
};

export type Event = CoreTask & {
	date: string;
	startTime: string;
};

export type RecurringEvent = Event & {
	recurringDaysOfWeek: string[];
	recurringEndAt: string;
	recurringExceptions: string[];
	recurringStartAt: string;
};

export type Task = ToDo & Event & RecurringEvent;

export type AnyEvent = Event | RecurringEvent;

export type AnyTask = AnyEvent | ToDo;

export function getDurationInMinutes(task: AnyTask) {
	// to check if the duration string is HH:mm format
	if ('duration' in task && task.duration && /^([01]\d|2[0-3]):([0-5]\d)$/.test(task.duration)) {
		const [hours, minutes] = task.duration.split(':').map(Number);
		return hours * 60 + minutes;
	}
	return 0;
}

export function hasErrors(taskIn: TaskIn, errorMessage: string): boolean {
	errorMessage = checkIsInverted(taskIn);

	return !!errorMessage;
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
		isDone: data.isDone,
		name: data.name,
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
		isDone: data.isDone,
		name: data.name,
		startTime: data.startTime,
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
		isDone: data.isDone,
		name: data.name,
		recurringDaysOfWeek: data.recurringDaysOfWeek,
		recurringEndAt: data.recurringEndAt,
		recurringExceptions: data.recurringExceptions.map((date) => format(date, DATE)),
		recurringStartAt: data.recurringStartAt,
		startTime: data.startTime,
	};
}

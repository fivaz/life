import type { Category } from '$lib/category/utils';
import { TIME } from '$lib/consts';
import type { Goal } from '$lib/goal/utils';
import { differenceInMinutes, format, parse } from 'date-fns';

export type CoreTask = {
	id: string;
	name: string;
	description: string;
	isDone: boolean;
	category: Category;
	goal: Goal | null;
};

export type ToDo = CoreTask & {
	deadline: string;
};

export type Event = CoreTask & {
	date: string;
	startTime: string;
	endTime: string;
	duration: string;
};

export type RecurringEvent = Event & {
	recurringExceptions: string;
	recurringDaysOfWeek: string[];
	recurringStartAt: string;
	recurringEndAt: string;
};

export type Task = ToDo & Event & RecurringEvent;

export type AnyEvent = Event | RecurringEvent;

export type AnyTask = ToDo | AnyEvent;

export type OnlyTTask = Omit<ToDo, 'category' | 'goal'>;

export function convertDurationToMinutes(task: AnyTask) {
	// to check if the duration string is HH:mm format
	if ('duration' in task && task.duration && /^([01]\d|2[0-3]):([0-5]\d)$/.test(task.duration)) {
		const [hours, minutes] = task.duration.split(':').map(Number);
		return hours * 60 + minutes;
	}
	return 0;
}

export function convertToTime(minutes: number | null): string {
	if (!minutes) {
		return 'unset';
	}
	const date = new Date(0, 0, 0, Math.floor(minutes / 60), minutes % 60);
	return format(date, TIME);
}

export function getToDo(data: ToDo & unknown): ToDo {
	return {
		id: data.id,
		name: data.name,
		isDone: data.isDone,
		category: data.category,
		description: data.description,
		goal: data.goal,
		deadline: data.deadline,
	};
}

export function getEvent(data: Event & unknown): Event {
	return {
		id: data.id,
		name: data.name,
		isDone: data.isDone,
		category: data.category,
		description: data.description,
		goal: data.goal,
		date: data.date,
		startTime: data.startTime,
		endTime: data.endTime,
		duration: data.duration,
	};
}

export function getRecurringEvent(data: RecurringEvent & unknown): RecurringEvent {
	return {
		id: data.id,
		name: data.name,
		isDone: data.isDone,
		category: data.category,
		description: data.description,
		goal: data.goal,
		date: data.date,
		startTime: data.startTime,
		endTime: data.endTime,
		duration: data.duration,
		recurringExceptions: data.recurringExceptions,
		recurringDaysOfWeek: data.recurringDaysOfWeek,
		recurringStartAt: data.recurringStartAt,
		recurringEndAt: data.recurringEndAt,
	};
}

export function parseTasks(tasksCollection: Array<AnyTask & unknown>): AnyTask[] {
	return tasksCollection.map((datum: AnyTask & unknown) => {
		if ('deadline' in datum) {
			return getToDo(datum as ToDo & unknown);
		} else {
			if ('recurringStartAt' in datum) {
				return getRecurringEvent(datum as RecurringEvent & unknown);
			} else {
				return getEvent(datum as Event & unknown);
			}
		}
	});
}

export function getDuration(event: AnyEvent): number {
	const startDate = parse(event.startTime, TIME, new Date());
	const endDate = parse(event.endTime, TIME, new Date());

	return differenceInMinutes(startDate, endDate);
}

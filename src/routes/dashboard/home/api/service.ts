import type { EEvent } from '$lib/task/utils';
import { parseISO } from 'date-fns';

export type SerializedEvent = Omit<
	EEvent,
	'startDate' | 'endDate' | 'recurringStartAt' | 'recurringEndAt' | 'recurringExceptions'
> & {
	startDate: string;
	endDate: string;
	recurringStartAt: string;
	recurringEndAt: string;
	recurringExceptions: string[];
};

export function deserializeEvent(task: SerializedEvent): EEvent {
	return {
		...task,
		startDate: parseISO(task.startDate),
		endDate: parseISO(task.endDate),
		recurringStartAt: task.recurringStartAt ? parseISO(task.recurringStartAt) : null,
		recurringEndAt: task.recurringEndAt ? parseISO(task.recurringEndAt) : null,
		recurringExceptions: task.recurringExceptions.map((date) => parseISO(date)),
	};
}

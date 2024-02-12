import { DATE } from '$lib/consts';
import { type AnyTask } from '$lib/task/utils';
import { parse } from 'date-fns';

export function getTaskDate(task: AnyTask) {
	const dateString = 'date' in task ? task.date : task.deadline;

	return dateString ? parse(dateString, DATE, new Date()) : null;
}

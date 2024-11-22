
import type { HHmm, yyyyMMdd } from '$lib/date.utils.svelte';
import type { Task } from '$lib/task/task.model';
import { isRecurring } from '$lib/task/task.model';
import { editTask } from '$lib/task/task.repository';
import { editSingleRecurringEvent } from '$lib/task/task-form/service.svelte';

export function moveEvent(
	userId: string,
	event: Task,
	{
		date,
		duration,
		oldDate,
		startTime,
	}: { date: yyyyMMdd; duration: HHmm; oldDate: yyyyMMdd; startTime: HHmm },
) {
	const newEvent = { ...event, date, duration, startTime };
	editPossibleSingleRecurringEvent(newEvent, userId, oldDate);
}

export function persistTasks(userId: string, toDos: Task[]) {
	toDos.forEach((toDo) => {
		const { id, ...data } = toDo;
		void editTask(id, data, userId, null, null);
	});
}

export function editPossibleSingleRecurringEvent(
	event: Task,
	userId: string,
	targetDate: yyyyMMdd,
) {
	const { id, ...data } = event;
	if (isRecurring(data)) {
		void editSingleRecurringEvent(id, data, userId, targetDate);
	} else {
		void editTask(id, data, userId, null, null);
	}
}

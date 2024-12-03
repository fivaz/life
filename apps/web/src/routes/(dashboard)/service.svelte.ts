import type { Task } from '@life/shared/task';
import { isRecurring } from '@life/shared/task';
import { doc, writeBatch } from 'firebase/firestore';

import { db } from '$lib/firebase';
import { editTask, getTaskPath } from '$lib/task/task.repository';
import { editSingleRecurringEvent } from '$lib/task/task-form/service.svelte';

export function moveEvent(
	userId: string,
	event: Task,
	{
		date,
		duration,
		oldDate,
		startTime,
	}: { date: string; duration: string; oldDate: string; startTime: string },
) {
	const newEvent = { ...event, date, duration, startTime };
	editPossibleSingleRecurringEvent(newEvent, userId, oldDate);
}

export function editPossibleSingleRecurringEvent(event: Task, userId: string, targetDate: string) {
	const { id, ...data } = event;
	if (isRecurring(data)) {
		void editSingleRecurringEvent(id, data, userId, targetDate);
	} else {
		void editTask(id, data, userId, null, null);
	}
}

import type { AnyEvent, AnyTask, ToDo } from '$lib/task/utils';

import { editPossibleSingleRecurringEvent, editTask } from '$lib/components/task-form/service';
import { DATE, DbPaTH } from '$lib/consts';
import { db } from '$lib/firebase';
import { endOfWeek, format } from 'date-fns';
import { Query, collection, query, where } from 'firebase/firestore';

export function moveEvent(
	userId: string,
	event: AnyEvent,
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

export function persistToDos(userId: string, toDos: ToDo[]) {
	toDos.forEach((toDo) => {
		const { id, ...data } = toDo;
		void editTask(id, data, userId, null, null);
	});
}

export function getWeekTasks(userId: string, startOfWeek: Date): [Query<AnyTask>, Query<AnyTask>] {
	const startOfWeekString = format(startOfWeek, DATE);
	const endOfWeekString = format(endOfWeek(startOfWeek), DATE);
	const goalsRef = collection(db, `${DbPaTH.USERS}/${userId}/${DbPaTH.TASKS}`);
	return [
		query(
			goalsRef,
			where('date', '>=', startOfWeekString),
			where('date', '<=', endOfWeekString),
		) as Query<AnyTask>,
		query(
			goalsRef,
			where('deadline', '>=', startOfWeekString),
			where('deadline', '<=', endOfWeekString),
		) as Query<AnyTask>,
	];
}

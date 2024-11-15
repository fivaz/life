import { format, lastDayOfQuarter } from 'date-fns';

import { DATE } from '$lib/consts';
import { type Task } from '$lib/task/task.model';

export type Goal = {
	deadline: string;
	icon: null | string;
	id: string;
	isDone: boolean;
	name: string;
};

export function buildEmptyGoal(): Goal {
	return {
		deadline: format(lastDayOfQuarter(new Date()), DATE),
		icon: 'Fire',
		id: '',
		isDone: false,
		name: '',
	};
}

export function getCompletedTasks(tasks: Task[]): number {
	return tasks.reduce((total, task) => total + Number(task.isDone), 0);
}

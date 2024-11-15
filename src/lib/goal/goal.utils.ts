import { type Task } from '$lib/task/utils';

export type Goal = {
	deadline: string;
	icon: null | string;
	id: string;
	isDone: boolean;
	name: string;
};

export function getCompletedTasks(tasks: Task[]): number {
	return tasks.reduce((total, task) => total + Number(task.isDone), 0);
}

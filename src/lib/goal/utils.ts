import type { OnlyTTask } from '$lib/task/utils';

export type Goal = {
	id?: string;
	name: string;
	deadline: string;
	isDone: boolean;
};

export type GoalWithTasks = Goal & { tasks: OnlyTTask[] };

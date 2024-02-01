import type { OnlyTTask } from '$lib/task/utils';

export type Goal = {
	id?: string;
	name: string;
	deadline: string;
	isDone: boolean;
};

export type GoalWithTasks = Goal & { tasks: OnlyTTask[] };

export function parseGoals(goalsCollection: Array<Goal & Record<string, string>>): Goal[] {
	return goalsCollection.map((datum) => ({
		id: datum.id,
		name: datum.name,
		deadline: datum.deadline,
		isDone: datum.isDone,
	}));
}

import type { OnlyTTask } from '$lib/task/utils';

export type Goal = {
	deadline: string;
	id: string;
	isDone: boolean;
	name: string;
};

export type GoalWithTasks = Goal & { tasks: OnlyTTask[] };

export function parseGoals(goalsCollection: Array<Goal & Record<string, string>>): Goal[] {
	return goalsCollection.map((datum) => ({
		deadline: datum.deadline,
		id: datum.id,
		isDone: datum.isDone,
		name: datum.name,
	}));
}

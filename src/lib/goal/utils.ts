import type { Goal } from '@prisma/client';
import type { OnlyTTask } from '$lib/task/utils';

export type GGoal = Omit<Goal, 'userId' | 'deleted'>;

export type GoalWithTasks = GGoal & { tasks: OnlyTTask[] };

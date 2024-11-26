import type { Task } from '@life/lib/types';

export function getCompletedTasks(tasks: Task[]): number {
	return tasks.reduce((total, task) => total + Number(task.isDone), 0);
}

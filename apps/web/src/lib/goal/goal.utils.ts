import type { Task } from '@life/shared/task';

export function getCompletedTasks(tasks: Task[]): number {
	return tasks.reduce((total, task) => total + Number(task.isDone), 0);
}

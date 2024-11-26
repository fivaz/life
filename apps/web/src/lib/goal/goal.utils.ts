import type { Task } from '@life/lib/task';

export function getCompletedTasks(tasks: Task[]): number {
	return tasks.reduce((total, task) => total + Number(task.isDone), 0);
}

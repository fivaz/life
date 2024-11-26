import type { SubTask, Task } from '@life/lib/task';

import { getTaskDateTime } from '$lib/task/time-utils';

export function sortTasks(tasks: Task[]): Task[] {
	return tasks.toSorted(
		(a, b) => (getTaskDateTime(a)?.getTime() ?? 0) - (getTaskDateTime(b)?.getTime() ?? 0),
	);
}

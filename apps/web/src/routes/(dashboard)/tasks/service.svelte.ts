import type { Task } from '@life/shared/task';

export const tasksPageList = $state<{ value: Task[] }>({ value: [] });

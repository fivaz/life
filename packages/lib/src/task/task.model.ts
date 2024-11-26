import type { Task } from '../types';

export function isTimed(task: Omit<Task, 'id'> | Task) {
  return !!task.startTime;
}

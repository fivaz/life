import { parse } from 'date-fns';

import { convertMinutesToTime, convertTimeToMinutes, DATE, GRID_CELL_TIME, TIME } from '../date';
import type { SubTask, Task } from './task.model';

export function isTimed(task: Omit<Task, 'id'> | Task) {
  return !!task.startTime;
}

export function isUntimed(task: Omit<Task, 'id'> | Task) {
  return !task.startTime;
}

export function isRecurring(task: Omit<Task, 'id'> | Task) {
  return !!task.recurringFrequency;
}

export function getDurationInMinutes(task: Task) {
  return convertTimeToMinutes(task.duration);
}

export function getSubTasks(task: Task): SubTask[] {
  // \[\s?([x ])\s?\] matches either [x] or [ ] (with optional spaces inside).
  // \s-\s matches the separator - (a space, dash, space).
  // (.+) captures the message part (anything after the separator).
  const regex = /\[\s?([x ])\s?]\s-\s(.+)/g;

  let match: RegExpExecArray | null;
  const subTasks: { isDone: boolean; title: string }[] = [];

  while ((match = regex.exec(task.description)) !== null) {
    subTasks.push({
      isDone: match[1].toLowerCase() === 'x',
      title: match[2].trim()
    });
  }

  return subTasks;
}

export function getSubTasksCompleted(subtasks: SubTask[]): number {
  return subtasks.filter((subtask) => subtask.isDone).length;
}

export function getTotalDuration(tasks: Task[]): string {
  const totalDurationInMinutes = tasks.reduce((sum, task) => sum + getDurationInMinutes(task), 0);
  return convertMinutesToTime(totalDurationInMinutes);
}

export function getHalfTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  const halfMinutes = totalMinutes / 2;

  const roundedHalfMinutes = Math.round(halfMinutes / GRID_CELL_TIME) * GRID_CELL_TIME;

  const halfHours = Math.floor(roundedHalfMinutes / 60);

  const remainingInMinutes = Math.round(roundedHalfMinutes % 60);

  return `${String(halfHours).padStart(2, '0')}:${String(remainingInMinutes).padStart(2, '0')}`;
}

export function sortTasks(tasks: Task[]): Task[] {
  return tasks.toSorted(
    (a, b) => (getTaskDateTime(a)?.getTime() ?? 0) - (getTaskDateTime(b)?.getTime() ?? 0)
  );
}

export function getTaskDateTime(task: Task): Date | null {
  if (!task.date) return null;

  if (isTimed(task)) {
    return parse(`${task.date} ${task.startTime}`, `${DATE} ${TIME}`, new Date());
  } else {
    return parse(task.date, DATE, new Date());
  }
}

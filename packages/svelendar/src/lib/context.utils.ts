import type { Task } from '@life/shared/task';
import { getContext, setContext } from 'svelte';

//  change date
const changeDateKey = Symbol('changeDate');

export type ChangeDateFn = (date: Date) => void;

export function setChangeDate(fn: ChangeDateFn) {
	setContext(changeDateKey, fn);
}

export function getChangeDate(): ChangeDateFn {
	return getContext(changeDateKey) as ChangeDateFn;
}

// create task
const createTaskKey = Symbol('createTask');

export type CreateTaskFn = (date: Date) => void;

export function setCreateTask(fn: CreateTaskFn) {
	setContext(createTaskKey, fn);
}

export function getCreateTask(): CreateTaskFn {
	return getContext(createTaskKey) as CreateTaskFn;
}

// edit task
const editTaskKey = Symbol('editTask');

export type EditTaskFn = (task: Task, date: string) => void;

export function setEditTask(fn: EditTaskFn) {
	setContext(editTaskKey, fn);
}

export function getEditTask(): EditTaskFn {
	return getContext(editTaskKey) as EditTaskFn;
}

// move event
const moveEventKey = Symbol('moveEvent');

export type MoveEventFn = (
	event: Task,
	moveObject: {
		date: string;
		duration: string;
		oldDate: string;
		startTime: string;
	},
) => void;

export function setMoveEvent(fn: MoveEventFn) {
	setContext(moveEventKey, fn);
}

export function getMoveEvent(): MoveEventFn {
	return getContext(moveEventKey) as MoveEventFn;
}

// toggle completion
const toggleCompletionKey = Symbol('toggleCompletion');

export type ToggleCompletionFn = (task: Task, targetDate: string) => void;

export function setToggleCompletion(fn: ToggleCompletionFn) {
	setContext(toggleCompletionKey, fn);
}

export function getToggleCompletion(): ToggleCompletionFn {
	return getContext(toggleCompletionKey) as ToggleCompletionFn;
}

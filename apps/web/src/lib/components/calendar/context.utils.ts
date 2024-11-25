import { getContext, setContext } from 'svelte';

import type { HHmm, yyyyMMdd } from '$lib/date.utils.svelte';
import type { Task } from '$lib/task/task.model';

const changeDateKey = Symbol('changeDate');

export function setChangeDate(fn: (date: Date) => void) {
	setContext(changeDateKey, fn);
}

export function getChangeDate(): (date: Date) => void {
	return getContext(changeDateKey) as (date: Date) => void;
}

const createTaskKey = Symbol('createTask');

export function getCreateTask(): (date: Date) => void {
	return getContext(createTaskKey) as (date: Date) => void;
}

export function setCreateTask(fn: (date: Date) => void) {
	setContext(createTaskKey, fn);
}

const editTaskKey = Symbol('editTask');

export function getEditTask(): (task: Task, date: yyyyMMdd) => void {
	return getContext(editTaskKey) as (task: Task, date: yyyyMMdd) => void;
}

export function setEditTask(fn: (task: Task, date: yyyyMMdd) => void) {
	setContext(editTaskKey, fn);
}

const moveEventKey = Symbol('moveEvent');

export type MoveEventType = (
	event: Task,
	moveObject: {
		date: yyyyMMdd;
		duration: HHmm;
		oldDate: yyyyMMdd;
		startTime: HHmm;
	},
) => void;

export function getMoveEvent(): MoveEventType {
	return getContext(moveEventKey) as MoveEventType;
}

export function setMoveEvent(fn: MoveEventType) {
	setContext(moveEventKey, fn);
}

const persistTasksKey = Symbol('persistTasks');

export function getPersistTasks(): (tasks: Task[]) => void {
	return getContext(persistTasksKey) as (tasks: Task[]) => void;
}

export function setPersistTasks(fn: (tasks: Task[]) => void) {
	setContext(persistTasksKey, fn);
}

const toggleCompletionKey = Symbol('toggleCompletion');

export function getToggleCompletion(): (task: Task, targetDate: yyyyMMdd) => void {
	return getContext(toggleCompletionKey) as (event: Task, targetDate: yyyyMMdd) => void;
}

export function setToggleCompletion(fn: (task: Task, targetDate: yyyyMMdd) => void) {
	setContext(toggleCompletionKey, fn);
}

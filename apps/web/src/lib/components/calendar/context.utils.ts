import type { Task } from '@life/shared/types';
import { getContext, setContext } from 'svelte';

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

export function getEditTask(): (task: Task, date: string) => void {
	return getContext(editTaskKey) as (task: Task, date: string) => void;
}

export function setEditTask(fn: (task: Task, date: string) => void) {
	setContext(editTaskKey, fn);
}

const moveEventKey = Symbol('moveEvent');

export type MoveEventType = (
	event: Task,
	moveObject: {
		date: string;
		duration: string;
		oldDate: string;
		startTime: string;
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

export function getToggleCompletion(): (task: Task, targetDate: string) => void {
	return getContext(toggleCompletionKey) as (event: Task, targetDate: string) => void;
}

export function setToggleCompletion(fn: (task: Task, targetDate: string) => void) {
	setContext(toggleCompletionKey, fn);
}

import { differenceInMilliseconds } from 'date-fns';
import { getContext, setContext } from 'svelte';

import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/calendar-grid/service.svelte';
import type { HHmm, yyyyMMdd } from '$lib/date.utils.svelte';
import type { Task } from '$lib/task/task.model';

export function getNextRoundedTime() {
	const now = new Date();

	const currentTimeMilliseconds = now.getTime();

	const roundedMilliseconds = 1000 * 60 * GRID_CELL_TIME;
	const nextTimeRounded =
		Math.ceil(currentTimeMilliseconds / roundedMilliseconds) * roundedMilliseconds;

	return differenceInMilliseconds(nextTimeRounded, currentTimeMilliseconds);
}

const changeWeekKey = Symbol('changeWeek');

export function setChangeWeek(fn: (weekStart: Date) => void) {
	setContext(changeWeekKey, fn);
}

export function getChangeWeek(): (weekStart: Date) => void {
	return getContext(changeWeekKey) as (weekStart: Date) => void;
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

const toggleEventKey = Symbol('toggleEvent');

export function getToggleEvent(): (event: Task, targetDate: yyyyMMdd) => void {
	return getContext(toggleEventKey) as (event: Task, targetDate: yyyyMMdd) => void;
}

export function setToggleEvent(fn: (event: Task, targetDate: yyyyMMdd) => void) {
	setContext(toggleEventKey, fn);
}

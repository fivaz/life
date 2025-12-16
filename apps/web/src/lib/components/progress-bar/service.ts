import type { Task } from '@life/shared/task';
import { differenceInHours, parseISO, startOfDay } from 'date-fns';
import { SvelteMap, SvelteSet } from 'svelte/reactivity';

/**
 * Calculates completion based on unique tasks.
 * Tasks with the same groupId count as 1.
 */
export function calculateActual(taskList: Task[]): string {
	if (taskList.length === 0) return '0';

	const groups = Object.groupBy(taskList, (t) => t.groupId ?? t.id);

	const unitLists = Object.values(groups) as Task[][];

	const totalUnits = unitLists.length;
	const completedUnits = unitLists.filter((list) => list.every((t) => t.isDone)).length;

	return ((completedUnits / totalUnits) * 100).toFixed(0);
}

/**
 * Calculates time progress between start and deadline.
 */
export function calculateExpected(startStr: string, endStr: string): string {
	const start = startOfDay(parseISO(startStr)).getTime();
	const end = startOfDay(parseISO(endStr)).getTime();
	const now = Date.now();

	const totalTime = end - start;
	const passedTime = now - start;

	if (totalTime <= 0) return '0';
	return Math.max(0, Math.min((passedTime / totalTime) * 100, 100)).toFixed(0);
}

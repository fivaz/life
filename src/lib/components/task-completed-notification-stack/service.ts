import { type AnyTask } from '$lib/task/utils';
import { writable } from 'svelte/store';

export const notifications = writable<AnyTask[]>([]);

export function addNotification(task: AnyTask) {
	const clonedTask = JSON.parse(JSON.stringify(task));
	notifications.update((tasks) => [...tasks, clonedTask]);
}

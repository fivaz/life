import type { Task } from '@life/lib/task';
import { collection, getDocs } from 'firebase/firestore';
import { cubicOut } from 'svelte/easing';

import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import type { Goal } from '$lib/goal/goal.model';
import { getCompletedTasks } from '$lib/goal/goal.utils';

export async function fetchPercentageComplete(task: Task & { goal: Goal }, userId: string) {
	const tasksRef = collection(
		db,
		DB_PATH.USERS,
		userId,
		DB_PATH.GOALS,
		task.goal.id,
		DB_PATH.TASKS,
	);
	const tasksSnapshot = await getDocs(tasksRef);
	const tasks = tasksSnapshot.docs.map((doc) => doc.data()) as Task[];
	return getCompletedPercentage(tasks);
}

function getCompletedPercentage(tasks: Task[]): number {
	const completedTasks = getCompletedTasks(tasks);
	const total = tasks.length;
	return Number(((completedTasks / total) * 100).toFixed(0));
}

export function slideFromRight(node: Element, { delay = 0, duration = 400 }) {
	return {
		css: (t: number) => {
			const opacity = t;
			const transform = `translateX(${(1 - t) * 100}%)`;

			return `
					opacity: ${opacity};
					transform: ${transform};
				`;
		},
		delay,
		duration,
		easing: cubicOut,
	};
}

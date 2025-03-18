<script lang="ts">
	import { CATEGORY_WORK } from '@life/shared/category';
	import type { Task } from '@life/shared/task';
	import { Calendar } from 'svelendar';

	import type { Category } from '$lib/category/category.model';
	import { buildEmptyCategory } from '$lib/category/category.model';
	import { fetchCategories } from '$lib/category/category.respository';
	import { buildTimedTask, buildTimedTaskWithTimeSet } from '$lib/task/build-utils';
	import TaskCompletedNotificationStack from '$lib/task/task-completed-notification-stack/TaskCompletedNotificationStack.svelte';
	import TaskFormButton from '$lib/task/task-form/TaskFormButton.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';
	import { title } from '$lib/utils.svelte';

	import { editPossibleSingleRecurringEvent, moveEvent } from './service.svelte';
	import { convertTaskMapToList, fetchFirstTasks, getWeekTasks, tasksMap } from './task-map.svelte';

	let targetDate = $state<string | undefined>();

	let editingTask = $state<Task>(buildTimedTask([buildEmptyCategory()]));

	let completedTasks = $state<Task[]>([]);

	title.value = 'Calendar';

	let formButton = $state<TaskFormButton | null>(null);

	// ADD
	function openFormToCreateTask(categories: Category[], date: Date) {
		editingTask = buildTimedTaskWithTimeSet(categories, date);
		formButton?.open();
	}

	//EDIT
	function openFormToEditTask(task: Task, date: string) {
		targetDate = date;
		editingTask = task;
		formButton?.open();
	}

	//TOGGLE
	function toggleCompletion(userId: string, event: Task, targetDate: string) {
		const newEvent = { ...event, isDone: !event.isDone };
		editPossibleSingleRecurringEvent(newEvent, userId, targetDate);
		updateNotification(newEvent);
	}

	function updateNotification(task: Task) {
		if (task.category.type === CATEGORY_WORK && task.isDone) {
			completedTasks = [...completedTasks, task];
		} else {
			completedTasks = completedTasks.filter((completedTask) => completedTask.id !== task.id);
		}
	}

	let categories = $state<Category[]>([]);

	fetchCategories(categories);

	fetchFirstTasks();

	let tasks = $derived(convertTaskMapToList(tasksMap.value));
</script>

<Calendar
	changeDate={(date) => getWeekTasks(date)}
	createTask={(date) => openFormToCreateTask(categories, date)}
	editTask={(task, targetDate) => openFormToEditTask(task, targetDate)}
	moveEvent={(event, moveObject) => moveEvent(currentUser.uid, event, moveObject)}
	{tasks}
	toggleCompletion={(task, targetDate) => toggleCompletion(currentUser.uid, task, targetDate)}
/>

<TaskFormButton bind:this={formButton} class="hidden" {targetDate} task={editingTask} />

<TaskCompletedNotificationStack bind:completedTasks />

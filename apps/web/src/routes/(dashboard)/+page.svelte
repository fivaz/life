<script lang="ts">
	import type { Task } from '@life/lib/types';
	import { Modal } from '@life/ui';
	import { where } from 'firebase/firestore';

	import type { Category } from '$lib/category/category.model';
	import { buildEmptyCategory, CATEGORY_WORK } from '$lib/category/category.model';
	import { fetchCategories } from '$lib/category/category.respository';
	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import type { Goal } from '$lib/goal/goal.model';
	import { fetchGoals } from '$lib/goal/goal.repository';
	import { buildTimedTask, buildTimedTaskWithTimeSet } from '$lib/task/build-utils';
	import TaskCompletedNotificationStack from '$lib/task/task-completed-notification-stack/TaskCompletedNotificationStack.svelte';
	import TaskForm from '$lib/task/task-form/TaskForm.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import { editPossibleSingleRecurringEvent, moveEvent, persistTasks } from './service.svelte';
	import { convertTaskMapToList, fetchFirstTasks, getWeekTasks, tasksMap } from './task-map.svelte';

	let targetDate = $state<string | undefined>();

	let isFormShown = $state<boolean>(false);

	let editingTask = $state<Task>(buildTimedTask([buildEmptyCategory()]));

	let completedTasks = $state<Task[]>([]);

	// ADD
	function openFormToCreateTask(categories: Category[], date: Date) {
		isFormShown = true;
		editingTask = buildTimedTaskWithTimeSet(categories, date);
	}

	//EDIT
	function openFormToEditTask(task: Task, date: string) {
		isFormShown = true;
		targetDate = date;
		editingTask = task;
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

	let goals = $state<Goal[]>([]);

	fetchGoals(goals, where('isDone', '==', false));

	fetchFirstTasks();

	let tasks = $derived(convertTaskMapToList(tasksMap.value));
</script>

<Calendar
	changeDate={(date) => getWeekTasks(date)}
	createTask={(date) => openFormToCreateTask(categories, date)}
	editTask={(task, targetDate) => openFormToEditTask(task, targetDate)}
	moveEvent={(event, moveObject) => moveEvent(currentUser.uid, event, moveObject)}
	persistTasks={(tasks) => persistTasks(currentUser.uid, tasks)}
	{tasks}
	toggleCompletion={(task, targetDate) => toggleCompletion(currentUser.uid, task, targetDate)}
/>

<Modal bind:isOpen={isFormShown}>
	<TaskForm
		{categories}
		close={() => (isFormShown = false)}
		{goals}
		{targetDate}
		task={editingTask}
	/>
</Modal>
<TaskCompletedNotificationStack bind:completedTasks />

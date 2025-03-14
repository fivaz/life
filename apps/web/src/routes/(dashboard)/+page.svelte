<script lang="ts">
	import { Modal } from '@life/shared';
	import { CATEGORY_WORK } from '@life/shared/category';
	import { getGoalsForTasks } from '@life/shared/goal';
	import type { Task } from '@life/shared/task';
	import { where } from 'firebase/firestore';
	import { Calendar } from 'svelendar';

	import type { Category } from '$lib/category/category.model';
	import { buildEmptyCategory } from '$lib/category/category.model';
	import { fetchCategories } from '$lib/category/category.respository';
	import type { Goal } from '$lib/goal/goal.model';
	import { fetchGoals } from '$lib/goal/goal.repository';
	import { buildTimedTask, buildTimedTaskWithTimeSet } from '$lib/task/build-utils';
	import TaskCompletedNotificationStack from '$lib/task/task-completed-notification-stack/TaskCompletedNotificationStack.svelte';
	import TaskForm from '$lib/task/task-form/TaskForm.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';
	import { title } from '$lib/utils.svelte';

	import { editPossibleSingleRecurringEvent, moveEvent } from './service.svelte';
	import { convertTaskMapToList, fetchFirstTasks, getWeekTasks, tasksMap } from './task-map.svelte';

	let targetDate = $state<string | undefined>();

	let isFormShown = $state<boolean>(false);

	let editingTask = $state<Task>(buildTimedTask([buildEmptyCategory()]));

	let completedTasks = $state<Task[]>([]);

	title.value = 'Calendar';

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

	fetchGoals(
		(unsortedGoals) => (goals = getGoalsForTasks(unsortedGoals)),
		where('isDone', '==', false),
	);

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

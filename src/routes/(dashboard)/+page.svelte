<script lang="ts">
	import { buildEmptyCategory, type Category, CategoryTypes } from '$lib/category/category.model';
	import DBCategories from '$lib/category/DBCategories.svelte';
	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import DBGoalsForTaskForm from '$lib/goal/DBGoalsForTaskForm.svelte';
	import { buildTimedTask, buildTimedTaskWithTimeSet } from '$lib/task/build-utils';
	import type { Task } from '$lib/task/task.model';
	import TaskCompletedNotificationStack from '$lib/task/task-completed-notification-stack/TaskCompletedNotificationStack.svelte';
	import TaskForm from '$lib/task/task-form/TaskForm.svelte';

	import {
		editPossibleSingleRecurringEvent,
		getWeekTasks,
		moveEvent,
		persistTasks,
		tasks,
	} from './service.svelte.js';

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
		if (task.category.type === CategoryTypes.WORK && task.isDone) {
			completedTasks = [...completedTasks, task];
		} else {
			completedTasks = completedTasks.filter((completedTask) => completedTask.id !== task.id);
		}
	}
</script>

<DBCategories>
	{#snippet data(categories, userId)}
		<Calendar
			changeWeek={(weekStart) => getWeekTasks(userId, weekStart)}
			createTask={(date) => openFormToCreateTask(categories, date)}
			editTask={(task, targetDate) => openFormToEditTask(task, targetDate)}
			moveEvent={(event, moveObject) => moveEvent(userId, event, moveObject)}
			persistTasks={(tasks) => persistTasks(userId, tasks)}
			tasks={tasks.value}
			toggleEvent={(event, targetDate) => toggleCompletion(userId, event, targetDate)}
		/>
		<DBGoalsForTaskForm>
			{#snippet data(goals)}
				<Modal bind:isOpen={isFormShown}>
					<TaskForm
						{userId}
						{categories}
						{goals}
						close={() => (isFormShown = false)}
						task={editingTask}
						{targetDate}
					/>
				</Modal>
			{/snippet}
		</DBGoalsForTaskForm>
		<TaskCompletedNotificationStack bind:completedTasks {userId} />
	{/snippet}
</DBCategories>

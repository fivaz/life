<script lang="ts">
	import type { Category } from '$lib/category/category.model';
	import { buildEmptyCategory, CATEGORY_WORK } from '$lib/category/category.model';
	import DBCategories from '$lib/category/DBCategories.svelte';
	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { yyyyMMdd } from '$lib/date.utils.svelte';
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
	} from './service.svelte';

	let targetDate = $state<yyyyMMdd | undefined>();

	let isFormShown = $state<boolean>(false);

	let editingTask = $state<Task>(buildTimedTask([buildEmptyCategory()]));

	let completedTasks = $state<Task[]>([]);

	// ADD
	function openFormToCreateTask(categories: Category[], date: Date) {
		isFormShown = true;
		editingTask = buildTimedTaskWithTimeSet(categories, date);
	}

	//EDIT
	function openFormToEditTask(task: Task, date: yyyyMMdd) {
		isFormShown = true;
		targetDate = date;
		editingTask = task;
	}

	//TOGGLE
	function toggleCompletion(userId: string, event: Task, targetDate: yyyyMMdd) {
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
						{categories}
						close={() => (isFormShown = false)}
						{goals}
						{targetDate}
						task={editingTask}
						{userId}
					/>
				</Modal>
			{/snippet}
		</DBGoalsForTaskForm>
		<TaskCompletedNotificationStack {userId} bind:completedTasks />
	{/snippet}
</DBCategories>

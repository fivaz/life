<script lang="ts">
	import type { AnyEvent, Task } from '$lib/task/utils';

	import { type Category, CategoryTypes } from '$lib/category/utils';
	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import TaskCompletedNotificationStack from '$lib/components/task-completed-notification-stack/TaskCompletedNotificationStack.svelte';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import { buildEmptyEvent, buildEventWithTime } from '$lib/task/build-utils';

	import { externalTasks as tasks, getWeekTasks, moveEvent, persistToDos } from './service.svelte';
	import DBCategories from '$lib/category/DBCategories.svelte';
	import DBGoals from '$lib/goal/DBGoals.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';

	let targetDate = $state<string | undefined>();

	let isFormShown = $state<boolean>(false);

	let editingTask = $state<Task>(buildEmptyEvent([]));

	let completedTasks = $state<Task[]>([]);

	function openFormToCreateTask(categories: Category[], date: Date) {
		isFormShown = true;
		editingTask = buildEventWithTime(categories, date);
	}

	function openFormToEditTask(task: Task, date: string) {
		isFormShown = true;
		targetDate = date;
		editingTask = task;
	}

	function updateNotification(task: Task) {
		if (task.category.type === CategoryTypes.WORK && task.isDone) {
			completedTasks = [...completedTasks, task];
		} else {
			completedTasks = completedTasks.filter((completedTask) => completedTask.id !== task.id);
		}
	}

	function toggleCompletion(userId: string, event: AnyEvent, targetDate: string) {
		const newEvent = { ...event, isDone: !event.isDone };
		editPossibleSingleRecurringEvent(newEvent, userId, targetDate);
		updateNotification(newEvent);
	}
</script>

<DBCategories>
	{#snippet data(categories, userId)}
		<Calendar
			changeWeek={(weekStart) => getWeekTasks(userId, weekStart)}
			createTask={(date) => openFormToCreateTask(categories, date)}
			editTask={(task, targetDate) => openFormToEditTask(task, targetDate)}
			moveEvent={(event, moveObject) => moveEvent(userId, event, moveObject)}
			persistToDos={(toDos) => persistToDos(userId, toDos)}
			{tasks}
			toggleEvent={(event, targetDate) => toggleCompletion(userId, event, targetDate)}
		/>
		<DBGoals>
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
		</DBGoals>
		<TaskCompletedNotificationStack bind:completedTasks {userId} />
	{/snippet}
</DBCategories>

<script lang="ts">
	import type { AnyEvent, Task } from '$lib/task/utils';

	import { type Category, CategoryTypes } from '$lib/category/utils';
	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import TaskCompletedNotificationStack from '$lib/components/task-completed-notification-stack/TaskCompletedNotificationStack.svelte';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import TaskFormWrapper from '$lib/components/task-form-wrapper/TaskFormWrapper.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import { buildEmptyEvent, buildEventWithTime } from '$lib/task/build-utils';
	import { title } from '$lib/utils';
	import AuthGuard from '$lib/components/auth-guard/AuthGuard.svelte';

	import { externalTasksStore, getWeekTasks, moveEvent, persistToDos } from './service';

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

	let categoryType: Category;

	title.set('Calendar');
</script>

<AuthGuard>
	{#snippet data(user)}
		<TypedCollection ref="{DB_PATH.USERS}/{user.uid}/{DB_PATH.CATEGORIES}" type={categoryType}>
			{#snippet data(categories)}
				<Calendar
					changeWeek={(weekStart) => getWeekTasks(user.uid, weekStart)}
					createTask={(date) => openFormToCreateTask(categories, date)}
					editTask={(task, targetDate) => openFormToEditTask(task, targetDate)}
					moveEvent={(event, moveObject) => moveEvent(user.uid, event, moveObject)}
					persistToDos={(toDos) => persistToDos(user.uid, toDos)}
					tasks={$externalTasksStore}
					toggleEvent={(event, targetDate) => toggleCompletion(user.uid, event, targetDate)}
				/>
				<TaskFormWrapper
					bind:isOpen={isFormShown}
					{categories}
					{editingTask}
					{targetDate}
					userId={user.uid}
				/>
			{/snippet}
		</TypedCollection>
		<TaskCompletedNotificationStack bind:completedTasks />
	{/snippet}
</AuthGuard>

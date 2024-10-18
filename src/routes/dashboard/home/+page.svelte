<script lang="ts">
	import type { AnyEvent, AnyTask } from '$lib/task/utils';

	import { type Category, CategoryTypes } from '$lib/category/utils';
	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import TaskCompletedNotificationStack from '$lib/components/task-completed-notification-stack/TaskCompletedNotificationStack.svelte';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import TaskFormWrapper from '$lib/components/task-form-wrapper/TaskFormWrapper.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import { buildEmptyEvent, buildEventWithTime } from '$lib/task/build-utils';
	import { title } from '$lib/utils';
	import { SignedIn } from 'sveltefire';

	import { externalTasksStore, getWeekTasks, moveEvent, persistToDos } from './service';

	let targetDate: string | undefined = undefined;

	let showForm = false;

	let editingTask: AnyTask = buildEmptyEvent([]);

	let completedTasks: AnyTask[] = [];

	function openFormToCreateTask(categories: Category[], date: Date) {
		showForm = true;
		editingTask = buildEventWithTime(categories, date);
	}

	function openFormToEditTask(task: AnyTask, date: string) {
		showForm = true;
		targetDate = date;
		editingTask = task;
	}

	function updateNotification(task: AnyTask) {
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

<SignedIn let:user>
	<TypedCollection
		let:data={categories}
		ref="{DB_PATH.USERS}/{user.uid}/{DB_PATH.CATEGORIES}"
		type={categoryType}
	>
		<Calendar
			createTask={(date) => openFormToCreateTask(categories, date)}
			editTask={(task, targetDate) => openFormToEditTask(task, targetDate)}
			fetchTasks={(weekStart) => getWeekTasks(user.uid, weekStart)}
			moveEvent={(event, moveObject) => moveEvent(user.uid, event, moveObject)}
			persistToDos={(toDos) => persistToDos(user.uid, toDos)}
			tasks={$externalTasksStore}
			toggleEvent={(event, targetDate) => toggleCompletion(user.uid, event, targetDate)}
		/>
		<TaskFormWrapper
			bind:show={showForm}
			{categories}
			{editingTask}
			{targetDate}
			userId={user.uid}
		/>
	</TypedCollection>
	<TaskCompletedNotificationStack bind:completedTasks />
</SignedIn>

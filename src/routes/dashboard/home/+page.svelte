<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { AnyEvent, AnyTask } from '$lib/task/utils';

	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import TaskCompletedNotificationStack from '$lib/components/task-completed-notification-stack/TaskCompletedNotificationStack.svelte';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import TaskFormWrapper from '$lib/components/task-form-wrapper/TaskFormWrapper.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { DbPaTH } from '$lib/consts';
	import { buildEmptyEvent, buildEventWithTime } from '$lib/task/build-utils';
	import { title } from '$lib/utils';
	import { SignedIn } from 'sveltefire';

	import { getWeekTasks, moveEvent, persistToDos } from './service';

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
		if (task.category.type === 'work' && task.isDone) {
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
		ref="{DbPaTH.USERS}/{user.uid}/{DbPaTH.CATEGORIES}"
		type={categoryType}
	>
		<Calendar
			createTask={(date) => openFormToCreateTask(categories, date)}
			editTask={(task, targetDate) => openFormToEditTask(task, targetDate)}
			fetchTasks={(weekStart) => getWeekTasks(user.uid, weekStart)}
			on:moveEvent={(e) =>
				moveEvent(
					user.uid,
					e.detail.event,
					e.detail.newDate,
					e.detail.newDuration,
					e.detail.newStartTime,
					e.detail.oldDate,
				)}
			on:persistToDos={(e) => persistToDos(user.uid, e.detail)}
			on:toggleEvent={(e) => toggleCompletion(user.uid, e.detail.event, e.detail.targetDate)}
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

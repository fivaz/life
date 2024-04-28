<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { AnyEvent, AnyTask } from '$lib/task/utils';

	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import TaskFormWrapper from '$lib/components/task-form-wrapper/TaskFormWrapper.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { buildEmptyEvent, buildEventWithTime } from '$lib/task/build-utils';
	import { SignedIn } from 'sveltefire';

	let targetDate: string | undefined = undefined;

	let showForm = false;

	let editingTask: AnyTask = buildEmptyEvent([]);

	function openFormToCreateTask(categories: Category[], date: Date) {
		showForm = true;
		editingTask = buildEventWithTime(categories, date);
	}

	function openFormToEditTask(task: AnyTask, date: string) {
		showForm = true;
		targetDate = date;
		editingTask = task;
	}

	function toggleCompletion(userId: string, event: AnyEvent, targetDate: string) {
		const newEvent = { ...event, isDone: !event.isDone };
		editPossibleSingleRecurringEvent(newEvent, userId, targetDate);
	}

	function moveEvent(
		userId: string,
		event: AnyEvent,
		date: string,
		duration: string,
		startTime: string,
		oldDate: string,
	) {
		const newEvent = { ...event, date, duration, startTime };
		editPossibleSingleRecurringEvent(newEvent, userId, oldDate);
	}

	let taskType: AnyTask;

	let categoryType: Category;
</script>

<SignedIn let:user>
	<TypedCollection let:data={categories} ref={`users/${user.uid}/categories`} type={categoryType}>
		<TypedCollection let:data={tasks} ref={`users/${user.uid}/tasks`} type={taskType}>
			<Calendar
				on:createTask={(e) => openFormToCreateTask(categories, e.detail)}
				on:editTask={(e) => openFormToEditTask(e.detail.task, e.detail.targetDate)}
				on:moveEvent={(e) =>
					moveEvent(
						user.uid,
						e.detail.event,
						e.detail.newDate,
						e.detail.newDuration,
						e.detail.newStartTime,
						e.detail.oldDate,
					)}
				on:toggleEvent={(e) => toggleCompletion(user.uid, e.detail.event, e.detail.targetDate)}
				{tasks}
			/>
			<TaskFormWrapper
				bind:show={showForm}
				{categories}
				{editingTask}
				{targetDate}
				userId={user.uid}
			/>
		</TypedCollection>
	</TypedCollection>
</SignedIn>

<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { Goal } from '$lib/goal/utils';
	import type { AnyEvent, AnyTask } from '$lib/task/utils';

	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import {
		addTask,
		deletePossibleSingleRecurringEvent,
		editPossibleSingleRecurringEvent,
		editTaskWithPrompt,
	} from '$lib/components/task-form/service';
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

	function removeTask(userId: string, task: AnyTask, targetDate: string | undefined) {
		deletePossibleSingleRecurringEvent(task, userId, targetDate);
	}

	function createTask(userId: string, data: Omit<AnyTask, 'id'>, file: File | null) {
		addTask(data, userId, file);
	}

	function editTask(
		userId: string,
		data: Omit<AnyTask, 'id'>,
		id: string,
		targetDate: string | undefined,
		file: File | null,
		wasRecurring: boolean,
	) {
		editTaskWithPrompt(id, data, userId, targetDate, wasRecurring, file);
	}

	let taskType: AnyTask;

	let categoryType: Category;

	let goalType: Goal;
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

			<TypedCollection let:data={goals} ref={`users/${user.uid}/goals`} type={goalType}>
				<Modal on:close={() => (showForm = false)} show={showForm}>
					<TaskForm
						{categories}
						{goals}
						on:close={() => (showForm = false)}
						on:createTask={(e) => createTask(user.uid, e.detail.data, e.detail.file)}
						on:editTask={(e) =>
							editTask(
								user.uid,
								e.detail.data,
								e.detail.id,
								e.detail.targetDate,
								e.detail.file,
								e.detail.wasRecurring,
							)}
						on:removeTask={(e) => removeTask(user.uid, e.detail.task, e.detail.targetDate)}
						{targetDate}
						task={editingTask}
					/>
				</Modal>
			</TypedCollection>
		</TypedCollection>
	</TypedCollection>
</SignedIn>

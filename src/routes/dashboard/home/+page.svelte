<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { AnyEvent, AnyTask } from '$lib/task/utils';

	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { buildEmptyEvent, buildEventWithTime } from '$lib/task/build-utils';
	import { SignedIn } from 'sveltefire';

	let categoryType: Category;

	let targetDate: string | undefined = undefined;

	let showForm = false;

	let editingEvent: AnyEvent = buildEmptyEvent([]);

	let taskType: AnyTask;

	export function toggleCompletion(userId: string, event: AnyEvent, targetDate: string) {
		const newEvent = { ...event, isDone: !event.isDone };
		editPossibleSingleRecurringEvent(newEvent, userId, targetDate);
	}

	export function moveEvent(
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
</script>

<SignedIn let:user>
	<TypedCollection let:data={categories} ref={`users/${user.uid}/categories`} type={categoryType}>
		<TypedCollection let:data={tasks} ref={`users/${user.uid}/tasks`} type={taskType}>
			<Calendar
				on:createTask={(e) => {
					showForm = true;
					editingEvent = buildEventWithTime(categories, e.detail);
				}}
				on:editTask={(e) => {
					showForm = true;
					targetDate = e.detail.targetDate;
					editingEvent = e.detail.event;
				}}
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

			<Modal on:close={() => (showForm = false)} show={showForm}>
				<TaskForm
					{categories}
					on:close={() => (showForm = false)}
					{targetDate}
					task={editingEvent}
					userId={user.uid}
				/>
			</Modal>
		</TypedCollection>
	</TypedCollection>
</SignedIn>

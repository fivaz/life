<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import SlimCollection from '$lib/components/slim-collection/SlimCollection.svelte';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service.js';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import { draggedEvent } from '$lib/dragged/store';
	import type { OptionalId } from '$lib/form-utils';
	import type { Event } from '$lib/task/utils';
	import { startOfWeek } from 'date-fns';

	import { SignedIn } from 'sveltefire';
	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	import { buildEmptyEvent, buildEventWithTime, moveEvent } from './service';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);

	let targetDate: Date | undefined = undefined;

	let editingEvent: OptionalId<Event> = buildEmptyEvent([]);

	let showForm = false;
</script>

<SignedIn let:user>
	<SlimCollection ref={`users/${user.uid}/categories`} let:data={categories}>
		<div class="flex h-full flex-col divide-gray-200">
			<CalendarHeader
				bind:weekStart
				{currentDate}
				on:create={() => {
					showForm = true;
					editingEvent = buildEmptyEvent(categories);
				}}
			/>
			<CalendarBody
				{weekStart}
				on:edit={(e) => {
					showForm = true;
					targetDate = e.detail.targetDate;
					editingEvent = e.detail.event;
				}}
				on:create={(e) => {
					showForm = true;
					editingEvent = buildEventWithTime(categories, e.detail.date, e.detail.timeInterval);
				}}
				on:move={async (e) => {
					if ($draggedEvent) {
						const { id, ...data } = moveEvent($draggedEvent, e.detail.date, e.detail.timeInterval);
						editPossibleSingleRecurringEvent(id, data, user.uid, e.detail.date);
					}
				}}
			/>
			<Modal show={showForm} on:close={() => (showForm = false)}>
				<TaskForm
					userId={user.uid}
					task={editingEvent}
					{categories}
					{targetDate}
					on:close={() => (showForm = false)}
				/>
			</Modal>
		</div>
	</SlimCollection>
</SignedIn>

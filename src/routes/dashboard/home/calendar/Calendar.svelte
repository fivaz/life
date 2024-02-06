<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { AnyEvent } from '$lib/task/utils';

	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service.js';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { draggedEvent } from '$lib/dragged/store';
	import { startOfWeek } from 'date-fns';
	import { SignedIn } from 'sveltefire';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	import { buildEmptyEvent, buildEventWithTime, moveEvent } from './service';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);

	let targetDate: Date | undefined = undefined;

	let editingEvent: AnyEvent = buildEmptyEvent([]);

	let showForm = false;

	let categoryType: Category;
</script>

<SignedIn let:user>
	<TypedCollection let:data={categories} ref={`users/${user.uid}/categories`} type={categoryType}>
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
				on:create={(e) => {
					showForm = true;
					editingEvent = buildEventWithTime(categories, e.detail.date, e.detail.timeInterval);
				}}
				on:edit={(e) => {
					showForm = true;
					targetDate = e.detail.targetDate;
					editingEvent = e.detail.event;
				}}
				on:move={async (e) => {
					if ($draggedEvent) {
						const { id, ...data } = moveEvent($draggedEvent, e.detail.date, e.detail.timeInterval);
						editPossibleSingleRecurringEvent(id, data, user.uid, e.detail.date);
					}
				}}
				{weekStart}
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
		</div>
	</TypedCollection>
</SignedIn>
